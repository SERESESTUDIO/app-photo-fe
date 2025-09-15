import { useEffect, useRef } from "react";
import './camera.css';
import { ReverseCameraIcon } from "../components/icons/reverseCameraIcon";
const emptyFunc = (img:any) => {console.log(img)}
let currentFacingMode: 'user' | 'environment' = 'user';
export const Camera = ({onCaptureImg=emptyFunc}) => {
    const videoRef = useRef(null);
    useEffect(()=>{
        if(videoRef.current) {
            const video:HTMLVideoElement = videoRef.current;
            StartCamera(video);
        }
    },[videoRef]);
    const StartCamera = async (video:HTMLVideoElement) =>{
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          video.srcObject = stream;
        } catch (err) {
          console.error("Error al acceder a la cámara: ", err);
          alert("No se pudo acceder a la cámara. Asegúrate de dar los permisos necesarios.");
        }
    }
    const onCapture = (videoIn:any) => {
        if(videoIn.current) {
            const video:HTMLVideoElement = videoIn.current;
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
        
            // Establecer el tamaño del canvas igual al video
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            
            // Dibujar el fotograma actual del video en el canvas
            if(context) context.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            // Obtener la URL de la imagen en formato PNG (o JPEG)
            const imageDataURL = canvas.toDataURL('image/png');
            
            // Mostrar la imagen capturada en el elemento <img>
            onCaptureImg(imageDataURL);
        }
    }
    async function toggleCamera(video:any) {
      const videoElement: HTMLVideoElement = video.current;
      // Toggle the facing mode
      currentFacingMode = currentFacingMode === 'user' ? 'environment' : 'user';

      const constraints = {
        video: {
          facingMode: currentFacingMode
        }
      };
    
      try {
        // Stop previous tracks
        const currentStream = videoElement.srcObject as MediaStream;
        if (currentStream) {
          currentStream.getTracks().forEach(track => track.stop());
        }
      
        // Get a new stream with the updated constraints
        const newStream = await navigator.mediaDevices.getUserMedia(constraints);
      
        // Set the new stream as the video source
        videoElement.srcObject = newStream;
      } catch (error) {
        console.error("Error switching cameras:", error);
      }
    }
  return (
    <>
        <video ref={videoRef} className="camera-preview" autoPlay/>
        {(videoRef) && <button className="camera-button-take-photo" onClick={()=>onCapture(videoRef)}></button>}
        {(videoRef) && <div className="camera-button-reverse" onClick={()=>toggleCamera(videoRef)}><ReverseCameraIcon/></div>}
    </>
  )
}
