import { z } from "zod";

export const inviteUserFormSchema = z.object({
  userId: z.string().min(1, "Please select a user"),
  email: z.string().email("Please enter a valid email address"),
  role: z.string().min(1, "Please select a role"),
});
