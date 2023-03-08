import { ImageLoaderProps } from 'next/image'

export const googleImageLoader = ({ src }: ImageLoaderProps) => {
  return `lh3.googleusercontent.com/${src}`
}
