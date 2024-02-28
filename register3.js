function validateForm() {
    // Get form input values
    const fullName = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const birthDate = document.getElementById('date').value;
    const gender = document.getElementById('gender').value;
    const landSize = document.getElementById('farm').value.trim();
    const contactNumber = document.getElementById('contactNumber').value.trim();
    
    // Validate each field
    if (fullName === '' || email === '' || password === '' || birthDate === '' || gender === '' || landSize === '' || contactNumber === '') {
      alert('Please fill out all fields.');
      return false;
    }

    // Additional validation can be added for specific fields if needed

    // Store data in JavaScript variables (you can modify this as needed)
    const userData = {
      fullName,
      email,
      password,
      birthDate,
      gender,
      landSize,
      contactNumber
    };

    // Print the data to the console (for demonstration purposes)
    console.log(userData);

    // Continue with form submission or further processing
    return true;
  }