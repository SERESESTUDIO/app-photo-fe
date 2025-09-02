import { useState } from "react";

export const useUpdateEvent = () => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const setValues = ({id="", name=""}) => {
      setLoading(true);
      fetch(import.meta.env.VITE_MULTIPLAYER_API+"/events", {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              id,
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
