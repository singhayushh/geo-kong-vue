<template>
  <div class="md:order-1 mb-4 flex flex-col justify-center  w-full items-stretch">
    <!-- Toggle Switch -->
    <label
   for="toggleTwo"
   class="flex items-center cursor-pointer select-none text-blue-500"
   >
   <div class="relative">
      <input
         type="checkbox"
         id="toggleTwo"
         class="peer sr-only"
         v-model="formEnabled"
         />
      <div
         class="block h-8 rounded-full bg-blue-100 w-14 peer-checked:bg-blue-500"
         ></div>
      <div
         class="absolute w-6 h-6 transition bg-white rounded-full dot left-1 top-1 peer-checked:translate-x-full peer-checked:bg-blue-100"
         ></div>
   </div>
   <div class="text-blue font-semibold ml-4">
    Geo country access
   </div>
</label>
<span class="text-zinc-800 text-sm mt-2">Specify the countries to be blacklisted or whitelisted</span>

    <!-- Form Content -->
    <form @submit.prevent="handleSubmit" class="mt-6">
      <!-- Mode Dropdown -->
      <div class="mb-4">
        <label for="mode" class="block text-md font-semibold text-blue-500 mb-2">Mode</label>
        <fieldset>
          <div class="relative border border-zinc-200 text-zinc-800 bg-white shadow-sm">
            <select v-model="selectedMode" id="mode" name="mode" class="form-select appearance-none w-full py-1 px-2 bg-white border-0 focus-visible:outline-zinc-200" :disabled="!formEnabled" required>
              <option value="Blacklist">Blacklist</option>
              <option value="Whitelist">Whitelist</option>
            </select>
            <div class="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700">
                <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
          </div>
        </fieldset>
      </div>

      <!-- Country Multiselect -->
      <div class="mb-4 mt-6">
        <label for="countries" class="block text-sm font-medium text-gray-700 mb-4">
          {{ countriesLabel }}
        </label>
        <fieldset>
          <div class="relative border border-zinc-200 text-zinc-800 bg-white shadow-sm">
            <multiselect
              v-model="selectedCountries"
              :options="options"
              :multiple="true"
              :allow-empty="false"
              :taggable="true"
              :disabled="!formEnabled"
              style="max-height: 200px; overflow-y: auto; position: absolute; z-index: 1000;"
              placeholder="Select list of countries"
              class="form-select custom-multiselect appearance-none w-full py-1 px-2 bg-white border-0 focus-visible:outline-zinc-200 placeholder:text-zinc-300"
            ></multiselect>
            <div class="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700">
                <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
          </div>
        </fieldset>
        
      </div>

      <!-- Submit and Reset Buttons -->
      <div class="flex space-x-4 mt-16">
        <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded disabled:cursor-not-allowed" :disabled="!formEnabled">Submit</button>
        <button type="button" @click="resetForm" class="bg-gray-300 text-gray-700 py-2 px-4 rounded disabled:cursor-not-allowed" :disabled="!formEnabled">Reset</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { fetchCountryList } from '../../api/countryApi';
import { updateGeoKongSettings } from "../../api/geoKongApi";
import Multiselect from 'vue-multiselect';

export default {
  name: 'HomeForm',
  components: {
    Multiselect,
  },
  setup() {
    const formEnabled = ref(true);
    const selectedMode = ref(null);
    const selectedCountries = ref([]);

    const handleSubmit = async () => {
      if (selectedMode.value && selectedCountries.value.length > 0) {
          // Call the API function
          await updateGeoKongSettings({ mode: (selectedMode.value as any).toString().toLowerCase(), selectedCountries: selectedCountries.value });

          // Optionally, you can reset the form after a successful submission
          resetForm();

          // Log a success message or perform other actions as needed
          console.log('Form submitted successfully');
        } else {
          // Handle the case where mode or selectedCountries are not selected
          console.warn('Please select mode and at least one country');
        }
    };

    const resetForm = () => {
      // Reset form values
      selectedMode.value = null;
      selectedCountries.value = [];
    };

    return {
      formEnabled,
      selectedMode,
      selectedCountries,
      handleSubmit,
      resetForm,
    };
  },
  data() {
    return {
      options: [], // This will be populated with API data
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetchCountryList();
        this.options = response;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  },
  computed: {
    countriesLabel() {
      return this.selectedMode === 'Blacklist'
        ? 'The Countries selected below are blocked access to your domain.'
        : 'The Countries selected below are the only countries allowed to access your domain.';
    },
  },
};
</script>

<style scoped>
.form-toggle {
  /* appearance: none; */
  width: 1.5rem;
  height: 0.75rem;
  background: #ddd;
  outline: none;
  border-radius: 1rem;
  position: relative;
  cursor: pointer;
}

.form-toggle:checked {
  background: #4caf50;
}

.form-toggle:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 1.5rem;
  height: 1.5rem;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
  transform: scale(1.1);
  transition: transform 0.3s;
}

.form-toggle:checked:before {
  left: calc(100% - 1.5rem);
  transform: translateX(-100%);
}

.custom-multiselect .multiselect__content-wrapper {
  max-height: 200px; /* Set a maximum height */
  overflow-y: auto;  /* Add a vertical scrollbar if needed */
  border: 1px solid #ddd; /* Add a border */
}

.multiselect__tag {
  margin-right: 1rem !important;
}
</style>
