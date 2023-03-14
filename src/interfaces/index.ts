export interface IOrdersDetails {
  id: string
  payment_mode: string
  price_amount: number
  userId: string
  createdAt: string
  code: number
  ProductsOnOrder: {
    productId: string
    orderId: string
    quantify: number
  }[]
  orderStatus: {
    id: string
    title: string
  }
  Adress: {
    bairro: string
    complemento?: string
    cep: string
    id: string
    numero: string
    rua: string
  }
}
