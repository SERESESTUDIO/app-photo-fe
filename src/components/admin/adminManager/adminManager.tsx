import { useEffect, useState } from "react";
import { useGetEvents } from "../queries/useGetEvents.js";
import { emptyUser, type IEvent } from "../../../definitions/definition.js";
import { PanelEvent } from "../panelEvent.js";
import { DeleteAdvert } from "../deleteAdvert/deleteAdvert.js";
import { useMultiplayerConection } from "../../../services/useMultiplayerConection.js";
import { JsonToTable } from "react-json-to-table";
import { AdminProcess } from "./adminProcess.js";

import './adminManager.css';
import { useGetProcessByEventId } from "../queries/useGetProcessByeventId.js";
let intervalEvent:any;
export const AdminManager = ({user=emptyUser}) => {
    const [ openPanelEvent, setPanelEvent ] = useState<boolean>(false);
    const [events, setEvents] = useState<IEvent[]>([]);
    const [eventIndex, setEventIndex] = useState<number>(0);
    const [eventEdit, setEventEdit] = useState<IEvent | null>(null);
    const [deleteEvent, setDeleteEvent] = useState<IEvent | null>(null);
    const [processEvent, setProcessEvent] = useState<IEvent | null>(null);
    const { data, setValues } = useGetEvents();
    const { data: dataProcess, setValues: processValues} = useGetProcessByEventId();
    const {onConnect, events: updateEvents, cleanEvents, socket} = useMultiplayerConection();
    useEffect(()=>{
      setValues();
      onConnect({mode:0});
    },[]);
    useEffect(()=>{
      if(data) {
        const { success, events:_events } = data;
        if(success) {
          setEvents(_events)
        }
      }
    },[data]);
    useEffect(()=>{
      if(dataProcess) {
        const { success, process: _process } = dataProcess;
        if(success) {
          if(socket) {
            socket.emit("connectEvent", {mode:1, event: events[eventIndex], process: {process: _process}} );
          }
        }
      }
    },[dataProcess]);
    const onStartGameHandler = () => {
      if(socket) {
        window.addEventListener("dataUpdated", ({detail}:any)=>{
          const { events } = detail;
          const myEvent:IEvent = events[eventIndex];
          if(myEvent) {
            if(myEvent.state && myEvent.state === "finished") {
              if(intervalEvent) clearInterval(intervalEvent);
            }
          }
        });
        intervalEvent = setInterval(()=>{
          socket.emit("startEvent", { id: events[eventIndex].id });
        },15);
      }
    }
    const onPauseGameHandler = () => {
      if(intervalEvent) clearInterval(intervalEvent);
    }
    const onStopGameHandler = () => {
      if(intervalEvent) clearInterval(intervalEvent);
      if(socket) {
        socket.emit("stopEvent", { id: events[eventIndex].id });
      }
    }
    const onCreateEventHandler = () => {
      processValues({ eventId: events[eventIndex].id });
    }
  return (
    <>
      <h1>Admin</h1>
      <hr/>
      <div>
        <button onClick={()=>{setPanelEvent(true)}}>Crear nuevo evento</button>
      </div>
      <h2>Eventos</h2>
      <div>
        <div className="table-body">
          <div><b>Nombre</b></div>
          <div><b>Codigo de acceso</b></div>
          <div><b>Fecha de creación</b></div>
          <div><b>Opciones</b></div>
        </div>
        {events.map((event, index)=><div key={index} className="table-body">
          <div>{event.name}</div>
          <div>{event.accessCode}</div>
          <div>{event.createdAt}</div>
          <div>
            <button onClick={()=>setProcessEvent(event)}>Procesos</button>
            <button onClick={()=>setEventEdit(event)}>Editar</button>
            <button onClick={()=>setDeleteEvent(event)}>Eliminar</button>
          </div>
        </div>)}
      </div>
      <div>
        <select value={eventIndex} onChange={({target})=>setEventIndex(parseInt(target.value))}>
          {events.map((event, index)=><option key={index} value={index}>{event.name}</option>)}
        </select>
        <button onClick={onCreateEventHandler}>Crear evento multijugador</button>
        <button onClick={()=>cleanEvents()}>Eliminar eventos multijugador</button>
        <button onClick={onStartGameHandler}>Iniciar</button>
        <button onClick={onPauseGameHandler}>Pausar</button>
        <button onClick={onStopGameHandler}>Detener</button>
      </div>
      {(updateEvents) && <JsonToTable json={updateEvents} />}
      {(openPanelEvent) && <PanelEvent 
        user={user} 
        title="Crear nuevo evento" 
        buttonActionTitle="Crear" 
        onClose={()=>setPanelEvent(false)}
        onCreate={()=>{
            setValues();
            setPanelEvent(false);
        }}
      />}
      {(processEvent) && <AdminProcess
        event={processEvent}
        onClose={()=>setProcessEvent(null)}
      />}
      {(eventEdit) && <PanelEvent
        user={user}
        title="Modificar evento"
        buttonActionTitle="Modificar"
        onClose={()=>setEventEdit(null)}
        eventIn={eventEdit}
        onUpdate={()=>{
            setValues();
            setEventEdit(null)
        }}
      />}
      {(deleteEvent) && <DeleteAdvert
        title="Eliminar evento"
        description="Estas seguro que deseas eliminar el evento"
        event={deleteEvent}
        onCancel={()=>setDeleteEvent(null)}
        onDelete={()=>{
            setValues();
            setDeleteEvent(null);
        }}
      />}
    </>
  )
}
