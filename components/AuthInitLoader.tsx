import { useDispatch } from "react-redux";
import { saveToken } from "store/authSlice";
import { useEffect } from "react";
import { getToken } from "store/_localStorage";
import { refreshTokenFirebase } from "_firebaseFront";

export default function AuthInitLoader() {
  const dispatch = useDispatch();
  useEffect(() => {
    const _refresh = async (auth: any) => {
      try {
        if (auth.expirationTime < Date.now()) {
          const user = await refreshTokenFirebase();
          auth.accessToken = user.stsTokenManager.accessToken;
          auth.expirationTime = user.stsTokenManager.expirationTime;
        }
      } catch (error) {
        console.log(error);
      }
    };
    const _auth = getToken();
    _refresh(_auth).then(() => {
      dispatch(saveToken(_auth));
    });
  });

  return null;
}
