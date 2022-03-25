import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cargos from './Cargos';


export const deleteCargos = async (id: number): Promise<Number> => {
    try {
        const response = await axios.delete("http://localhost:3000/api/cargos", {
            data: {
                id
            }
        });

        return response.status
    } catch (error) {
        return 500

    }
}

export const postCargos = async (cargo : string) => {
    const response = await axios.post("http://localhost:3000/api/cargos", {
        cargo
    })
}

export const editCargos = async (id:number,cargo : string) => {
    const response = await axios.put("http://localhost:3000/api/cargos", {
        id,
        cargo
    })
}

const CargosContainer: React.FC = () => {
    const [cargos, setCargos] = useState<any[]>([])

    const getCargos = async () => {
        const response = await axios.get("http://localhost:3000/api/cargos");
        setCargos(response.data)
    }


    useEffect(() => {
        getCargos();
    }, [])

    return <Cargos cargos={cargos} />
}

export default CargosContainer;