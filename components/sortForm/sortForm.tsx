'use client'; // Required for Next.js 13+ client components

import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function SortForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

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
    <form onSubmit={handleSubmit} className="flex gap-4 p-4">
        <label>
            <input
            type="radio"
            name="sort"
            value="category"
            checked={sortMethod === 'category'}
            onChange={() => setSortMethod('category')}
            />
            Category
        </label>

        <label>
          <input
            type="radio"
            name="sort"
            value="priceAsc"
            checked={sortMethod === 'priceAsc'}
            onChange={() => setSortMethod('priceAsc')}
          />
            Price (Ascending)
        </label>

        <label>
            <input
            type="radio"
            name="sort"
            value="priceDesc"
            checked={sortMethod === 'priceDesc'}
            onChange={() => setSortMethod('priceDesc')}
            />
            Price (Descending)
        </label>

        <button type="submit">Sort</button>
    </form>
  );
}
