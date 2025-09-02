import io from "socket.io-client";
import { useEffect, useState } from "react";
import { emptyEvent, emptyUser } from "../definitions/definition";

export const useMultiplayerConection = () => {
    const [socket, setSocket] = useState<any>(null);
    const [events, setEvents] = useState<any>();
    const [constantEvent, setConstantEvent] = useState<any>();
    useEffect(()=>{
      if(socket) {
        socket.on("UpdateEvents", (events:any)=>{
          setEvents(events);
          const eventOut = new CustomEvent("dataUpdated", {detail: {events, constantEvent}});
          window.dispatchEvent(eventOut);
        })
      }
    },[socket, constantEvent]);
    const onConnect = async ({event=emptyEvent, mode=0, user=emptyUser}) => {
      setConstantEvent(event);
      let _socket = await io(import.meta.env.VITE_MULTIPLAYER_API);
      if(_socket && event) {
        switch(mode) {
          case 1:
            connectMonitor(_socket, {mode, event}); 
          break;
          case 4:
            connectPlayer(_socket, { mode, event, user });
            break;
        }
      }
      if(_socket) setSocket(_socket);
    };
    const cleanEvents = () => {
      socket.emit("cleanEvents");
    }
    const connectPlayer = (_socket:any,{mode=0, event=emptyEvent, user=emptyUser}) => {
      _socket.emit("connectPlayer", { mode, event, user });
    }
    const connectMonitor = async (_socket:any, {mode=0, event=emptyEvent}) => {
      _socket.emit("connectEvent", { mode, event });
    }
  return {
    onConnect,
    cleanEvents,
    socket,
    events
  }
}
