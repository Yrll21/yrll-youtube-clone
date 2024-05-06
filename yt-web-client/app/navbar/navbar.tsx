import React from "react";
import Image from "next/image";
import styles from "./navbar.module.css";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <Link href="/">
        <Image
          className={styles.logo}
          src="/youtube-logo.svg"
          alt="logo"
          width={20}
          height={90}
        />
      </Link>
    </nav>
  );
};

export default NavBar;
