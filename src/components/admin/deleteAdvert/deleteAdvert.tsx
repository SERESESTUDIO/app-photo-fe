import { useEffect } from 'react';
import { emptyEvent, emptyProcess } from '../../../definitions/definition';
import { useDeleteEvent } from '../queries/useDeleteEvent';
import './deleteAdvert.css';
import { useDeleteProcess } from '../queries/useDeleteProcess';

export const DeleteAdvert = ({event=emptyEvent, process=emptyProcess, title="", description="", onDelete=()=>{}, onCancel=()=>{}}) => {
    const { data, setValues } = useDeleteEvent();
    const {data:processData, setValues:processValues} = useDeleteProcess();
    useEffect(()=>{
        if(processData) {
            const { success } = processData;
            if(success) {
                onDelete();
            }
        }
    },[processData]);
    useEffect(()=>{
        if(data) {
            const { success } = data;
            if(success) {
                onDelete();
            }
        }
    },[data]);
    const onDeleteEvent = () => {
        if(event != emptyEvent) setValues({ id: event.id });
        if(process != emptyProcess) processValues({ id:process.id });
    }
    return (
    <div className='delete-advert'>
        <h3>{title}</h3>
        <p>{description}</p>
        <div>
            <button onClick={onCancel}>Cancelar</button>
            <button onClick={onDeleteEvent}>Eliminar</button>
        </div>
    </div>
  )
}
