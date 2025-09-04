import { emptyEvent } from '../../../definitions/definition.js';
import './gameplayPanelPlayer.css';
export const GameplayPanelPlayer = ({event=emptyEvent}) => {
  return (
    <div className='player-user-container'>
        <div className="player-user-header">
            <img src="./img/Logo-02.webp"/>
        </div>
        <div className='player-user-body'>
            <label>{event.timer}</label>
        </div>
    </div>
  )
}
