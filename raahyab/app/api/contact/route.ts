import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas/contact"
import { success } from "zod";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const result = contactSchema.safeParse(body);

        if(!result.success) {
          return NextResponse.json(
            {
              success: false,
              message: "Invalid form data",
              errors: result.error.flatten().fieldErrors,
            },
            {status: 400}
          )
        }
        console.log(result.data)

        return NextResponse.json({
          success: true,
          message: "Message sent successfully!"
        }, {status: 201})

    } catch {
        return NextResponse.json({
          success: false,
          message: "Something went wrong."
        },
       {status: 500}
    );
  }
}