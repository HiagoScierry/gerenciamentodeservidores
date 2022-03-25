import type { NextPage } from 'next'
import { useEffect } from 'react'
const Home: NextPage = () => {

  const get = async () => {
    const response = await fetch('http://localhost:3000/api/hello')
    console.log(await response.json());
  }

  useEffect(() => {
    get()
  }, [])

  return (
      <div className='w-full h-5/6 flex flex-col justify-center items-center bg-slate-300'>
        <h2 className='text-4xl'>Bem vindo ao Portal de servidores</h2>
        <h2 className='text-xl mt-5'>Por favor utilize a navegação acima para ir aos diversos locais do site</h2>
      </div>
  )
}

export default Home
