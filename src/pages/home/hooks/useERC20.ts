import { useEffect, useState } from "react"
import { ethers, Provider } from "ethers"
import b3daABI from "contracts/b3daABI.json"

const CONTRACT_ADDRESS = "0x85f23204329f524D2AD7E424397aB0e524c51808"

const getProvider = () => {
  return new ethers.BrowserProvider(window.ethereum)
}

const getAccount = async (provider): Promise<string> => {
  const signer = await provider.getSigner()
  return signer.getAddress()
}

const getContract = (provider: Provider): ethers.Contract => {
  return new ethers.Contract(CONTRACT_ADDRESS, b3daABI, provider)
}

export const useBalance = () => {
  const [balance, setBalance] = useState<string>("0")

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const provider = getProvider()
        const account = await getAccount(provider)
        const contract = getContract(provider)

        if (contract && contract.balanceOf) {
          const balance = await contract.balanceOf(account)
          setBalance(ethers.formatEther(balance))
        }
      } catch (err) {
        console.error(err)
      }
    }

    void fetchBalance()
  }, [])

  return balance
}

export const useTokenInfo = () => {
  const [info, setInfo] = useState({
    decimals: 0,
    name: "",
    owner: "",
    symbol: "",
    totalSupply: "0",
    tokenAddress: CONTRACT_ADDRESS,
  })
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const provider = getProvider()
        const contract = getContract(provider)

        if (contract) {
          const decimals = Number(await contract.decimals!())
          const name = await contract.name!()
          const owner = await contract.owner!()
          const symbol = await contract.symbol!()
          const totalSupply = ethers.formatEther(await contract.totalSupply!())
          setInfo({
            decimals,
            name,
            owner,
            symbol,
            totalSupply,
            tokenAddress: CONTRACT_ADDRESS,
          })
        }
      } catch (err) {
        console.error(err)
      }
    }

    void fetchInfo()
  }, [])

  return info
}

export const transfer = async (address: string, amount: string) => {
  try {
    const provider = getProvider()
    const contract = getContract(provider)

    if (contract) {
      const signer = await provider.getSigner()
      const contractWithSigner = contract.connect(signer)
      const tx = await (contractWithSigner as any).transfer(address, ethers.parseEther(amount))
      await tx.wait()
      console.log("Transfer done")
    }
  } catch (err) {
    console.error(err)
  }
}
