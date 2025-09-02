import { useState } from "react";

export const useGetProcessByEventId = () => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const setValues = ({ eventId="" }) => {
      setLoading(true);
      fetch(import.meta.env.VITE_MULTIPLAYER_API+"/process/getByEventId", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              eventId
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
