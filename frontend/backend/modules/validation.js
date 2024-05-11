const Validation = {
   
    rules: {
        required: value => !!value.trim(),
        alphabetsOnly: value => /^[a-zA-Z]+$/.test(value.trim()),
        emailFormat: value => /\S+@\S+\.\S+/.test(value.trim()),
        ageRange: value => {
            const today = new Date();
            const birthDate = new Date(value);
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                return age - 1;
            }
            return age;
        }
    },

    validateField(value, rules) {
        let errorMessage = '';
        for (const rule of rules) {
            const [ruleName, params] = rule.split(':');
            if (!Validation.rules[ruleName]) continue;
            const isValid = Validation.rules[ruleName](value, params);
            if (!isValid) {
                errorMessage = Validation.errorMessages[ruleName](params);
                break;
            }
        }
        return errorMessage;
    },

    validateForm(formData, validationRules) {
        const errors = {};
        for (const field in formData) {
            if (formData.hasOwnProperty(field) && validationRules[field]) {
                const value = formData[field];
                const fieldRules = validationRules[field];
                const errorMessage = Validation.validateField(value, fieldRules);
                if (errorMessage) {
                    errors[field] = errorMessage;
                }
            }
        }
        return errors;
    },


    errorMessages: {
        required: () => 'This field is required.',
        alphabetsOnly: () => 'This field must contain only alphabets.',
        emailFormat: () => 'Invalid email format.',
        ageRange: () => 'Age must be between 15 and 99.'
    }
};

export default Validation;
