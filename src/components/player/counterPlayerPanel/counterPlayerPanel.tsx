import { useEffect, useState } from 'react';
import { emptyEvent } from '../../../definitions/definition.js';
import './counterPlayerPanel.css';

export const CounterPlayerPanel = ({event=emptyEvent}) => {
    const [counter, setCounter] = useState<string>("");
    useEffect(()=>{
        if(event.counter) {
            const finalNumber = 4 - event.counter;
            const numberInt = parseInt(finalNumber.toString());
            setCounter((numberInt != 0) ? (numberInt).toString() : "Empesemos");
        }
    },[event]);
  return (
    <div className='player-user-container'>
        <div className="player-user-header">
            <img src="./img/Logo-02.webp"/>
        </div>
        <div className='player-user-body'>
            <h2>{counter}</h2>
            <p>¡Espera hasta que el reto inicie!</p>
        </div>
    </div>
  )
}
