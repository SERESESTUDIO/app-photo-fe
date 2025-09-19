import { useEffect, useState } from "react";
import { useGetEventByCode } from "../monitor/queries/useGetEventByCode.js";
import { useCreateUser } from "./queries/useCreateUser.js";
import './playerUser.css';

const emptyFunc = (data:any) => {console.log(data)}
export const PlayerUser = ({onAccess=emptyFunc, accessCode=""}) => {
    const [name, setName] = useState<string>("");
    const [apellido1, setApellido1] = useState<string>("");
    const [apellido2, setApellido2] = useState<string>("");
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
                setValues({ name: `${name} ${apellido1} ${apellido2}`, email: `${name}_${apellido1}_${apellido2}@email.com`, DNI:'', department:'', eventId:event.id });
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
            <input className="input-1"  disabled={loading} type="text" placeholder="Nombre" value={name} onChange={({target})=>setName(target.value)}></input>
            <input className="input-1"  disabled={loading} type="text" placeholder="Primer apellido" value={apellido1} onChange={({target})=>setApellido1(target.value)}></input>
            <input className="input-1"  disabled={loading} type="text" placeholder="Segundo apellido" value={apellido2} onChange={({target})=>setApellido2(target.value)}></input>
            <button className="button-2" disabled={(!loading && name != "" && apellido1 != "" && apellido2 != "") ? false : true} >Continuar</button>
        </form>
        {(message != "") && <label className="advert">{message}</label>}
    </div>
  )
}
