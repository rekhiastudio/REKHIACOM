import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstname, lastname, email, message } = body;

    // tu webhook de Discord (guardalo en env)
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL!;

    const payload = {
      embeds: [
        {
          title: "📩 New Contact Form Submission",
          color: 0xff0000, // rojo (puedes cambiar el color)
          fields: [
            { name: "First Name", value: firstname || "-", inline: true },
            { name: "Last Name", value: lastname || "-", inline: true },
            { name: "Email", value: email || "-", inline: false },
            { name: "Message", value: message || "-", inline: false },
          ],
          footer: {
            text: "Rekhia.com Contact Form",
          },
          timestamp: new Date().toISOString(),
        },
      ],
    };

    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Error sending to Discord:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
