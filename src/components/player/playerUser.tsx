import { useEffect, useState } from "react";
import { useGetEventByCode } from "../monitor/queries/useGetEventByCode.js";
import { useCreateUser } from "./queries/useCreateUser.js";
import './playerUser.css';

const emptyFunc = (data:any) => {console.log(data)}
export const PlayerUser = ({onAccess=emptyFunc, accessCode=""}) => {
    const [name, setName] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [rawEvent, setRawEvent] = useState<any>();
    const {data:eventData, setValues: eventValues} = useGetEventByCode();
    const { data, loading, setValues } = useCreateUser();
    useEffect(()=>{
        if(data) {
            const { success, user } = data;
            if(success) {
                onAccess({user, event:rawEvent});
            }
        }
    },[data, rawEvent]);
    useEffect(()=>{
        if(eventData) {
            const { success, event } = eventData;
            if(success) {
                setValues({ name, email: `${name}@email.com`, DNI:'', department:'', eventId:event.id });
                setRawEvent(event);
            }
        }
    },[eventData]);
    const onSubmitHandler = (event:any) => {
        event.preventDefault();
        const { target } = event;
        if(target[0].value === "") {
            setMessage("Debes completar todos los espacios");
            return;
        }
        eventValues({accessCode});
    }
  return (
    <div className="player-user-container">
        <div className="player-user-header">
            <img src="./img/Logo-01.webp"/>
        </div>
        <form onSubmit={onSubmitHandler} className="player-user-body">
            <label className="label-1">Nombre</label>
            <input className="input-1"  disabled={loading} type="text" placeholder="Ingresa tu nombre completo" value={name} onChange={({target})=>setName(target.value)}></input>
            <button className="button-2" disabled={(!loading && name != "") ? false : true} >Continuar</button>
        </form>
        {(message != "") && <label className="advert">{message}</label>}
    </div>
  )
}
