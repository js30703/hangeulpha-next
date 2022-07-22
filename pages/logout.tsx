import React, { useEffect, useInsertionEffect } from "react";
import Router from "next/router";
import { logout } from "store/authSlice";
import type { RootState } from "store";
import { useSelector, useDispatch } from "react-redux";

export default function Logout() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logout());
    Router.push("/");
  });
  return null;
}
