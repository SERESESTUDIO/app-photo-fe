import { useState } from "react";

export const useDeleteEvent = () => {
  const [data, setData] = useState<any>();
        const [loading, setLoading] = useState<boolean>(false);
        const setValues = ({id=""}) => {
            setLoading(true);
            fetch(import.meta.env.VITE_MULTIPLAYER_API+"/events/"+id, {
                method: "DELETE",
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
