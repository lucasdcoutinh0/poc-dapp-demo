import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { useBalance } from "./wallet/utils/useERC20"

const Wallet: BlitzPage = () => {
  const balance = useBalance()

  console.log(balance)
  return (
    <Layout title="Wallet">
      <h1>Wallet</h1>
    </Layout>
  )
}
export default Wallet
