import { useCity } from "@/CityDataContext";
import { useQuery } from "@tanstack/react-query";

const smhiEntryPoint = "https://opendata-download-metfcst.smhi.se";
const smhiEndpoint = "/api/category/pmp3g/version/2/geotype/point";

type SmhiWeatherParameter = {
  name: string;
  levelType: string;
  level: number;
  unit: string;
  values: Array<number>;
};

type SmhiDataPoint = {
  validTime: string;
  parameters: Array<SmhiWeatherParameter>;
};

type SmhiResponse = {
  approvedTime: string;
  geometry: { coordinates: Array<number>; type: string };
  referenceTime: string;
  timeSeries: Array<SmhiDataPoint>;
};

type WeatherData = {
  temperature: { time: string; temperature: number }[];
  humidity: { time: string; humidity: number }[];
  windSpeed: { time: string; windSpeed: number }[];
  gust: { time: string; gustSpeed: number }[];
  airPressure: { time: string; pressure: number }[];
  cloudCover: { time: string; cloudCover: number }[];
  precipitation: { time: string; precipitation: number }[];
};

enum WeatherParameterCode {
  t = "temperature",
  msl = "airPressure",
  ws = "windSpeed",
  r = "humidity",
  tcc_mean = "cloudCoverage",
  gust = "gust",
  pmean = "precipitation",
}

const get24hDataPoints = (data: SmhiResponse) => {
  if (!data) return;
  const dataPoints = [
    data.timeSeries[0],
    data.timeSeries[6],
    data.timeSeries[12],
    data.timeSeries[18],
    data.timeSeries[24],
  ];
  return convertSmhiResponseToWeatherData(dataPoints);
};

const isoDateToHour = (isoDate: string) => {
  // Parse the date string to a Date object
  const date = new Date(isoDate);
  // Get the hours from the Date object in hh:mm format (e.g. 01:00)
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const convertSmhiResponseToWeatherData = (
  dataPoints: Array<SmhiDataPoint>
): WeatherData => {
  const weatherData: WeatherData = {
    temperature: [],
    humidity: [],
    windSpeed: [],
    gust: [],
    airPressure: [],
    cloudCover: [],
    precipitation: [],
  };

  for (const dataPoint of dataPoints) {
    const time = isoDateToHour(dataPoint.validTime);
    for (const param of dataPoint.parameters) {
      if (param.name in WeatherParameterCode) {
        const paramName =
          WeatherParameterCode[param.name as keyof typeof WeatherParameterCode];
        switch (paramName) {
          case "temperature":
            weatherData.temperature.push({
              time,
              temperature: param.values[0],
            });
            break;
          case "humidity":
            weatherData.humidity.push({ time, humidity: param.values[0] });
            break;
          case "windSpeed":
            weatherData.windSpeed.push({ time, windSpeed: param.values[0] });
            break;
          case "gust":
            weatherData.gust.push({ time, gustSpeed: param.values[0] });
            break;
          case "airPressure":
            weatherData.airPressure.push({ time, pressure: param.values[0] });
            break;
          case "cloudCoverage":
            weatherData.cloudCover.push({ time, cloudCover: param.values[0] });
            break;
          case "precipitation":
            weatherData.precipitation.push({
              time,
              precipitation: param.values[0],
            });
            break;
        }
      }
    }
  }

  return weatherData;
};

export default function useWeather({
  longitude,
  latitude,
}: {
  longitude: string;
  latitude: string;
}) {
  // TODO: Since we're calling useCity here we might as well get the lat/long instead of accepting it as a prop
  const { selectedCity } = useCity();
  const { isPending, error, data, isFetching } = useQuery<SmhiResponse>({
    queryKey: ["weatherData", selectedCity],
    queryFn: async () => {
      const response = await fetch(
        smhiEntryPoint +
          smhiEndpoint +
          `/lon/${longitude}/lat/${latitude}/data.json`
      );
      return await response.json();
    },
    staleTime: 1000 * 60 * 10,
  });

  const weatherData24h = data ? get24hDataPoints(data) : null;

  const isLoading = isPending || isFetching;

  return {
    isLoading,
    error,
    data,
    temperature: weatherData24h?.temperature,
    humidity: weatherData24h?.humidity,
    windSpeed: weatherData24h?.windSpeed,
    gust: weatherData24h?.gust,
    airPressure: weatherData24h?.airPressure,
    cloudCover: weatherData24h?.cloudCover,
    precipitation: weatherData24h?.precipitation,
  };
}
