import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Candidatos, { IPessoa } from './Candidatos';

// import { Container } from './styles';

export const deleteCandidatos = async (id:number) : Promise<Number> => {
  try {
    await axios.delete('http://localhost:3000/api/candidatos',{
        data:{
            id
        }
    })

    return 200;
  } catch (error) {
      return 500;
  }
}

export const postCandidatos = async (form: IPessoa) => {
    await axios.post('http://localhost:3000/api/candidatos', {
        form
    })
}

export const editCandidatos = async (form: IPessoa) => {
    await axios.put('http://localhost:3000/api/candidatos', {
        form
    })
}


const CandidatosContainer: React.FC = () => {
    const [candidatos, setCandidatos] = useState<any[]>([])

    const getCandidatos = async () => {
        const response =  await axios.get("http://localhost:3000/api/candidatos");
        setCandidatos(response.data)
    }


    useEffect(() => {
        getCandidatos();
    }, [])


    return <Candidatos candidatos={candidatos}/>
}

export default CandidatosContainer;