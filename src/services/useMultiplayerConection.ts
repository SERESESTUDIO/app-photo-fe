import io from "socket.io-client";
import { useEffect, useState } from "react";
import { emptyEvent, emptyUser } from "../definitions/definition";

export const useMultiplayerConection = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [socket, setSocket] = useState<any>(null);
    const [events, setEvents] = useState<any>();
    const [constantEvent, setConstantEvent] = useState<any>();
    useEffect(()=>{
      if(socket) {
        socket.on("UpdateEvents", (events:any)=>{
          setEvents(events);
          try {
            const eventOut = new CustomEvent("dataUpdated", {detail: {events, constantEvent}});
            window.dispatchEvent(eventOut);
          } catch (error) {
            
          }
        })
      }
    },[socket, constantEvent]);
    const onConnect = async ({event=emptyEvent, mode=0, user=emptyUser}) => {
      setLoading(true);
      setConstantEvent(event);
      let _socket = await io(import.meta.env.VITE_MULTIPLAYER_API);
      if(_socket && event != emptyEvent) {
        fetch(import.meta.env.VITE_MULTIPLAYER_API+"/process/getByEventId", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                eventId: event.id
            }),
            mode: "cors"
        })
        .then(response=>response.json())
        .then(_data=>{  
          switch(mode) {
            case 1:
              connectMonitor(_socket, {mode, event, process:_data}); 
            break;
            case 4:
              connectPlayer(_socket, { mode, event, user });
              break;
          }
        });
      }
      if(_socket) {
        setSocket(_socket);
        setLoading(false);
      }
    };
    const cleanEvents = () => {
      socket.emit("cleanEvents");
    }
    const connectPlayer = (_socket:any,{mode=0, event=emptyEvent, user=emptyUser}) => {
      _socket.emit("connectPlayer", { mode, event, user });
    }
    const connectMonitor = async (_socket:any, {mode=0, event=emptyEvent, process=[]}) => {
      _socket.emit("connectEvent", { mode, event, process });
    }
  return {
    onConnect,
    cleanEvents,
    socket,
    events,
    loading
  }
}
