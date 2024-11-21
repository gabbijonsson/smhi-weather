import { Thermometer } from "lucide-react";
import { ChartConfig } from "@/components/ui/chart";
import WeatherLineChart from "../charts/WeatherLineChart";
import WeatherCard from "./WeatherCard";
import useWeather from "@/hooks/useWeather";
import { useCity } from "@/CityDataContext";

const chartConfig = {
  value: {
    label: "Temperature",
    color: "#B16872",
  },
} satisfies ChartConfig;

export default function TemperatureCard() {
  const { selectedCityLocation } = useCity();
  const { temperature, isLoading } = useWeather(selectedCityLocation);

  const highestTemperature = temperature?.reduce(
    (max, t) => (t.temperature > max ? t.temperature : max),
    -Infinity
  );
  const lowestTemperature = temperature?.reduce(
    (min, t) => (t.temperature < min ? t.temperature : min),
    Infinity
  );

  return (
    <WeatherCard
      loading={isLoading}
      Icon={() => <Thermometer className="h-4 w-4 text-muted-foreground" />}
      cardTitle="Temperature"
    >
      {temperature ? (
        <WeatherLineChart
          data={temperature}
          chartConfig={chartConfig}
          yAxisLabel="Degrees °C"
          xAxisKey="time"
          yAxisKey="temperature"
          legend="Temperature (°C)"
          domain={[
            lowestTemperature ? Math.round(lowestTemperature / 5) * 5 - 5 : 0,
            highestTemperature ? Math.round(highestTemperature / 5) * 5 + 5 : 0,
          ]}
        />
      ) : // TODO: Should probably show some sort of "no data"-card here
      null}
    </WeatherCard>
  );
}
