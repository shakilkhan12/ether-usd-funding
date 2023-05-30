import { ConnectWallet } from '@thirdweb-dev/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Sidebar from './Sidebar'
const Navbar = () => {

  return (
    <nav className='w-full border-b'>
        <div className='max-w-screen-xl mx-auto flex items-center h-16 justify-between space-x-5'>  
            <Link href='/' className='relative w-10 h-10 block'>
             <Image src="/logo.png" fill className='w-full h-full object-contain' alt='logo' />
            </Link>
           <div className='flex space-x-5 items-center'>
           <Sidebar />
           <ConnectWallet />
           </div>  
        </div>
    </nav>
  )
}

export default Navbar