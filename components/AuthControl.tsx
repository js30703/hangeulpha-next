import { useDispatch } from "react-redux";
import { login } from "store/authSlice";
import { useEffect } from "react";

export default function Index() {
  const dispatch = useDispatch();
  useEffect(() => {
    const refreshToken = localStorage.getItem("@hangeulpha") || null;
    if (refreshToken) {
      dispatch(login({ refreshToken: refreshToken }));
    }
  });

  return null;
}
