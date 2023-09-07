import { useEffect, useState } from "react"
import { ethers, Provider } from "ethers"
import b3daABI from "contracts/b3daABI.json"

const CONTRACT_ADDRESS = "0x85f23204329f524D2AD7E424397aB0e524c51808"

const getProvider = (): Provider => {
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
