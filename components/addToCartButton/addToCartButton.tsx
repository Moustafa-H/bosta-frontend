import React from 'react'
import { Button } from '../ui/button'
import { useCartStore } from '@/stores/useCartStore'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { ProductType } from '@/stores/useProductsStore'

const AddToCartButton = ({product}: {product: ProductType}) => {
    const { items, setItems, setQuantity } = useCartStore()
    const router = useRouter()
    
    return (
        <Button
            className='self-center'
            onClick={() => {
                const existingItem = items.find((item) => item.product.id === product.id)
                if (existingItem)
                    setQuantity(product.id, existingItem.quantity + 1)
                else
                    setItems([...items, { product, quantity: 1 }])
                toast("Product Was Added To Your Cart", {
                    action: {
                        label: "View Cart",
                        onClick: () => router.push('/cart'),
                    },
                })
            }}
        >
            Add To Cart
        </Button>
    )
}

export default AddToCartButton