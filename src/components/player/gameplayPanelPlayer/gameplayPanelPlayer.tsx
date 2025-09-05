import { useEffect, useRef, useState } from 'react';
import { emptyEvent } from '../../../definitions/definition.js';
import { CameraIcon } from '../../icons/cameraIcon.js';
import { UploadIcon } from '../../icons/uploadIcon.js';
import './gameplayPanelPlayer.css';
import { TimerIcon } from '../../icons/timerIcon.js';
import { convertSecondsToMinutes } from '../../../services/convertTimer.js';
import { UploadImageIcon } from '../../icons/uploadImageIcon.js';
import { CancelIcon } from '../../icons/cancelIcon.js';
export const GameplayPanelPlayer = ({event=emptyEvent}) => {
  const [timer, setTimer] = useState<string>("");
  const [openImage, setOpenImage] = useState(false);
  const imgRef = useRef(null);
  useEffect(()=>{
    if(imgRef.current) {
      const divRef:HTMLDivElement = imgRef.current;
      divRef.style.setProperty("--player--var-img", `url("https://media.istockphoto.com/id/1192108047/photo/best-colleagues-and-best-friends.jpg?s=612x612&w=0&k=20&c=82YwT6-ji7_Sp_yV1J7OaJEVdE15OsOahqCfuDlHhu0=")`);
    }
  },[imgRef, openImage]);
  useEffect(()=>{
    if(event) {
      const processArray:any[] = [];
      for(const id in event.process) {
        processArray.push(event.process[id]);
      }
      const process:any = processArray.filter(proc=>proc.name === event.state);
      if(process.length > 0 && event.timer) {
        const counterDown = parseInt((process[0].timer - event.timer).toString()) + 1;
        setTimer(counterDown.toString());
      }
    }
  },[event]);
  return (
    <>
      {(!openImage) && <div className='player-user-container'>
          <div className="player-gameplay-header">
              <img src="./img/selfie.webp"/>
              <h2 className='h2-1'>{event.state}</h2>
          </div>
          <div className='player-gameplay-body'>
              <div className='button-3' onClick={()=>setOpenImage(true)}>
                <CameraIcon/>
                <b>Tomar foto</b>
              </div>
              <div className='button-3' onClick={()=>setOpenImage(true)}>
                <UploadIcon/>
                <b>Subir desde el carrete</b>
              </div>
              <h2>{convertSecondsToMinutes(timer)}</h2>
              <TimerIcon className='player-gameplay-body-svg'/>
              <p className='player-counter-body-p'>Se acabó el tiempo de espera para subir la imagen</p>
          </div>
      </div>}
      {(openImage) && <div className='player-user-container'>
          <div className='player-gameplay-head'></div>
          <div className='player-gameplay-img' ref={imgRef}></div>
          <div className='player-gameplay-advert'>
            <div>¿Estás seguro de subir esta foto?</div>
          </div>
          <div className='player-gameplay-body'>
            <div className='button-3' onClick={()=>setOpenImage(false)}>
              <UploadImageIcon/>
              <b>Subir</b>
            </div>
            <div className='button-3' onClick={()=>setOpenImage(false)}>
              <CancelIcon/>
              <b>Cancelar</b>
            </div>
            <h2>{convertSecondsToMinutes(timer)}</h2>
            <TimerIcon className='player-gameplay-body-svg'/>
            <p className='player-counter-body-p'>Se acabó el tiempo de espera para subir la imagen</p>
          </div>
        </div>}
    </>
  )
}
