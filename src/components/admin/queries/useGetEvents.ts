import { useState } from "react"

export const useGetEvents = () => {
    const [data, setData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const setValues = () => {
        setLoading(true);
        fetch(import.meta.env.VITE_MULTIPLAYER_API+"/events/getAll", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
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
