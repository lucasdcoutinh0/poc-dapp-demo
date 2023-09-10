export const getAccount = async (provider): Promise<string> => {
  const signer = await provider.getSigner()
  return signer.getAddress()
}
