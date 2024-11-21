import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TemperatureCard from "./components/cards/TemperatureCard";
import HumidityCard from "./components/cards/HumidityCard";
import WindCard from "./components/cards/WindCard";
import PressureCard from "./components/cards/PressureCard";
import CloudCoverCard from "./components/cards/CloudCoverCard";
import PrecipitationCard from "./components/cards/PrecipitationCard";
import TenDayForecastCard from "./components/cards/TenDayForecastCard";
import CitySelector from "./components/CitySelector";
import { useCity } from "@/CityDataContext";

// TODO: Implement ten day forecast instead of this mock data
const weatherData = {
  tenDayForecast: Array.from({ length: 10 }, (_, i) => ({
    date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toLocaleDateString(
      "en-US",
      { weekday: "short", month: "short", day: "numeric" }
    ),
    tempHigh: Math.round(Math.random() * 15 + 20),
    tempLow: Math.round(Math.random() * 10 + 10),
    precipitation: Math.round(Math.random() * 100),
    windSpeed: Math.round(Math.random() * 30),
  })),
};

export default function Component() {
  const { selectedCity, setSelectedCity } = useCity();

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Wäder</h1>
        {/* TODO: Use the city selection context inside of the component instead of passing it as a prop */}
        <CitySelector selectedCity={selectedCity} onChange={setSelectedCity} />
        <Tabs defaultValue="today" className="mb-6">
          <TabsList>
            <TabsTrigger value="today">Today's Forecast</TabsTrigger>
            <TabsTrigger value="tenDay">10-Day Forecast</TabsTrigger>
          </TabsList>
          <TabsContent value="today">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* TODO: Do I need separate components for these? 🤔 */}
              <TemperatureCard />
              <HumidityCard />
              <WindCard />
              <PressureCard />
              <CloudCoverCard />
              <PrecipitationCard />
            </div>
          </TabsContent>
          <TabsContent value="tenDay">
            <TenDayForecastCard forecast={weatherData.tenDayForecast} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
