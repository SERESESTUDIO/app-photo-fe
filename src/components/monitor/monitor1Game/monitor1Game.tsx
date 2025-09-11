import { emptyEvent } from "../../../definitions/definition.js";
import QrSvg from "@wojtekmaj/react-qr-svg";
import './monitor1Game.css';

export const Monitor1Game = ({event=emptyEvent}) => {
  return (
    <div className="monitor-container">
        {<div className="monitor-scan-body">
          <h1 className="h1-1">ESCANEÁ EL CÓDIGO QR</h1>
          <h2 className="h2-1">para empezar</h2>
          <div className="monitor-code">
            <QrSvg value={import.meta.env.VITE_MY_HOST+`/?${event.accessCode}`}/>
          </div>
          <img src="./img/Logo-02.webp"/>
        </div>}
    </div>
  )
}
