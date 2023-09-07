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
      {isMetamaskInstalled ? (
        isConnected ? (
          <Menu />
        ) : (
          <>
            <h1>Crypto Demo</h1> <Login />{" "}
          </>
        )
      ) : (
        <>
          <h1>Crypto Demo</h1> <MissingMetamask />
        </>
      )}
    </Layout>
  )
}

export default Home
