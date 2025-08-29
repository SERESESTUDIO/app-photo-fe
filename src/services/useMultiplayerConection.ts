import { useState } from "react";
import io from "socket.io-client";

export const useMultiplayerConection = () => {
    const [socket, setSocket] = useState<any>(null);
    const onConnect = async () => {
    let _socket = await io(import.meta.env.VITE_MULTIPLAYER_API);
    if(_socket) {
      setSocket(_socket);
    }
  };
  return {
    onConnect,
    socket
  }
}
