import { useState } from "react";

export const useCreateEvent = () => {
  const [data, setData] = useState<any>();
      const [loading, setLoading] = useState<boolean>(false);
      const setValues = ({adminId="", name=""}) => {
          setLoading(true);
          fetch(import.meta.env.VITE_MULTIPLAYER_API+"/events", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({
                  adminId,
                  name
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
