import { useDispatch } from "react-redux";
import { saveToken } from "store/authSlice";
import { useEffect } from "react";
import { getToken } from "_localStorage";
import { refreshTokenFirebase } from "_firebaseFront";

export default function AuthInitLoader() {
  const dispatch = useDispatch();
  const oneHour = 60 * 60;
  useEffect(() => {
    const _refresh = async (auth: any) => {
      if (auth.expirationTime < Date.now()) {
        const user = await refreshTokenFirebase();
        auth.accessToken = user.stsTokenManager.accessToken;
        auth.expirationTime = user.stsTokenManager.expirationTime;
      }
    };
    const _auth = getToken();
    _refresh(_auth).catch(console.log);
    dispatch(saveToken(_auth));
  });

  return null;
}
