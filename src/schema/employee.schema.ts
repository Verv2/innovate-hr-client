import { z } from "zod";

export const employeeFormSchema = z.object({
  firstName: z.string().min(1),
  middleName: z.string().min(1).or(z.literal("")),
  lastName: z.string().min(1),
  dateOfBirth: z.coerce.date(),
  gender: z.string().min(1, "Gender is required"),
  homeAddress: z.string().min(1, "Home Address is required"),
  nationality: z.string().min(1, "Nationality is required"),
  maritalStatus: z
    .string()
    .min(1, "Marital Status is required")
    .optional()
    .or(z.literal("")),
});

export const contactInformationFormSchema = z.object({
  phoneNumber: z.string(),
  email: z.string(),
  residentialAddress: z.string().min(1),
  name: z.string().min(1),
  relationship: z.string().min(1),
  emergencyPhoneNumber: z.string(),
});

export const identificationDocumentsSchema = z.object({
  passportOrNationalId: z.any(),
  insuranceNumber: z.string().min(1),
  socialSecurityNumber: z.string().min(1),
  visaExpiryDate: z.coerce.date(),
  taxIdNumber: z.string().min(1).optional(),
});

export const employeeDetailsSchema = z.object({
  employeeIdNumber: z.string().min(1),
  jobTitle: z.string().min(1),
  department: z.string(),
  dateOfJoining: z.coerce.date(),
  employmentType: z.string(),
});

export const financialInformationSchema = z.object({
  bankName: z.string().min(1),
  accountNumber: z.string().min(1),
  accountHolder: z.string().min(1),
  bankAddress: z.string().min(1),
  sortCode: z.string().min(1),
  ibanOrSwfit: z.string().min(1),
  benefitEnrollment: z.string(),
});

export const additionalDocumentsSchema = z.object({
  signedContractPaperwork: z.string().optional(),
  educationalCertificates: z.string().optional(),
  professionalCertificates: z.string().optional(),
  recentPhotograph: z.string().optional(),
});
