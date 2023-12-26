import Link from "next/link"
import styles from "./button.module.scss"

export const Button = ({text}) => {
  return (
    <Link
      href="/"
      className={styles.button}
    >
      {text}
    </Link>
  )
}