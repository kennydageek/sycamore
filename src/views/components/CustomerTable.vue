<template>
  <div>
    <!-- Table for larger screens -->
    <table class="w-full hidden md:table">
      <thead>
        <tr>
          <th class="text-sm">S/N</th>
          <th class="text-sm">Name</th>
          <th class="text-sm">Email</th>
          <th class="text-sm">Phone number</th>
          <th class="text-sm">State</th>
          <th class="text-sm">Status</th>
          <th class="text-sm">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in props.items" :key="index">
          <td>{{ index + 1 }}</td>

          <td>{{ item.first_name }} {{ item.last_name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.state }}</td>
          <td>
            <p
              :class="
                item.status === 'active' ? 'text-green-500' : 'text-slate-600'
              "
            >
              {{ item.status }}
            </p>
          </td>
          <td>
            <div class="flex justify-center gap-4">
              <i
                class="bi bi-eye cursor-pointer"
                @click="handleSelectItem(item, 'view')"
              ></i>
              <i
                class="bi bi-pen cursor-pointer"
                @click="handleSelectItem(item, 'edit')"
              ></i>
              <i
                class="bi bi-trash cursor-pointer text-red-600"
                @click="handleDeleteSelected(item)"
              ></i>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Card format for smaller screens -->
    <div class="flex flex-col gap-4 md:hidden">
      <div
        v-for="(item, index) in props.items"
        :key="index"
        class="border p-4 rounded-lg shadow-sm mb-4"
      >
        <p class="text-sm font-medium hidden">S/N: {{ index + 1 }}</p>
        <div class="items-center gap-2 hidden">
          <span class="text-sm">Select</span>
        </div>
        <p class="text-sm font-medium">
          Name: {{ item.first_name }} {{ item.last_name }}
        </p>
        <p class="text-sm">Email: {{ item.email }}</p>
        <p class="text-sm">Phone: {{ item.phone }}</p>
        <p class="text-sm">State: {{ item.state }}</p>
        <p
          class="text-sm"
          :class="
            item.status === 'active' ? 'text-green-500' : 'text-slate-600'
          "
        >
          Status: {{ item.status }}
        </p>
        <div class="flex justify-start gap-4 mt-2">
          <i
            class="bi bi-eye cursor-pointer"
            @click="handleSelectItem(item, 'view')"
          ></i>
          <i
            class="bi bi-pen cursor-pointer"
            @click="handleSelectItem(item, 'edit')"
          ></i>
          <i
            class="bi bi-trash cursor-pointer text-red-600"
            @click="handleDeleteSelected(item)"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomerTable',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },

  setup(props, { emit }) {
    console.log(props);

    const handleDeleteSelected = (item) => {
      emit('delete-selected', item);
    };

    const handleSelectItem = (item, action) => {
      emit('selected', { item, action });
    };

    return {
      props,
      handleDeleteSelected,
      handleSelectItem,
    };
  },
};
</script>

<style scoped>
/* Base styles for table */
th,
td {
  padding: 12px;
  text-align: center;
}

td {
  padding: 0 16px 0 16px;
  height: 72px;
  font-size: 14px;
  color: #344054;
}

th {
  background-color: #f3f5f5;
  padding: 16px 8px;
  font-size: 14px;
  color: #a0a4ae;
  font-weight: 700;
}

tr {
  padding: 20px;
  margin-top: 16px;
  cursor: pointer;
  transition: background-color 0.4s ease;
}

tr:hover {
  background-color: #f3f5f5;
}

/* Styles for cards */
@media (max-width: 768px) {
  .md\:table {
    display: none;
  }

  .md\:hidden {
    display: block;
  }

  .rounded-lg {
    border-radius: 8px;
  }

  .shadow-sm {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
}
</style>
