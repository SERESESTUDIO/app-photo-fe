import { useEffect, useRef, useState } from 'react';
import { emptyEvent, emptyUser } from '../../../definitions/definition.js';
import { CameraIcon } from '../../icons/cameraIcon.js';
import { UploadIcon } from '../../icons/uploadIcon.js';
import { TimerIcon } from '../../icons/timerIcon.js';
import { convertSecondsToMinutes } from '../../../services/convertTimer.js';
import { UploadImageIcon } from '../../icons/uploadImageIcon.js';
import { CancelIcon } from '../../icons/cancelIcon.js';
import { Camera } from '../../../services/camera.js';
import { useSendPhoto } from '../queries/useSendPhoto.js';
import './gameplayPanelPlayer.css';
const emptySocket:any = {};
export const GameplayPanelPlayer = ({event=emptyEvent, user=emptyUser, socket=emptySocket}) => {
  const [timer, setTimer] = useState<string>("");
  const [img, setImg] = useState<any>(null);
  const [openCamera, setOpenCamera] = useState<boolean>(false);
  const [processId, setProcessId] = useState<string>("");
  const { data, loading, setValues } = useSendPhoto();
  const imgRef = useRef(null);
  useEffect(()=>{
    if(imgRef.current && img) {
      const divRef:HTMLDivElement = imgRef.current;
      divRef.style.setProperty("--player--var-img", `url("${img}")`);
    }
  },[imgRef, img]);
  useEffect(()=>{
    if(event) {
      const processArray:any[] = [];
      for(const id in event.process) {
        processArray.push(event.process[id]);
      }
      const process:any = processArray.filter(proc=>proc.name === event.state);
      if(process.length > 0 && event.timer) {
        const counterDown = parseInt((process[0].timer - event.timer).toString()) + 1;
        setProcessId(process[0].id);
        setTimer(counterDown.toString());
      }
    }
  },[event]);
  useEffect(()=>{
    if(data && event && processId != "" && user) {
      const { success, photo } = data;
      if(success) {
        socket.emit("sendPhoto", {eventId:event.id, processId, photo, user});
      }
    }
  },[data, processId]);
  const onSendPhoto = () => {
    if(img && event.state && user) {
      //enviar foto a la base de datos
      const file = dataURLtoBlob(img);
      setValues(file, { userId: user.id,name:"photo name", state: event.state });
      setImg(null);
    }
  }
  const dataURLtoBlob = (dataurl:any) => {
    const arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }
  const onInputFile = ({target}:any) => {
    blobToDataURL(target.files[0])
    .then(_data=>{
      setImg(_data);
    });
  }
  const blobToDataURL = (blob:Blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = () => {
        reject(new Error('Error al leer el Blob.'));
      };

      reader.readAsDataURL(blob);
    });
  }
  return (
    <>
      {(!img && !openCamera) && <div className='player-user-container'>
          <div className="player-gameplay-header">
              <img src="./img/selfie.webp"/>
              <h2 className='h2-1'>{event.state}</h2>
          </div>
          <div className='player-gameplay-body'>
              <div className='button-3' onClick={()=>setOpenCamera(true)}>
                <CameraIcon/>
                <b>Tomar foto</b>
              </div>
              <div className='button-3' onClick={()=>{
                const input:HTMLInputElement = document.getElementById('upload-file-input') as HTMLInputElement;
                input.click();
              }}>
                <UploadIcon/>
                <b>Subir desde el carrete</b>
              </div>
              <input id='upload-file-input' type='file' accept="image/png, image/jpeg" hidden onChange={onInputFile}></input>
              <h2>{convertSecondsToMinutes(timer)}</h2>
              <TimerIcon className='player-gameplay-body-svg'/>
              <p className='player-counter-body-p'></p>
          </div>
      </div>}
      {(img && !openCamera) && <div className='player-user-container'>
          <div className='player-gameplay-head'></div>
          <div className='player-gameplay-img' ref={imgRef}></div>
          <div className='player-gameplay-advert'>
            <div>¿Estás seguro de subir esta foto?</div>
          </div>
          <div className='player-gameplay-body'>
            <div className={(!loading) ? 'button-3': 'button-4'} onClick={(!loading) ? onSendPhoto : ()=>{}}>
              <UploadImageIcon/>
              <b>{(!loading) ? 'Enviar': 'Enviando...'}</b>
            </div>
            <div className='button-3' onClick={()=>setImg(null)}>
              <CancelIcon/>
              <b>Cancelar</b>
            </div>
            <h2>{convertSecondsToMinutes(timer)}</h2>
            <TimerIcon className='player-gameplay-body-svg'/>
            <p className='player-counter-body-p'></p>
          </div>
        </div>}
        {(!img && openCamera) && <div className='player-camera-view'>
          <Camera onCaptureImg={(data)=>{setImg(data); setOpenCamera(false)}}/>
        </div>}
    </>
  )
}
