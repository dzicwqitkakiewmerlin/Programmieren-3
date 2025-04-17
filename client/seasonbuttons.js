document.addEventListener('DOMContentLoaded', function () {
    const winter = document.getElementById('winter');
    const spring = document.getElementById('spring');
    const summer = document.getElementById('summer');
    const autumn = document.getElementById('autumn');
    winter.addEventListener('click', wintermode);
    spring.addEventListener('click', springmode);  
    summer.addEventListener('click', summermode);
    autumn.addEventListener('click', autumnmode);
    function wintermode() {
        socket.emit('winter', {}, () => {
            console.log('Winter aktiviert'); // Bestätigung vom Server
        });
    }
    function springmode() {
        socket.emit('spring', {}, () => {
            console.log('Spring aktiviert'); // Bestätigung vom Server
        });
    }
    function summermode() {
        socket.emit('summer', {}, () => {
            console.log('Summer aktiviert'); // Bestätigung vom Server
        });
    }
    function autumnmode() {
        socket.emit('autumn', {}, () => {
            console.log('Autumn aktiviert'); // Bestätigung vom Server
        });
    }

});