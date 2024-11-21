import { createContext, useContext, useState, ReactNode } from "react";

export type AvailableCities = keyof typeof cityMap;

// TODO: Do we need to change city? Would be nice with Hisingen, Sundbyberg and Mölndal maybe?
const cityMap = {
  hisingen: { longitude: "12", latitude: "58" },
  moelndal: { longitude: "12", latitude: "57" },
  helsingborg: { longitude: "12", latitude: "56" },
  haparanda: { longitude: "24", latitude: "65" },
} as const;

type CityContextProps = {
  selectedCity: AvailableCities;
  setSelectedCity: (city: AvailableCities) => void;
  selectedCityLocation: { longitude: string; latitude: string };
};

const CityContext = createContext<CityContextProps | undefined>(undefined);

export const CityProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCity, setSelectedCity] = useState<AvailableCities>("hisingen");

  const selectedCityLocation = cityMap[selectedCity];

  return (
    <CityContext.Provider
      value={{ selectedCity, setSelectedCity, selectedCityLocation }}
    >
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error("useCity must be used within a CityProvider");
  }
  return context;
};
