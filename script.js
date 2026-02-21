const nameInput = document.getElementById("name");
const passwordInput = document.getElementById("password");
const countrySelect = document.getElementById("country");
const ageInput = document.getElementById("age");
const genderRadios = document.getElementsByName("gender");
const form = document.querySelector("form");

function validateForm(event) {
  event.preventDefault(); // Prevent form submission for validation
  const name = nameInput.value.trim();
  const password = passwordInput.value.trim();
  const country = countrySelect.value;
  const age = parseInt(ageInput.value);
  const gender = form.elements["gender"].value;
  if (
    name == "" ||
    password == "" ||
    country == "" ||
    isNaN(age) ||
    gender == ""
  ) {
    alert("Please fill in all fields correctly.");
    return false;
  }
  alert("Form submitted successfully!");
}
