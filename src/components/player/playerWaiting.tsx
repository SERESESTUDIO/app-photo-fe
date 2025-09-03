import { emptyEvent } from '../../definitions/definition';
import './playerWaiting.css';

export const PlayerWaiting = ({event=emptyEvent}) => {
  return (
    <div className="player-waiting-container">
        <div></div>
        <h1 className='h1-1'>!Espera</h1>
        <h2 className='h2-1'>hasta que inicie la partida!</h2>
        <img src='./img/Logo-02.webp'/>
        <label>{event.accessCode}</label>
    </div>
  )
}
