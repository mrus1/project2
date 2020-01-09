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

  // Connect to websocket
  var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

  const display_name = localStorage.getItem('display_name')

  document.querySelector('#display_name').innerHTML = display_name;

  // When connected Create channel
  socket.on('connect', () => {

    // By default, submit button is disabled
    document.querySelector('#submit').disabled = true;

    // Enable button only if there is text in the input field
    document.querySelector('#get-channel').onkeyup = () => {
      if (document.querySelector('#get-channel').value.length > 0) {
        document.querySelector('#submit').disabled = false;
      } else {
        document.querySelector('#submit').disabled = true;
      }
    };


    document.querySelector('#new-channel').onsubmit = () => {
      // TODO: If channel name already exists

      // New wanted channel name
      const newName = document.querySelector('#get-channel').value;

      // Clear input field and disable button again
      document.querySelector('#get-channel').value = '';
      document.querySelector('#submit').disabled = true;

      socket.emit('submit channel', {'channel-name': newName});

      // Stop form from submitting
      return false;
    };
  });

  // When a new channel is created, add it to list of channels
  socket.on('channel name', data => {
    const last = Object.values(data).slice(-1)

    if ( Object.values(data).slice(0, -1).find(e => e == last) ) {
      return 0;
    } else {
      // Create new chanel to show on page
      const li = document.createElement('li');
      li.innerHTML = last;

      // Add new channel to channels list
      document.querySelector('#channels').append(li);
    }

  });

});
