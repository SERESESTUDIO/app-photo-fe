const video:HTMLVideoElement = document.getElementById('video-stream') as HTMLVideoElement;
const captureButton = document.getElementById('capture-button');
const canvas:HTMLCanvasElement = document.getElementById('photo-canvas') as HTMLCanvasElement;
const photoPreview:HTMLImageElement = document.getElementById('photo-preview') as HTMLImageElement;

// 1. Solicitar acceso a la cámara
async function startCamera() {
  try {
    if(video) {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    }
  } catch (err) {
    console.error("Error al acceder a la cámara: ", err);
    alert("No se pudo acceder a la cámara. Asegúrate de dar los permisos necesarios.");
  }
}

// 2. Capturar la imagen
if(captureButton) {
    captureButton.addEventListener('click', () => {
        if(canvas) {
          const context = canvas.getContext('2d');
        
          // Establecer el tamaño del canvas igual al video
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
        
          // Dibujar el fotograma actual del video en el canvas
          if(context) context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
          // Obtener la URL de la imagen en formato PNG (o JPEG)
          const imageDataURL = canvas.toDataURL('image/png');
        
          // Mostrar la imagen capturada en el elemento <img>
          if(photoPreview) photoPreview.src = imageDataURL;
        }
    
      // Opcional: Detener la transmisión de la cámara una vez que se toma la foto
      // video.srcObject.getTracks().forEach(track => track.stop());
    });
}

// Iniciar la cámara cuando la página cargue
window.addEventListener('load', startCamera);