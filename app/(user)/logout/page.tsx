'use client'

import { useUserStore } from '@/stores/useUserStore'
import { useRouter } from 'next/navigation'
import { destroyCookie } from 'nookies'
import { useEffect } from 'react'

const Logout = () => {
    const router = useRouter()
    const { setUsername } = useUserStore()

    useEffect(() => {
        destroyCookie(null, 'token')
        setUsername('')
        router.replace('/')
    }, [router, destroyCookie])
}

export default Logout