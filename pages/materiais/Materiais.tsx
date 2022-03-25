import type { NextPage } from 'next'
import { deleteMaterial, editMateriais, postMateriais } from '.'
import { useRouter } from 'next/router';
import { useState } from 'react';


interface IProps {
  materiais: any[]
}

interface IMaterial {
  id?: number;
  emprestimo?: Date;
  conservado: string;
  nomematerial: string;
  locado?: string;
  devolucao?: Date;
  cargo: string;
}

const Materiais: NextPage<IProps> = ({ materiais }) => {
  const router = useRouter();

  const [edit, setEdit] = useState<boolean>(false)
  const [material, setMaterial] = useState<IMaterial>({
    conservado: "",
    cargo: "",
    nomematerial: ""
  })

  return (
    <div className='w-full h-5/6 flex flex-col justify-center items-center bg-slate-300'>
      <>
        <div className='w-5/6 flex justify-center mb-8'>
          <form className="w-full max-w-2xl">
            <div className="flex items-center py-2">
              <input
                className=" m-2 bg-gray-200 appearance-none border-2 border-gray-200
                 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none 
                 focus:bg-white focus:border-purple-500"
                type="text" onChange={(e) => setMaterial({...material, nomematerial: e.target.value })} value={material.nomematerial} placeholder="Nome" />
              <input
                className=" m-2 bg-gray-200 appearance-none border-2 border-gray-200
                 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none 
                 focus:bg-white focus:border-purple-500"
                type="text" onChange={(e) => setMaterial({...material, conservado: e.target.value })} value={material.conservado} placeholder="Conservado" />
              <input
                className=" m-2 bg-gray-200 appearance-none border-2 border-gray-200
                 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none 
                 focus:bg-white focus:border-purple-500"
                type="text" onChange={(e) => setMaterial({...material, cargo: e.target.value })} value={material.cargo} placeholder="ID Cargo" />
              <button onClick={() => {
                if (edit) {
                  //@ts-ignore
                  editMateriais(+material.id,material.nomematerial, material.conservado,material.cargo)

                } else {
                  postMateriais(material.nomematerial, material.conservado,material.cargo)
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
                  Nome
                </th>
                <th className="px-6 py-2 text-xs text-gray-500">
                  Data Empréstimo
                </th>
                <th className="px-6 py-2 text-xs text-gray-500">
                  Data Devolução
                </th>
                <th className="px-6 py-2 text-xs text-gray-500">
                  Conservado
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
                materiais.map(index => {
                  return (
                    <tr className="whitespace-nowrap">
                      <td className="text-center px-6 py-4 text-sm text-gray-500">
                        {index.IDMATERIAL}
                      </td>
                      <td className="text-center px-6 py-4">
                        <div className="text-sm text-gray-500">
                          {index.NOMEMATERIAL}
                        </div>
                      </td>
                      <td className="text-center px-6 py-4">
                        <div className="text-sm text-gray-500">
                          {index.DATAEMPRESTIMO ? new Date(index.DATAEMPRESTIMO).toLocaleDateString('pt-br') : ""}
                        </div>
                      </td>
                      <td className="text-center px-6 py-4">
                        <div className="text-sm text-gray-500">
                          {index.DATADEVOLUCAO ? new Date(index.DATADEVOLUCAO).toLocaleDateString('pt-br') : ''}
                        </div>
                      </td>
                      <td className="text-center px-6 py-4 text-sm text-gray-500">
                        {index.ESTADOCONSERVADO}
                      </td>
                      <td className="text-center px-6 py-4">
                        <a href="#" 
                        onClick={() => {
                          setEdit(true);
                          setMaterial({
                            id: index.IDMATERIAL,
                            nomematerial: index.NOMEMATERIAL,
                            conservado: index.ESTADOCONSERVADO,
                            cargo: index.IDCARGO,
                          })
                        }}
                        className="px-4 py-1 text-sm text-white bg-blue-400 rounded">Editar</a>
                      </td>
                      <td className="text-center px-6 py-4" >
                        <a href="#" onClick={() => {
                          deleteMaterial(index.IDMATERIAL);
                          //@ts-ignore
                          router.reload(window.location.pathname);
                        }} className="px-4 py-1 text-sm text-white bg-red-400 rounded">Deletar</a>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </>


    </div>
  )
}

export default Materiais
