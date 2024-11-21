import { Droplets } from "lucide-react";
import { ChartConfig } from "../ui/chart";
import WeatherLineChart from "../charts/WeatherLineChart";
import WeatherCard from "./WeatherCard";
import useWeather from "@/hooks/useWeather";
import { useCity } from "@/CityDataContext";

const chartConfig = {
  value: {
    label: "Temperature",
    color: "#8A68B1",
  },
} satisfies ChartConfig;

export default function PrecipitationCard() {
  const { selectedCityLocation } = useCity();
  // TODO: Handle errors
  const { precipitation, error, isLoading } = useWeather(selectedCityLocation);

  const highestPrecipitation = precipitation?.reduce(
    (max, t) => (t.precipitation > max ? t.precipitation : max),
    -Infinity
  );
  const lowestPrecipitation = precipitation?.reduce(
    (min, t) => (t.precipitation < min ? t.precipitation : min),
    Infinity
  );

  return (
    <WeatherCard
      loading={isLoading}
      Icon={() => <Droplets className="h-4 w-4 text-muted-foreground" />}
      cardTitle="Precipitation"
    >
      {precipitation ? (
        <WeatherLineChart
          data={precipitation}
          yAxisLabel="Precipitation (mm/h)"
          chartConfig={chartConfig}
          xAxisKey="time"
          yAxisKey="precipitation"
          legend="Precipitation (mm/h)"
          domain={[
            lowestPrecipitation
              ? Math.round(lowestPrecipitation / 5) * 5 - 5
              : 0,
            highestPrecipitation
              ? Math.round(highestPrecipitation / 5) * 5 + 5
              : 0,
          ]}
        />
      ) : // TODO: Should probably show some sort of "no data"-card here
      null}
    </WeatherCard>
  );
}
