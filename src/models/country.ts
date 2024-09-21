export interface Country {
  countryCode: string;
  name: string;
}

type HolidayType =
  | "Public"
  | "Bank"
  | "School"
  | "Authorities"
  | "Optional"
  | "Observance ";

export interface CountryHoliday {
  date: string;
  localName: string;
  countryCode: string;
  name: string;
  fixed: boolean;
  global: boolean;
  counties: string[];
  launchYear: HolidayType[];
}
