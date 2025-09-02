import { useEffect, useState } from "react";
import { useGetEventByCode } from "../monitor/queries/useGetEventByCode";
import { useCreateUser } from "./queries/useCreateUser";

const emptyFunc = (data:any) => {console.log(data)}
export const PlayerUser = ({onAccess=emptyFunc}) => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [DNI, setDNI] = useState<string>("");
    const [department, setDeparment] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [rawEvent, setRawEvent] = useState<any>();
    const {data:eventData, setValues: eventValues} = useGetEventByCode();
    const { data, setValues } = useCreateUser();
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
                setValues({ name, email, DNI, department, eventId:event.id });
                setRawEvent(event);
            }
        }
    },[eventData]);
    const onSubmitHandler = (event:any) => {
        event.preventDefault();
        const { target } = event;
        if(target[0].value === "" || target[1].value === "" || target[2].value === "" || target[3].value === "" || target[4].value === "") {
            setMessage("debes completar todos los espacios");
            return;
        }
        eventValues({accessCode: target[4].value});
    }
  return (
    <>
        <form onSubmit={onSubmitHandler}>
            <label>Nombre</label>
            <input type="text" placeholder="Ingresa tu nombre" value={name} onChange={({target})=>setName(target.value)}></input>
            <label>Correo</label>
            <input type="email" placeholder="user@email.com" value={email} onChange={({target})=>setEmail(target.value)}></input>
            <label>Cedula</label>
            <input type="text" value={DNI} onChange={({target})=>setDNI(target.value)}></input>
            <label>Departamento</label>
            <input type="text" placeholder="Ingresa el nombre del departamento" value={department} onChange={({target})=>setDeparment(target.value)}></input>
            <label>Codigo de acceso</label>
            <input type="text" value={code} onChange={({target})=>setCode(target.value)}></input>
            <button>Continuar</button>
        </form>
        {(message != "") && <label>{message}</label>}
    </>
  )
}
