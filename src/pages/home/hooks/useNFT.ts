import { useEffect, useState } from "react"
import { ethers } from "ethers"
import axios from "axios"
import NFTMarketplaceABI from "contracts/NFTMarketplaceABI.json"

export const CONTRACT_ADDRESS = "0xD2a2ECb161FCE0bC54267D7EDE9770902EE6Ae0D"

export type NFT = {
  price: number
  tokenId: number
  seller: string
  owner: string
  image: string
  name: string
  description: string
}

export const useListNft = () => {
  const [nfts, setNfts] = useState<NFT[]>([])

  useEffect(() => {
    async function getListNft() {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const contract = new ethers.Contract(CONTRACT_ADDRESS, NFTMarketplaceABI, signer)
        const data = await contract!.fetchMarketItems!()

        const items = await Promise.all(
          data.map(async (i) => {
            const tokenUri = await contract!.tokenURI!(i.tokenId)
            const meta = await axios.get(tokenUri)
            let price = ethers.formatEther(i.price)
            let item = {
              price,
              tokenId: i.tokenId.toNumber(),
              seller: i.seller,
              owner: i.owner,
              image: meta.data.image,
              name: meta.data.name,
              description: meta.data.description,
            }
            return item
          })
        )
        setNfts(items)
      } catch (err) {
        console.log(err)
      }
    }
    void getListNft()
  }, [])

  return nfts
}

export const buyNft = async (nftId: number, valor: string) => {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()
    const contract = new ethers.Contract(CONTRACT_ADDRESS, NFTMarketplaceABI, signer)

    const price = ethers.parseUnits(valor, 18)
    const transaction = await contract!.createMarketSale!(nftId, { value: price })
    await transaction.wait()
    window.location.reload()
  } catch (err) {
    console.log(err)
  }
}
