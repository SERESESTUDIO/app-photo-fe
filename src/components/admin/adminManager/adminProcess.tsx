import { useEffect, useState } from 'react';
import { emptyEvent, type IProcess } from '../../../definitions/definition.js';
import { PanelProcess } from './panelProcess.js';
import { DeleteAdvert } from '../deleteAdvert/deleteAdvert.js';
import { useGetProcessByEventId } from '../queries/useGetProcessByEventId.js';
import './adminProcess.css';
import { EditIcon } from '../../icons/editIcon.js';
import { DeleteIcon } from '../../icons/deleteIcon.js';

export const AdminProcess = ({event=emptyEvent, onClose=()=>{}}) => {
    const [process, setProcess] = useState<IProcess[]>([]);
    const [create, setCreate] = useState<boolean>(false);
    const [editProcess, setEditProcess] = useState<IProcess | null>(null);
    const [deleteProcess, setDeleteProcess] = useState<IProcess | null>(null);
    const { data, setValues } = useGetProcessByEventId();
    useEffect(()=>{
        if(data) {
            const { success, process: _process } = data;
            if(success) {
                setProcess(_process);
            }
        }
    },[data]);
    useEffect(()=>{
        setValues({eventId:event.id});
    },[]);
  return (
    <>
    <div className='admin-process-container'>
        <h2 className='h2-3'>{event.name}</h2>
        <button className='button-1 button-repos' onClick={()=>setCreate(true)}>Crear nueva fase</button>
        <p className='p'>Ingresas las distintas transiciones y el tiempo de duración de cada fase.</p>
        <div className='admin-process-container-div'>
            <div className='table-body'>
                <div className="table-body-div-heads">Fase</div>
                <div className="table-body-div-heads">Nombre</div>
                <div className="table-body-div-heads">Tiempo</div>
                <div className="table-body-div-heads">Opciones</div>
            </div>
            <div className='table-body-div-body'>
                {process.map((proc, index)=><div key={index} className='table-body'>
                    <div className='table-body-div'><b>{index+1}</b></div>
                    <div className='table-body-div'><b>{proc.name}</b></div>
                    <div className='table-body-div'><b>{proc.timer}</b></div>
                    <div className='table-body-div'>
                        <button className="button-icon" onClick={()=>setEditProcess(proc)}><EditIcon/></button>
                        <button className="button-icon" onClick={()=>setDeleteProcess(proc)}><DeleteIcon/></button>
                    </div>
                </div>)}
            </div>
        </div>
        <button className='button-1' onClick={onClose}>Cerrar</button>
    </div>
    {(create) && <PanelProcess 
        title='Crear nueva fase' 
        buttonActionTitle='Crear'
        event={event}
        onCancel={()=>setCreate(false)}
        onSubmitted={()=>{
            setValues({eventId:event.id});
            setCreate(false);
        }}
    />}
    {(editProcess) && <PanelProcess
        process={editProcess}
        title='Modificar el proceso'
        buttonActionTitle='Modificar'
        onCancel={()=>setEditProcess(null)}
        onSubmitted={()=>{
            setValues({eventId:event.id});
            setEditProcess(null);
        }}
    />}
    {(deleteProcess) && <DeleteAdvert
      title='Eliminar fase'
      description='Estás seguro que deseas eliminar esta fase'
      process={deleteProcess}
      onCancel={()=>setDeleteProcess(null)}
      onDelete={()=>{
          setValues({eventId:event.id});
          setDeleteProcess(null);
      }}
    />}
    </>
  )
}
