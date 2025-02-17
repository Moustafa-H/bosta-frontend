'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { Button } from '../ui/button'

export default function SortForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentSort = searchParams.get('sort') || 'category'
  const [sortMethod, setSortMethod] = useState(currentSort)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    router.push(`?sort=${sortMethod}`, { scroll: false })
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-8 p-4 bg-white rounded-xl mb-4">
        <label>
            <input
            type="radio"
            name="sort"
            value="category"
            checked={sortMethod === 'category'}
            onChange={() => setSortMethod('category')}
            />
            &nbsp;Category
        </label>

        <label>
          <input
            type="radio"
            name="sort"
            value="priceAsc"
            checked={sortMethod === 'priceAsc'}
            onChange={() => setSortMethod('priceAsc')}
          />
            &nbsp;Price (Ascending)
        </label>

        <label>
            <input
            type="radio"
            name="sort"
            value="priceDesc"
            checked={sortMethod === 'priceDesc'}
            onChange={() => setSortMethod('priceDesc')}
            />
            &nbsp;Price (Descending)
        </label>

        <Button>Sort</Button>
    </form>
  )
}
