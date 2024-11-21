import { LoaderIcon } from "lucide-react";
import { ComponentType, PropsWithChildren } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

type WeatherCardProps = {
  cardTitle: string;
  loading: boolean;
  Icon: ComponentType;
};

export default function WeatherCard({
  cardTitle,
  loading,
  Icon,
  children,
}: PropsWithChildren<WeatherCardProps>) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{cardTitle}</CardTitle>
        <Icon />
      </CardHeader>
      <CardContent className="w-full h-3/4">
        {loading ? (
          <div className="w-full h-full flex flex-row items-center justify-center">
            <LoaderIcon className="animate-spin" />
          </div>
        ) : (
          children
        )}
      </CardContent>
    </Card>
  );
}
