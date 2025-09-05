import { useEffect, useState } from "react";
import { emptyEvent } from "../../../definitions/definition.js";
import './processPanel.css';
import { convertSecondsToMinutes } from "../../../services/convertTimer.js";
import { TimerIcon } from "../../icons/timerIcon.js";

export const ProcessPanel = ({event=emptyEvent}) => {
  const [timer, setTimer] = useState<string>("");
  useEffect(()=>{
    if(event) {
      const processArray:any[] = [];
      for(const id in event.process) {
        processArray.push(event.process[id]);
      }
      const process:any = processArray.filter(proc=>proc.name === event.state);
      if(process.length > 0 && event.timer) {
        const counterDown = parseInt((process[0].timer - event.timer).toString()) + 1;
        setTimer(counterDown.toString());
      }
    }
  },[event]);
  return (
    <div className="monitor-container">
      <div className="process-panel-container">
        <img className="process-panel-container-head" src="./img/selfie.webp"/>
        <h1 className="h1-1">{event.state}</h1>
        <TimerIcon/>
        <h2 className="h1-2">{`${convertSecondsToMinutes(timer)}`}</h2>
        <img className="process-panel-container-img" src="./img/Logo-02.webp"/>
      </div>
    </div>
  )
}
