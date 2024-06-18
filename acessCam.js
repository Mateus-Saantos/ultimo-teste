// const video = document.getElementById('video');
//         const canvas = document.getElementById('canvas');
//         const captureButton = document.getElementById('capture-btn');
//         const constraints = {
//             video: true
//         };

//         // Acessar a webcam do dispositivo
//         async function initCamera() {
//             try {
//                 const stream = await navigator.mediaDevices.getUserMedia(constraints);
//                 video.srcObject = stream;
//             } catch (err) {
//                 console.error('Erro ao acessar a webcam:', err);
//             }
//         }

//         // Capturar imagem
//         function captureImage() {
//             const context = canvas.getContext('2d');
//             context.drawImage(video, 0, 0, canvas.width, canvas.height);
//             const imageData = canvas.toDataURL('image/png');
//             const img = document.createElement('img');
//             img.src = imageData;
//             document.body.appendChild(img);
//         }

//         // Obter o horário atual
//         function showTime() {
//             const timeElement = document.getElementById('time');
//             const now = new Date();
//             timeElement.innerText = 'Horário atual: ' + now.toLocaleTimeString();
//         }

//         // Obter a localização atual
//         function showLocation() {
//             const locationElement = document.getElementById('location');

//             if (navigator.geolocation) {
//                 navigator.geolocation.getCurrentPosition((position) => {
//                     const lat = position.coords.latitude;
//                     const long = position.coords.longitude;
//                     locationElement.innerText = `Localização atual: Latitude ${lat}, Longitude ${long}`;
//                 }, (err) => {
//                     console.error('Erro ao obter a localização:', err);
//                 });
//             } else {
//                 locationElement.innerText = 'Geolocalização não é suportada pelo navegador.';
//             }
//         }

//         // Inicializar a câmera quando a página carregar
//         window.onload = function() {
//             initCamera();
//             showTime();
//             showLocation();

//             // Atualizar o horário a cada segundo
//             setInterval(showTime, 1000);
//         };

//         // Adicionar evento de clique para capturar a imagem
//         captureButton.addEventListener('click', captureImage);