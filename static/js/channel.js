document.addEventListener("DOMContentLoaded", () => {

  // Variables
  const display_name = localStorage.getItem('display_name')

  document.querySelector('#display_name').innerHTML = display_name;
});
