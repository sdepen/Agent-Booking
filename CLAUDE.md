# CLAUDE.md , site vitrine Agent Booking

> Site vitrine de **l'agence** Agent Booking (Sacha Depenweiller). Distinct de nightbook.io (le SaaS boîte de nuit).
> **Prod** : https://agent-booking.fr/ (auto-deploy `main` → Vercel, projet Vercel `agent-booking`).
> **Repo** : https://github.com/sdepen/Agent-Booking (cloné en local dans `AGENT IA /SITE AGENT-BOOKING`).

---

## ⚠️ PIÈGE À RETENIR (résolu S91)

Pendant longtemps, **la prod ne venait PAS de GitHub**. Le site live était un **déploiement CLI du 22 avril** (`dpl_6HaRpxUVRojNU6y3va1fvnXtoX1y`, fait via `vercel` en direct depuis l'ordi), alors que le repo GitHub était resté sur l'état de **mars** (version différente, plus ancienne). Résultat : un `git push` sur `main` **écrasait** la vraie version live par l'ancienne.

**S91 : réparé.** On a récupéré les fichiers du déploiement d'avril via l'API Vercel (`/v6/deployments/{id}/files` + `/v7/.../files/{uid}`), remis dans le repo, et re-poussé. **Désormais GitHub = la prod.** Ne JAMAIS refaire de `vercel deploy` en CLI hors GitHub sans re-committer derrière, sinon le décalage revient.

---

## Structure

- **Next.js** (App Router, TS) mais le vrai contenu = **fichiers statiques dans `public/`** :
  - `public/agentbooking.html` , **LA landing** (tout le HTML/CSS/JS inline, ~910 lignes, Tailwind CDN + i18n maison FR/EN).
  - `public/demo-start.html` (`/demo`) , formulaire "tester l'agent" (nom + domaine + problème, stocké en localStorage, PAS de lead en base).
  - `public/demo-agent.html` (`/agent`) , chat de démo qui tape le webhook n8n via `/api/chat`.
  - `public/mentions-legales.html`, `public/confidentialite.html`, `public/service.html` (pages légales).
  - `public/logo.png`, `public/favicon.png`, `public/logo-xquad.jpg` (logo client bandeau).
- `next.config.ts` : **rewrite `/` → `/agentbooking.html`** (sert la landing à la racine, pas d'iframe) + redirects `/mentions-legales`, `/confidentialite`, `/conditions-service` + rewrites `/demo`, `/agent`.
- `src/app/api/chat/route.ts` : proxy vers le **webhook n8n démo** `132e5738-e018-40eb-83b9-c184bf95359f` (workflow "agent demo" `INtyqZY99dP0vVRy`, LE MÊME que la démo nightbook.io). Payload : `{chatInput, sessionId, source:'agentbooking-demo', clubName, domain, problem}`.
- `src/app/src/app/{mentions-legales,confidentialite}/page.tsx` : copies React des pages légales (garder synchro avec les .html si modifiées).

## Landing (`agentbooking.html`) , anatomie

Bannière lancement nightbook.io (top, i18n `banner_*`) → Header (nav + switch langue FR/EN + CTA WhatsApp) → Hero (chat animé WhatsApp) → **Domaines** (4 cartes : Boîte de nuit, Tourisme, Location, Business Perso) → **Bandeau clients** ("Ces entreprises qui nous font confiance" + logos) → Fonctionnalités → Avantages (section sombre) → Avis → CTA → Footer.

- **i18n** : objet `translations = {fr:{...}, en:{...}}` inline + `data-i18n` sur les éléments. `setLanguage()` réécrit les textNodes. **Toute string user-facing FR + EN** (pas d'ES sur ce site).
- **Modale secteurs** (`sectorData`) : clic sur une carte → modale. Cas spécial **`nightlife`** : au lieu du faux chat, affiche la **vidéo promo nightbook** (`video: https://nightbook.io/promo-{fr,en}.mp4`) en grand + CTA "Découvrir nightbook.io →" (flag `nightbookCta`). Les autres secteurs (tourisme, location, business) = faux chat de démo + CTA WhatsApp.
- **CTA** : les boutons `.open-calendly` ouvrent en fait **WhatsApp** (`WA_LINKS`, wa.me/33767466391) , Calendly a été retiré en avril malgré le nom de classe resté.

## Conventions (héritées du business)

- **Pas de `—`/`–`** user-facing → `·`, `,`, `.`.
- Téléphone pro : **07 67 46 63 91** (`33767466391` pour wa.me). Email pro : **agentbooking.contact@gmail.com**.
- Hébergeur (mentions légales) : **Vercel** (pas IONOS). SIRET 990 009 466 00014, adresse 17 Bis route de Boussange 57270 Richemont.
- Accent cyan `#00e5ff`, fonts Syne (display) + Plus Jakarta Sans. Jamais de glow cyan fluo.

## Déployer / tester

```bash
git push          # → auto-deploy Vercel (prod = main)
# vérif live : curl -sL "https://agent-booking.fr/?v=$(date +%s)" | grep ...
```
Test local sans build : ouvrir `public/agentbooking.html` en `file://` (Playwright OK). Le rewrite racine + `/api/chat` nécessitent `vercel dev` (ou tester en prod).

## État / TODO

- ✅ S91 : restauration prod, bannière lancement nightbook.io (i18n), secteur **Location** (remplace Conciergerie), Boîte de nuit en 1er, bandeau clients (logo **X-Quad Samui Raid**), modale nightlife = vidéo promo + CTA nightbook, SEO (meta desc + OG + canonical), légal vérifié, nouveau numéro.
- ⏭️ **Ajouter d'autres logos clients** au bandeau `#clients` dès qu'ils arrivent (nightbook clubs, agences tourisme…) , juste dupliquer le `<img>` dans la section.
- ⏭️ Titre onglet en anglais ("AI Booking & Sales Agents 24/7") alors que le site ouvre en FR , à trancher avec Sacha.
- ⏭️ Pas d'ES (le SaaS nightbook est FR/EN/ES) , à ajouter si prospection hispano via l'agence.
- 💡 Refonte design éventuelle (Sacha "sans doute", mais pas prioritaire , le site couvre plusieurs secteurs, pas que le nightlife).
