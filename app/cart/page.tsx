'use client'

import Image from 'next/image'
import { useCartStore } from '@/stores/useCartStore'

const CartPage = () => {
  const { items, setItems, setQuantity, getTotal } = useCartStore()

  const handleDecrement = (id: number, newQuantity: number) => {
    if (newQuantity > 0) {
      setQuantity(id, newQuantity)
    } else {
      setItems(items.filter(item => item.product.id !== id))
    }
  }
  
  if (items.length === 0)
    return <p className='text-2xl'>Your Cart is empty.</p>
  else
    return (
      <ul className='flex flex-col items-start gap-8 px-4'>
        {items.map((item, index) => (
          <li key={index} className='flex items-center gap-8'>
            <div className='bg-white rounded-2xl w-[150px] h-[150px] flex justify-center items-center'>
              <Image
                src={ item.product.image }
                alt='product image'
                width={100}
                height={100}
                className=' rounded-3xl'
              />
            </div>
            
            <section>
              
              <p>Product ID: { item.product.title }</p>

              <section className='flex items-center gap-4'>
                <p>${ item.product.price * item.quantity }</p>
                <div className='flex gap-4 items-center'>
                  <button
                    onClick={() => handleDecrement(item.product.id, item.quantity - 1)}
                    className='bg-white rounded-full w-8 h-8'
                  >
                    -
                  </button>
                  
                  <p>{ item.quantity }</p>
                  
                  <button
                    onClick={() => handleDecrement(item.product.id, item.quantity + 1)}
                    className='bg-white rounded-full w-8 h-8'
                  >
                    +
                  </button>
                </div>
              </section>
              
            </section>
          </li>
        ))}
        <li className='text-2xl'>Cart Total: ${ getTotal() }</li>
      </ul>
    )
}

export default CartPage