import { Routes, BlitzPage } from "@blitzjs/next"
import Layout from "../core/layouts/Layout"
import { Login } from "src/pages/home/login/Login"
import { useIsMetamaskInstalled } from "./home/hooks/useIsMetamaskInstalled"
import { MissingMetamask } from "./home/login/MissingMetamask"
import { useAccount } from "wagmi"
import { Menu } from "./home/Menu"

const Home: BlitzPage = () => {
  const isMetamaskInstalled = useIsMetamaskInstalled()
  const { isConnected } = useAccount()
  return (
    <Layout title="Home">
      <h1>Crypto Demo</h1>
      {isMetamaskInstalled ? isConnected ? <Menu /> : <Login /> : <MissingMetamask />}
    </Layout>
  )
}

export default Home
