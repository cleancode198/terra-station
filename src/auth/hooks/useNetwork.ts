import { atom, useRecoilState, useRecoilValue } from "recoil"
import { useMergeNetworks } from "data/settings/CustomNetworks"
import { sandbox } from "../scripts/env"
import { getStoredNetwork, storeNetwork } from "../scripts/network"

const networkState = atom({
  key: "network",
  default: getStoredNetwork(),
})

export const useNetworkState = () => {
  const [network, setNetwork] = useRecoilState(networkState)

  const changeNetwork = (network: NetworkName) => {
    setNetwork(network)
    storeNetwork(network)
  }

  return [network, changeNetwork] as const
}

/* helpers */
export const useNetworkOptions = () => {
  const networks = useMergeNetworks()

  if (!sandbox) return

  return [...Object.values(networks)].map(({ name }) => {
    return { value: name, label: name }
  })
}

export const useNetwork = () => {
  const networks = useMergeNetworks()
  const network = useRecoilValue(networkState)
  const item = networks[network]
  return item ?? networks.mainnet
}

export const useNetworkName = () => {
  const { name } = useNetwork()
  return name
}

export const useChainID = () => {
  const { chainID } = useNetwork()
  return chainID
}
