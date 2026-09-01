import { NextRequest, NextResponse } from 'next/server';

const N8N_WEBHOOK = 'https://n8n.srv1338535.hstgr.cloud/webhook/132e5738-e018-40eb-83b9-c184bf95359f';
// Webhook générique de notif Telegram (workflow n8n "modif client nightbook.io")
const NOTIFY_WEBHOOK = 'https://n8n.srv1338535.hstgr.cloud/webhook/nightbook-notify';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { first, ...payload } = body;

  // Premier message d'une session démo → notif Telegram (fire-and-forget, jamais bloquant)
  if (first) {
    const message =
      `🧪 *Démo agent-booking.fr testée*\n` +
      `Établissement : ${payload.clubName || '?'}\n` +
      `Domaine : ${payload.domain || '?'} · Problème : ${payload.problem || '?'}\n` +
      `1er message : ${String(payload.chatInput || '').slice(0, 200)}`;
    fetch(NOTIFY_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    }).catch(() => {});
  }

  const response = await fetch(N8N_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  return NextResponse.json(data);
}
