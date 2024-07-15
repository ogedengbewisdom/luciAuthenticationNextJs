"use server";

import { redirect } from "next/navigation";
import { createUser } from "./users";
import { hashUserPassword } from "@/lib/hash";
import { createAuthSession } from "@/lib/auth";

export const signUp = async (previousState, formData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  const errors = {};

  if (!email.includes("@")) {
    errors.email = "Please enter a valid email";
  }
  if (password.trim() < 6 || !password) {
    errors.password = "Password should be greater than 6";
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }
  const hashedPassword = hashUserPassword(password);

  try {
    const userId = createUser(email, hashedPassword);
    await createAuthSession(userId);
    redirect("/training");
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return {
        errors: {
          email: "Email already in use try another one",
        },
      };
    }
    throw error;
  }
  //   return
};
