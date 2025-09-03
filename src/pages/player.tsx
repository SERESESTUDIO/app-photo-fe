import { useEffect, useState } from "react";
import type { IUser } from "../definitions/definition.js";
import { PlayerUser } from "../components/player/playerUser.js";
import { useMultiplayerConection } from "../services/useMultiplayerConection.js";
import { PlayerWaiting } from "../components/player/playerWaiting.js";

export const Player = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [event, setEvent] = useState<any>();
  const [rawEvent, setRawEvent] = useState<any>();
  const { onConnect, socket } = useMultiplayerConection();
  useEffect(()=>{
    if(event) {
      window.addEventListener("dataUpdated", ({detail}:any)=>{
        //console.log(detail.events[event.id]);
      })
    }
  },[event]);
  useEffect(()=>{
    if(user && rawEvent) {
      onConnect({ event:rawEvent, mode:4, user });
    }
  },[user, rawEvent]);
  useEffect(()=>{
    if(socket) {
      window.addEventListener("dataUpdated", ({detail}:any)=>{
        const { events, constantEvent } = detail;
        setEvent(events[constantEvent.id]);
      });
    }
  },[socket])
  const onAccessHandler = (data:any) => {
  //setSocket({event:data.event, socket:data.socket});
    setUser(data.user);
    setRawEvent(data.event);
  }
  return (
    <>
      {(!user) && <PlayerUser onAccess={onAccessHandler}/>}
      {(user && socket) && <PlayerWaiting  event={event}/>}
    </>
  )
}
