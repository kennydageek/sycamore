<script setup>
import CustomerTable from '@/views/components/CustomerTable.vue';
import SyModal from '@/components/SyModal.vue';
import SySpinner from '@/components/SySpinner.vue';
import CreateCustomerForm from './components/CreateCustomerForm.vue';
import CustomerDetails from './components/CustomerDetails.vue';
import EditCustomer from './components/EditCustomer.vue';
import { ref, computed } from 'vue';
import { useFormStore } from '@/stores/formStore.js';

const formStore = useFormStore();

const customerData = ref(formStore.formDataList);

const showCreateCustomerModal = ref(false);
const showDeleteModal = ref(false);
const showViewModal = ref(false);
const showEditModal = ref(false);

const selectedCustomer = ref({});
const loading = ref(false);

const handleDeleteCustomer = () => {
  loading.value = true;

  setTimeout(() => {
    formStore.deleteFormData(selectedCustomer.value.id);

    loading.value = false;
    showDeleteModal.value = false;
  }, 500);
};

const displayDeleteModal = (e) => {
  selectedCustomer.value = e;
  showDeleteModal.value = true;
};

const handleSelectedCustomer = (e) => {
  selectedCustomer.value = e.item;
  if (e.action === 'view') {
    showViewModal.value = true;
  }

  if (e.action === 'edit') {
    showEditModal.value = true;
  }
};

const searchQuery = ref('');
const statusFilter = ref('');

const filteredCustomerData = computed(() => {
  let filteredData = customerData.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filteredData = filteredData.filter((customer) => {
      return (
        customer.first_name.toLowerCase().includes(query) ||
        customer.last_name.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.phone.includes(query)
      );
    });
  }

  if (statusFilter.value) {
    filteredData = filteredData.filter(
      (customer) => customer.status.toLowerCase() === statusFilter.value
    );
  }

  return filteredData;
});
</script>

<template>
  <main
    class="h-[90vh] md:bg-[#f3f5f5] flex flex-col justify-center items-center"
  >
    <div
      class="rounded w-full md:w-3/4 bg-white p-5 md:border border-[#f3f5f5]"
    >
      <div class="">
        <img src="@/assets/images/logo.png" class="w-40" alt="" />
      </div>

      <hr class="mt-5 border-t border-[#f3f5f5]" />

      <div class="mt-5 flex flex-col md:flex-row gap-5 justify-between">
        <button
          class="bg-[#1B56DB] hover:bg-blue-950 transition-all text-white flex justify-center py-2 px-3 rounded"
          @click="showCreateCustomerModal = true"
        >
          <i class="bi bi-plus text-2xl text-white"></i>
          <span class="self-center">Add new customer</span>
        </button>
        <div class="md:w-[500px] flex flex-col md:flex-row gap-5">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search by name, email, phone"
            class="border border-[#f3f5f5] p-2 rounded grow"
          />
          <select
            v-model="statusFilter"
            class="border border-[#f3f5f5] p-2 rounded"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
      <div class="mt-5" v-if="filteredCustomerData.length > 0">
        <customer-table
          :items="filteredCustomerData"
          @delete-selected="displayDeleteModal"
          @selected="handleSelectedCustomer"
        />
      </div>
      <div v-else class="mt-5">
        <p class="text-2xl text-center">You do not have any data to display</p>
      </div>
    </div>
    <footer class="mt-5">
      Inspiration from
      <a
        href="https://dribbble.com/shots/21735871-User-management-table"
        class="underline"
        target="_blank"
        >Dribbble</a
      >
    </footer>
  </main>

  <sy-modal
    @close-modal="showCreateCustomerModal = false"
    :setup="{
      modalActive: showCreateCustomerModal,
      modalTitle: 'Create Customer',
      isVerification: false,
    }"
  >
    <create-customer-form
      @cancel="showCreateCustomerModal = false"
      @submitted="showCreateCustomerModal = false"
    />
  </sy-modal>

  <sy-modal
    @close-modal="showViewModal = false"
    :setup="{
      modalActive: showViewModal,
      modalTitle: 'Customer details',
    }"
  >
    <customer-details :details="selectedCustomer" />
  </sy-modal>

  <sy-modal
    @close-modal="showEditModal = false"
    :setup="{
      modalActive: showEditModal,
      modalTitle: 'Edit Customer',
    }"
  >
    <edit-customer
      :customer="selectedCustomer"
      @cancel="showEditModal = false"
      @submitted="showEditModal = false"
    />
  </sy-modal>

  <sy-modal
    @close-modal="showDeleteModal = false"
    :setup="{
      modalActive: showDeleteModal,
      modalTitle: 'Delete Customer',
    }"
  >
    <div class="flex flex-col items-center">
      <div class="text-center">
        <p class="">
          Are you sure you want to delete {{ selectedCustomer.first_name }}
          {{ selectedCustomer.last_name }}
        </p>
      </div>
    </div>

    <div class="flex justify-between gap-4 mt-6">
      <button
        class="bg-[#1b56db] grow transition-all text-white py-2 px-3 rounded"
        @click="showDeleteModal = false"
      >
        No
      </button>
      <button
        class="bg-blue-950 grow hover:bg-blue-950 transition-all text-white py-2 px-3 rounded"
        @click="handleDeleteCustomer"
      >
        <sy-spinner v-if="loading" />
        <p v-else>Yes</p>
      </button>
    </div>
  </sy-modal>
</template>
