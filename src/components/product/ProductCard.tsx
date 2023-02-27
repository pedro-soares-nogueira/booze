import Image from 'next/image'
import React from 'react'
import beer from '@/assets/glasses-beer.jpg'
import { ShoppingCartSimple, Plus, Minus } from 'phosphor-react'
import { useCart } from '@/contexts/CartContext'

interface ProductProps {
  id: number
  name: string
  price: number
}

const ProductCard = (product: ProductProps) => {
  const { cartProducts, increaseCartItem, decreaseCartItem } = useCart()
  const { name, price, id } = product

  const actualProduct = cartProducts.find((product) => product.productId == id)

  const increaseCart = (data: ProductProps) => {
    const { id, name, price } = data

    const productToIncrease = {
      productId: id,
      name,
      price,
    }

    increaseCartItem(productToIncrease)
  }

  const decreaseCart = (data: ProductProps) => {
    const { id, name, price } = data

    const productToDecrease = {
      productId: id,
      name,
      price,
    }

    decreaseCartItem(productToDecrease)
  }

  return (
    <div className='flex items-start justify-start gap-2 bg-gray-800 rounded-md'>
      <Image
        src={beer}
        alt='beer glasses'
        width={100}
        className='bg-slate-700 rounded-l-md object-cover h-30'
      />

      <div className='p-3 w-full h-full'>
        <div className='flex flex-col items-start justify-center gap-2'>
          <span className='text-lg font-semibold line-clamp-1'>
            {name}
          </span>
          <span>R$ {price / 100}</span>
        </div>

        {actualProduct?.quantify === undefined ? (
          <div className='flex flex-col items-end justify-center'>
            <button
              className='rounded-full border-2 border-neutral-300 p-2'
              onClick={() =>
                increaseCart({
                  id,
                  name,
                  price,
                })
              }
            >
              <ShoppingCartSimple size={18} />
            </button>
          </div>
        ) : (
          <div className='flex items-center justify-end gap-3 mt-2'>
            <button
              className='rounded-full border-2 border-neutral-300 p-1'
              onClick={() =>
                increaseCart({
                  id,
                  name,
                  price,
                })
              }
            >
              <Plus size={18} />
            </button>
            <span>{actualProduct?.quantify}</span>
            <button
              className='rounded-full border-2 border-neutral-300 p-1'
              onClick={() =>
                decreaseCart({
                  id,
                  name,
                  price,
                })
              }
            >
              <Minus size={18} />
            </button>
          </div>
        )}
      </div>

    </div>
  )
}

export default ProductCard
