import { NextRequest, NextResponse } from 'next/server';

const N8N_WEBHOOK = 'https://n8n.srv1338535.hstgr.cloud/webhook/132e5738-e018-40eb-83b9-c184bf95359f';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const response = await fetch(N8N_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return NextResponse.json(data);
}
