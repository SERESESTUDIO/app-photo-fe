import { useEffect } from "react";
import { useSendAuth } from "../queries/useSendAuth.js";

const emptyFunc = (user:any) => {console.log(user)}
export const LogIn = ({onPassAccess=emptyFunc}) => {
    const { data, setValues } = useSendAuth();
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
    <div>
        <form onSubmit={onSubmit}>
            <label>Correo</label>
            <input type="email"></input>
            <label>Contraseña</label>
            <input type="password"></input>
            <button>Ingresar</button>
        </form>
    </div>
  )
}
