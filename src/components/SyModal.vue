<template>
  <transition name="modal-animation">
    <div
      :class="{
        'modal-container': setup.modalActive,
        hidden: !setup.modalActive,
      }"
    >
      <div class="modal-inner-container">
        <div class="modal-inner">
          <div
            class="flex justify-between w-full mb-6"
            v-if="!setup.isVerification"
          >
            <div class="text-NavyBlue-900 lato-semi-bold text-2xl self-center">
              {{ setup.modalTitle }}
            </div>
            <i
              class="bi bi-x text-3xl self-center cursor-pointer"
              @click="closeModal"
            ></i>
          </div>
          <div><slot /></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { watch } from 'vue';
const emit = defineEmits(['closeModal']);

const props = defineProps<{
  setup: {
    modalActive: boolean;
    modalTitle: string;
  };
}>();

const closeModal = () => {
  emit('closeModal');
};

const toggleBodyOverflow = (hide: boolean) => {
  const bodyElement = document?.getElementsByTagName('body')[0];
  if (hide) {
    bodyElement?.classList.add('overflow-hidden');
  } else {
    bodyElement?.classList.remove('overflow-hidden');
  }
};

watch(
  () => props.setup.modalActive,
  (newVal) => {
    toggleBodyOverflow(newVal);
  },
  { immediate: true }
);
</script>

<style lang="css" scoped>
.modal-container {
  position: fixed;
  inset: 0;
  background-color: rgba(58, 50, 56, 0.6);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.modal-inner-container {
  background-color: white;
  border-radius: 16px;
  width: 800px;
  max-width: 635px;
  max-height: 90%;
  overflow-y: auto;
  padding: 24px;
  animation: animateModal 300ms ease-in-out;
}

.modal-inner {
  display: flex;
  flex-direction: column;
}

@keyframes animateModal {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@media (min-width: 768px) {
  .modal-inner-container {
    padding: 48px;
  }
}

@media (max-width: 768px) {
  .modal-inner-container {
    width: 90%;
  }
}
</style>
