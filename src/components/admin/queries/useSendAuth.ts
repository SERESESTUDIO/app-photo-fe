import { useState } from "react";

export const useSendAuth = () => {
    const [data, setData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const setValues = ({email="", password=""}) => {
        setLoading(true);
        fetch(import.meta.env.VITE_MULTIPLAYER_API+"/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
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
