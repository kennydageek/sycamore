<template>
  <div>
    <div class="flex flex-col gap-2">
      <p>First Name: {{ details.first_name }}</p>
      <p>Last Name: {{ details.last_name }}</p>
    </div>

    <div class="flex flex-col gap-2 mt-5">
      <p>Email: {{ details.email }}</p>
      <p>Phone: {{ details.phone }}</p>
    </div>
    <div class="flex flex-col gap-2 mt-5">
      <p>State: {{ details.state }}</p>
      <p>
        Status:
        <span :class="details.status === 'active' ? 'text-green-600' : ''">{{
          details.status
        }}</span>
      </p>
    </div>
    <div class="flex flex-col gap-2 mt-5">
      <p>Details</p>
      <div v-html="details.details"></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  details: {
    type: Object,
    default: () => {},
  },
});
</script>

<style lang="scss" scoped></style>
