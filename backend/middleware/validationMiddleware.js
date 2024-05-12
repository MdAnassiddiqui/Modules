
function validateFirstName(firstName) {
    if (!firstName) {
        return "First name is required";
    }
    if (!/^[a-zA-Z]+$/.test(firstName)) {
        return "First name must contain only alphabets";
    }
    return null; 
}


function validateLastName(lastName) {
    if (!lastName) {
        return "Last name is required";
    }
    if (!/^[a-zA-Z]+$/.test(lastName)) {
        return "Last name must contain only alphabets";
    }
    return null;
}


function validateEmail(email) {
    if (!email) {
        return "Email is required";
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        return "Invalid email format";
    }
    return null; 
}


function validateGender(gender) {
    if (!gender) {
        return "Gender is required";
    }
    return null; 
}


function validateDOB(dob) {
    if (!dob) {
        return "Date of Birth is required";
    }
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    if (age < 15 || age >= 99) {
        return "Age must be between 15 and 99";
    }
    return null; 
}

function validateUserInput(req, res, next) {
    const { firstName, lastName, email, country, state, city, gender, dob } = req.body;

    const errors = [];

   
    const firstNameError = validateFirstName(firstName);
    if (firstNameError) {
        errors.push(firstNameError);
    }

    const lastNameError = validateLastName(lastName);
    if (lastNameError) {
        errors.push(lastNameError);
    }

    const emailError = validateEmail(email);
    if (emailError) {
        errors.push(emailError);
    }

    const genderError = validateGender(gender);
    if (genderError) {
        errors.push(genderError);
    }

    const dobError = validateDOB(dob);
    if (dobError) {
        errors.push(dobError);
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
}

module.exports = { validateUserInput };
