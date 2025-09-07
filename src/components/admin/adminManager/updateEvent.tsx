import { useState } from "react";
import { JsonToTable } from "react-json-to-table";
import { convertSecondsToMinutes } from "../../../services/convertTimer";
import { ShowIcon } from "../../icons/showIcon";
import { HideIcon } from "../../icons/hideIcon";

const emptyEvent:any = {};
export const UpdateEvent = ({event=emptyEvent}) => {
    const [openDetails, setOpenDetails] = useState<boolean>(false);
  return (
    <div>
        <div className="admin-manager-block">
            <label>{`Nombre del evento: ${event.name}`}</label>
            <label>{`Estado del evento: ${event.innerState}`}</label>
            <label>{`Proceso activo: ${event.state}`}</label>
            <label>{`Contador: ${convertSecondsToMinutes(event.counter)}`}</label>
            <label>{`Tiempo: ${convertSecondsToMinutes(event.timer)}`}</label>
            <button className="admin-manager-buttons-button" onClick={()=>setOpenDetails(!openDetails)}>
              {(!openDetails) && <ShowIcon/>}
              {(openDetails) && <HideIcon/>}
              <b>{(!openDetails) ? "Mostrar" : "Ocultar"}</b>
            </button>
        </div>
        {(openDetails) && <JsonToTable json={event} />}
        <div>.</div>
    </div>
  )
}
