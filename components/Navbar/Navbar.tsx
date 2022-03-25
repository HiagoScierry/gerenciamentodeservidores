import type { NextPage } from 'next'
import Link from 'next/link'
import { INavBar } from '.'



const NavBar: NextPage<INavBar> = ({title, navigation}) => {

  return (
    <div className='h-1/6 flex justify-between items-center p-4 bg-slate-500'>

        <Link href={'/'}>
          <h2 className='text-2xl cursor-pointer'>{title}</h2>
        </Link>

        <ul className='list-none'>
          {navigation.map(index => (
            <Link key={index.route} href={index.route}>
            <li className='cursor-pointer inline p-4 rounded-md hover:bg-slate-600'>
              {index.name}
            </li>
            </Link>
          ))}
        </ul>
    </div>
  )
}

export default NavBar
