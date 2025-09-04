import { useEffect, useState } from "react";
import { useSendAuth } from "../queries/useSendAuth.js";
import { compareSync } from "bcrypt-ts";
import './login.css';
const emptyFunc = (user:any) => {console.log(user)}
export const LogIn = ({onPassAccess=emptyFunc}) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { data, loading, setValues } = useSendAuth();
    
    useEffect(()=>{
        const _email = window.localStorage.getItem("credEmail");
        const _password = window.localStorage.getItem("credPassword");
        if(_email && _password) {
            const emailAccess = compareSync(`${import.meta.env.VITE_EMAIL_MASTER}`, _email);
            const passwordAccess = compareSync(`${import.meta.env.VITE_PASSWORD_MASTER}`, _password);
            if(emailAccess) setEmail(`${import.meta.env.VITE_EMAIL_MASTER}`);
            if(passwordAccess) setPassword(`${import.meta.env.VITE_PASSWORD_MASTER}`);
        }
    },[]);
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
                <input value={email} onChange={({target})=>setEmail(target.value)} className="input-1" type="email" placeholder="usuario@email.com..." disabled={loading}></input>
                <label className="label-1">Contraseña</label>
                <input value={password} onChange={({target})=>setPassword(target.value)} className="input-1" type="password" disabled={loading}></input>
                <button className="button-1" disabled={loading}>Ingresar</button>
            </form>
        </div>
    </div>
  )
}
