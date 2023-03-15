import React, { useEffect, useState } from "react"

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "@/lib/axios"
import { z } from "zod"
import * as Select from "@radix-ui/react-select"
import { IOrderStatus } from "@/interfaces"
import { useAppDispatch, useAppSelector } from "@/hooks/useReducer"
import { ordersActions } from "@/reducers/features/ordersSlice"

interface OrderStatusSelectProps {
  orderId: string
}

const OrderStatusType = z.object({
  orderStatus: z.string(),
})

type OrderStatusInput = z.infer<typeof OrderStatusType>

const OrderStatusSelect = ({ orderId }: OrderStatusSelectProps) => {
  const dispatch = useAppDispatch()

  const { statusOnOrder } = useAppSelector((state) => state.orders)
  console.log(statusOnOrder)

  const { control, handleSubmit } = useForm<OrderStatusInput>({
    resolver: zodResolver(OrderStatusType),
  })

  const onSubmit = async (data: OrderStatusInput) => {
    const statusId = data.orderStatus
    dispatch(ordersActions.editStatusOrder({ statusId, orderId }))
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 border-t border-gray-500 pt-10"
    >
      <div className="flex flex-col gap-2">
        <small>Alterar Status do pedido</small>

        <Controller
          name="orderStatus"
          control={control}
          render={({ field }) => {
            return (
              <Select.Root onValueChange={field.onChange} value={field.value}>
                <Select.Trigger className="px-4 py-2 rounded-md border border-gray-500">
                  <Select.Value
                    placeholder="Alterar o status"
                    className="capitalize"
                  />
                  <Select.Icon />
                </Select.Trigger>

                <Select.Portal>
                  <Select.Content>
                    <Select.Viewport>
                      <Select.Group>
                        {statusOnOrder.map((item) => {
                          return (
                            <Select.Item
                              key={item.id}
                              value={item.id}
                              className="px-4 py-2 rounded-md bg-white cursor-pointer hover:bg-slate-200 transition-all capitalize"
                            >
                              <Select.ItemText>{item.title}</Select.ItemText>
                              <Select.ItemIndicator />
                            </Select.Item>
                          )
                        })}
                      </Select.Group>
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            )
          }}
        />
      </div>

      <button
        className="px-4 py-2 rounded-md bg-green-600 text-white w-full"
        type="submit"
      >
        Salvar alteração
      </button>
    </form>
  )
}

export default OrderStatusSelect
