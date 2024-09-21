<script setup lang="ts">
  import type { Country } from "@/models/country";
  import countriesService from "@/service/countries-service";
  import { ref, onMounted, computed } from "vue";
  import RandomCountries from "@/components/RandomCountries.vue";
  import AppSpinner from "@/components/AppSpinner.vue";

  const countries = ref<Country[]>([]);
  const loading = ref<boolean>(false);
  const randomCountries = ref<Country[]>([]);
  const query = ref<string>("");

  const filteredCountries = computed(() => {
    if (!query.value) {
      return countries.value;
    }

    return countries.value.filter((country) =>
      country.name.toLowerCase().includes(query.value.toLowerCase()),
    );
  });

  async function getCountries() {
    loading.value = true;
    try {
      const { data } = await countriesService.getCountries();
      countries.value = data;
      randomCountries.value = selectRandom3Countries();
    } catch (error) {
      console.error(error);
    }
    loading.value = false;
  }

  function selectRandom3Countries() {
    const randomCountries = countries.value
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    return randomCountries;
  }

  onMounted(getCountries);
</script>

<template>
  <div class="mb-1.5 flex flex-col items-start justify-start last:mb-0">
    <label class="mb-1 block text-sm font-bold text-neutral-700" for="input_0">
      Search country
    </label>
    <div
      class="flex w-full items-center rounded border border-neutral-400 bg-white px-3 py-2 text-base shadow focus-within:!border-blue-500 focus-within:ring-1 focus-within:!ring-blue-500 group-[]/multistep:shadow-none group-[]/repeater:shadow-none group-data-[disabled]:!cursor-not-allowed group-data-[invalid]:border-red-500 group-data-[disabled]:bg-neutral-100 group-data-[invalid]:ring-1 group-data-[invalid]:ring-red-500 dark:group-data-[invalid]:ring-red-500"
    >
      <input
        v-model="query"
        placeholder="Search..."
        class="group-data-[has-overlay]:selection:!text-transparentdark:[color-scheme:dark] min-h-[1.5em] min-w-0 grow appearance-none border-none bg-transparent p-0 text-base text-neutral-700 outline-none [color-scheme:light] selection:bg-blue-100 selection:text-neutral-700 placeholder:text-neutral-400 focus:ring-0 group-data-[disabled]:!cursor-not-allowed"
        type="search"
        name="search_1"
      />
    </div>
  </div>
  <RandomCountries v-if="countries.length" :countries="randomCountries" />
  <ul
    v-if="filteredCountries.length"
    role="list"
    class="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
  >
    <li
      v-for="country in filteredCountries"
      :key="country.name"
      class="col-span-1 cursor-pointer divide-y divide-gray-200 rounded-lg bg-white shadow"
    >
      <RouterLink :to="`/country/${country.countryCode}`">
        <div class="flex w-full items-center justify-between space-x-6 p-6">
          <div class="flex-1 truncate">
            <div class="flex items-center space-x-3">
              <h3 class="truncate text-sm font-medium text-gray-900">
                {{ country.name }}
              </h3>
              <span
                class="inline-block shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800"
                >{{ country.countryCode }}</span
              >
            </div>
          </div>
        </div>
      </RouterLink>
    </li>
  </ul>
  <div v-else class="flex items-center justify-center">
    <AppSpinner v-if="loading" />
  </div>
</template>
