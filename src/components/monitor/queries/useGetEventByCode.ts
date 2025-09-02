import { useState } from "react";

export const useGetEventByCode = () => {
  const [data, setData] = useState<any>();
        const [loading, setLoading] = useState<boolean>(false);
        const setValues = ({accessCode=""}) => {
            setLoading(true);
            fetch(import.meta.env.VITE_MULTIPLAYER_API+"/events/getByCode", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    accessCode
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
