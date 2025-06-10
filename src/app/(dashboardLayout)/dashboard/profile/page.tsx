"use client";
import { useUser } from "@/context/user.provider";
import Profile from "../../Components/Shared/Profile/Profile";
import ProfileSkeleton from "../../Components/Shared/Profile/ProfileSkeleton";
import { TUserData } from "@/types";

const ProfilePage = () => {
  const { user: userData, isLoading: userLoading } = useUser();

  if (userLoading) {
    return <ProfileSkeleton />;
  }
  return (
    <>
      <Profile userData={userData as TUserData} />
    </>
  );
};

export default ProfilePage;
