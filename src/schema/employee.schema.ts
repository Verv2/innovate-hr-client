import { z } from "zod";

export const employeeFormSchema = z.object({
  firstName: z.string().min(1),
  middleName: z.string().min(1).optional(),
  lastName: z.string().min(1),
  dateOfBirth: z.coerce.date(),
  gender: z.string(),
  homeAddress: z.string().min(1),
  nationality: z.string(),
  maritalStatus: z.string().optional(),
});
