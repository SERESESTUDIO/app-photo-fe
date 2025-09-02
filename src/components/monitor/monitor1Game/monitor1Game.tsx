import { emptyEvent } from "../../../definitions/definition"
import './monitor1Game.css';

export const Monitor1Game = ({event=emptyEvent}) => {
  return (
    <div className="monitor-container">
        <h1>{event.name}</h1>
    </div>
  )
}
