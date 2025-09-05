import { useEffect, useRef } from "react";
import './camera.css';
const emptyFunc = (img:any) => {console.log(img)}
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
  return (
    <>
        <video ref={videoRef} className="camera-preview" autoPlay/>
        {(videoRef) && <button className="camera-button-take-photo" onClick={()=>onCapture(videoRef)}></button>}
    </>
  )
}
