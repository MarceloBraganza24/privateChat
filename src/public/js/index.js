// con este socket establecemos la comunicacion con nuestro servidor (handshake)
const socket = io();

Swal.fire({
    title: 'Saludos Lito',
    text: 'Bienvenido al Chat grupal',
    icon: 'success'
});

let user;
const chatBox = document.getElementById('chatBox');
const messageLogs = document.getElementById('messageLogs');

// Modal de autenticacion
Swal.fire({
    title: 'Identificación',
    input: 'text',
    text: 'Ingresa tu nombre de usuario para identificarte en el Chat',
    inputValidator: (value) => {
        if(value !== 'oski91' && value !== 'chinelo736' && value !== 'kenny17' && value !== 'amp18' && value !== 'faso420' && value !== 'jp120' && value !== 'bpc1' && value !== 'lukroque' && value !== 'gustmn' && value !== 'tek21' && value !== 'chinnpal' && value !== 'colox30' && value !== 'nanox777' && value !== 'lucax1400' && value !== 'lescanmmm' && value !== 'monk1200' && value !== 'bark400' && value !== 'marang30' && value !== 'new66') return 'Debes ingresar el nombre correcto!'  
    },
    allowOutsideClick: false,
    allowEscapeKey: false
}).then( result => {
    user = result.value;
    socket.emit('authenticated', user);
});

chatBox.addEventListener('keyup', evt => {
    if(evt.key === 'Enter') {
        if(chatBox.value.trim().length > 0) { // el trim elimina espacios en blanco innecesarios
            socket.emit('message', { user, message: chatBox.value });
            chatBox.value = '';
        }
    }
});

socket.on('messageLogs', data => {
    let messages = '';
    data.forEach(elem => {
        messages += `${elem.user} dice: ${elem.message}<br/>`
    });
    messageLogs.innerHTML = messages;
});

socket.on('newUserConected', data => {
    if(user){
        Swal.fire({
            toast: true, // para mostrar un modal pequeño
            position: 'top-end',
            showConfirmationButton: false,
            timer: 3000,
            title: `${data} se ha unido al chat!`,
            icon: 'success'
        });
    };
});