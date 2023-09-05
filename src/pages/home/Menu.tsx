import css from "./Menu.module.css"
import { BiWallet } from "react-icons/bi"
import { GiPayMoney } from "react-icons/gi"
import { RiNftFill } from "react-icons/ri"

export const Menu = () => {
  return (
    <div className={css.container}>
      <div className={css.box}>
        <BiWallet className={css.icon} />
        <h1>Wallet</h1>
      </div>
      <div className={css.box}>
        <GiPayMoney className={css.icon} />
        <h1>Dapp</h1>
      </div>
      <div className={css.box}>
        <RiNftFill className={css.icon} />
        <h1>NFT</h1>
      </div>
    </div>
  )
}
