import { emptyEvent } from "../../../definitions/definition.js";
import QrSvg from "@wojtekmaj/react-qr-svg";
import './monitor1Game.css';

export const Monitor1Game = ({event=emptyEvent}) => {
  return (
    <div className="monitor-container">
        {<div className="monitor-scan-body">
          <h1 className="h1-3">Escaneá el código</h1>
          <h1 className="h1-3">para empezar</h1>
          <div className="monitor-code">
            <QrSvg value={import.meta.env.VITE_MY_HOST+`/?${event.accessCode}`}/>
          </div>
          <label className="label-2">Y llená la casilla con tu nombre.</label>
          <img src="./img/Logo-02.webp"/>
        </div>}
    </div>
  )
}
