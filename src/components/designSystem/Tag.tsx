import React from "react"

interface TagProps {
  title: string
}

const Tag = ({ title }: TagProps) => {
  return (
    <div className="flex">
      <span
        className={`block text-center px-4 py-1 rounded-md mb-2 capitalize ${
          title === "pending" && "bg-red-300"
        }
            ${title === "delivered" && "bg-green-500"}
            ${title === "underway" && "bg-yellow-400"}
                        
        `}
      >
        {title}
      </span>
    </div>
  )
}

export default Tag
