import { api } from "@/lib/axios"
import { IOrdersDetails } from "@/interfaces"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export interface OrdersType {
  orders: IOrdersDetails[]
  loading: boolean
}

const initialState = {
  orders: [],
  loading: false,
} as OrdersType

const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  try {
    const orders = await api.get("/order/gettingAll")
    return orders.data.orders
  } catch (error) {
    console.log(error)
  }
})

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload
      state.loading = false
    })
    builder.addCase(fetchOrders.rejected, () => {
      console.log("ExtraReducer - rejected")
    })
  },
})

export const ordersActions = { fetchOrders }
export default orderSlice.reducer
