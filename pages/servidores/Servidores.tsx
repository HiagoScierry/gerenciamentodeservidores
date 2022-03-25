import React, { useState } from 'react';
import { NextPage } from 'next';
import { deleteServidores, editServidores, postServidores } from '.';
import { useRouter } from 'next/router';

interface IProps {
  servidores: any[];
}

export interface IServidor {
  id: string;
  servidor: string;
  CTPS: string;
  cargo: string;
}

const Servidores: NextPage<IProps> = ({ servidores }) => {
  const router = useRouter();

  const [edit, setEdit] = useState<boolean>(false)
  const [servidor, setServidor] = useState<IServidor>({
    id: '',
    CTPS: '',
    cargo: '',
    servidor: ''
  })

  return (
    <div className='w-full h-5/6 flex flex-col justify-center items-center bg-slate-300'>

      <div className="flex justify-center mb-10 w-5/6">
        <form className="w-full max-w-2xl">
          <div className="flex items-center py-2">
            <input
              className=" m-2 bg-gray-200 appearance-none border-2 border-gray-200
                 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none 
                 focus:bg-white focus:border-purple-500"
              type="text" onChange={(e) => setServidor({ ...servidor, id: e.target.value })} 
               value={servidor.id} placeholder="ID Candidato" />
            <input
              className=" m-2 bg-gray-200 appearance-none border-2 border-gray-200
                 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none 
                 focus:bg-white focus:border-purple-500"
              type="text" onChange={(e) => setServidor({ ...servidor, servidor: e.target.value })} 
               value={servidor.servidor} placeholder="Servidor" />
            <input
              className=" m-2 bg-gray-200 appearance-none border-2 border-gray-200
                 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none 
                 focus:bg-white focus:border-purple-500"
              type="text" onChange={(e) => setServidor({ ...servidor, CTPS: e.target.value })} 
               value={servidor.CTPS} placeholder="CTPS" />
            <input
              className=" m-2 bg-gray-200 appearance-none border-2 border-gray-200
                 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none 
                 focus:bg-white focus:border-purple-500"
              type="text" onChange={(e) => setServidor({ ...servidor, cargo: e.target.value })} 
               value={servidor.cargo} placeholder="ID Cargo" />
            <button onClick={() => {
              if (edit) {
                editServidores(servidor)
              } else {
                postServidores(servidor)
              }

              //@ts-ignore
              router.reload(window.location.reload)
            }} className="flex-shrink-0 mr-4 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
              {edit ? 'Editar' : 'Adicionar'}
            </button>
            {
              edit ? <button onClick={() => {
                setEdit(false);
              }} className="flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
                Cancelar
              </button> : <></>
            }
          </div>
        </form>
      </div>

      <div className='w-5/6 h-1/2  overflow-y-auto scroll-m-4'>
        <table className='w-full'>
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-2 text-xs text-gray-500">
                ID
              </th>
              <th className="px-6 py-2 text-xs text-gray-500">
                CTPS
              </th>
              <th className="px-6 py-2 text-xs text-gray-500">
                Nome
              </th>
              <th className="px-6 py-2 text-xs text-gray-500">
                Cargo
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
              servidores.map(index => {
                return (
                  <tr className="whitespace-nowrap">
                    <td className="text-center px-6 py-4 text-sm text-gray-500">
                      {index.IDSERVIDOR}
                    </td>
                    <td className="text-center px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {index.CTPS}
                      </div>
                    </td>
                    <td className="text-center px-6 py-4">
                      <div className="text-sm text-gray-500">
                        {index.NOME}
                      </div>
                    </td>
                    <td className="text-center px-6 py-4 text-sm text-gray-500">
                      {index.CARGO}
                    </td>
                    <td className="text-center px-6 py-4">
                      <a href="#" 
                      onClick={() => {
                        setServidor({
                          id: index.IDPESSOA,
                          CTPS: index.CTPS,
                          cargo: index.IDCARGO,
                          servidor: index.IDENTIFICACAO_SERVIDOR
                        })

                        setEdit(true)
                      }}
                      className="px-4 py-1 text-sm text-white bg-blue-400 rounded">Editar</a>
                    </td>
                    <td className="text-center px-6 py-4" >
                      <a onClick={() => {
                        deleteServidores(index.IDSERVIDOR);
                        //@ts-ignore
                        router.reload(window.location.pathname);
                      }} href="#" className="px-4 py-1 text-sm text-white bg-red-400 rounded">Deletar</a>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Servidores
