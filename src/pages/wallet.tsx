import { BlitzPage } from "@blitzjs/next"
import { useEffect } from "react"
import Layout from "src/core/layouts/Layout"
import { useNetwork, useSwitchNetwork } from "wagmi"
import { polygonMumbai } from "wagmi/chains"

const Wallet: BlitzPage = () => {
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()

  useEffect(() => {
    if (chain?.name !== "Mumbai" && switchNetwork) {
      switchNetwork!(polygonMumbai.id)
    }
  }, [chain, switchNetwork])

  return (
    <Layout title="Wallet">
      <h1>Wallet</h1>
    </Layout>
  )
}
export default Wallet
