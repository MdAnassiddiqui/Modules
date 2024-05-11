import Validation from './backend/modules/validation.js';
import DataHandler from './backend/modules/dataHandler.js';

document.addEventListener("DOMContentLoaded", () => {
   
    fetchCountries();

   
    document.getElementById("country").addEventListener("change", fetchStates);

    document.getElementById("state").addEventListener("change", fetchCities);

   
    document.getElementById("userForm").addEventListener("submit", submitForm);
});


function fetchCountries() {
  
    fetch("http://localhost:3000/api/countries")
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch countries');
            }
            return response.json();
        })
        .then(countries => {
           
            const countryDropdown = document.getElementById("country");
            countryDropdown.innerHTML = "<option value=''>Select Country</option>";
            countries.forEach(country => {
                const option = document.createElement("option");
                option.text = country.name;
                option.value = country.code;
                countryDropdown.appendChild(option);
            });
        })
        .catch(error => console.error("Error fetching countries:", error));
}



function fetchStates() {
   
    const country = document.getElementById("country").value;
    
    const stateDropdown = document.getElementById("state");
  
    
    
    stateDropdown.innerHTML = "<option value=''>Select State</option>";

    fetch(`http://localhost:3000/api/states?country=${country}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch states');
            }
            return response.json();
        })
        .then(statesData => {
            console.log("Raw response from server:", statesData); 

            // Check if the response is an array of states
            if (Array.isArray(statesData)) {
                if (statesData.length === 0) {
                    console.log("No states found for the selected country.");
                } else {
                    statesData.forEach(state => {
                        const option = document.createElement("option");
                        option.text = state.name;
                        option.value = state.name; 
                        stateDropdown.appendChild(option);
                    });
                }
            } else {
                console.log("Invalid response from server.");
            }
        })
        .catch(error => console.error("Error fetching states:", error.message)); 
}  


function fetchCities() {
   
    const state = document.getElementById("state").value;
    const cityDropdown = document.getElementById("city");

    cityDropdown.innerHTML = "<option value=''>Select City</option>";

    fetch(`http://localhost:3000/api/cities?state=${state}`)
        .then(response => response.json())
        .then(cities => {
           
            cities.forEach(city => {
                const option = document.createElement("option");
                option.text = city.name;
                option.value = city.name;
                cityDropdown.appendChild(option);
            });
        })
        .catch(error => console.error("Error fetching cities:", error));
}



function submitForm(event) {
    event.preventDefault(); 

   
    if (Validation.validateForm()) {
       
        const formData = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            email: document.getElementById("email").value,
            country: document.getElementById("country").value,
            state: document.getElementById("state").value,
            city: document.getElementById("city").value,
            gender: document.querySelector("input[name='gender']:checked").value,
            dob: document.getElementById("dob").value
        };

        DataHandler.saveUserData(formData)
            .then(() => {
                
                console.log("User data saved successfully");
                
                window.location.href = "/success.html"; 
            })
            .catch(error => {
               
                console.error("Error saving user data:", error);
                
                const errorDiv = document.getElementById("errorMessages");
                errorDiv.innerHTML = "<p>An error occurred while saving your data. Please try again later.</p>";
            });
    }
}
