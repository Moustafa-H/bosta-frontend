import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './productCard.module.css'
import { Badge } from '../ui/badge'

const ProductCard = ({
    id,
    category,
    imgSrc,
    name,
    price,
}: {
    id: number
    category: string
    imgSrc: string
    name: string
    price: number
}) => {
  return (
    <div className={ styles.productCard }>
        <Badge className='absolute top-8 right-4'>{category}</Badge>
        <div className={ styles.imgDiv }><Image
            src={ imgSrc }
            alt='product image'
            width={300}
            height={300}
            className='max-w-[300px] max-h-[300px]'
        /></div>
        <h2 className='mx-4'>{ name }</h2>
        <div className='flex justify-evenly items-center w-full'>
          <p>${ price }</p>
          <Link
            href={'/product/' + id}
            className='bg-white text-black p-2 rounded-lg transition duration-200 hover:bg-gray-400'
          >
            View Details
          </Link>
        </div>
    </div>
  )
}

export default ProductCard