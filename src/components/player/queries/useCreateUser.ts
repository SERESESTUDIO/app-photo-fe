import { useState } from "react";

export const useCreateUser = () => {
  const [data, setData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const setValues = ({name="", email="", DNI="", department="", eventId=""}) => {
        setLoading(true);
        fetch(import.meta.env.VITE_MULTIPLAYER_API+"/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                DNI,
                department,
                eventId,
                userTypeId: 1
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
