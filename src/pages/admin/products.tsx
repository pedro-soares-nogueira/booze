import Tag from "@/components/designSystem/Tag"
import Layout from "@/components/layout"
import { MagnifyingGlass, Plus } from "phosphor-react"
import React, { ReactElement } from "react"
import * as Dialog from "@radix-ui/react-dialog"

const Products = () => {
  return (
    <div className="max-w-[1100px] m-auto flex flex-col items-start justify-between py-10 px-4 gap-8">
      <h1 className="text-2xl font-semibold text-gray-800">Produtos</h1>

      <div className="w-full flex flex-col items-start md:items-end space-y-5 border border-gray-300 p-4 rounded-md">
        <div className="w-full flex items-start justify-between">
          <p>Pesquise ou cadastre um produto</p>
          <button
            /* onClick={(e) => resetFilters()} */
            className="py-[10px] px-4 rounded-lg font-bold bg-green-700 text-white hover:bg-green-600 
                transition-all disabled:opacity-25 w-full max-w-[12rem]"
          >
            Cadastrar
          </button>
        </div>
        <form className="w-full flex items-center justify-start gap-2">
          <input
            type="text"
            className="text-black w-full border border-gray-600 rounded-md px-4 py-2"
          />
          <button
            className="p-2 disabled:opacity-90 disabled:hover:cursor-not-allowed hover:opacity-90 transition-all
          border border-gray-600 rounded-md"
          >
            <MagnifyingGlass size={24} />
          </button>
        </form>
        <button
          /* onClick={(e) => resetFilters()} */
          className="py-[10px] px-4 rounded-lg font-bold bg-gray-400 text-white hover:bg-gray-500 
                transition-all disabled:opacity-25 w-full max-w-[12rem]"
        >
          Limpar filtro
        </button>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800">Seus pedidos:</h2>

      <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-2">
        <div
          className="border border-gray-300 rounded-md py-2 px-4
                    grid grid-cols-3 md:grid-cols-5 gap-4 items-center justify-center"
        >
          <p className="text-md">Nome do produto</p>

          <p className="font-semibold text-lg">Valor</p>

          <div className="w-full">Data de cadastro</div>

          <p className="text-md block text-center px-4 py-1 rounded-md capitalize bg-red-300">
            Categoria
          </p>

          <div className="flex w-full justify-end items-center">
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button
                  className="p-1 disabled:opacity-90 disabled:hover:cursor-not-allowed rounded-full
                              text-[#006E71] hover:opacity-90 transition-all border border-[#006E71]"
                >
                  <Plus size={24} />
                </button>
              </Dialog.Trigger>
            </Dialog.Root>
          </div>
        </div>

        <div
          className="border border-gray-300 rounded-md py-2 px-4
                    grid grid-cols-3 md:grid-cols-5 gap-4 items-center justify-center"
        >
          <p className="text-md">Nome do produto</p>

          <p className="font-semibold text-lg">Valor</p>

          <div className="w-full">Data de cadastro</div>

          <p className="text-md block text-center px-4 py-1 rounded-md capitalize bg-yellow-300">
            Categoria
          </p>

          <div className="flex w-full justify-end items-center">
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button
                  className="p-1 disabled:opacity-90 disabled:hover:cursor-not-allowed rounded-full
                              text-[#006E71] hover:opacity-90 transition-all border border-[#006E71]"
                >
                  <Plus size={24} />
                </button>
              </Dialog.Trigger>
            </Dialog.Root>
          </div>
        </div>

        <div
          className="border border-gray-300 rounded-md py-2 px-4
                    grid grid-cols-3 md:grid-cols-5 gap-4 items-center justify-center"
        >
          <p className="text-md">Nome do produto</p>

          <p className="font-semibold text-lg">Valor</p>

          <div className="w-full">Data de cadastro</div>

          <p className="text-md block text-center px-4 py-1 rounded-md capitalize bg-green-300">
            Categoria
          </p>

          <div className="flex w-full justify-end items-center">
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button
                  className="p-1 disabled:opacity-90 disabled:hover:cursor-not-allowed rounded-full
                              text-[#006E71] hover:opacity-90 transition-all border border-[#006E71]"
                >
                  <Plus size={24} />
                </button>
              </Dialog.Trigger>
            </Dialog.Root>
          </div>
        </div>

        <div
          className="border border-gray-300 rounded-md py-2 px-4
                    grid grid-cols-3 md:grid-cols-5 gap-4 items-center justify-center"
        >
          <p className="text-md">Nome do produto</p>

          <p className="font-semibold text-lg">Valor</p>

          <div className="w-full">Data de cadastro</div>

          <p className="text-md block text-center px-4 py-1 rounded-md capitalize bg-red-300">
            Categoria
          </p>

          <div className="flex w-full justify-end items-center">
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button
                  className="p-1 disabled:opacity-90 disabled:hover:cursor-not-allowed rounded-full
                              text-[#006E71] hover:opacity-90 transition-all border border-[#006E71]"
                >
                  <Plus size={24} />
                </button>
              </Dialog.Trigger>
            </Dialog.Root>
          </div>
        </div>

        <div
          className="border border-gray-300 rounded-md py-2 px-4
                    grid grid-cols-3 md:grid-cols-5 gap-4 items-center justify-center"
        >
          <p className="text-md">Nome do produto</p>

          <p className="font-semibold text-lg">Valor</p>

          <div className="w-full">Data de cadastro</div>

          <p className="text-md block text-center px-4 py-1 rounded-md capitalize bg-yellow-300">
            Categoria
          </p>

          <div className="flex w-full justify-end items-center">
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button
                  className="p-1 disabled:opacity-90 disabled:hover:cursor-not-allowed rounded-full
                              text-[#006E71] hover:opacity-90 transition-all border border-[#006E71]"
                >
                  <Plus size={24} />
                </button>
              </Dialog.Trigger>
            </Dialog.Root>
          </div>
        </div>

        <div
          className="border border-gray-300 rounded-md py-2 px-4
                    grid grid-cols-3 md:grid-cols-5 gap-4 items-center justify-center"
        >
          <p className="text-md">Nome do produto</p>

          <p className="font-semibold text-lg">Valor</p>

          <div className="w-full">Data de cadastro</div>

          <p className="text-md block text-center px-4 py-1 rounded-md capitalize bg-green-300">
            Categoria
          </p>

          <div className="flex w-full justify-end items-center">
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button
                  className="p-1 disabled:opacity-90 disabled:hover:cursor-not-allowed rounded-full
                              text-[#006E71] hover:opacity-90 transition-all border border-[#006E71]"
                >
                  <Plus size={24} />
                </button>
              </Dialog.Trigger>
            </Dialog.Root>
          </div>
        </div>

        <div
          className="border border-gray-300 rounded-md py-2 px-4
                    grid grid-cols-3 md:grid-cols-5 gap-4 items-center justify-center"
        >
          <p className="text-md">Nome do produto</p>

          <p className="font-semibold text-lg">Valor</p>

          <div className="w-full">Data de cadastro</div>

          <p className="text-md block text-center px-4 py-1 rounded-md capitalize bg-red-300">
            Categoria
          </p>

          <div className="flex w-full justify-end items-center">
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button
                  className="p-1 disabled:opacity-90 disabled:hover:cursor-not-allowed rounded-full
                              text-[#006E71] hover:opacity-90 transition-all border border-[#006E71]"
                >
                  <Plus size={24} />
                </button>
              </Dialog.Trigger>
            </Dialog.Root>
          </div>
        </div>

        <div
          className="border border-gray-300 rounded-md py-2 px-4
                    grid grid-cols-3 md:grid-cols-5 gap-4 items-center justify-center"
        >
          <p className="text-md">Nome do produto</p>

          <p className="font-semibold text-lg">Valor</p>

          <div className="w-full">Data de cadastro</div>

          <p className="text-md block text-center px-4 py-1 rounded-md capitalize bg-yellow-300">
            Categoria
          </p>

          <div className="flex w-full justify-end items-center">
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button
                  className="p-1 disabled:opacity-90 disabled:hover:cursor-not-allowed rounded-full
                              text-[#006E71] hover:opacity-90 transition-all border border-[#006E71]"
                >
                  <Plus size={24} />
                </button>
              </Dialog.Trigger>
            </Dialog.Root>
          </div>
        </div>

        <div
          className="border border-gray-300 rounded-md py-2 px-4
                    grid grid-cols-3 md:grid-cols-5 gap-4 items-center justify-center"
        >
          <p className="text-md">Nome do produto</p>

          <p className="font-semibold text-lg">Valor</p>

          <div className="w-full">Data de cadastro</div>

          <p className="text-md block text-center px-4 py-1 rounded-md capitalize bg-green-300">
            Categoria
          </p>

          <div className="flex w-full justify-end items-center">
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button
                  className="p-1 disabled:opacity-90 disabled:hover:cursor-not-allowed rounded-full
                              text-[#006E71] hover:opacity-90 transition-all border border-[#006E71]"
                >
                  <Plus size={24} />
                </button>
              </Dialog.Trigger>
            </Dialog.Root>
          </div>
        </div>

        <div
          className="border border-gray-300 rounded-md py-2 px-4
                    grid grid-cols-3 md:grid-cols-5 gap-4 items-center justify-center"
        >
          <p className="text-md">Nome do produto</p>

          <p className="font-semibold text-lg">Valor</p>

          <div className="w-full">Data de cadastro</div>

          <p className="text-md block text-center px-4 py-1 rounded-md capitalize bg-red-300">
            Categoria
          </p>

          <div className="flex w-full justify-end items-center">
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button
                  className="p-1 disabled:opacity-90 disabled:hover:cursor-not-allowed rounded-full
                              text-[#006E71] hover:opacity-90 transition-all border border-[#006E71]"
                >
                  <Plus size={24} />
                </button>
              </Dialog.Trigger>
            </Dialog.Root>
          </div>
        </div>

        <div
          className="border border-gray-300 rounded-md py-2 px-4
                    grid grid-cols-3 md:grid-cols-5 gap-4 items-center justify-center"
        >
          <p className="text-md">Nome do produto</p>

          <p className="font-semibold text-lg">Valor</p>

          <div className="w-full">Data de cadastro</div>

          <p className="text-md block text-center px-4 py-1 rounded-md capitalize bg-yellow-300">
            Categoria
          </p>

          <div className="flex w-full justify-end items-center">
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button
                  className="p-1 disabled:opacity-90 disabled:hover:cursor-not-allowed rounded-full
                              text-[#006E71] hover:opacity-90 transition-all border border-[#006E71]"
                >
                  <Plus size={24} />
                </button>
              </Dialog.Trigger>
            </Dialog.Root>
          </div>
        </div>

        <div
          className="border border-gray-300 rounded-md py-2 px-4
                    grid grid-cols-3 md:grid-cols-5 gap-4 items-center justify-center"
        >
          <p className="text-md">Nome do produto</p>

          <p className="font-semibold text-lg">Valor</p>

          <div className="w-full">Data de cadastro</div>

          <p className="text-md block text-center px-4 py-1 rounded-md capitalize bg-green-300">
            Categoria
          </p>

          <div className="flex w-full justify-end items-center">
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button
                  className="p-1 disabled:opacity-90 disabled:hover:cursor-not-allowed rounded-full
                              text-[#006E71] hover:opacity-90 transition-all border border-[#006E71]"
                >
                  <Plus size={24} />
                </button>
              </Dialog.Trigger>
            </Dialog.Root>
          </div>
        </div>
      </div>
    </div>
  )
}

Products.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Products
