import { useEffect } from 'react';
import { emptyEvent } from '../../../definitions/definition';
import { useDeleteEvent } from '../queries/useDeleteEvent';
import './deleteAdvert.css';

export const DeleteAdvert = ({event=emptyEvent, onDelete=()=>{}, onCancel=()=>{}}) => {
    const { data, setValues } = useDeleteEvent();
    useEffect(()=>{
        if(data) {
            const { success } = data;
            if(success) {
                onDelete();
            }
        }
    },[data]);
    const onDeleteEvent = () => {
        setValues({ id: event.id });
    }
    return (
    <div className='delete-advert'>
        <h3>Eliminar evento</h3>
        <p>estas seguro que deseas el evento</p>
        <div>
            <button onClick={onCancel}>Cancelar</button>
            <button onClick={onDeleteEvent}>Eliminar</button>
        </div>
    </div>
  )
}
