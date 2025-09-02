import { useEffect, useState } from "react";
import { useGetEvents } from "../queries/useGetEvents.js";
import { emptyUser, type IEvent } from "../../../definitions/definition.js";
import { PanelEvent } from "../panelEvent.js";
import { DeleteAdvert } from "../deleteAdvert/deleteAdvert.js";
import { useMultiplayerConection } from "../../../services/useMultiplayerConection.js";
import { JsonToTable } from "react-json-to-table";

import './adminManager.css';
import { AdminProcess } from "./adminprocess.js";
export const AdminManager = ({user=emptyUser}) => {
    const [ openPanelEvent, setPanelEvent ] = useState<boolean>(false);
    const [events, setEvents] = useState<IEvent[]>([]);
    const [eventEdit, setEventEdit] = useState<IEvent | null>(null);
    const [deleteEvent, setDeleteEvent] = useState<IEvent | null>(null);
    const [processEvent, setProcessEvent] = useState<IEvent | null>(null);
    const { data, setValues } = useGetEvents();
    const {onConnect, events: updateEvents, cleanEvents} = useMultiplayerConection();
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
      <button onClick={()=>cleanEvents()}>Clean multiplayer events</button>
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
