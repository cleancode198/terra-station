import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useLocation } from "react-router-dom"
import { Page } from "components/layout"
import TxContext from "../TxContext"
import ConfirmForm from "./ConfirmForm"

import { fromBase64 } from "utils/data"
import styles from "../connect/Connect.module.scss"

const ConfirmTx = () => {
  const { t } = useTranslation()
  const { state }: { state: any } = useLocation()
  const [action, setAction] = useState<string>("")

  const parsedPayload = useMemo(() => {
    const { action, payload } = state
    setAction(action)
    if (payload) {
      const payloadObjects = fromBase64(payload)
      return JSON.parse(payloadObjects)
    }
  }, [state])

  return (
    <Page title={t("Confirm")}>
      <TxContext>
        {parsedPayload && (
          <ConfirmForm action={action} payload={parsedPayload} />
        )}
      </TxContext>
    </Page>
  )
}

export default ConfirmTx
