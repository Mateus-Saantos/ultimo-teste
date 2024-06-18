const firebaseConfig = {
  apiKey: "AIzaSyDsi3quAxlYIL4HKpijhj8e0qCclPXPuVo",
  authDomain: "github-c0ac9.firebaseapp.com",
  databaseURL: "https://github-c0ac9-default-rtdb.firebaseio.com",
  projectId: "github-c0ac9",
  storageBucket: "github-c0ac9.appspot.com",
  messagingSenderId: "886174193200",
  appId: "1:886174193200:web:3b831982fdd395b301fff5",
  measurementId: "G-C3Q3NWY5JS"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('capture-btn');
const constraints = { video: true };

// Acessar a webcam do dispositivo
async function initCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
    } catch (err) {
        console.error('Erro ao acessar a webcam:', err);
    }
}

// Capturar imagem, horário e localização
async function captureData() {
    // Capturar imagem
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/png');

    // Obter o horário atual
    const now = new Date();
    const time = now.toLocaleTimeString();

    // Obter a localização atual
    let location = 'Geolocalização não suportada';
    if (navigator.geolocation) {
        location = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const long = position.coords.longitude;
                resolve(`Latitude ${lat}, Longitude ${long}`);
            }, (err) => {
                reject('Erro ao obter a localização: ' + err.message);
            });
        });
    }

    // Exibir dados capturados
    document.getElementById('time').innerText = 'Horário atual: ' + time;
    document.getElementById('location').innerText = 'Localização atual: ' + location;

    // Enviar dados para o Firebase
    const newDataRef = database.ref('users').push();
    newDataRef.set({
        image: imageData,
        time: time,
        location: location
    });

    // Exibir imagem capturada
    const img = document.createElement('img');
    img.src = imageData;
    document.body.appendChild(img);
}

// Inicializar a câmera quando a página carregar
window.onload = function() {
    initCamera();
    showTime();
    showLocation();

    // Atualizar o horário a cada segundo
    setInterval(showTime, 1000);
};

// Adicionar evento de clique para capturar a imagem
captureButton.addEventListener('click', captureData);

// Funções de exibição de horário e localização
function showTime() {
    const timeElement = document.getElementById('time');
    const now = new Date();
    timeElement.innerText = 'Horário atual: ' + now.toLocaleTimeString();
}

function showLocation() {
    const locationElement = document.getElementById('location');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            locationElement.innerText = `Localização atual: Latitude ${lat}, Longitude ${long}`;
        }, (err) => {
            console.error('Erro ao obter a localização:', err);
        });
    } else {
        locationElement.innerText = 'Geolocalização não é suportada pelo navegador.';
    }
}