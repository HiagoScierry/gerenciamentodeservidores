import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Servidores, { IServidor } from './Servidores';

export const deleteServidores = async (id: number) => {
    await axios.delete("http://localhost:3000/api/servidores", {
        data: {
            id
        }
    });
}

export const postServidores = async (form: IServidor) => {
    await axios.post("http://localhost:3000/api/servidores", {
       form
    });
}

export const editServidores = async (form: IServidor) => {
    await axios.put("http://localhost:3000/api/servidores", {
       form
    });
}

const MaterialContainer: React.FC = () => {
    const [servidores, setServidores] = useState<any>([]);

    const getServidores = async () => {
        const response = await axios.get("http://localhost:3000/api/servidores")
        setServidores(response.data)
    }


    useEffect(() => {
        getServidores();
    }, [])


    return <Servidores servidores={servidores} />
}

export default MaterialContainer;