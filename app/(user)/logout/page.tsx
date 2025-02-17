'use client'

import { useCartStore } from '@/stores/useCartStore'
import { useUserStore } from '@/stores/useUserStore'
import { useRouter } from 'next/navigation'
import { destroyCookie } from 'nookies'
import { useEffect } from 'react'

const Logout = () => {
    const router = useRouter()
    const { setUsername } = useUserStore()
    const { setItems } = useCartStore()

    useEffect(() => {
        destroyCookie(null, 'token')
        setUsername('')
        setItems([])
        router.replace('/')
    }, [router, destroyCookie])
}

export default Logout