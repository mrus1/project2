document.addEventListener("DOMContentLoaded", () => {

  // Connect to websocket
  var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

  // Variables
  const displayName = localStorage.getItem('display_name')
  const chatbox = document.querySelector('[name="chatbox"]')
  const sendBtn = document.querySelector(".send-button")

  document.querySelector('#display-name').innerHTML = displayName;

  // Default setting for sendBtn button.
  sendBtn.disabled = true;

  // Enable send button only if there is text in the textarea
  chatbox.onkeydown = (e) => {

    if ( chatbox.value.trim().length > 0 ) {
      sendBtn.disabled = false
      // If "enter", emit message

      if (e.keyCode == 13 && !e.shiftKey) {
        e.preventDefault();
        emitMessage(chatbox.value.trim())
      }

    } else {
      sendBtn.disabled = true;
    }

  }

  document.querySelector("#chat-form").onsubmit = () => {

    emitMessage(chatbox.value.trim())
    chatbox.focus()
    return false;
  }

  socket.on('send message', data => {
    const p = document.createElement('p')
    p.innerHTML = data;
    document.querySelector('#messages').append(p)
  })

  function emitMessage(message) {
    const newMessage = message
    clearInput()
    // Emit message
    socket.emit('submit message', {'new-message': newMessage})
    console.log("Message to emit from textarea: " + newMessage)
  }

  function clearInput() {
    chatbox.value = '';
    sendBtn.disabled = true;
  }

});
