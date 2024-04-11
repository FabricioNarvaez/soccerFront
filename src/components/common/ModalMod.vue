<template>
    <div class="modal" v-if="isModalOpen">
      <modal class="modalContent">
        <p>{{ modalMessage }}</p>
        <button @click="modalFunction">Volver a inicio</button>
      </modal>
    </div>
  </template>
  
  <script setup>
    const props = defineProps({
      modalFunction: Function,
      modalMessage: {
        type: String,
        required: true
      },
      isModalOpen: {
        type: Boolean,
        required: true
      }
    });
  </script>
  
  <style scoped>
    @import "../../assets/css/common/modal.css";
  </style>
  