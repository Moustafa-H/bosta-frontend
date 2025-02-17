import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './productCard.module.css'
import { Badge } from '../ui/badge'
import AddToCartButton from '../addToCartButton/addToCartButton'
import { ProductType } from '@/stores/useProductsStore'

const ProductCard = ({ product }: { product: ProductType }) => {
  return (
    <div className={ styles.productCard }>
        <Badge className='absolute top-8 right-4'>{product.category}</Badge>
        <div className={ styles.imgDiv }><Image
            src={ product.image }
            alt='product image'
            width={300}
            height={300}
            className='max-w-[300px] max-h-[300px]'
        /></div>
        <h2 className='mx-4'>{ product.title }</h2>
        <div className='flex justify-evenly items-center w-full'>
          <p className='font-bold'>${ product.price }</p>
          <Link
            href={'/product/' + product.id}
            className='bg-white text-black p-2 rounded-lg transition duration-200 hover:bg-gray-400'
          >
            View Details
          </Link>
        </div>
        <AddToCartButton product={product} />
    </div>
  )
}

export default ProductCard