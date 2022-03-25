import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react';
import { deleteCargos, editCargos, postCargos } from '.'

interface IProps {
  cargos: any[]
}

const Cargos: NextPage<IProps> = ({ cargos }) => {
  const router = useRouter();

  const [edit, setEdit] = useState<boolean>(false)
  const [id, setID] = useState<string>('')
  const [cargo, setCargo] = useState<string>('')

  return (
    <div className='w-full h-5/6 flex flex-col justify-center items-center bg-slate-300'>


      <div className="flex justify-center mb-10 w-5/6">
        <form className="w-full max-w-sm">
          <div className="flex items-center border-b border-teal-500 py-2">
            <input value={cargo} onChange={(e) => setCargo(e.target.value)} 
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Pedreiro" />
            <button onClick={() => {
              if(edit){
                editCargos(+id,cargo);
              } else {
                postCargos(cargo);
              }

              //@ts-ignore
              router.reload(window.location.reload)
            }} className="flex-shrink-0 mr-4 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
             {edit ? 'Editar' : 'Adicionar'}
            </button>
            {
              edit ? <button onClick={() => {
                setEdit(false);
                setCargo('');
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
              cargos.map(index => {
                return (
                  <tr className="whitespace-nowrap">
                    <td className="text-center px-6 py-4 text-sm text-gray-500">
                      {index.IDCARGO}
                    </td>
                    <td className="text-center px-6 py-4">
                      <div className="text-sm text-gray-500">
                        {index.DESCRICAO}
                      </div>
                    </td>

                    <td className="text-center px-6 py-4">
                      <a onClick={() => {
                        setEdit(true);
                        setID(index.IDCARGO)
                        setCargo(index.DESCRICAO);
                      }} href="#" className="px-4 py-1 text-sm text-white bg-blue-400 rounded">Editar</a>
                    </td>
                    <td className="text-center px-6 py-4" >
                      <a onClick={async () => {
                        const response = await deleteCargos(index.IDCARGO);
                        if (response === 500) {
                          alert('Erro : Existem funcionários atribuídos a esse cargo')
                        } else {
                          //@ts-ignore
                          router.reload(window.location.reload);
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



    </div>
  )
}

export default Cargos
