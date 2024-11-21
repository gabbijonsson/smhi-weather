import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AvailableCities } from "@/CityDataContext";

export default function CitySelector({
  selectedCity,
  onChange,
}: {
  selectedCity: AvailableCities;
  onChange: (city: AvailableCities) => void;
}) {
  return (
    <Select
      onValueChange={(val: AvailableCities) => onChange(val)}
      defaultValue={selectedCity}
    >
      <SelectTrigger className="w-[180px] mb-6">
        <SelectValue placeholder="Select a city" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="hisingen">Hisingen</SelectItem>
        <SelectItem value="moelndal">Mölndal</SelectItem>
        <SelectItem value="helsingborg">Helsingborg</SelectItem>
        <SelectItem value="haparanda">Haparanda</SelectItem>
      </SelectContent>
    </Select>
  );
}
