import { useState } from "react";

export const useDownloadImages = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const downloadImages = async (keys: string[]) => {
        setLoading(true);
        const response = await fetch(import.meta.env.VITE_MULTIPLAYER_API+'/downloadImages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ keys })
        });
        // Asegurarse de que la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`Error en el servidor: ${response.statusText}`);
        }
        // Obtener el blob del archivo y crear un enlace de descarga
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'imagenes.zip';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        setLoading(false);
    }
  return {
    loading,
    downloadImages
  }
}
