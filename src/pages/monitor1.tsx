import { useEffect, useState } from "react";
import type { IEvent, IUser } from "../definitions/definition";
import { LogIn } from "../components/admin/logIn/logIn";
import { MonitorAccess } from "../components/monitor/monitorAccess";
import { Monitor1Game } from "../components/monitor/monitor1Game/monitor1Game";

export const Monitor1 = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [socket, setSocket] = useState<any>(null);
  const [event, setEvent] = useState<any>();
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
      {(user && socket && event && !event.counter || user && socket && event && event.counter === 0) && <Monitor1Game event={event}/>}
    </>
  )
}
