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
  - `public/agentbooking.html` , **LA landing v2** (refonte août 2026 : tout le HTML/CSS/JS inline, CSS maison SANS Tailwind, i18n maison FR/EN). Ancienne v1 récupérable via la branche `backup-pre-v2` / git log.
  - `public/demo-start.html` (`/demo`) , formulaire "tester l'agent" (nom + domaine + problème, stocké en localStorage, PAS de lead en base).
  - `public/demo-agent.html` (`/agent`) , chat de démo qui tape le webhook n8n via `/api/chat`.
  - `public/mentions-legales.html`, `public/confidentialite.html`, `public/service.html` (pages légales).
  - `public/logo.png`, `public/favicon.png`, `public/logo-xquad.jpg` (logo client bandeau).
- `next.config.ts` : **URLs propres partout** , rewrites `beforeFiles` (`/`→agentbooking.html, `/demo`, `/agent`, `/mentions-legales`, `/confidentialite`, `/conditions-service`) + redirects 308 des vieilles URLs `.html` vers les propres. ⚠️ `beforeFiles` obligatoire : sinon `src/app/page.tsx` (wrapper iframe legacy) capte `/` à la place du vrai HTML.
- `src/app/api/chat/route.ts` : proxy vers le **webhook n8n démo** `132e5738-e018-40eb-83b9-c184bf95359f` (workflow "agent demo" `INtyqZY99dP0vVRy`, LE MÊME que la démo nightbook.io). Payload : `{chatInput, sessionId, source:'agentbooking-demo', clubName, domain, problem}`.
- `src/app/src/app/{mentions-legales,confidentialite}/page.tsx` : copies React des pages légales (garder synchro avec les .html si modifiées).

## Landing (`agentbooking.html`) , anatomie v3 (fin août 2026, DA nightbook fond blanc)

Positionnement **société umbrella** : Agent Booking = la maison mère, qui présente ses 2 SaaS + le sur-mesure.
Nav pill flottante (blur, logo Agent**Booking**, toggle FR/EN, CTA `/demo`) → **Hero** (h1 Inter + **vidéo promo nightbook** `https://nightbook.io/promo-{fr,en}.mp4` en cadre 16/9, **autoplay muet à l'arrivée**, contrôles custom cyan repris de nightbook, barre de preuve 24h/7 · 4 canaux · +250 résas) → **Produits** (carte **NightBook** sombre `#111116` accent cyan + visuel résas · carte **TripBook** papier clair Instrument Serif, accès anticipé, CTA WhatsApp) → **Sur-mesure** (liste a/b/c + témoignage réel **Nico / X-Quad Samui**, stat +250 résas, lien `tripbook.agent-booking.fr/agent-plateformes.html`) → **Méthode** (3 étapes) → **Contact** (CTA WhatsApp vert + `/demo` + email) → Footer.

- **Design v3** : **DA nightbook en thème clair** (tokens du `theme-light` du SaaS) : fond blanc, texte `#0f1419`, font **Inter** partout (+ Instrument Serif carte TripBook), accents texte cyan foncé `#0891b2`, boutons pilule cyan vif `#00e5ff` texte noir. Restent sombres pour le contraste : cadre vidéo, carte NightBook. Pas de Tailwind, pas de modales, jamais de glow cyan fluo.
- **Vidéo hero** : servie depuis nightbook.io (pas de mp4 dans ce repo). `pickVideoSrc()` bascule `promo-fr/en.mp4` au changement de langue ; fallback FR sur erreur ; autoplay muet (son au clic).
- **i18n** : objet `T = {fr:{...}, en:{...}}` inline + `data-i18n`/`data-i18n-html`, `toggleLang()` + localStorage `ab_lang`. **Toute string user-facing FR + EN** (pas d'ES sur ce site). ⚠️ Espace avant chaque `<br>` des titres (les `<br>` sont masqués en mobile, sinon les mots se collent).
- **CTA** : WhatsApp `wa.me/33767466391` (hero, TripBook, contact) + `/demo` (démo live). Plus aucun `.open-calendly`.

## Conventions (héritées du business)

- **Pas de `—`/`–`** user-facing → `·`, `,`, `.`.
- Téléphone pro : **07 67 46 63 91** (`33767466391` pour wa.me). Email pro : **agentbooking.contact@gmail.com**.
- Hébergeur (mentions légales) : **Vercel** (pas IONOS). SIRET 990 009 466 00014, adresse 17 Bis route de Boussange 57270 Richemont.
- Design v2 : accent teal `#0b6477` sur papier clair, cyan `#00e5ff` réservé au panneau NightBook. Fonts Fraunces + Archivo. Jamais de glow cyan fluo.

## Déployer / tester

```bash
git push          # → auto-deploy Vercel (prod = main)
# vérif live : curl -sL "https://agent-booking.fr/?v=$(date +%s)" | grep ...
```
Test local sans build : ouvrir `public/agentbooking.html` en `file://` (Playwright OK). Le rewrite racine + `/api/chat` nécessitent `vercel dev` (ou tester en prod).

## État / TODO

- ✅ S91 : restauration prod, bannière lancement nightbook.io (i18n), secteur **Location** (remplace Conciergerie), Boîte de nuit en 1er, bandeau clients (logo **X-Quad Samui Raid**), modale nightlife = vidéo promo + CTA nightbook, SEO (meta desc + OG + canonical), légal vérifié, nouveau numéro.
- ✅ Août 2026 : **refonte v2 complète** (positionnement société : NightBook + TripBook + sur-mesure, design éditorial Fraunces/Archivo, vidéo promo nightbook intégrée, témoignage X-Quad + stat +250 résas, titre onglet en FR, canonical). La bannière lancement, le bandeau clients et les modales secteurs de la v1 ont été absorbés/remplacés par les panneaux produits.
- ⏭️ **Ajouter des témoignages/logos clients** (section Sur-mesure ou nouvelle section) dès qu'ils arrivent (clubs nightbook, agences tourisme…).
- ⏭️ Pas d'ES (le SaaS nightbook est FR/EN/ES) , à ajouter si prospection hispano via l'agence.
