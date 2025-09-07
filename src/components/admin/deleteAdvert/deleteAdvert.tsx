import { useEffect, useState } from 'react';
import { emptyEvent, emptyProcess } from '../../../definitions/definition.js';
import { useDeleteEvent } from '../queries/useDeleteEvent.js';
import { useDeleteProcess } from '../queries/useDeleteProcess.js';
import './deleteAdvert.css';

export const DeleteAdvert = ({event=emptyEvent, process=emptyProcess, title="", description="", deleteWord="eliminar", action="Eliminar", onDelete=()=>{}, onCancel=()=>{}}) => {
    const { data, setValues } = useDeleteEvent();
    const [word, setWord] = useState<string>("");
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
        else if(process != emptyProcess) processValues({ id:process.id });
        else onDelete();
    }
    return (
    <div className='delete-advert'>
        <h2 className='h2-3'>{title}</h2>
        <p className='p'>{description}</p>
        <p className='p'>{`Escribe la siguiente palabra para poder ${action}:`}</p>
        <h1 className='h1-3'>{deleteWord}</h1>
        <input value={word} onChange={({target})=>setWord(target.value)} className='input-1' type='text'></input>
        <div>
            <button className='button-5' onClick={onCancel}>Cancelar</button>
            <button disabled={(word===deleteWord) ? false: true} className='button-5' onClick={onDeleteEvent}>{action}</button>
        </div>
    </div>
  )
}
