// Prompt when user first visits site
if (!localStorage.getItem('display_name')) {
  let getName = window.prompt("Enter your nickname:")
  while (getName == null || getName == "" || !getName.match(/^[0-9a-zA-Z]+$/)){
    getName = window.prompt("Please input alphanumeric characters only (a-zA-Z0-9).")
  }
  localStorage.setItem('display_name', getName)
};


document.addEventListener("DOMContentLoaded", () => {

  // Connect to websocket
  var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

  // Variables
  const display_name = localStorage.getItem('display_name')
  const errorMessage = document.querySelector("#error1")
  const submitButton = document.querySelector("#submit")
  const getChannel = document.querySelector("#get-channel")
  let error1 = false;

  // Show chosen display name on page
  document.querySelector('#display_name').innerHTML = display_name;

  // By default set submit button to disabled and errorMessage to none
  submitButton.disabled = true;
  errorMessage.style.display = "none"

  // Enable button only if there is text in the input field
  getChannel.onkeyup = () => {

    // Set submit button
    getChannel.value.length > 0 ? submitButton.disabled = false : submitButton.disabled = true;

    // Show error message if channel name already exists
    error1 ? errorMessage.style.display = "block" : errorMessage.style.display = "none";

  };

  document.querySelector('#new-channel').onsubmit = () => {

    // New wanted channel name
    const newName = getChannel.value;

    // Clear input field and disable button again
    getChannel.value = '';
    submitButton.disabled = true;

    socket.emit('submit channel', {'channel-name': newName})

    // Stop form from submitting
    return false;
  };

  // When a new channel is created, add it to list of channels
  socket.on('channel name', data => {
    if (data != false) {
      const last = Object.values(data).slice(-1)

      // Create new chanel to show on page
      const a = document.createElement('a')
      a.innerHTML = last;
      a.setAttribute("href", "channel-" + last)

      // Add new channel to channels list
      document.querySelector('#channels').append(a);
      window.location.reload() //Not the best solution =)
      error1 = false;
    } else {
      error1 = true;
    }
  });

});
