"use client";
import React, { Fragment } from "react";
import styles from "./sign-in.module.css";
import { signInWithGoogle, signOut } from "../firebase/firebase";
import { User } from "firebase/auth";
interface SigInProps {
  user: User | null;
}

const SignIn = ({ user }: SigInProps) => {
  return (
    <div>
      <Fragment>
        {user ? (
          <button className={styles.signin} onClick={signOut}>
            Sign Out
          </button>
        ) : (
          <button className={styles.signin} onClick={signInWithGoogle}>
            Sign In
          </button>
        )}
      </Fragment>
    </div>
  );
};

export default SignIn;
