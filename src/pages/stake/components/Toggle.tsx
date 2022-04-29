import { FC } from "react"
import classNames from "classnames/bind"
import styles from "./Toggle.module.scss"

const cx = classNames.bind(styles)

interface Props {
  checked: boolean
  onChange: () => void
}

const Toggle: FC<Props> = ({ checked, onChange, children }) => {
  return (
    <button className={cx(styles.toggle, { checked })} onClick={onChange}>
      <span className={styles.track}>
        <span className={styles.indicator} />
      </span>
      <span className={styles.text}>{children}</span>
    </button>
  )
}

export default Toggle
