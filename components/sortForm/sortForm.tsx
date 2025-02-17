'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { Button } from '../ui/button'

export default function SortForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get current sorting method from the URL
  const currentSort = searchParams.get('sort') || 'category';

  // State to track the selected sorting method
  const [sortMethod, setSortMethod] = useState(currentSort);

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // Prevent page reload
    router.push(`?sort=${sortMethod}`, { scroll: false });
  };

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
  );
}
