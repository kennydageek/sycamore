// DynamicFormValidationPlugin.js
export default {
  install(app) {
    app.config.globalProperties.$formValidation = {
      validate: (form, rules) => {
        const errors = {};
        Object.keys(rules).forEach((field) => {
          const rule = rules[field];
          const value = form[field]?.trim?.() || ''; // Handle missing or undefined fields
          if (rule.required && !value) {
            errors[field] = 'This field is required';
          }
          if (rule.minLength && value.length < rule.minLength) {
            errors[field] = `Must be at least ${rule.minLength} characters`;
          }
          if (
            rule.type === 'email' &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ) {
            errors[field] = 'Please enter a valid email address';
          }
          // Add more validation rules as needed
        });
        return errors;
      },
    };
  },
};
