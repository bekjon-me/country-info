<script setup lang="ts">
  import { Country, CountryHoliday } from "@/models/country";
  import countriesService from "@/service/countries-service";
  import { defineProps, onMounted, ref } from "vue";
  import AppSpinner from "./AppSpinner.vue";

  interface Props {
    countries: Country[];
  }

  const props = defineProps<Props>();

  const loading = ref<boolean>(false);
  const holidays = ref<CountryHoliday[]>([]);

  async function getHolidays() {
    loading.value = true;
    for (let i = 0; i < props.countries.length; i++) {
      try {
        const { data } = await countriesService.getCountryHolidays(
          "2024",
          props.countries[i].countryCode,
        );
        const holiday = addNextHoliday(data);
        if (holiday) {
          holidays.value.push(holiday);
        }
      } catch (error) {
        console.error(error);
      }
    }
    loading.value = false;
  }

  function addNextHoliday(holidays: CountryHoliday[]) {
    const date = new Date();
    return holidays.find((holiday) => {
      const holidayDate = new Date(holiday.date);
      if (holidayDate >= date) {
        return true;
      }
    });
  }

  function getCountryName(countryCode: string) {
    return props.countries.find(
      (country) => country.countryCode === countryCode,
    )?.name;
  }

  onMounted(getHolidays);
</script>

<template>
  <div>
    <h3 class="my-2 text-lg font-bold leading-6 text-gray-900">
      Random holidays
    </h3>
    <ul
      v-if="holidays.length"
      role="list"
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <li
        v-for="holiday in holidays"
        :key="holiday.date"
        class="col-span-1 divide-y divide-gray-200 rounded-lg bg-blue-400 shadow"
      >
        <div class="flex w-full items-center justify-between space-x-6 p-6">
          <div class="flex-1 truncate">
            <div class="flex items-center space-x-3">
              <h3 class="truncate text-sm font-medium text-white">
                {{ holiday.name }}
              </h3>
              <span
                class="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800"
                >{{ getCountryName(holiday.countryCode) }}</span
              >
            </div>
            <p class="mt-1 truncate text-sm text-gray-100">
              Date:
              {{ " " }}
              {{ holiday.date }}
            </p>
          </div>
        </div>
      </li>
    </ul>
    <div v-else class="flex items-center justify-center">
      <AppSpinner v-if="loading" />
    </div>
  </div>
</template>
