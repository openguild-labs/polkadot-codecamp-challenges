"use client";
import React from 'react'
import SigpassKit from './SigpassKit'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="flex flex-row items-center justify-between w-full h-20 p-4 bg-white border-b border-gray-200 shadow-md sm:rounded-lg sm:shadow-sm sm:border sm:bg-transparent sm:backdrop-blur-sm sm:backdrop-saturate-150 sm:bg-opacity-30">
      <div className="flex flex-row md:gap-8 max-h-11 items-center md:justify-center sm:items-start sm:flex-wrap">
        <Link
          className="text-xl font-bold text-primary ease-linear duration-200 hover:scale-90"
          href="/"
        >
          🦄 UniswapV2
        </Link>
        <Link className="text-sm underline underline-offset-4 self-center ease-linear duration-200 hover:scale-90" href="/swap">Swap</Link>
        <Link className="text-sm underline underline-offset-4 self-center ease-linear duration-200 hover:scale-90" href="/pools">Pools</Link>
        <Link className="text-sm underline underline-offset-4 self-center ease-linear duration-200 hover:scale-90" href="/faucet">Faucet</Link>
      </div>

      <div className="flex flex-row items-center">
        <SigpassKit />
      </div>
    </header>
  )
}

export default Header
