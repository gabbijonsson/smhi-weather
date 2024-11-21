import { Gauge } from "lucide-react";
import { ChartConfig } from "../ui/chart";
import WeatherLineChart from "../charts/WeatherLineChart";
import WeatherCard from "./WeatherCard";
import useWeather from "@/hooks/useWeather";
import { useCity } from "@/CityDataContext";

const chartConfig = {
  value: {
    label: "Pressure",
    color: "#68B168",
  },
} satisfies ChartConfig;

/**
 * "Normal" air pressure at sea level is around 1013 hPa.
 * Therefore, the domain is set to 950-1050 hPa.
 */
export default function PressureCard() {
  const { selectedCityLocation } = useCity();
  const { airPressure, isLoading } = useWeather(selectedCityLocation);

  return (
    <WeatherCard
      loading={isLoading}
      Icon={() => <Gauge className="h-4 w-4 text-muted-foreground" />}
      cardTitle="Air Pressure"
    >
      {airPressure ? (
        <WeatherLineChart
          data={airPressure}
          yAxisLabel="Pressure (hPa)"
          chartConfig={chartConfig}
          xAxisKey="time"
          yAxisKey="pressure"
          legend="Pressure (hPa)"
          domain={[950, 1050]}
        />
      ) : // TODO: Should probably show some sort of "no data"-card here
      null}
    </WeatherCard>
  );
}
