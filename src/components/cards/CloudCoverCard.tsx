import { Cloud } from "lucide-react";
import WeatherBarChart from "../charts/WeatherBarChart";
import WeatherCard from "./WeatherCard";
import useWeather from "@/hooks/useWeather";
import { useCity } from "@/CityDataContext";

export default function CloudCoverCard() {
  const { selectedCityLocation } = useCity();
  const { cloudCover, isLoading } = useWeather(selectedCityLocation);

  return (
    <WeatherCard
      loading={isLoading}
      cardTitle="Cloud Cover"
      Icon={() => <Cloud className="h-4 w-4 text-muted-foreground" />}
    >
      {cloudCover ? (
        <WeatherBarChart
          data={cloudCover}
          yAxisLabel="Cloud Cover (%)"
          xAxisKey="time"
          yAxisKey="cloudCover"
          barColor="#CA828A"
          domain={[0, 100]}
        />
      ) : // TODO: Should probably show some sort of "no data"-card here
      null}
    </WeatherCard>
  );
}
