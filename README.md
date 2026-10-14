# Hon. Jibril Abu II (Wisdombank) — Official Constituency Website

Official digital platform for **Hon. Jibril Abu II**, popularly known as **Wisdombank**, representing Ajaokuta Constituency in the Kogi State House of Assembly, Nigeria, and serving as Chairman of the House Committee on Lands.

---

## 🏛️ Project Architecture & Features

1. **Design System & Branding:**
   - Palette: Deep Navy (`#0B1739`), Royal Blue (`#1746A2`), Presidential Blue (`#2463C5`), Gold (`#D6A84F`), Emerald Green (`#008751`), and Clean Off-White (`#F7F8FC`).
   - Typography: Manrope (headings) & Inter (body).
   - Zero-pill discipline, accessible status indicators with clear text labels and contrast ratios.

2. **Public Information & Transparency:**
   - **Hero Section:** Responsive two-column layout, official portrait placeholder with respectful gold frame, and constituency coordinates.
   - **Public Service Overview:** 4 pillars (Legislative Activities, Constituency Projects, Community Engagement, Public Information).
   - **Key Projects Directory:** Filterable by Category and Status (`proposed`, `announced`, `approved`, `ongoing`, `completed`, `on_hold`, `awaiting_verification`). Unverified project drafts clearly labeled with verification notes.
   - **Legislative Activities Archive:** Plenary motions, Committee on Lands oversight briefs, Hansard proceedings, and outcomes.
   - **News & Media Bureau:** Press dispatches, category filtering, search, social sharing (Facebook, WhatsApp, X), and related articles.
   - **Media Gallery:** Photo documentation of oversight tours, townhalls, and plenary sessions with lightbox zoom.
   - **Constituency Engagement Portal:**
     - Civic petition and request submission with validation.
     - Automated unique reference number generator (e.g., `AJK-2025-XXXX`).
     - Real-time submission status tracking with public action logs and staff updates.
     - Frequently Asked Questions (FAQ) for constituents.
   - **Contact Bureau:** Official liaison office coordinates, public hours, and verified message form.

3. **Live Facebook Feed Integration Area:**
   - Configured for the official page **"ABU JIBRIL II"**.
   - Supports Native Facebook Page Plugin, Elfsight, Smash Balloon, and a graceful automated fallback to website news if third-party scripts or connections fail.

4. **Authorized Staff Portal (CMS):**
   - Access at `/admin/login` and `/admin/dashboard`.
   - Role-Based Access Control (RBAC):
     - **Administrator:** Full system configuration, projects, news, submissions, and social feed settings.
     - **Editor:** Create, edit, and publish news, projects, and media.
     - **Case Officer:** Review citizen petitions, update progress, and formulate official responses.
   - Citizen Petitions CRM with confidential internal notes and public audit timeline.
   - Project CMS with milestone tracking and evidence URLs.
   - Site settings & Facebook feed switcher.

---

## 🚀 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev
```

Visit `http://localhost:3000` to preview the website.

---

## 🗄️ Supabase / PostgreSQL Setup (Optional for Production)

The application includes an in-browser reactive persistence layer (`localStorage`) allowing complete testing out of the box.

To connect a production Supabase instance:
1. Open your Supabase Dashboard and go to the **SQL Editor**.
2. Run the provided schema file: `src/db/supabase-schema.sql`.
3. Add your credentials to `.env`:
   ```env
   VITE_SUPABASE_URL="https://your-project.supabase.co"
   VITE_SUPABASE_ANON_KEY="your-anon-public-key"
   ```
4. Row-Level Security (RLS) policies are pre-configured to protect citizen contact data while allowing public reads of published projects and news.

---

## 📋 Production Launch Checklist

- [ ] Obtain approved official high-resolution portrait photograph of Hon. Jibril Abu II.
- [ ] Confirm exact verified URL for the official Facebook page **"ABU JIBRIL II"**.
- [ ] Verify physical constituency liaison office street address and official contact helpline.
- [ ] Verify legislative gazette numbers and public hearing dates before publication.
- [ ] Set up production domain DNS and SSL certificates.
