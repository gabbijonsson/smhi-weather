import { Droplets } from "lucide-react";
import WeatherBarChart from "../charts/WeatherBarChart";
import WeatherCard from "./WeatherCard";
import { useCity } from "@/CityDataContext";
import useWeather from "@/hooks/useWeather";

export default function HumidityCard() {
  const { selectedCityLocation } = useCity();
  // TODO: Handle errors
  const { humidity, error, isLoading } = useWeather(selectedCityLocation);

  return (
    <WeatherCard
      loading={isLoading}
      Icon={() => <Droplets className="h-4 w-4 text-muted-foreground" />}
      cardTitle="Relative Humidity"
    >
      {humidity ? (
        <WeatherBarChart
          data={humidity}
          yAxisLabel="Humidity (%)"
          xAxisKey="time"
          yAxisKey="humidity"
          barColor="#76B4CE"
          domain={[0, 100]}
        />
      ) : // TODO: Should probably show some sort of "no data"-card here
      null}
    </WeatherCard>
  );
}
