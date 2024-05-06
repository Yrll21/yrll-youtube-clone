"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./navbar.module.css";
import Link from "next/link";
import SignIn from "./sign-in";
import { onAuthStateChangedHelper } from "../firebase/firebase";
import { User } from "firebase/auth";

const NavBar = () => {
  // Init user state
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedHelper((user) => {
      setUser(user);
    });
    // cleanup subscription on unmount
    return () => unsubscribe();
  });
  return (
    <nav className={styles.nav}>
      <Link href="/">
        <Image src="/youtube-logo.svg" alt="logo" width={90} height={90} />
      </Link>
      {/* TODO: Add upload button if user is signed in */}
      <SignIn user={user} />
    </nav>
  );
};

export default NavBar;
