import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react';
import { deleteCandidatos, editCandidatos, postCandidatos } from '.';

interface IProps {
  candidatos: any[]
}

export interface IPessoa {
  id?: number;
  nome: string;
  idade: string;
  cpf: string;
  rg: string;
  escolaridade: string;
  competencia: string;
  situacao: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  numero: string;
  sexo: string;
  idendereco?: number;
}

const Candidatos: NextPage<IProps> = ({ candidatos }) => {

  const router = useRouter();
  const [seeForm, setSeeForm] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [form, setForm] = useState<IPessoa>({
    nome: '',
    idade: '',
    cpf: '',
    rg: '',
    escolaridade: '',
    competencia: '',
    situacao: '',
    logradouro: '',
    complemento: '',
    bairro: '',
    numero: '',
    sexo: '',
  })

  return (
    <div className='w-full h-5/6 flex flex-col justify-center items-center bg-slate-300'>
      {
        !seeForm ?
          <>
            <div className='mb-8 flex justify-end w-5/6'>
              <a href="#" onClick={() => setSeeForm(true)} className="px-4 py-1 text-sm text-white bg-green-500 rounded">Criar servidor</a>
            </div>

            <div className='w-5/6 h-1/2  overflow-y-auto scroll-m-4'>
              <table className='w-full'>
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-2 text-xs text-gray-500">
                      ID
                    </th>
                    <th className="px-6 py-2 text-xs text-gray-500">
                      Nome
                    </th>
                    <th className="px-6 py-2 text-xs text-gray-500">
                      Idade
                    </th>
                    <th className="px-6 py-2 text-xs text-gray-500">
                      CPF
                    </th>
                    <th className="px-6 py-2 text-xs text-gray-500">
                      Sexo
                    </th>
                    <th className="px-6 py-2 text-xs text-gray-500">
                      Escolaridade
                    </th>
                    <th className="px-6 py-2 text-xs text-gray-500">
                      Situação militar
                    </th>
                    <th className="px-6 py-2 text-xs text-gray-500">
                      Competências
                    </th>
                    <th className="px-6 py-2 text-xs text-gray-500">
                      Edit
                    </th>
                    <th className="px-6 py-2 text-xs text-gray-500">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {
                    //@ts-ignore
                    candidatos.map(index => {
                      return (
                        <tr className="whitespace-nowrap">
                          <td className="text-center px-6 py-4 text-sm text-gray-500">
                            {index.IDCANDIDATO}
                          </td>
                          <td className="text-center px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {index.NOME}
                            </div>
                          </td>
                          <td className="text-center px-6 py-4">
                            <div className="text-sm text-gray-500">
                              {index.IDADE}
                            </div>
                          </td>
                          <td className="text-center px-6 py-4 text-sm text-gray-500">
                            {index.CPF}
                          </td>
                          <td className="text-center px-6 py-4 text-sm text-gray-500">
                            {index.SEXO === 'm' ? 'Masculino' : 'Feminino'}
                          </td>
                          <td className="text-center px-6 py-4 text-sm text-gray-500">
                            {index.ESCOLARIDADE}
                          </td>
                          <td className="text-center px-6 py-4 text-sm text-gray-500">
                            {index.SITUACAOMILITAR}
                          </td>
                          <td className="text-center px-6 py-4 text-sm text-gray-500">
                            {index.COMPETENCIAS}
                          </td>
                          <td className="text-center px-6 py-4">
                            <a href="#"  
                            onClick={() => {
                              setEdit(true);
                              setForm({
                                id:index.IDCANDIDATO,
                                nome: index.NOME,
                                idade: index.IDADE,
                                cpf: index.CPF,
                                rg: index.RG,
                                escolaridade: index.ESCOLARIDADE,
                                competencia: index.COMPETENCIAS,
                                situacao: index.SITUACAOMILITAR,
                                logradouro: index.LOGRADOURO,
                                complemento: index.COMPLEMENTO,
                                bairro: index.BAIRRO,
                                numero: index.NUMERO,
                                sexo: index.SEXO,
                                idendereco: index.IDENDERECO
                              });

                              setSeeForm(true);
                            }}
                            className="px-4 py-1 text-sm text-white bg-blue-400 rounded">Editar</a>
                          </td>
                          <td className="text-center px-6 py-4">
                            <a onClick={async () => {
                              const status = await deleteCandidatos(index.IDCANDIDATO);
                              if (status === 500) {
                                alert('O candidato ja fez a inscrição ! Não pode ser apagado .')
                              } else {
                                //@ts-ignore
                                router.reload(window.location.pathname);
                              }

                            }} href="#" className="px-4 py-1 text-sm text-white bg-red-400 rounded">Deletar</a>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </> :
          <div className="w-full max-w-2xl">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h2 className='text-lg'>Dados Pessoais</h2>
              <div className='flex justify-between'>
                <div className="mb-4">
                  <input className="shadow appearance-none border rounded w-full
                   py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text" placeholder="Nome" onChange={e => setForm({
                      ...form,
                      nome: e.target.value
                    })} value={form.nome} />
                </div>
                <div className="mb-4">
                  <input className="shadow appearance-none border rounded w-full
                   py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder='Idade' value={form.idade} onChange={e => setForm({
                      ...form,
                      idade: e.target.value
                    })} />
                </div>
              </div>
              <div className='flex justify-between'>
                <div className="mb-4">
                  <input className="shadow appearance-none border rounded w-full
                   py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text" placeholder="CPF" value={form.cpf} onChange={e => setForm({
                      ...form,
                      cpf: e.target.value
                    })} />
                </div>
                <div className="mb-4">
                  <input className="shadow appearance-none border rounded w-full
                   py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder='RG' value={form.rg} onChange={e => setForm({
                      ...form,
                      rg: e.target.value
                    })} />
                </div>
              </div>
              <div className='flex justify-between'>
                <div className="mb-4">
                  <input className="shadow appearance-none border rounded w-full
                   py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text" placeholder="Escolaridade" value={form.escolaridade} onChange={e => setForm({
                      ...form,
                      escolaridade: e.target.value
                    })} />
                </div>
                <div className="mb-4">
                  <input className="shadow appearance-none border rounded w-full
                   py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder='Situação militar' value={form.situacao} onChange={e => setForm({
                      ...form,
                      situacao: e.target.value
                    })} />
                </div>
              </div>
              <div className='flex justify-between'>
                <div className="mb-4">
                  <input className="shadow appearance-none border rounded w-full
                   py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text" placeholder="Sexo : 'M' OU 'F'" value={form.sexo} onChange={e => setForm({
                      ...form,
                      sexo: e.target.value
                    })} />
                </div>
                <div className="mb-1">
                  <input className="shadow appearance-none border rounded w-full
                   py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder='Competencia' value={form.competencia} onChange={e => setForm({
                      ...form,
                      competencia: e.target.value
                    })} />
                </div>

              </div>


              <h2 className='text-lg'>Endereço</h2>
              <div className='flex justify-between'>
                <div className="mb-4">
                  <input className="shadow appearance-none border rounded w-full
                   py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text" placeholder="Logradouro" value={form.logradouro} onChange={e => setForm({
                      ...form,
                      logradouro: e.target.value
                    })} />
                </div>
                <div className="mb-4">
                  <input className="shadow appearance-none border rounded w-full
                   py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder='Numero' value={form.numero} onChange={e => setForm({
                      ...form,
                      numero: e.target.value
                    })} />
                </div>
              </div>
              <div className='flex justify-between'>
                <div className="mb-4">
                  <input className="shadow appearance-none border rounded w-full
                   py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text" placeholder="Complemento" value={form.complemento} onChange={e => setForm({
                      ...form,
                      complemento: e.target.value
                    })} />
                </div>
                <div className="mb-4">
                  <input className="shadow appearance-none border rounded w-full
                   py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder='Bairro' value={form.bairro} onChange={e => setForm({
                      ...form,
                      bairro: e.target.value
                    })} />
                </div>
              </div>

              <div className="flex items-center justify-start">
                <button
                  onClick={() => {
                    if(edit){
                      editCandidatos(form)
                    } else {
                      postCandidatos(form);
                    }
                    //@ts-ignore
                    router.reload(window.location.pathname);
                  }}
                  className="mr-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                  {edit ? 'Editar' : "Salvar"}
                </button>
                <button onClick={() => {
                  setSeeForm(false)

                  setForm({
                    id: +'',
                    nome: '',
                    idade: '',
                    cpf: '',
                    rg: '',
                    escolaridade: '',
                    competencia: '',
                    situacao: '',
                    logradouro: '',
                    complemento: '',
                    bairro: '',
                    numero: '',
                    sexo: '',
                  })

                }} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
      }
    </div>
  )
}

export default Candidatos
