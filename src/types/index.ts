export interface IUserContext {
  id: string;
  email: string;
  role: "SUPER_ADMIN" | "ADMIN" | "LANDLORD" | "TENANT";
  //   profilePhoto: string;
  //   isProfileUpdated: boolean;
  //   status: "ACTIVE" | "BLOCKED" | "DELETED";
}

export type TBasicInfo = {
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: Date | undefined;
  gender: "MALE" | "FEMALE" | "OTHER";
  homeAddress: string;
  nationality: string;
  maritalStatus: "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED";
};

export type TContactInformation = {
  phoneNumber: string;
  email: string;
  residentialAddress: string;
  name: string;
  relationship: string;
  emergencyPhoneNumber: string;
};

export type TIdentificationDocuments = {
  passportOrNationalId: string;
  insuranceNumber: string;
  socialSecurityNumber: string;
  visaExpiryDate: Date | undefined;
  taxIdNumber?: string;
};

export type TEmployeeDetails = {
  employeeIdNumber: string;
  jobTitle: string;
  department: string;
  dateOfJoining: Date | undefined;
  employmentType: string;
};

export type TFinancialInformation = {
  bankName: string;
  accountNumber: string;
  sortCode: string;
  bankAddress: string;
  ibanOrSwfit: string;
  accountHolder: string;
  benefitEnrollment: string;
};
