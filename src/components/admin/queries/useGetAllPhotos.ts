import { useState } from "react";

export const useGetAllPhotos = () => {
  const [data, setData] = useState<any | null>(null);
      const [loading, setLoading] = useState<boolean>(false);
      const setValues = () => {
          setLoading(true);
          fetch(import.meta.env.VITE_MULTIPLAYER_API+"/photos", {
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
      setValues,
      setData
    }
}
