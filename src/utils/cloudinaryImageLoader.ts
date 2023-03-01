import { ImageLoaderProps } from 'next/image'

export const cloudinaryImageLoader = ({ src }: ImageLoaderProps) => {
  return `https://res.cloudinary.com/dclhkn1wm/image/upload/${src}`
}
