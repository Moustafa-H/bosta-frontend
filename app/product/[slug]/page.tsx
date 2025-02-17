'use client'

import Image from "next/image"
import { useEffect, useState } from "react"
import MoonLoader from "react-spinners/MoonLoader"
import { Badge } from "@/components/ui/badge"
import { ProductType, useProductStore } from "@/stores/useProductsStore"
import AddToCartButton from "@/components/addToCartButton/addToCartButton"

const SingleProduct = ({
  params
}: {
  params: Promise<{ slug: string }>
}) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const getProductById = useProductStore((state) => state.getProductById)
  const [product, setProduct] = useState<ProductType>()

  const fetchProduct = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${(await params).slug}`)
      setProduct(await response.json())
    } catch (error) {
      setError('Error fetching product, please try again later')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const init = async () => {
      const foundProduct = getProductById(Number((await params).slug))
      if (foundProduct) {
        setProduct(foundProduct)
        setLoading(false)
      } else {
        fetchProduct()
      }
    }
    init()
  }, [setProduct, setLoading])
  
  if (loading)
    return <MoonLoader />
  else if (error.length > 0)
    return <>{error}</>
  else if (product)
    return (
      <>
        <div className='min-w-[600px] min-h-[600px] bg-white rounded-2xl flex justify-center items-center p-4'><Image
          src={product.image}
          alt='product image'
          width={400}
          height={400}
        /></div>
        
        <div className='w-1/3 flex flex-col justify-center items-start gap-8'>
          <Badge>{product.category}</Badge>
          <h1 className='text-3xl'>{product.title}</h1>
          <p className='text-lg'>{product.description}</p>
          <p className='text-2xl'>${product.price}</p>
          <AddToCartButton product={product} />
        </div>
      </>
    )
  else
    return <>Product Not Found.</>
}

export default SingleProduct