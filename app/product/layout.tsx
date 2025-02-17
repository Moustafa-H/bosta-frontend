'use client'

import { useRouter } from "next/navigation"

const SingleProductLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  
  return (
    <>
      <button onClick={() => router.back()} className='fixed top-20 left-8 underline'>
        Back to Products
      </button>
      <section className='w-full flex justify-evenly items-center'>
        {children}
      </section>
    </>
  )
}

export default SingleProductLayout