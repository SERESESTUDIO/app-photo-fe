import { useEffect, useState } from "react";
import { useGetEvents } from "../queries/useGetEvents.js";
import { emptyUser, type IEvent } from "../../../definitions/definition.js";
import { PanelEvent } from "../panelEvent.js";
import { DeleteAdvert } from "../deleteAdvert/deleteAdvert.js";
import { useMultiplayerConection } from "../../../services/useMultiplayerConection.js";
import { AdminProcess } from "./adminProcess.js";

import './adminManager.css';
import { useGetProcessByEventId } from "../queries/useGetProcessByEventId.js";
import { UpdateEvent } from "./updateEvent.js";
import { ConfigurationIcon } from "../../icons/configurationIcon.js";
import { EditIcon } from "../../icons/editIcon.js";
import { DeleteIcon } from "../../icons/deleteIcon.js";
import { CreateIcon } from "../../icons/createIcon.js";
import { StartIcon } from "../../icons/startIcon.js";
import { StopIcon } from "../../icons/stopIcon.js";
import { PauseIcon } from "../../icons/pauseIcon.js";
export const AdminManager = ({user=emptyUser}) => {
    const [ openPanelEvent, setPanelEvent ] = useState<boolean>(false);
    const [events, setEvents] = useState<IEvent[]>([]);
    const [eventIndex, setEventIndex] = useState<number>(0);
    const [eventEdit, setEventEdit] = useState<IEvent | null>(null);
    const [deleteEvent, setDeleteEvent] = useState<IEvent | null>(null);
    const [processEvent, setProcessEvent] = useState<IEvent | null>(null);
    const [deleteMultEvent, setDeleteMultEvent] = useState<boolean>(false);
    const [createMult, setCreateMult] = useState<boolean>(false);
    const { data, setValues } = useGetEvents();
    const { data: dataProcess, setValues: processValues} = useGetProcessByEventId();
    const [updateEvents, setUpdateEvents] = useState<any[]>([]);
    const {onConnect, events: updateEventsIn, cleanEvents, socket} = useMultiplayerConection();
    useEffect(()=>{
      setValues();
      onConnect({mode:0});
    },[]);
    useEffect(()=>{
      if(updateEventsIn) {
        let newUpdateEvents:any[] = [];
        for(const id in updateEventsIn) {
          newUpdateEvents.push(updateEventsIn[id]);
        }
        setUpdateEvents(newUpdateEvents);
      }
    },[updateEventsIn]);
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
        socket.emit("startEvent", { id: events[eventIndex].id });
      }
    }
    const onPauseGameHandler = () => {
      if(socket) {
        socket.emit("pauseEvent", { id: events[eventIndex].id });
      }
    }
    const onStopGameHandler = () => {
      if(socket) {
        socket.emit("stopEvent", { id: events[eventIndex].id });
      }
    }
    const onCreateEventHandler = () => {
      processValues({ eventId: events[eventIndex].id });
    }
    const onDeleteMultiplayerEvents = () => {
      setDeleteMultEvent(true);
    }
  return (
    <div className="admin-manager-container">
      <div className="admin-manager-body">
        <h1 className="h1-3">Panel de administración</h1>
        <hr/>
        <div className="admin-manager-head">
          <h2 className="h2-3">Eventos</h2>
          <button className="button-1" onClick={()=>{setPanelEvent(true)}}>Crear nuevo evento</button>
        </div>
        <div>
          <div className="table-body">
            <div className="table-body-div-heads"><b>Nombre</b></div>
            <div className="table-body-div-heads"><b>Codigo de acceso</b></div>
            <div className="table-body-div-heads"><b>Fecha de creación</b></div>
            <div className="table-body-div-heads"><b>Opciones</b></div>
          </div>
          {events.map((event, index)=><div key={index} className="table-body">
            <div className="table-body-div"><b>{event.name}</b></div>
            <div className="table-body-div"><b>{event.accessCode}</b></div>
            <div className="table-body-div"><b>{event.createdAt.split('T')[0]}</b></div>
            <div className="table-body-div">
              <div>
                <button className="button-icon" onClick={()=>setProcessEvent(event)}><ConfigurationIcon/></button>
                <button className="button-icon" onClick={()=>setEventEdit(event)}><EditIcon/></button>
                <button className="button-icon" onClick={()=>setDeleteEvent(event)}><DeleteIcon/></button>
              </div>
            </div>
          </div>)}
        </div>
        <div>
          <hr/>
          <h2 className="h2-3">Eventos multijugador</h2>
          <div className="admin-manager-buttons">
            <select className="input-1" value={eventIndex} onChange={({target})=>setEventIndex(parseInt(target.value))}>
              {events.map((event, index)=><option key={index} value={index}>{event.name}</option>)}
            </select>
            <button className="admin-manager-buttons-button" onClick={()=>setCreateMult(true)}><CreateIcon/><b>Crear</b></button>
            <button className="admin-manager-buttons-button" onClick={()=>onDeleteMultiplayerEvents()}><DeleteIcon/><b>Eliminar</b></button>
            <button className="admin-manager-buttons-button" onClick={onStartGameHandler}><StartIcon/><b>Iniciar</b></button>
            <button className="admin-manager-buttons-button" onClick={onPauseGameHandler}><PauseIcon/><b>Pausar</b></button>
            <button className="admin-manager-buttons-button" onClick={onStopGameHandler}><StopIcon/><b>Detener</b></button>
          </div>
        </div>
        {updateEvents.map((event, index)=><UpdateEvent key={index} event={event}/>)}
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
        {(deleteMultEvent) && <DeleteAdvert
          title="Eliminar eventos multijugador"
          description="Estas seguro que quieres eliminar todos los eventos multijugador"
          onCancel={()=>setDeleteMultEvent(false)}
          onDelete={()=>{
            setDeleteMultEvent(false);
            cleanEvents();
          }}
        />}
        {(createMult) && <DeleteAdvert
          title="Crear evento multijugador"
          description="Estas seguro que quieres crear un evento multijugador"
          deleteWord="crear"
          action="Crear"
          onCancel={()=>setCreateMult(false)}
          onDelete={()=>{
            setCreateMult(false);
            onCreateEventHandler();
          }}
        />}
      </div>
    </div>
  )
}
