import { useState } from "react";

export const useSendPhoto = () => {
  const [data, setData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const setValues = (file:Blob, { userId="",name="",state="" }) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", file, "img.png");
        fetch(import.meta.env.VITE_MULTIPLAYER_API+`/photos/${userId}&${name}&${state}`, {
            method: "POST",
            body: formData
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
