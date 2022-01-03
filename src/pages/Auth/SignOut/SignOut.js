import React, {useEffect} from 'react';
import useAuthUserContext from '../../../hooks/useAuthUser';

export default function SignOut() {
  const {signout} = useAuthUserContext();
  useEffect(() => signout());
  return null;
}
