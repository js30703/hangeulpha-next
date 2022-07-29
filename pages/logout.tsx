import React, { useEffect, useInsertionEffect } from "react";
import Router from "next/router";
import { removeToken } from "store/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "_firebase";

export default function Logout() {
  const dispatch = useDispatch();
  useEffect(() => {
    signOut(auth)
      .then(() => {
        dispatch(removeToken());
        Router.push("/");
      })
      .catch((error) => {
        // An error happened.
      });
  });
  return null;
}
