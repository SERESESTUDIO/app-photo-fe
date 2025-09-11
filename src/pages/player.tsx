import { useEffect, useState } from "react";
import type { IEvent, IUser } from "../definitions/definition.js";
import { PlayerUser } from "../components/player/playerUser.js";
import { useMultiplayerConection } from "../services/useMultiplayerConection.js";
import { PlayerWaiting } from "../components/player/playerWaiting.js";
import { CounterPlayerPanel } from "../components/player/counterPlayerPanel/counterPlayerPanel.js";
import { GameplayPanelPlayer } from "../components/player/gameplayPanelPlayer/gameplayPanelPlayer.js";
import { FinishedPanelPlayer } from "../components/player/finishedPanelPlayer/finishedPanelPlayer.js";

export const Player = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [event, setEvent] = useState<any>();
  const [rawEvent, setRawEvent] = useState<any>();
  const [accessCode, setAccessCode] = useState<string>("");
  const { onConnect, socket } = useMultiplayerConection();
  useEffect(()=>{
    const _accessCode = window.location.href.split('?').reverse()[0];
    console.log(_accessCode);
    setAccessCode(_accessCode);
    allows();
  },[])
  useEffect(()=>{
      if(socket) {
        window.addEventListener("dataUpdated", ({detail}:any)=>{
          const { events, constantEvent } = detail;
          const myEvent:IEvent = events[constantEvent.id];
          setEvent(myEvent);
        });
      }
    },[socket])
  useEffect(()=>{
    if(user && rawEvent) {
      onConnect({ event:rawEvent, mode:4, user });
    }
  },[user, rawEvent]);
  const allows = async() => {
    await navigator.mediaDevices.getUserMedia({ video: true });
  }
  const onAccessHandler = (data:any) => {
  //setSocket({event:data.event, socket:data.socket});
    setUser(data.user);
    setRawEvent(data.event);
  }
  return (
    <>
      {(!user) && <PlayerUser onAccess={onAccessHandler} accessCode={accessCode}/>}
      {(user && socket && event && !event.counter && !event.state || user && socket && event && event.counter === 0 && event.state && event.state != "finished") && <PlayerWaiting  event={event}/>}
      {(user && socket && event && event.counter && event.counter > 0 && !event.timer || user && socket && event && event.counter && event.counter > 0 && event.timer && event.timer === 0) && <CounterPlayerPanel event={event}/>}
      {(user && socket && event && event.timer && event.timer > 0 && event.state != "finished") && <GameplayPanelPlayer socket={socket} event={event} user={user}/>}
      {(user && socket && event && event.state && event.state === "finished") && <FinishedPanelPlayer/>}
    </>
  )
}
