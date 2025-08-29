import { useEffect } from "react";
import { useMultiplayerConection } from "./services/useMultiplayerConection";

function App() {
  const { onConnect, socket } = useMultiplayerConection();
  useEffect(()=>{
    onConnect();
  },[]);
  useEffect(()=>{
    if(socket) {
      console.log(socket);
    }
  },[socket])
  return <></>;
}

export default App;
