'use client';

import { setUser } from '@/redux/slices/authSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const ReduxInit = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  return null;
}
export default ReduxInit