import { useEffect, useState } from 'react';
import { emptyEvent, type IProcess } from '../../../definitions/definition';
import { useGetProcessByEventId } from '../queries/useGetProcessByeventId';
import { PanelProcess } from './panelProcess';
import './adminProcess.css';
import { DeleteAdvert } from '../deleteAdvert/deleteAdvert';

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
    <div className='admin-process-container'>
        <h2>{event.name}</h2>
        <button onClick={()=>setCreate(true)}>Crear nueva face</button>
        <p>Ingresas las distintas transiciones y el tiempo de duración de cada face.</p>
        <div className='table-body'>
            <div>Face</div>
            <div>Nombre</div>
            <div>Tiempo</div>
            <div>Opciones</div>
        </div>
        {process.map((proc, index)=><div key={index} className='table-body'>
            <div>{index+1}</div>
            <div>{proc.name}</div>
            <div>{proc.timer}</div>
            <div>
                <button onClick={()=>setEditProcess(proc)}>Editar</button>
                <button onClick={()=>setDeleteProcess(proc)}>Eliminar</button>
            </div>
        </div>)}
        <button onClick={onClose}>Cerrar</button>
        {(create) && <PanelProcess 
            title='Crear nueva face' 
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
          title='Eliminar face'
          description='Estas seguro que deseas eliminar esta face'
          process={deleteProcess}
          onCancel={()=>setDeleteProcess(null)}
          onDelete={()=>{
              setValues({eventId:event.id});
              setDeleteProcess(null);
          }}
        />}
    </div>
  )
}
