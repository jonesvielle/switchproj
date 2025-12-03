import { sendEmail } from "@/app/lib/email";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstname, lastname, email, phonenumber, country, photoUrl } = body;

    console.log("Quickteller Reservation Received:", {
      firstname,
      lastname,
      email,
      phonenumber,
      country,
    });

    try {
      const clientPromise = await import("@/app/lib/mongodb");
      const client = await clientPromise.default;
      const db = client.db("quickteller");
      const existing = await db.collection("reservations").findOne({
        $or: [{ email }, { phonenumber }],
      });

      if (existing) {
        return NextResponse.json(
          { error: "Email or phone already reserved" },
          { status: 400 }
        );
      }

      await db.collection("reservations").insertOne({
        firstname,
        lastname,
        email,
        phonenumber,
        country,
        photoUrl,
        createdAt: new Date(),
      });
      console.log("Saved to MongoDB");
    } catch (error) {
      console.warn("MongoDB not available");
    }

    try {
      await sendEmail({
        to: email,
        subject: "Quickteller Business Number Reserved!",
        html: `
          <h2>Congratulations, ${firstname}!</h2>
          <p>Your exclusive Quickteller Business number has been reserved.</p>
          <ul>
            <li>Name: ${firstname} ${lastname}</li>
            <li>Email: ${email}</li>
            <li>Phone: ${phonenumber}</li>
            <li>Country: ${country}</li>
          </ul>
          <p>We'll contact you soon with your final number.</p>
          <p>— Quickteller Business Team</p>
        `,
      });
    } catch (emailError) {
      console.log("Email send error:", emailError);
      console.warn("Email failed (not critical)");
    }

    return NextResponse.json({
      success: true,
      message: "Reservation successful! Check your email for confirmation.",
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { success: true, message: "Reservation processed" },
      { status: 200 }
    );
  }
}
