import { useEffect, useState } from 'react';
import './panelEvent.css';
import { emptyEvent, emptyUser } from '../../definitions/definition';
import { useCreateEvent } from './queries/useCreateEvent';
import { useUpdateEvent } from './queries/useUpdateEvent';

export const PanelEvent = ({title="", buttonActionTitle="", onClose=()=>{}, onCreate=()=>{}, onUpdate=()=>{}, user=emptyUser, eventIn=emptyEvent}) => {
    const [name, setName] = useState<string>(eventIn.name);
    const { data, setValues } = useCreateEvent();
    const {data: updateData, setValues: updateValues} = useUpdateEvent();
    useEffect(()=>{
        if(updateData) {
            const { success } = updateData;
            if(success) {
                onUpdate();
            }
        }
    },[updateData]);
    useEffect(()=>{
        if(data) {
            const { success } = data;
            if(success) {
                onCreate();
            }
        }
    },[data]);
    const onCancel = (event:any) => {
        event.preventDefault();
        onClose();
    }
    const onSubmit = (event:any) => {
        event.preventDefault();
        const {target} = event;
        if(eventIn === emptyEvent) setValues({ adminId: user.id, name: target[0].value });
        else updateValues({ id: eventIn.id, name: target[0].value });
    }
  return (
    <div className="panel-event-container">
        <h2 className='h2-3'>{title}</h2>
        <form onSubmit={onSubmit} className='panel-event-body' id="submit-panel-event">
            <label className='label-1'>Nombre del evento</label>
            <input className='input-1' placeholder='Ingresa el nombre del nuevo evento' value={name} onChange={({target})=>setName(target.value)}></input>
            <div>
                <button className='button-5' onClick={onCancel}>Cancelar</button>
                <button className='button-5'>{buttonActionTitle}</button>
            </div>
        </form>
    </div>
  )
}
