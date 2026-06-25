"use client";

import { useAuth } from "@/hooks/auth/useAuth";

const HomePage = () => {
  const { me, isLoading } = useAuth();
  if (isLoading) {
    return null;
  }

  console.log(me);

  return <div className="container">HomePage</div>;
};

export default HomePage;
