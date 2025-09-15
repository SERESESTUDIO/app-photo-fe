import { useEffect, useState } from "react";
import type { IEvent, IUser } from "../definitions/definition.js";
import { LogIn } from "../components/admin/logIn/logIn.js";
import { MonitorAccess } from "../components/monitor/monitorAccess.js";
import { Monitor1Game } from "../components/monitor/monitor1Game/monitor1Game.js";
import { CounterPanel } from "../components/monitor/counterPanel/counterPanel.js";
import { ProcessPanel } from "../components/monitor/processPanel/processPanel.js";
import { FinishedPanel } from "../components/monitor/finishedPanel/finishedPanel.js";

export const Monitor1 = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [socket, setSocket] = useState<any>(null);
  const [event, setEvent] = useState<any>();
  useEffect(()=>{
    window.addEventListener("keydown", (event)=>{
      if(event.code === "ShiftLeft") {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        }
      }
    })
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
  const onAccessHandler = (data:any) => {
    setSocket({event:data.event, socket:data.socket});
  }
  return (
    <>
      {(!user) && <LogIn onPassAccess={(user)=>setUser(user)}/>}
      {(user && !socket) && <MonitorAccess connectionMode={2} onAccess={onAccessHandler}/>}
      {(user && socket && event && !event.counter && !event.state || user && socket && event && event.counter === 0 && event.state && event.state != "finished") && <Monitor1Game event={event}/>}
      {(user && socket && event && event.counter && event.counter > 0 && !event.timer || user && socket && event && event.counter && event.counter > 0 && event.timer && event.timer === 0) && <CounterPanel event={event}/>}
      {(user && socket && event && event.timer && event.timer > 0 && event.state != "finished") && <ProcessPanel event={event}/>}
      {(user && socket && event && event.state && event.state === "finished") && <FinishedPanel/>}
    </>
  )
}
