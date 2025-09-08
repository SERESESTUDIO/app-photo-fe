import { useEffect, useState } from 'react';
import { emptyEvent, emptyProcess } from '../../../definitions/definition.js';
import { useCreateProcess } from '../queries/useCreateProcess.js';
import { useUpdateProcess } from '../queries/useUpdateProcess.js';
import './panelProcess.css';

export const PanelProcess = ({event=emptyEvent, title="", buttonActionTitle="", onCancel=()=>{}, onSubmitted=()=>{}, process=emptyProcess}) => {
  const [name, setName] = useState<string>(process.name);
  const [timer, setTimer] = useState<number>(process.timer);
  const {data, setValues} = useCreateProcess();
  const {data:updateData, setValues:updateValues} = useUpdateProcess();
  useEffect(()=>{
    if(updateData) {
      const {success} = updateData;
      if(success) {
        onSubmitted();
      }
    }
  },[updateData])
  useEffect(()=>{
    if(data) {
      const { success } = data;
      if(success) {
        onSubmitted();
      }
    }
  },[data]);
  const onSubmitHandler = (data:any) => {
    data.preventDefault();
    const { target } = data;
    if(process === emptyProcess) setValues({ eventId: event.id, name: target[0].value, timer: parseInt(target[1].value) });
    else updateValues({ id: process.id, name:target[0].value, timer:parseInt(target[1].value)});
  }
  return (
    <div className="panel-process">
      <h2 className='h2-3'>{title}</h2>
      <form onSubmit={onSubmitHandler}>
        <label className='label-1'>Nombre</label>
        <input className='input-1' type='text' placeholder='Ingresa el nombre de la fase' value={name} onChange={({target})=>setName(target.value)}></input>
        <label className='label-1'>tiempo</label>
        <input className='input-1' type='number' value={timer} onChange={({target})=>setTimer( parseInt(target.value))}></input>
        <div>
          <button className='button-5' onClick={onCancel}>Cancelar</button>
          <button className='button-5'>{buttonActionTitle}</button>
        </div>
      </form>
    </div>
  )
}
