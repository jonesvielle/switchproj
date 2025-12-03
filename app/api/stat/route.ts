import { sendEmail } from "@/app/lib/email";
import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("quickteller");
    const collection = db.collection("reservations");

    const total = await collection.countDocuments();
    const byCountry = await collection
      .aggregate([{ $group: { _id: "$country", count: { $sum: 1 } } }])
      .toArray();

    const html = `
      <h2>Quickteller Reservation Stats</h2>
      <p>Total Reservations: ${total}</p>
      <p>By Country:</p>
      <ul>
        ${byCountry.map((c) => `<li>${c._id}: ${c.count}</li>`).join("")}
      </ul>
    `;

    await sendEmail({
      to: "iswdesignteam@gmail.com",
      subject: "Quickteller Reservation Stats",
      html,
    });

    return NextResponse.json({ message: "Stats sent" });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
