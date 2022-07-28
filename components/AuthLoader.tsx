import { useDispatch } from "react-redux";
import { login } from "store/authSlice";
import { useEffect } from "react";
import { getToken } from "_localStorage";
import { auth as AuthApp } from "_firebase";

export default function Index() {
  const dispatch = useDispatch();
  const oneHour = 60 * 60;
  useEffect(() => {
    const _auth = getToken();
    if (_auth.expirationTime < Date.now()) {
      AuthApp?.currentUser &&
        AuthApp?.currentUser
          .getIdToken(/* forceRefresh */ true)
          .then((idToken: any) => {
            _auth.accessToken = idToken;
            _auth.expirationTime = Date.now() + oneHour;
            dispatch(login(_auth));
          })
          .catch(function (error) {
            // Handle error
          });
    } else {
      dispatch(login(_auth));
    }
  });

  return null;
}
