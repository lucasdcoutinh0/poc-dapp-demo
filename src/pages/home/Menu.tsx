import React from "react"
import { useState } from "react"
import { Erc20Card } from "./components/cards/Erc20Card"
import css from "./Menu.module.css"
import { TransferCard } from "./components/cards/TransferCard"
import { VostingCard } from "./components/cards/VotingCard"
import { NFTMenu } from "./components/nft/NFTMenu"

export const Menu = () => {
  const [NFTNav, setNFTNAv] = useState("home")

  return (
    <div className={css.container}>
      <div className={css.menu}>
        <Erc20Card />
        <TransferCard />
        <VostingCard />
      </div>
      <div>
        <h1>NFT Marketplace</h1>
        <div className={css.NFTNav}>
          <span className={css.Link} onClick={() => setNFTNAv("home")}>
            Home
          </span>
          <span className={css.Link} onClick={() => setNFTNAv("sell")}>
            Sell
          </span>
          <span className={css.Link} onClick={() => setNFTNAv("portfolio")}>
            Portfolio
          </span>
          <span className={css.Link} onClick={() => setNFTNAv("dashboard")}>
            Creator Dashboard
          </span>
        </div>
        <NFTMenu NFTNav={NFTNav} />
      </div>
    </div>
  )
}
