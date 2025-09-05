import { useEffect, useState } from "react";
import { emptyEvent } from "../../../definitions/definition.js";
import './photoBlockPanel.css';

export const PhotoBlockPanel = ({event=emptyEvent, isPair=true}) => {
  const [photos, setPhotos] = useState<any[]>([]);
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
          for(const ids in event.process[id].photos) {
            const existUser = players.filter(player=>player.id === event.process[id].photos[ids].userId); 
            if(existUser.length > 0) newPhotos.push(event.process[id].photos[ids]);
          }
          break;
        }
      }
      setPhotos(newPhotos);
    }
  },[event]);
  return (
    <div className="monitor-container">
      <div className="photo-block-container">
        <div className="galery">
          {photos.map((photo, index)=><div className="pics" key={index}>
            <div>{photo.userName}</div>
            <img src={photo.url} />
          </div>)}
        </div>
      </div>
    </div>
  )
}
