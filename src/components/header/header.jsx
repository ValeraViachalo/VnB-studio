import { Button } from "@/ui/button/button";
import Link from "next/link";

import styles from './header.module.scss'

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link
        href="/"
        className={styles.link}
      >
        V’nB Studio
      </Link>
      
      <Link
        href="/"
        className={styles.link}
      >
        projects.
      </Link>
      <Link
        href="/"
        className={styles.link}
      >
        services.
      </Link>
      <Link
        href="/"
        className={styles.link}
      >
        about us.
      </Link>

      <Button
        text="Say hello"
      />

    </header>
  );
}