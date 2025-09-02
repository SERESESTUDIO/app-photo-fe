import { useState } from "react";

export const useCreateProcess = () => {
  const [data, setData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const setValues = ({ eventId="", name="", timer=0 }) => {
        setLoading(true);
        fetch(import.meta.env.VITE_MULTIPLAYER_API+"/process", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                eventId,
                name,
                timer
            }),
            mode: "cors"
        })
        .then(response=>response.json())
        .then(_data=>{
            setData(_data);
            setLoading(false);
        });
    }
  return {
    data,
    loading,
    setValues
  }
}
