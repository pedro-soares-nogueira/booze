import Image, { ImageLoaderProps } from 'next/image'
import React from 'react'
import beer from '@/assets/productImages/glasses-beer.jpg'
import { ShoppingCartSimple, Plus, Minus } from 'phosphor-react'
import { useCart } from '@/contexts/CartContext'
import { priceFormatter } from '@/utils/formatter'
import { cloudinaryImageLoader } from '@/utils/cloudinaryImageLoader'

interface ProductProps {
  id: string
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

  const priceformated = priceFormatter.format(price / 100)

  return (
    <div className='flex items-center justify-center gap-2 bg-neutral-700 rounded-md w-full h-full overflow-hidden'>
      <div className='bg-slate-700 rounded-l-md relative w-56 h-36'>
        <Image
          loader={cloudinaryImageLoader}
          src={imageUrl}
          alt='beer glasses'
          fill
          priority
          className="object-cover"
          sizes="auto"

        />
      </div>
      <div className='p-3 w-full h-full'>
        <div className='flex flex-col items-start justify-center gap-2'>
          <span className='text-lg font-semibold line-clamp-1'>{name}</span>
          <span>R$ {priceformated}</span>
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
            <span>{actualProduct?.quantify}</span>
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
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductCard
