// const { response } = require("express");

let avaialbleRoomsData = [];
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("booking-form");
    const button = document.getElementById("check-availability-btn");

    button.addEventListener("click", function() {
      // Gather form data
      const formDataObject = {};

    // Access input fields directly and construct JSON object
    formDataObject["building_name"] = document.querySelector("#booking-form input[placeholder='building_name']").value;
    formDataObject["floor"] = document.querySelector("#booking-form input[placeholder='floor']").value;
    formDataObject["room_number"] = document.querySelector("#booking-form input[placeholder='Room number']").value;
    formDataObject["wing"] = document.querySelector("#booking-form input[placeholder='wing']").value;

    // Check if there is any data to send
    if (Object.values(formDataObject).every(value => value.trim() === "")) {
      alert("Please fill out at least one field");
      return;
    }

      console.log(JSON.stringify(formDataObject))
      // Send data to API
      fetch("http://localhost:3000/routes/fetch/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formDataObject)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        renderStudentCards(data);
      })
      .catch(error => {
        console.error("Error:", error);
        // Handle error
      });
    });
  });

function createStudentCard(student) {
    var card = document.createElement('div');
    card.classList.add('student-card');
    
    var description = document.createElement('div');
    description.classList.add('student-description');
    
    var name = document.createElement('h2');
    name.id = 'name';
    name.textContent = student.NAME;
    
    var block = document.createElement('h3');
    block.id = 'block';
    block.textContent = 'Student ID: ' + student.STUDENT_ID;
    
    var contact = document.createElement('h3');
    contact.id = 'contact';
    contact.textContent = 'Contact Info: ' + student.CONTACT_NUMBER;
    
    var detailsButton = document.createElement('button');
    detailsButton.classList.add('details');
    detailsButton.textContent = 'View Details';
    
    
    var swapButton = document.createElement('button');
    swapButton.classList.add('swap');
    swapButton.textContent = 'Room Swap';
    detailsButton.addEventListener('click', function() {
        view(student);
    });

    description.appendChild(name);
    description.appendChild(block);
    description.appendChild(contact);
    
    card.appendChild(description);
    card.appendChild(detailsButton);
    card.appendChild(swapButton);
    
    return card;
}


function renderStudentCards(apiResponse) {
    var container = document.querySelector('.card-container');
    
    // Clear existing cards
    container.innerHTML = '';
    
    // Create and append cards for each student
    apiResponse.forEach(function(student) {
        var card = createStudentCard(student);
        container.appendChild(card);
    });
}

function fetchData() {
    
    fetch('http://localhost:3000/routes/fetch/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            avaialbleRoomsData = data;
            renderStudentCards(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

fetchData();

