import { useDispatch } from "react-redux";
import { saveToken } from "store/authSlice";
import { useEffect } from "react";
import { getToken } from "_localStorage";
import { auth as AuthApp, refreshTokenFirebase } from "_firebaseFront";

// export default function Index() {
//   const dispatch = useDispatch();
//   const oneHour = 60 * 60;
//   useEffect(() => {
//     const _auth = getToken();
//     if (_auth.expirationTime < Date.now()) {
//       AuthApp?.currentUser &&
//         AuthApp?.currentUser
//           .getIdToken(/* forceRefresh */ true)
//           .then((idToken: any) => {
//             _auth.accessToken = idToken;
//             _auth.expirationTime = Date.now() + oneHour;
//             dispatch(saveToken(_auth));
//           })
//           .catch(function (error) {
//             // Handle error
//           });
//     } else {
//       dispatch(saveToken(_auth));
//     }
//   });

//   return null;
// }

export default function Index() {
  const dispatch = useDispatch();
  const oneHour = 60 * 60;
  useEffect(() => {
    const _auth = getToken();
    if (_auth.expirationTime < Date.now()) {
      refreshTokenFirebase().then((user) => {
        _auth.accessToken = user.stsTokenManager.accessToken;
        _auth.expirationTime = user.stsTokenManager.expirationTime;
        dispatch(saveToken(_auth));
      });
    } else {
      dispatch(saveToken(_auth));
    }
  });

  return null;
}
