//import Image from 'next/image'
import React from 'react'
import beer from '@/assets/productImages/glasses-beer.jpg'
import { ShoppingCartSimple, Plus, Minus, Image } from 'phosphor-react'
import { useCart } from '@/contexts/CartContext'

interface ProductProps {
  id: number
  name: string
  price: number
  imageUrl: string
}

const ProductCard = (product: ProductProps) => {
  const { cartProducts, increaseCartItem, decreaseCartItem } = useCart()
  const { name, price, id, imageUrl } = product

  const actualProduct = cartProducts.find((product) => product.productId == id)

  const increaseCart = (data: ProductProps) => {
    const { id, name, price, imageUrl } = data

    const productToIncrease = {
      productId: id,
      name,
      price,
      imageUrl,
    }

    increaseCartItem(productToIncrease)
  }

  const decreaseCart = (data: ProductProps) => {
    const { id, name, price, imageUrl } = data

    const productToDecrease = {
      productId: id,
      name,
      price,
      imageUrl,
    }

    decreaseCartItem(productToDecrease)
  }

  return (
    <div className='flex items-start justify-start gap-2 bg-gray-800 rounded-md'>
      <div 
        className='bg-slate-700 rounded-l-md object-cover w-full h-full flex items-center justify-center'
        >
<Image size={32} />
      </div>
{/*       <Image
        src={beer}
        alt='beer glasses'
        width={100}
        height={100}
        className='bg-slate-700 rounded-l-md object-cover h-30'
      /> */}

      <div className='p-3 w-full h-full'>
        <div className='flex flex-col items-start justify-center gap-2'>
          <span className='text-lg font-semibold line-clamp-1'>{name}</span>
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
                  imageUrl,
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
                  imageUrl,
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
                  imageUrl,
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
