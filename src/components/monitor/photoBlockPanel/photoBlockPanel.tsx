import { useEffect, useRef, useState } from "react";
import { emptyEvent } from "../../../definitions/definition.js";
import './photoBlockPanel.css';
let savePhotosLength:number = 0;
const emptySocket:any = {}
export const PhotoBlockPanel = ({event=emptyEvent, isPair=true, socket=emptySocket}) => {
  const [photos, setPhotos] = useState<any[]>([]);
  const [process, setProcess] = useState<any>();
  const [showX, setShowX] = useState<boolean>(false);
  const divRef = useRef(null);
  useEffect(()=>{
    if(event) {
      let newPhotos:any[] = [];
      let players:any[] = [];
      let counter:number = 0;
      for(const id in event.users) {
        if(counter % 2 === 0 && isPair) {
          players.push(event.users[id]);
        } else if(counter % 2 != 0 && !isPair) {
          players.push(event.users[id]);
        }
        counter++;
      }
      for(const id in event.process) {
        if(event.process[id].name === event.state) {
          setProcess(event.process[id]);
          for(const ids in event.process[id].photos) {
            const existUser = players.filter(player=>player.id === event.process[id].photos[ids].userId); 
            if(existUser.length > 0) newPhotos.push(event.process[id].photos[ids]);
          }
          break;
        }
      }
      setPhotos(newPhotos);
      if(divRef.current && newPhotos.length > 0) {
        if(savePhotosLength != newPhotos.length) {
          scrollToBottom(divRef.current);
        }
        savePhotosLength = newPhotos.length;
      }
    }
  },[event, divRef]);
  const scrollToBottom = (scrollableDiv:HTMLDivElement) => {
    if (scrollableDiv) {
        scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
    }
  };
  const onDeletePhoto = (photo:any) => {
    if(socket) socket.socket.emit("deletePhoto", {eventId:event.id, processId:process.id, photoId:photo.id});
  }
  return (
    <div className="monitor-container">
      <div className="photo-block-container" ref={divRef}>
        <div className="galery">
          {photos.map((photo, index)=><div className="pics" key={index} onPointerEnter={()=>setShowX(true)} onPointerLeave={()=>setShowX(false)}>
            <div>{photo.userName}</div>
            <img src={photo.url} />
            {(showX) && <button className="x-button" onClick={()=>onDeletePhoto(photo)}>X</button>}
          </div>)}
        </div>
      </div>
    </div>
  )
}
