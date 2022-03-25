import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Materiais from './Materiais';

// import { Container } from './styles';

export const deleteMaterial = async (id: number) => {
    await axios.delete("http://localhost:3000/api/materiais", {
        data: {
            id
        }
    });
}

export const postMateriais = async (nome: string, conservado: string, cargo: string) => {
    const response = await axios.post("http://localhost:3000/api/materiais", {
        cargo,
        nome,
        conservado
    })
}

export const editMateriais = async (id: number,nome: string, conservado: string, cargo: string) => {
    const response = await axios.put("http://localhost:3000/api/materiais", {
        id,
        cargo,
        nome,
        conservado
    })
}

const MaterialContainer: React.FC = () => {
    
    const [materiais, setMateriais] = useState<any[]>([])


    const getMateriais = async () => {
        const response =  await axios.get("http://localhost:3000/api/materiais");
        setMateriais((await response).data)
    }


    useEffect(() => {
        getMateriais();
    }
    , [])

    return <Materiais materiais={materiais}/>
}

export default MaterialContainer;