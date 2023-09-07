import { useBalance, useTokenInfo } from "../hooks/useERC20"
import { InfoItem } from "./InfoItem"
import css from "./card.module.css"
export const Erc20Card = () => {
  const balance = useBalance()
  const info = useTokenInfo()
  const truncatedOwner = `${info.owner.substring(0, 6)}...${info.owner.substring(
    info.owner.length - 4
  )}`

  return (
    <div className={css.card}>
      <div className={css.cardHeader}>
        <span className={css.cardHeaderItem}>Balance:</span>
        <span className={css.cardHeaderItem}>{balance}</span>
      </div>
      <div className={css.cardBody}>
        <h3>Token Info</h3>
        <InfoItem label="Token Name:" value={info.name} />
        <InfoItem label="Token Symbol:" value={info.symbol} />
        <InfoItem label="Token Owner:" value={truncatedOwner} />
        <InfoItem label="Token Total Supply:" value={info.totalSupply} />
        <InfoItem label="Token Decimals:" value={info.decimals} />
      </div>
    </div>
  )
}
