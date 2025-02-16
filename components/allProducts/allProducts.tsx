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
import { useState } from "react"

export default function AllProducts({products}: {products: any}) {
  const searchParams = useSearchParams()
  const sortParam = searchParams.get("sort")

  const sortedProducts = [...products].sort((a, b) => {
    if (sortParam === "priceAsc") return a.price - b.price
    if (sortParam === "priceDesc") return b.price - a.price
    return a.category.localeCompare(b.category)
  })

  const itemsPerPage = 5
  const [startIndex, setStartIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(5)

  return (
    <>
    <SortForm />

    <ul className="flex flex-wrap justify-evenly items-start gap-16 p-8">
      {sortedProducts.slice(startIndex, endIndex).map((product: any) => (
        <li key={product.id}>
          <ProductCard
            id={product.id}
            category={product.category}
            imgSrc={product.image}
            name={product.title}
            price={product.price}
          />
        </li>
      ))}
    </ul>

    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              setStartIndex(prev => prev - itemsPerPage)
              setEndIndex(prev => prev - itemsPerPage)
            }}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={() => {
              setStartIndex(prev => prev + itemsPerPage)
              setEndIndex(prev => prev + itemsPerPage)
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
    </>
  )
}