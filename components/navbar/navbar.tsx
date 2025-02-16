'use client'

import styles from './navbar.module.css'
import Link from 'next/link'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { ChevronLeft, MenuIcon } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'

const Navbar = () => {
  const router = useRouter()
  const pathname = usePathname()
  
  return (
    <header className={ styles.navbar }>
      <Link href='/' className={ styles.navLink }>Home</Link>
    </header>
  )
}

export default Navbar