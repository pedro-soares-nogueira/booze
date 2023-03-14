import React, { useEffect, useState } from "react"

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "@/lib/axios"
import { z } from "zod"
import * as Select from "@radix-ui/react-select"

interface OrderStatus {
  id: string
  title: string
}

interface OrderStatusSelectProps {
  orderId: string
}

const OrderStatusType = z.object({
  orderStatus: z.string(),
})

type OrderStatusInput = z.infer<typeof OrderStatusType>

const OrderStatusSelect = (orderId: OrderStatusSelectProps) => {
  const [status, setStatus] = useState<OrderStatus[]>([])

  const { control, handleSubmit } = useForm<OrderStatusInput>({
    resolver: zodResolver(OrderStatusType),
  })

  const getStatusOrder = async () => {
    try {
      const status = await api.get("/order/getAllStatus")
      setStatus(status.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getStatusOrder()
  }, [])

  const onSubmit = async (data: OrderStatusInput) => {
    try {
      await api.patch("/order/handleOrderStatus", {
        status: data.orderStatus,
        orderId: orderId.orderId,
      })
    } catch (error) {
      console.log(error)
    }
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
                  <Select.Value placeholder="Alterar o status" />
                  <Select.Icon />
                </Select.Trigger>

                <Select.Portal>
                  <Select.Content>
                    <Select.Viewport>
                      <Select.Group>
                        {status.map((item) => {
                          return (
                            <Select.Item
                              key={item.id}
                              value={item.id}
                              className="px-4 py-2 rounded-md bg-white cursor-pointer hover:bg-slate-200 transition-all"
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
