import { Controller, useForm } from "react-hook-form"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import * as z from "zod"
import * as RadioGroup from "@radix-ui/react-radio-group"
import { api } from "@/lib/axios"
import { useSession } from "next-auth/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useOrder } from "@/contexts/OrderContext"

interface AdreesModel {
  setIsAdreesModelOpen: Dispatch<SetStateAction<boolean>>
}

interface PreviousAddressSchema {
  bairro: string
  cep: string
  complemento: string
  id: string
  numero: string
  rua: string
  userId: string
}

const PreviousAddressObject = z.object({
  previousAddressInput: z.string(),
})

type PreviousAddressInputs = z.infer<typeof PreviousAddressObject>

const PreviousAddress = ({ setIsAdreesModelOpen }: AdreesModel) => {
  const [allPreviousAddress, setAllPreviousAddress] = useState<
    PreviousAddressSchema[]
  >([])
  const { getOrderAdrees } = useOrder()
  const { data: session } = useSession()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PreviousAddressInputs>({
    resolver: zodResolver(PreviousAddressObject),
  })

  const usePreviousAddres = (data: PreviousAddressInputs) => {
    const previousAddresToOrder = allPreviousAddress.find(
      (address) => address.id === data.previousAddressInput
    )

    getOrderAdrees(previousAddresToOrder!)
    setIsAdreesModelOpen(false)
  }

  const fetchAddressByUser = async () => {
    const userEmail = session?.user?.email

    try {
      const userAddress = await api.get(`/address/getUserAddress/${userEmail}`)
      setAllPreviousAddress(userAddress.data.createdAddress)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAddressByUser()
  })
  return (
    <div className="space-y-8 mt-4">
      <Controller
        name="previousAddressInput"
        control={control}
        render={({ field }) => {
          return (
            <RadioGroup.Root
              onValueChange={field.onChange}
              value={field.value}
              className="space-y-2"
            >
              {allPreviousAddress.map((address) => {
                return (
                  <RadioGroup.Item
                    key={address.id}
                    value={address.id}
                    className="px-4 py-3 bg-gray-800 opacity-50 text-white rounded-md w-full aria-checked:opacity-90"
                  >
                    {address.rua}, {address.numero}
                  </RadioGroup.Item>
                )
              })}
            </RadioGroup.Root>
          )
        }}
      />

      <button
        onClick={handleSubmit(usePreviousAddres)}
        className="py-3 px-4 mt-5 rounded-lg font-bold bg-green-700 text-white hover:bg-green-600 
                transition-all disabled:opacity-25 w-full"
      >
        Confirmar uso de endereço
      </button>
    </div>
  )
}

export default PreviousAddress
