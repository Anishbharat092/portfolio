import { NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = "anishbharatmns@gmail.com";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: { name?: string; email?: string; message?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  // Server-side validation
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email and message are all required." },
      { status: 400 },
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 },
    );
  }
  if (message.length > 5000 || name.length > 200) {
    return NextResponse.json(
      { error: "Submitted content is too long." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[Dev] RESEND_API_KEY not set — mocking contact submission:", {
      name,
      email,
      message,
    });
    return NextResponse.json(
      { success: true, message: "Mock message received" },
      { status: 200 },
    );
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [TO_EMAIL],
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      console.log("[Dev] Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.log("[Dev] Contact route exception:", err);
    return NextResponse.json(
      { error: "Something went wrong sending your message." },
      { status: 500 },
    );
  }
}
