import { useState } from "react";
import { genSaltSync, hashSync } from "bcrypt-ts";
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
            const { success } = _data;
            if(success) {
                const salt = genSaltSync(12);
                //const hashPassword = (password) ? bcrypt.hashSync(password, salt) : "";
                const hashEmail = hashSync(email, salt);
                const hashPassword = hashSync(password, salt);
                window.localStorage.setItem("credPassword", hashPassword);
                window.localStorage.setItem("credEmail", hashEmail);
                setData(_data);
                setLoading(false);
            }
        });
    }
  return {
    data,
    loading,
    setValues
  }
}
