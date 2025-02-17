'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useUserStore } from '@/stores/useUserStore'
import { parseCookies } from 'nookies'

const Navbar = () => {
  const [loading, setLoading] = useState(true)
  const { username, setUsername } = useUserStore()

  useEffect(() => {
    if (username.length === 0) {
      const foundUsername = parseCookies().token
      if (foundUsername)
        setUsername(foundUsername)
    }
    setLoading(false)
  }, [username, setUsername, setLoading])
  
  return (
    <header className='fixed top-0 left-0 w-screen h-[60px] bg-gray-600 text-white flex justify-evenly items-center z-50'>
      <Link href='/'>Home</Link>

      <div className='flex gap-8'>
        <Link href='/create'>Create Product</Link>
        <Link href='/cart'>Cart</Link>
      </div>
      
      <div className='flex gap-8'>
        { loading ? <>&nbsp;</> : username.length > 0 ?
          <>
            <p className='text-red-100'>{ username }</p>
            <Link href='/logout'>Logout</Link>
          </>
        :
          <>
            <Link href='/login'>Login</Link>
            <Link href='/signup'>Signup</Link>
          </>
        }
      </div>
    </header>
  )
}

export default Navbar