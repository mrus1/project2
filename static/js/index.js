// Prompt when user first visits
if (!localStorage.getItem('display_name')) {
  let getName = window.prompt("Enter your nickname:")
  while (getName == null || getName == "" || !getName.match(/^[0-9a-zA-Z]+$/)){
    getName = window.prompt("Please input alphanumeric characters only (a-zA-Z0-9).")
  }
  localStorage.setItem('display_name', getName)
};

// Set display name globaly
document.addEventListener("DOMContentLoaded", () => {
  const display_name = localStorage.getItem('display_name')

  document.querySelector('#display_name').innerHTML = display_name;
});
