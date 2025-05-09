export interface IUserContext {
  id: string;
  email: string;
  role: "SUPER_ADMIN" | "ADMIN" | "LANDLORD" | "TENANT";
  //   profilePhoto: string;
  //   isProfileUpdated: boolean;
  //   status: "ACTIVE" | "BLOCKED" | "DELETED";
}
