import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {useUser} from "./api";

const ProtectedRoutes = () => {
  const { data, isLoading, error } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }


  return data !== undefined ? <Outlet /> : <Navigate to="signin" />;
};

export default ProtectedRoutes;
