import { useEffect, useState, useRef } from "react"
import { useTranslation } from "react-i18next"
import { isEmpty } from "ramda"
import { Grid } from "components/layout"
import { Button } from "components/general"
import { ModalButton, ModalRef, Mode } from "components/feedback"
import { FormError } from "components/form"
import { getStoredSessions, removeSessions } from "auth/scripts/sessions"
import AssetWallet from "./AssetWallet"
import { ReactComponent as WalletConnectIcon } from "styles/images/menu/Walletconnect.svg"
import styles from "./WalletConnect.module.scss"
import is from "auth/scripts/is"
import GridConfirm from "../../components/layout/GridConfirm"
import { useLocation } from "react-router-dom"
import { useNav } from "../../app/routes"

const Selector = () => {
  const connectors = getStoredSessions()
  const { t } = useTranslation()

  return (
    <Grid gap={20}>
      {connectors && !isEmpty(connectors) ? (
        Object.values(connectors).map((value: any) => {
          if (!value?.peerMeta) return
          return <AssetWallet key={value.peerMeta.name} {...value} />
        })
      ) : (
        <FormError>{t("Don't have connected sessions")}</FormError>
      )}
    </Grid>
  )
}

const WalletConnect = () => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const { subPage } = useNav()
  const disconnectAllRef = useRef<ModalRef>({
    open: () => {},
    close: () => {},
  })

  const [buttonView, setButtonView] = useState(true)
  const connectors = getStoredSessions()

  useEffect(() => {
    const subMenu = subPage.find((a) => a.path === pathname)

    if (subMenu) {
      setButtonView(false)
    } else {
      setButtonView(true)
    }
  }, [pathname])

  return buttonView && connectors && !isEmpty(connectors) ? (
    <ModalButton
      key="wallet-connect-floating"
      ref={disconnectAllRef}
      title={t("Wallet connect")}
      modalType={is.mobile() ? Mode.FULL : Mode.DEFAULT}
      renderButton={(open) => (
        <button onClick={open} className={styles.fab}>
          <WalletConnectIcon {...{ width: 24, height: 24 }} />
        </button>
      )}
    >
      <GridConfirm
        key="wallet-list"
        button={
          connectors &&
          !isEmpty(connectors) && (
            <ModalButton
              modalType={is.mobile() ? Mode.BOTTOM_CONFIRM : Mode.DEFAULT}
              renderButton={(open) => (
                <Button block color="danger" onClick={open}>
                  {t("Disconnect all sessions")}
                </Button>
              )}
              maxHeight={false}
              cancelButton={{
                name: t("Cancel"),
                type: "default",
              }}
            >
              <Button
                block
                color="danger"
                onClick={async () => {
                  await removeSessions()
                  disconnectAllRef.current.close()
                }}
              >
                {t("Disconnect all sessions")}
              </Button>
            </ModalButton>
          )
        }
      >
        <Selector />
      </GridConfirm>
    </ModalButton>
  ) : (
    <></>
  )
}

export default WalletConnect
