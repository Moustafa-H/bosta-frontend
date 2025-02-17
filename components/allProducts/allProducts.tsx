'use client'

import ProductCard from "../productCard/productCard"
import { useSearchParams } from "next/navigation"
import SortForm from "../sortForm/sortForm"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Dispatch, SetStateAction, Suspense, useEffect, useState } from "react"
import MoonLoader from "react-spinners/MoonLoader"
import { useProductStore } from "@/stores/useProductsStore"

const itemsPerPage = 10

export default function AllProducts() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Content />
    </Suspense>
  )
}

const Content = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { products, setProducts } = useProductStore()

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products')
      setProducts(await response.json())
    } catch (error) {
      setError('Error fetching products, please try again later')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts()
    } else {
      setLoading(false)
    }
  }, [products, setLoading])
  
  const searchParams = useSearchParams()
  const sortParam = searchParams.get("sort")

  const sortedProducts = [...products].sort((a, b) => {
    if (sortParam === "priceAsc") return a.price - b.price
    if (sortParam === "priceDesc") return b.price - a.price
    return a.category.localeCompare(b.category)
  })

  const [startIndex, setStartIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(itemsPerPage)

  if (loading)
    return <MoonLoader />
  else if (error.length > 0)
    return <>{error}</>
  else
    return (
      <>
        <SortForm />

        <PaginationComponent
          startIndex={startIndex}
          endIndex={endIndex}
          setStartIndex={setStartIndex}
          setEndIndex={setEndIndex}
          productsLen={products.length}
        />

        { products.length === 0 ?
          <>No products found.</>
        :
          <ul className="flex flex-wrap justify-evenly items-start gap-16 p-8">
            {sortedProducts.slice(startIndex, endIndex).map((product: any) => (
              <li key={product.id}>
                <ProductCard product={ product } />
              </li>
            ))}
          </ul>
        }

        <PaginationComponent
          startIndex={startIndex}
          endIndex={endIndex}
          setStartIndex={setStartIndex}
          setEndIndex={setEndIndex}
          productsLen={products.length}
        />
      </>
    )
}

const PaginationComponent = ({
  startIndex,
  endIndex,
  setStartIndex,
  setEndIndex,
  productsLen,
}: {
  startIndex: number
  endIndex: number
  setStartIndex: Dispatch<SetStateAction<number>>
  setEndIndex: Dispatch<SetStateAction<number>>
  productsLen: number
}) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={ startIndex === 0 ? 'pointer-events-none' : 'cursor-pointer' }
            onClick={() => {
              setStartIndex(prev => prev - itemsPerPage)
              setEndIndex(prev => prev - itemsPerPage)
            }}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className={ endIndex >= productsLen ? 'pointer-events-none' : 'cursor-pointer' }
            onClick={() => {
              setStartIndex(prev => prev + itemsPerPage)
              setEndIndex(prev => prev + itemsPerPage)
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}