import AllProducts from '@/components/allProducts/allProducts'
import styles from './home.module.css'

export default async function HomePage() {
  const data = await fetch('https://fakestoreapi.com/products')
  const products = await data.json()
  
  return (
    <main className={ styles.main }>
      <AllProducts products={products} />
    </main>
  )
}