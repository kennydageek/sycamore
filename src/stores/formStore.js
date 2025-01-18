import { defineStore } from 'pinia';

export const useFormStore = defineStore('formStore', {
  state: () => ({
    formDataList: [], // This will hold an array of form data
  }),

  actions: {
    addFormData(newData) {
      this.formDataList.push({ ...newData }); // Add new form data to the array
    },
    deleteFormData(id) {
      const index = this.formDataList.findIndex((item) => item.id === id);
      if (index !== -1) {
        this.formDataList.splice(index, 1);
      } else {
        console.error('Form data with the given id not found');
      }
    },
    editFormData(updatedData) {
      const index = this.formDataList.findIndex(
        (item) => item.id === updatedData.id
      );
      if (index !== -1) {
        this.formDataList[index] = {
          ...this.formDataList[index],
          ...updatedData,
        };
      } else {
        console.error('Form data with the given id not found');
      }
    },
  },
});
