import React, { useEffect, useInsertionEffect } from "react";
import Router from "next/router";
import { logout } from "store/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "_firebase";

export default function Logout() {
  const dispatch = useDispatch();
  useEffect(() => {
    signOut(auth)
      .then(() => {
        dispatch(logout());
        Router.push("/");
      })
      .catch((error) => {
        // An error happened.
      });
  });
  return null;
}
