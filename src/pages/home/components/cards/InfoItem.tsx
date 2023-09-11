import css from "./InfoItem.module.css"

export const InfoItem = ({ label, value }) => (
  <div className={css.infoItem}>
    <span>{label}</span>
    <span>{value}</span>
  </div>
)
