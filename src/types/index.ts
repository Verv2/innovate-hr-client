export type TRole = "ADMIN" | "SUPER_ADMIN" | "EMPLOYEE" | "MANAGER";

export interface IUserContext {
  id: string;
  email: string;
  role: TRole;
  needPasswordChange: boolean;
  employees: TEmployee;
}

export type TBasicInfo = {
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: Date | undefined;
  gender: "MALE" | "FEMALE" | "OTHER";
  homeAddress: string;
  nationality: string;
  maritalStatus?: "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED";
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

export type TFullTemporaryData = {
  basicInfo: TBasicInfo;
  contactInformation: TContactInformation;
  employeeDetails: TEmployeeDetails;
  financialInformation: TFinancialInformation;
  identificationDocuments: TIdentificationDocuments;
  passportOrNationalIdUrl: string;
  signedContractPaperworkUrl: string;
  educationalCertificatesUrl: string[];
  professionalCertificatesUrl: string[];
  recentPhotographUrl: string;
  step: number;
};

type TInvitationEmployee = {
  id: string;
  userId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  additionalDocuments: { recentPhotograph?: string };
};

export type TInvitationData = {
  id: string;
  email: string;
  role: string;
  status: string;
  employees?: TInvitationEmployee;
};

export type TEmployee = {
  id: string;
  userId: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string; // ISO date string from backend
  gender: "MALE" | "FEMALE" | "OTHER";
  homeAddress: string;
  nationality: string;
  maritalStatus?: "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED";
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;

  contactInformation: {
    id: string;
    employeeId: string;
    phoneNumber: string;
    email: string;
    residentialAddress: string;
    createdAt: string;
    updatedAt: string;
  };

  emergencyContact: {
    id: string;
    employeeId: string;
    name: string;
    relationship: string;
    emergencyPhoneNumber: string;
    createdAt: string;
    updatedAt: string;
  };

  identificationDocuments: {
    id: string;
    employeeId: string;
    passportOrNationalId: string;
    insuranceNumber: string;
    socialSecurityNumber: string;
    visaExpiryDate: string;
    taxIdNumber?: string;
    createdAt: string;
    updatedAt: string;
  };

  employmentDetails: {
    id: string;
    employeeId: string;
    employeeIdNumber: string;
    jobTitle: string;
    department: string;
    dateOfJoining: string;
    employmentType: "FULL_TIME" | "PART_TIME" | "CONTRACT";
    createdAt: string;
    updatedAt: string;
  };

  financialInformation: {
    id: string;
    employeeId: string;
    bankName: string;
    accountNumber: string;
    accountHolder: string;
    bankAddress: string;
    sortCode: string;
    ibanOrSwfit: string;
    benefitEnrollment: string;
    createdAt: string;
    updatedAt: string;
  };

  additionalDocuments: {
    id: string;
    employeeId: string;
    signedContractPaperwork: string;
    educationalCertificates: string[];
    professionalCertificates: string[];
    recentPhotograph?: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type TUserData = {
  id: string;
  email: string;
  role: TRole;
  needPasswordChange: boolean;
  status: string;
  employees?: TEmployee;
};

export type TLeaveRequest = {
  leaveType: string;
  leaveDates: string[];
  reason?: string;
};

export type TRequestedLeaveUser = {
  createdAt: string;
  updatedAt: string;
  employeeId: string;
  id: string;
  isOngoing: boolean;
  leaveDates: string[];
  leaveType: string;
  reason: string;
  status: string;
  employee: TEmployee;
};

export type TLeaveTypes = {
  ANNUAL_LEAVE: number;
  SICK_LEAVE: number;
  UNPAID_LEAVE: number;
  PATERNITY_LEAVE: number;
  MATERNITY_LEAVE: number;
};

export type TLeaveToday = {
  id: string;
  employeeId: string;
  leaveType: string;
  leaveDates: string[];
  reason: string;
  status: string;
  isOngoing: boolean;
  employee: {
    id: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    employeeLeaves: {
      id: string;
      totalLeaveDays: number;
      availableLeaveDays: number;
      unpaidLeaveDays: number;
    };
    employmentDetails: {
      id: string;
      department: string;
      jobTitle: string;
    };
    additionalDocuments: {
      id: string;
      recentPhotograph?: string;
    };
  };
};
