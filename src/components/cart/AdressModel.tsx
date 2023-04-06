import * as Dialog from "@radix-ui/react-dialog"
import { X } from "phosphor-react"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useOrder } from "@/contexts/OrderContext"
import * as RadioGroup from "@radix-ui/react-radio-group"
import * as Accordion from "@radix-ui/react-accordion"
import { api } from "@/lib/axios"
import { useSession } from "next-auth/react"

interface AdreesModel {
  setIsAdreesModelOpen: Dispatch<SetStateAction<boolean>>
}

const AdreesType = z.object({
  cep: z.string().min(3),
  rua: z.string().min(3),
  numero: z.string().min(3),
  bairro: z.string().min(3),
  complemento: z.string(),
  chooseAddress: z.enum([]),
})
type AdreesInputs = z.infer<typeof AdreesType>

const AdressModel = ({ setIsAdreesModelOpen }: AdreesModel) => {
  const { getOrderAdrees, orderAdrees } = useOrder()
  const { data: session } = useSession()

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<AdreesInputs>({
    resolver: zodResolver(AdreesType),
    defaultValues: {
      cep: orderAdrees?.cep,
      rua: orderAdrees?.rua,
      numero: orderAdrees?.numero,
      bairro: orderAdrees?.bairro,
      complemento: orderAdrees?.complemento,
    },
  })

  const getAdrees = (data: AdreesInputs) => {
    getOrderAdrees(data)
    setIsAdreesModelOpen(false)
  }

  const fetchAddressByUser = async () => {
    const userEmail = session?.user?.email
    console.log(userEmail)

    try {
      const userAddress = await api.get(`/address/getUserAddress/${userEmail}`)
      console.log(userAddress)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAddressByUser()
  }, [])

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed w-screen h-screen inset-0 bg-black opacity-70" />
      <Dialog.Content
        className="bg-white fixed inset-y-14  min-[374px]:right-4 max-w-[380px] w-full rounded-lg
                    flex flex-col items-start justify-between px-6 py-6 overflow-auto
                    scrollbar-thin scrollbar-thumb-neutral-400 scrollbar-track-neutral-300 scrollbar-thumb-rounded-full"
      >
        <div>
          <div className="space-y-10 w-full h-full flex flex-col items-center justify-between ">
            <div className="flex items-center justify-between w-full">
              <Dialog.Title className="text-2xl font-semibold">
                Endereço
              </Dialog.Title>
              <Dialog.Close asChild className="cursor-pointer">
                <X size={22} weight="bold" />
              </Dialog.Close>
            </div>

            <Accordion.Root
              type="single"
              collapsible
              defaultValue="address1"
              className="space-y-6"
            >
              <Accordion.Item value="address1">
                <Accordion.Header>
                  <Accordion.Trigger>
                    <p className="pb-2">Escolha um endereço cadastrado</p>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content>
                  <div className="space-y-8 mt-4">
                    <Controller
                      name="chooseAddress"
                      control={control}
                      render={({ field }) => {
                        return (
                          <RadioGroup.Root
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-2"
                          >
                            <RadioGroup.Item
                              value={"pix"}
                              className="px-4 py-3 bg-gray-800 opacity-50 text-white rounded-md w-full aria-checked:opacity-90"
                            >
                              Rua Jardim Basil, 613
                            </RadioGroup.Item>

                            <RadioGroup.Item
                              value={"credito"}
                              className="px-4 py-3 bg-gray-800 opacity-50 text-white rounded-md w-full aria-checked:opacity-90"
                            >
                              Rua Aviação, 1800
                            </RadioGroup.Item>
                          </RadioGroup.Root>
                        )
                      }}
                    />

                    <button
                      type="submit"
                      className="py-3 px-4 mt-5 rounded-lg font-bold bg-green-700 text-white hover:bg-green-600 
                transition-all disabled:opacity-25 w-full"
                    >
                      Confirmar uso de endereço
                    </button>
                  </div>
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="address2">
                <Accordion.Header>
                  <Accordion.Trigger>
                    <p className="pb-2">Ou, cadastre um endereço novo</p>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="space-y-8">
                  <div className="grid grid-cols-1 gap-3 w-full">
                    <div>
                      <small>CEP</small>
                      <input
                        {...register("cep")}
                        className="bg-white w-full border border-gray-300 rounded-md px-4 py-2"
                        type="text"
                        placeholder="CEP"
                      />
                      {errors.cep ? (
                        <small className="text-red-400">
                          CEP é obrigatório
                        </small>
                      ) : (
                        <small></small>
                      )}
                    </div>

                    <div>
                      <small>Rua</small>
                      <input
                        {...register("rua")}
                        className="bg-white w-full border border-gray-300 rounded-md px-4 py-2"
                        type="text"
                        placeholder="Rua"
                      />
                      {errors.rua ? (
                        <small className="text-red-400">
                          Rua é obrigatório
                        </small>
                      ) : (
                        <small></small>
                      )}
                    </div>

                    <div>
                      <small>Número</small>

                      <input
                        {...register("numero")}
                        className="bg-white w-full border border-gray-300 rounded-md px-4 py-2"
                        type="text"
                        placeholder="Numero"
                      />

                      {errors.numero ? (
                        <small className="text-red-400">
                          Número é obrigatório
                        </small>
                      ) : (
                        <small></small>
                      )}
                    </div>

                    <div>
                      <small>Bairro</small>
                      <input
                        {...register("bairro")}
                        className="bg-white w-full border border-gray-300 rounded-md px-4 py-2"
                        type="text"
                        placeholder="Bairro"
                      />
                      {errors.bairro ? (
                        <small className="text-red-400">
                          Bairro é obrigatório
                        </small>
                      ) : (
                        <small></small>
                      )}
                    </div>

                    <div>
                      <small>Complemento</small>

                      <input
                        {...register("complemento")}
                        className="bg-white w-full border border-gray-300 rounded-md px-4 py-2"
                        type="text"
                        placeholder="Complemento"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit(getAdrees)}
                    className="py-3 px-4 rounded-lg font-bold bg-green-700 text-white hover:bg-green-600 
                                transition-all disabled:opacity-25 w-full"
                  >
                    Confirmar novo cadastro
                  </button>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  )
}

export default AdressModel
