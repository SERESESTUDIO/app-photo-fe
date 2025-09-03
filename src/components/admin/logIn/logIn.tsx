import { useEffect } from "react";
import { useSendAuth } from "../queries/useSendAuth.js";

import './login.css';

const emptyFunc = (user:any) => {console.log(user)}
export const LogIn = ({onPassAccess=emptyFunc}) => {
    const { data, loading, setValues } = useSendAuth();
    useEffect(()=>{
        if(data) {
            const { success, user } = data;
            if(success) {
                onPassAccess(user);
            }
            else {
                onPassAccess(null);
            }
        }
    },[data]);
    const onSubmit = (event:any) => {
        event.preventDefault();
        const { target } = event;
        setValues({ email: target[0].value, password: target[1].value });
    }
  return (
    <div className="monitor-container">
        <div className="log-in-container">
            <div className="log-in-header">
                <img src="./img/Logo-01.webp"></img>
            </div>
            <form onSubmit={onSubmit} className="log-in-body">    
                <label className="label-1">Correo</label>
                <input className="input-1" type="email" placeholder="usuario@email.com..." disabled={loading}></input>
                <label className="label-1">Contraseña</label>
                <input className="input-1" type="password" disabled={loading}></input>
                <button className="button-1" disabled={loading}>Ingresar</button>
            </form>
        </div>
    </div>
  )
}
