import React from "react"
import { Erc20Card } from "./components/Erc20Card"
import css from "./Menu.module.css"
import { TransferCard } from "./components/TransferCard"

export const Menu = () => {
  return (
    <div className={css.container}>
      <Erc20Card />
      <TransferCard />
    </div>
  )
}
