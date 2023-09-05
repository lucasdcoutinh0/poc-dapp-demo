import { useEffect, useState } from "react"

export const useIsMetamaskInstalled = () => {
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false)

  useEffect(() => {
    const isMetamaskInstalled = typeof window.ethereum !== "undefined"
    setIsMetamaskInstalled(isMetamaskInstalled)
  }, [])

  return isMetamaskInstalled
}
