document.addEventListener('DOMContentLoaded', () => {
  // Set display_name
  if (!localStorage.getItem('display_name')) {
    console.log("display_name is not set")
    document.getElementById('noDisplayName').style.display = "block";

    // Get new display_name
    document.querySelector('#setDisplayName').onsubmit = () => {
      const display_name = document.querySelector('#displayName').value;
      if ( display_name != '')
        localStorage.setItem('display_name', display_name)
      else
        alert("empty name not allowed")
    }

  } else {
    console.log('display name exists')
    document.getElementById('enterRooms').style.display = "block";
    document.querySelector('#user').innerHTML = localStorage.getItem('display_name');
  }
});
