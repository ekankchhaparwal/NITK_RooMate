document.querySelector('.login form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from being submitted in the traditional way
    checkPassword2();
  });
  document.querySelector('.signup form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from being submitted in the traditional way
    checkPassword();
  });


  function checkPassword() {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("cnfrm-password").value;
    const message = document.getElementById("message");

    if (password.length === 0) {
        alert("Password cannot be empty!");
        message.textContent = "";
        return;
    }

    if (password === confirmPassword) {
        // Gather form data
        const studentName = document.querySelector("input[name='txt'][placeholder='Student name']").value;
        const studentId = document.querySelector("input[name='txt'][placeholder='Student ID']").value;
        const email = document.querySelector("input[name='email']").value;
        const contactNumber = document.querySelector("input[name='txt'][placeholder='Contact number']").value;
        const gender = document.querySelector("input[name='txt'][placeholder='Gender']").value;

        // Create a JSON object with form data
        const formData = {
            studentName: studentName,
            studentId: studentId,
            email: email,
            contactNumber: contactNumber,
            gender: gender,
            password: password
        };

        // Encode the JSON object as a URL parameter
        const queryParams = new URLSearchParams(formData).toString();

        // Redirect to the next HTML file with URL parameters
        window.location.href = "./screens/RoomDetails.html?" + queryParams;
    } else {
        message.textContent = "Passwords do not match";
    }
}


function saveToLocalStorage() {
    const email = document.getElementById("savedEmail").value;
    const password = document.getElementById("password").value;

    localStorage.setItem("savedEmail", email);
    localStorage.setItem("savedPassword", password);
}

  
  function checkPassword2() {
    const email = document.getElementById("email-id").value;
    const password = document.getElementById("password1").value;
    const message = document.getElementById("message2");
  
    const savedEmail = localStorage.getItem("savedEmail");
    const savedPassword = localStorage.getItem("savedPassword");
  
    if (email.length === 0 || password.length === 0) {
      alert("Email and Password cannot be empty!");
    //   message.textContent = "";
      return;
    }
  
    if (email === savedEmail && password === savedPassword) {
    //   message.textContent = "Email and Password match";
    //   message.style.backgroundColor = "#1dcd59";
    //   alert("Login successful!");
    window.location.href = "../screens/MainPage.html"; // Use assign() method
    } else {
      message.textContent = "Email or Password do not match";
    //   message.style.backgroundColor = "#ff4d4d";
      // Disable the submit button
      document.getElementById("submitBtn2").disabled = true;
    }
  }