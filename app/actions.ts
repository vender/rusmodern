"use server";

import { revalidatePath } from "next/cache";

export async function addReview(
    prevState: {
      message: string;
    },
    formData: FormData,
  ) {
  
    try {
  
      revalidatePath("/");
      return { message: `Added todo` };
    } catch (e) {
      return { message: "Failed to create todo" };
    }
}