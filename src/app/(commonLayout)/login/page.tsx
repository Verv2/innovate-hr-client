import React, { Suspense } from "react";
import Login from "../Components/Pages/Login/Login";
import Loading from "../Components/UI/Loading/Loading";

const LoginPage = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Login />
      </Suspense>
    </>
  );
};

export default LoginPage;
