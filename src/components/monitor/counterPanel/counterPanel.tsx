import { useEffect, useState } from 'react';
import { emptyEvent } from '../../../definitions/definition.js';
import './counterPanel.css';

export const CounterPanel = ({event=emptyEvent}) => {
    const [counter, setCounter] = useState<string>("");
    useEffect(()=>{
        if(event.counter) {
            const finalNumber = 4 - event.counter;
            const numberInt = parseInt(finalNumber.toString());
            setCounter((numberInt != 0) ? (numberInt).toString() : "Empesemos");
        }
    },[event]);
    return (
    <div className='monitor-container'>
        <div className='counter-panel-container'>
            <div></div>
            <h1 className='h1-1'>{(counter != "Empesemos") ? "¡El sigueinte reto iniciara en!" : ""}</h1>
            <h1 className='h1-2'>{counter}</h1>
            <img src='./img/Logo-02.webp'/>
        </div>
    </div>
  )
}
