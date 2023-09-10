import { ethers, Provider } from "ethers"
import SimpleVotingABI from "contracts/SimpleVotingABI.json"
import { getProvider } from "src/core/utils/getProvider"
import { useEffect, useState } from "react"

const CONTRACT_ADDRESS = "0xe630FD089c4ecc19f4914478475D9e22489Bb1C7"

const getContract = (provider: Provider): ethers.Contract => {
  return new ethers.Contract(CONTRACT_ADDRESS, SimpleVotingABI, provider)
}

export const useBallotInfo = () => {
  const [question, setQuestion] = useState<string>()
  const [options, setOptions] = useState<string[]>()
  const [status, setStatus] = useState()

  useEffect(() => {
    const fetchBallotInfo = async () => {
      try {
        const provider = getProvider()
        const contract = getContract(provider)

        if (contract && contract.getBallotByIndex) {
          const ballot = await contract.getBallotByIndex(0)

          const extractedQuestion = ballot[0]
          const extractedOptions = ballot.slice(1, -1)
          const extractedStatus = ballot[ballot.length - 1]

          setOptions(Array.from(extractedOptions[0]))
          setQuestion(extractedQuestion)
          setStatus(extractedStatus)
        }
      } catch (err) {
        console.error(err)
      }
    }

    void fetchBallotInfo()
  }, [])

  return { question, options, status }
}

export const vote = async (optionId: number) => {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()

    const contract = new ethers.Contract(CONTRACT_ADDRESS, SimpleVotingABI, signer)

    if (contract && contract.cast) {
      await contract.cast(0, optionId)
    }
  } catch (err) {
    console.error(err)
  }
}
