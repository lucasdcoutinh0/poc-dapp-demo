import { Form, Field } from "react-final-form"
import { transfer } from "../hooks/useERC20"
import css from "./card.module.css"

export const TransferCard = () => {
  const onSubmit = async (values) => {
    await transfer(values.address, values.amount)
  }

  return (
    <div className={css.card}>
      <div className={css.cardHeader}>Transfer</div>
      <div className={css.cardBody}>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className={css.form}>
              <Field
                name="address"
                component="input"
                placeholder="0x12x2..."
                type="text"
                className={css.input}
              />
              <Field
                name="amount"
                component="input"
                placeholder="0.0"
                type="number"
                className={css.input}
              />
              <button type="submit" className={css.button}>
                Transfer
              </button>
            </form>
          )}
        />
      </div>
    </div>
  )
}
