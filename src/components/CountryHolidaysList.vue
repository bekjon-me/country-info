<script setup lang="ts">
  import { GlobeAltIcon } from "@heroicons/vue/20/solid";
  import type { CountryHoliday } from "@/models/country";
  import countriesService from "@/service/countries-service";
  import { ref, onMounted, computed } from "vue";
  import { useRoute } from "vue-router";
  import AppButton from "./AppButton.vue";

  const { params } = useRoute();
  const loading = ref<boolean>(false);
  const holidays = ref<CountryHoliday[]>([]);
  const years = ref<string[]>([
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
    "2025",
    "2026",
    "2027",
    "2028",
    "2029",
    "2030",
  ]);
  const activeFilter = ref<string>("2024");

  const filteredHolidays = computed(() => {
    return holidays.value.filter((holiday) => {
      const date = new Date(holiday.date);

      return date.getFullYear() === Number(activeFilter.value);
    });
  });

  function setActiveFilter(year: string) {
    activeFilter.value = year;
  }

  async function getHolidays() {
    loading.value = true;
    try {
      const { data } = await countriesService.getCountryHolidays(
        "2024",
        params.id as string,
      );
      holidays.value = data;
    } catch (error) {
      console.error(error);
    }
    loading.value = false;
  }

  onMounted(getHolidays);
</script>

<template>
  <div class="my-4 flex flex-wrap justify-start gap-4">
    <TransitionGroup name="list">
      <AppButton
        v-for="year in years"
        :key="year"
        :variant="year === activeFilter ? 'info' : 'default'"
        @click="setActiveFilter(year)"
      >
        {{ year }}
      </AppButton>
    </TransitionGroup>
  </div>
  <div class="overflow-hidden bg-white shadow sm:rounded-md">
    <ul role="list" class="divide-y divide-gray-200">
      <li v-for="holiday in filteredHolidays" :key="holiday.date">
        <div class="block hover:bg-gray-50">
          <div class="flex items-center px-4 py-4 sm:px-6">
            <div class="flex min-w-0 flex-1 items-center">
              <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                <div>
                  <p class="flex items-center text-sm text-indigo-600">
                    <GlobeAltIcon
                      class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    {{ holiday.name }}
                  </p>
                  <p class="mt-2 flex items-center text-sm text-gray-500">
                    Local name:
                    <span class="ml-2 truncate">{{ holiday.localName }}</span>
                  </p>
                </div>
                <div class="hidden md:block">
                  <div>
                    <p class="text-sm text-gray-900">
                      Date
                      {{ " " }}
                      <time :datetime="holiday.date">{{ holiday.date }}</time>
                    </p>
                    <p class="mt-2 flex items-center text-sm text-gray-500">
                      <span class="mr-2"> Launch year: </span>
                      {{ holiday.launchYear ?? "Unknown" }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style>
  .list-move,
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  .list-leave-active {
    position: absolute;
  }
</style>
