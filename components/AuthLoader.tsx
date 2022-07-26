import { useDispatch } from "react-redux";
import { login } from "store/authSlice";
import { useEffect } from "react";
import { getToken } from "_localStorage";

export default function Index() {
  const dispatch = useDispatch();
  useEffect(() => {
    const auth = getToken();
    dispatch(login(auth));
  });

  return null;
}
