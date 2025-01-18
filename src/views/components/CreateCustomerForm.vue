<script setup>
import { ref, getCurrentInstance } from 'vue';
import SyInput from '@/components/SyInput.vue';
import SySelect from '@/components/SySelect.vue';
import SyToggle from '@/components/SyToggle.vue';
import SySpinner from '@/components/SySpinner.vue';
import stateList from '@/utils/states.json';
import { component as ckeditor } from '@mayasabha/ckeditor4-vue3';
import { useFormStore } from '@/stores/formStore.js';

const formStore = useFormStore();

const emit = defineEmits(['cancel', 'submitted']);

const form = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  state: '',
  status: 'inactive',
  details: '',
});

const loading = ref(false);

const rules = {
  first_name: { required: true },
  last_name: { required: true },
  email: { required: true, type: 'email' },
  phone: { required: true },
  state: { required: true },
  details: { required: true },
};

const errors = ref({});

const handleIsChecked = (e) => {
  console.log(e);
  e === true
    ? (form.value.status = 'active')
    : (form.value.status = 'inactive');
};

const handleCancelCreateCustomer = () => {
  emit('cancel');
};

const handleUpdateState = (e) => {
  form.value.state = e;
};

const { appContext } = getCurrentInstance();
const $formValidation = appContext.config.globalProperties.$formValidation;

const submitForm = () => {
  loading.value = true;
  // Access the plugin's validation method
  errors.value = $formValidation.validate(form.value, rules);

  if (Object.keys(errors.value).length === 0) {
    // setting timeout to simulate loader
    setTimeout(() => {
      form.value.id = formStore.formDataList.length;
      formStore.addFormData(form.value);
      emit('submitted');
      form.value.state = '';
      form.value = {};

      loading.value = false;
    }, 1500);

    // Proceed with form submission
  } else {
    console.log('Form has errors:', errors.value);
    loading.value = false;
  }
};
</script>

<template>
  <form class="flex flex-col gap-6 mt-5" @submit.prevent="submitForm">
    <div>
      <sy-input
        type="text"
        placeholder="Enter first name"
        label="First Name"
        v-model="form.first_name"
        v-validate="{ required: true, minLength: 2 }"
      />
      <p v-if="errors.first_name" class="text-red-500 mt-1 text-sm">
        {{ errors.first_name }}
      </p>
    </div>
    <div>
      <sy-input
        type="text"
        placeholder="Enter last name"
        label="Last Name"
        v-model="form.last_name"
        v-validate="{ required: true, minLength: 2 }"
      />
      <p v-if="errors.last_name" class="text-red-500 mt-1 text-sm">
        {{ errors.last_name }}
      </p>
    </div>
    <div>
      <sy-input
        type="email"
        placeholder="Enter email"
        label="Email"
        v-model="form.email"
        v-validate="{ required: true, type: 'email' }"
        required
      />
      <p v-if="errors.email" class="text-red-500 mt-1 text-sm">
        {{ errors.email }}
      </p>
    </div>
    <div>
      <sy-input
        type="tel"
        placeholder="Enter phone number"
        label="Phone number"
        v-model="form.phone"
        v-validate="{
          required: true,
          type: 'tel',
          minLength: 7,
          maxLength: 15,
        }"
        required
      />
      <p v-if="errors.first_name" class="text-red-500 mt-1 text-sm">
        {{ errors.phone }}
      </p>
    </div>
    <div>
      <sy-select
        placeholder="Select State"
        label="State"
        v-model="form.state"
        :options="stateList"
        @selected-state="handleUpdateState"
        required
        v-validate="{ required: true }"
      />
      <p v-if="errors.state" class="text-red-500 mt-1 text-sm">
        {{ errors.state }}
      </p>
    </div>
    <div class="flex gap-4">
      <sy-toggle @is-checked="handleIsChecked" />
      <p>Activate Customer</p>
    </div>
    <div>
      <ckeditor v-model="form.details" />
      <p v-if="errors.details" class="text-red-500 mt-1 text-sm">
        {{ errors.details }}
      </p>
    </div>
    <div class="flex gap-10 mt-10">
      <button
        class="bg-[#ccc] hover:bg-gray-400 transition-all text-white py-3 px-3 rounded grow"
        @click.prevent="handleCancelCreateCustomer"
      >
        Cancel
      </button>
      <button
        class="bg-[#1B56DB] hover:bg-blue-950 transition-all text-white py-3 px-3 rounded grow"
      >
        <sy-spinner v-if="loading" />
        <span v-else> Submit</span>
      </button>
    </div>
  </form>
</template>

<style lang="css" scoped></style>
