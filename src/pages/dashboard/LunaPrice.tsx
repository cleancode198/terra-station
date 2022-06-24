import { useTranslation } from "react-i18next"
import { useCurrency } from "data/settings/Currency"
import { useMemoizedPrices } from "data/queries/oracle"
import { Card } from "components/layout"
import { Read } from "components/token"
import { ModalButton, Mode } from "components/feedback"
import LunaPriceChart from "../charts/LunaPriceChart"
import DashboardContent from "./components/DashboardContent"
import styles from "./Dashboard.module.scss"
import { isWallet } from "auth"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"

const LunaPrice = () => {
  const { t } = useTranslation()
  const currency = useCurrency()
  const denom = currency === "uluna" ? "uusd" : currency
  const { data: prices, ...state } = useMemoizedPrices(denom)

  const chartButton = () => (
    <ModalButton
      title={t("Luna price")}
      modalType={isWallet.mobile() ? Mode.FULL : Mode.DEFAULT}
      renderButton={(open) => (
        <button onClick={open}>
          {isWallet.mobile() ? (
            <ArrowForwardIosIcon style={{ fontSize: 12 }} />
          ) : (
            t("Show chart")
          )}
        </button>
      )}
    >
      <LunaPriceChart />
    </ModalButton>
  )

  const render = () => {
    if (!prices) return
    const { uluna: price } = prices
    return (
      <DashboardContent
        value={<Read amount={String(price * 1e6)} denom={denom} auto />}
        footer={!isWallet.mobile() && chartButton()}
      />
    )
  }

  return (
    <Card
      {...state}
      title={t("Luna price")}
      className={styles.price}
      size="small"
      extra={isWallet.mobile() && chartButton()}
    >
      {render()}
    </Card>
  )
}

export default LunaPrice
