import { useEffect, useState } from "react";
import type { IUser } from "../definitions/definition";
import { LogIn } from "../components/admin/logIn/logIn";
import { MonitorAccess } from "../components/monitor/monitorAccess";
import { WaitingMonitor } from "../components/monitor/waitingMonitor/waitingMonitor";
import { PhotoBlockPanel } from "../components/monitor/photoBlockPanel/photoBlockPanel";
import { FinishedPanel } from "../components/monitor/finishedPanel/finishedPanel";

export const Monitor3 = () => {
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
        setEvent(events[constantEvent.id]);
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
      {(user && socket && event && !event.timer && !event.state || user && socket && event && event.timer === 0 && event.state && event.state != "finished") && <WaitingMonitor event={event}/>}
      {(user && socket && event && event.timer && event.timer > 0 && event.state != "finished") && <PhotoBlockPanel event={event} isPair={false} socket={socket}/>}
      {(user && socket && event && event.state && event.state === "finished") && <FinishedPanel/>}
    </>
  )
}
