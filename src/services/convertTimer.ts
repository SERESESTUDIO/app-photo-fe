export const convertSecondsToMinutes = (seconds:string):string => {
    const minutes:number = parseInt((parseInt(seconds) / 60).toString());
    const minutesString:string = (minutes < 10) ? "0" + minutes.toString() : minutes.toString();
    const secondsRest:number = parseInt(seconds) - (minutes * 60);
    const secondsString:string = (parseInt(seconds) < 10) ? "0"+secondsRest.toString(): secondsRest.toString();
    return `${minutesString}:${secondsString}`;
}