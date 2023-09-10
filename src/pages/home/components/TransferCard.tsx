import { Form, Field } from "react-final-form"
import { transfer, useBalance } from "../hooks/useERC20"
import css from "./card.module.css"
import { ethers } from "ethers"

export const TransferCard = () => {
  const balanceBigNumber = useBalance() || 0
  const onSubmit = async (values) => {
    await transfer(values.address, values.amount)
  }

  const required = (value) => (value ? undefined : "Required")
  const mustBeEthAddress = (value) =>
    value.startsWith("0x") ? undefined : "Must be an Ethereum address"
  const mustHaveBalance = (value) =>
    ethers.parseEther(value) <= balanceBigNumber ? undefined : "Insufficient balance"
  const composeValidators =
    (...validators) =>
    (value) =>
      validators.reduce((error, validator) => error || validator(value), undefined)

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
                validate={composeValidators(required, mustBeEthAddress)}
              >
                {({ input, meta }) => (
                  <div>
                    <input {...input} placeholder="0x12x2..." type="text" className={css.input} />
                    {meta.error && meta.touched && <div className={css.danger}>{meta.error}</div>}
                  </div>
                )}
              </Field>
              <Field
                name="amount"
                component="input"
                placeholder="0.0"
                type="number"
                className={css.input}
                validate={composeValidators(required, mustHaveBalance)}
              >
                {({ input, meta }) => (
                  <div>
                    <input {...input} placeholder="0.0" type="number" className={css.input} />
                    {meta.error && meta.touched && <div className={css.danger}>{meta.error}</div>}
                  </div>
                )}
              </Field>
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
