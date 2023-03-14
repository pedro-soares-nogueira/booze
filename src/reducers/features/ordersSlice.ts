import { api } from "@/lib/axios"
import { IOrdersDetails, IOrderStatus } from "@/interfaces"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export interface OrdersType {
  orders: IOrdersDetails[]
  statusOnOrder: IOrderStatus[]
  loading: boolean
}

const initialState = {
  orders: [],
  statusOnOrder: [],
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

const fetchStatusOnOrder = createAsyncThunk(
  "orders/fetchStatusOnOrder",
  async () => {
    try {
      const status = await api.get("/order/getAllStatus")

      return status.data
    } catch (error) {
      console.log(error)
    }
  }
)

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
    builder.addCase(fetchStatusOnOrder.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchStatusOnOrder.fulfilled, (state, action) => {
      state.statusOnOrder = action.payload
      state.loading = false
    })
    builder.addCase(fetchStatusOnOrder.rejected, () => {
      console.log("ExtraReducer - rejected")
    })
  },
})

export const ordersActions = { fetchOrders, fetchStatusOnOrder }
export default orderSlice.reducer
