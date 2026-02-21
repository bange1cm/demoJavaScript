const button = document.getElementById("btn");
const title = document.getElementById("title");
const changingButton = document.getElementById("changing");

button.addEventListener("click", function () {
  title.textContent = "You clicked the button!";
});
