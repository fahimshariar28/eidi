import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { txId } = body;

    console.log(`Updating Invoice ${id} with TxID: ${txId}`);

    await prisma.invoice.update({
      where: { id },
      data: {
        status: "PAID",
        transactionId: txId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("PRISMA ERROR:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
