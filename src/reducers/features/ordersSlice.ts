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

interface newStatusOrder {
  statusId: string
  orderId: string
}

const editStatusOrder = createAsyncThunk(
  "order/editStatusOrder",
  async ({ statusId, orderId }: newStatusOrder, thunkApi) => {
    try {
      const response = await api.patch("/order/handleOrderStatus", {
        status: statusId,
        orderId: orderId,
      })
      const data = response.data

      return { data }
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
    builder.addCase(editStatusOrder.pending, (state) => {
      state.loading = true
    })
    builder.addCase(editStatusOrder.fulfilled, (state, action) => {
      state.loading = false
      state.orders = state.orders.map((order) => {
        if (order.id === action.payload?.data.newOrder.id) {
          return action.payload?.data.newOrder
        }
        return order
      })
    })
    builder.addCase(editStatusOrder.rejected, () => {
      console.log("ExtraReducer - rejected")
    })
  },
})

export const ordersActions = {
  fetchOrders,
  fetchStatusOnOrder,
  editStatusOrder,
}
export default orderSlice.reducer
