import React from "react"

interface TagProps {
  title: string
}

const Tag = ({ title }: TagProps) => {
  return (
    <div className="flex">
      <span
        className={`block text-center px-4 py-1 rounded-md capitalize ${
          title === "pendente" && "bg-red-300"
        }
            ${title === "a caminho" && "bg-yellow-500"}
            ${title === "entregue" && "bg-green-400"}
                        
        `}
      >
        {title}
      </span>
    </div>
  )
}

export default Tag
