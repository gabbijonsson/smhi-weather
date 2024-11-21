import {
  LineChart,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { LoaderIcon } from "lucide-react";

export default function TenDayForecastCard({
  forecast,
}: {
  forecast: Array<{
    date: string;
    tempHigh: number;
    tempLow: number;
    precipitation: number;
    windSpeed: number;
  }>;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>10-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        {!forecast ? (
          <LoaderIcon className="animate-spin" />
        ) : (
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forecast}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="temp" />
                <YAxis yAxisId="precip" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="tempHigh"
                  stroke="#ff7300"
                  yAxisId="temp"
                  name="High Temp (°C)"
                />
                <Line
                  type="monotone"
                  dataKey="tempLow"
                  stroke="#0088fe"
                  yAxisId="temp"
                  name="Low Temp (°C)"
                />
                <Line
                  type="monotone"
                  dataKey="precipitation"
                  stroke="#00c49f"
                  yAxisId="precip"
                  name="Precipitation (%)"
                />
                <Line
                  type="monotone"
                  dataKey="windSpeed"
                  stroke="#8884d8"
                  yAxisId="temp"
                  name="Wind Speed (km/h)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
