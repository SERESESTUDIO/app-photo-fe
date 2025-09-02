import { useEffect, useState } from "react"
import { useGetEventByCode } from "./queries/useGetEventByCode"
import { useMultiplayerConection } from "../../services/useMultiplayerConection"
const emptyFunc = (data:any)=>{console.log(data)}
export const MonitorAccess = ({onAccess=emptyFunc, connectionMode=0}) => {
    const [code, setCode] = useState<string>("");
    const {data, setValues} = useGetEventByCode();
    const { onConnect, socket } = useMultiplayerConection();
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
    <div>
        <form onSubmit={onSubmiteHandler}>
            <label>Ingresa el codigo de evento</label>
            <input type="text" value={code} onChange={({target})=>setCode(target.value)}></input>
            <button>Conectar</button>
        </form>
    </div>
  )
}
