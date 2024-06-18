document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log('Login bem-sucedido!');
            // Redirecionar para a página principal ou de dashboard
            window.location.href = 'capturarFoto.html';
        })
        .catch((error) => {
            console.error('Erro ao entrar:', error.message);
        });
});
