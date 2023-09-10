import React from "react"
import { Erc20Card } from "./components/Erc20Card"
import css from "./Menu.module.css"
import { TransferCard } from "./components/TransferCard"
import { VostingCard } from "./components/VotingCard"

export const Menu = () => {
  return (
    <div className={css.container}>
      <Erc20Card />
      <TransferCard />
      <VostingCard />
    </div>
  )
}
