import type { AbortablePromise } from "simple-abortable-promise";
import httpClient from "./http-client";
import { COUNTRIES, PUBLIC_HOLIDAYS } from "@/service/endpoints";

class CountriesService {
  countriesUrl: string;
  holidaysUrl: string;
  constructor() {
    this.countriesUrl = COUNTRIES.endsWith("/") ? COUNTRIES : `${COUNTRIES}/`;
    this.holidaysUrl = PUBLIC_HOLIDAYS.endsWith("/")
      ? PUBLIC_HOLIDAYS
      : `${PUBLIC_HOLIDAYS}/`;
  }

  getCountries(): AbortablePromise<any> {
    return httpClient.get(this.countriesUrl);
  }

  getCountryHolidays(year: string, countrCode: string): AbortablePromise<any> {
    return httpClient.get(`${this.holidaysUrl}${year}/${countrCode}`);
  }
}

export default new CountriesService();
