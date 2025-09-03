import { useEffect, useState } from "react"
import { useGetEventByCode } from "./queries/useGetEventByCode.js";
import { useMultiplayerConection } from "../../services/useMultiplayerConection.js";

const emptyFunc = (data:any)=>{console.log(data)}
export const MonitorAccess = ({onAccess=emptyFunc, connectionMode=0}) => {
    const [code, setCode] = useState<string>("");
    const {data, setValues} = useGetEventByCode();
    const { onConnect, loading, socket } = useMultiplayerConection();
    useEffect(()=>{
        if(socket) {
            onAccess({event:data, socket});
        }
    },[socket, data])
    useEffect(()=>{
        if(data) {
            const { success, event } = data;
            if(success) {
                onConnect({ event, mode:connectionMode });
            }
        }
    },[data]);
    const onSubmiteHandler = (event:any) => {
        event.preventDefault();
        setValues({ accessCode: event.target[0].value });
    }
  return (
    <div className="monitor-container">
        <div className="log-in-container">
            <div className="log-in-header">
                <img src="./img/Logo-01.webp"></img>
            </div>
            <form onSubmit={onSubmiteHandler} className="log-in-body">
                <label className="label-1">Ingresa el codigo de evento</label>
                <input disabled={loading} className="input-2" type="text" value={code} onChange={({target})=>setCode(target.value)}></input>
                <button disabled={loading} className="button-1">Conectar</button>
            </form>
        </div>
    </div>
  )
}
