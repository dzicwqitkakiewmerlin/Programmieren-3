document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('godmode');
    button.addEventListener('click', godmode);
    function godmode() {
      socket.emit('godmode', {});
    }
    });
    