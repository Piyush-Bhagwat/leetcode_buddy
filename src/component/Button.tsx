import React from 'react'

export const Button = ( {className, children, onClick}) => {
    return (
        <button className={`btn w-full outline-2 outline-dashed outline-neutral-400 px-2 py-1 rounded-sm hover:bg-neutral-100 active:bg-neutral-700 active:text-white disabled:bg-neutral-300  flex gap-2 justify-center items-center ${className}`} onClick={onClick}>{children}</button>
    )
}
