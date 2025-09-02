import { useState } from "react";

export const useDeleteProcess = () => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const setValues = ({ id="" }) => {
      setLoading(true);
      fetch(import.meta.env.VITE_MULTIPLAYER_API+"/process", {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              id
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
