import { useTranslation } from "react-i18next"
import { Auto, Page } from "components/layout"
import NFTAssets from "./NFTAssets"
import NFTMarketplace from "./NFTMarketplace"
import is from "auth/scripts/is"

const NFT = () => {
  const { t } = useTranslation()

  return (
    <Page title={is.mobile() ? "" : t("NFT")}>
      <Auto columns={[<NFTAssets />, <NFTMarketplace />]} />
    </Page>
  )
}

export default NFT
