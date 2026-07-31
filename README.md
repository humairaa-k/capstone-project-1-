# RaahYab

Find jobs, internships, scholarships, and remote work opportunities — built for Afghan youth.

**Live Demo:** [raahyab.vercel.app](https://raahyab.vercel.app)
**GitHub:** [github.com/humairaa-k/capstone-project-1-](https://github.com/humairaa-k/capstone-project-1-)

---

## Project Description

RaahYab is a searchable opportunities platform where Afghan youth can discover jobs, internships, scholarships, remote work, and training programs — all in one place. Anyone can submit an opportunity; every submission goes through an admin review before it goes live, keeping listings trustworthy and current.

## Problem It Solves

Opportunities for Afghan youth — jobs, scholarships, internships — are scattered across social media making them hard to find and easy to miss. RaahYab centralizes them into one searchable, filterable platform, with an admin review step so listings stay genuine rather than spam or outdated.

**Who it's for:** young job-seekers and students in Afghanistan looking for opportunities, and organizations or individuals who want to post them.

## Features

**Opportunities**
- Browse, search, and filter by category, location, type, and deadline
- Submit a new opportunity for review
- Edit existing opportunities — approved listings return to pending review after an edit, so changes are re-checked before going live again
- Delete an opportunity — the deletion is queued as pending and only takes effect once an admin approves it
- Save opportunities for later

**Admin Workflow**
- Every submission starts as pending until an admin approves it
- Editing a live opportunity re-queues it for approval without losing the original version if declined
- Admin dashboard with approve/decline actions and an urgency indicator for items waiting longest

**Dashboard**
- At-a-glance stats: total opportunities, category breakdown, remote listings, items expiring soon
- Submissions trend chart and category breakdown chart
- Recent submissions feed

**Authentication**
- Email/password signup and login (Auth.js)
- Passwords hashed with bcrypt, never stored in plain text
- Role-based access — separate views and permissions for admins and regular users
- Protected routes at both the network layer (proxy) and the page layer (server-side session check)

**Other**
- CV builder
- Multi-language support (English, Dari, Pashto)
- Light/dark theme

## Technologies Used

| Layer | Tools |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, Tailwind CSS 4, Radix UI, Lucide Icons |
| Forms & Validation | React Hook Form, Zod |
| Auth | Auth.js (NextAuth v5), bcryptjs |
| Database | PostgreSQL (Supabase), Prisma ORM |
| Charts | Recharts |
| Animation | GSAP |
| i18n | next-intl |
| PDF Export | html2pdf.js |
| Notifications | Sonner |


## How to Run Locally

**1. Clone and install**
```bash
git clone https://github.com/humairaa-k/capstone-project-1-.git
cd raahyab
npm install
```

**2. Set up environment variables**

Create a `.env` file in the project root:

| Variable | Description |
|---|---|
| `DATABASE_URL` | Pooled PostgreSQL connection string (Supabase) |
| `DIRECT_URL` | Direct PostgreSQL connection string, used for migrations |
| `AUTH_SECRET` | Secret key used by Auth.js to sign sessions |

**3. Run database migrations**
```bash
npx prisma migrate dev
```

**4. Start the dev server**
```bash
npm run dev
```

Visit `http://localhost:3000`.

## Screenshots

<table>
  <tr>
    <td align="center"><b>Homepage</b></td>
    <td align="center"><b>Homepage Dark</b></td>
  </tr>
  <tr>
    <td><img src="./raahyab/public/screenshots/homepage.png" width="400"/></td>
    <td><img src="./raahyab/public/screenshots/homepage_dark.png" width="400"/></td>
  </tr>
  <tr>
    <td align="center"><b>Opportunities Page</b></td>
    <td align="center"><b>Opportunities Page(1)</b></td>
  </tr>
  <tr>
    <td><img src="./raahyab/public/screenshots/opportunities.png" width="400"/></td>
    <td><img src="./raahyab/public/screenshots/opportunities_1.png" width="400"/></td>
  </tr>
   <tr>
    <td align="center"><b>Opportunity Details Page</b></td>
     <td align="center"><b>Add Opportunity</b></td>
   </tr>
   <tr>
     <td><img src="./raahyab/public/screenshots/opport_details_page.png" width="400"/></td>
     <td><img src="./raahyab/public/screenshots/add_opportunity.png" width="400"/></td>
   </tr>
     <tr>
    <td align="center"><b>Edit Opportunity</b></td>
     <td align="center"><b>Saved Opportunity Page</b></td>
   </tr>
   <tr>
     <td><img src="./raahyab/public/screenshots/edit_opportunity.png" width="400"/></td>
     <td><img src="./raahyab/public/screenshots/saved_opport.png" width="400"/></td>
   </tr>
    <tr>
    <td align="center"><b>Dashboard</b></td>
    <td align="center"><b>Dashboard(1)</b></td>
  </tr>
  <tr>
    <td><img src="./raahyab/public/screenshots/dashboard.png" width="400"/></td>
    <td><img src="./raahyab/public/screenshots/dashboard_1.png" width="400"/></td>
  </tr>
  <tr>
    <td align="center"><b>Profile</b></td>
    <td align="center"><b>Aboutus Page</b></td>
  </tr>
  <tr>
    <td><img src="./raahyab/public/screenshots/profile.png" width="400"/></td>
    <td><img src="./raahyab/public/screenshots/aboutus.png" width="400"/></td>
  </tr>
  <tr>
    <td align="center"><b>CV Builder</b></td>
    <td align="center"><b>Contactus Page</b></td>
  </tr>
  <tr>
    <td><img src="./raahyab/public/screenshots/cv_builder.png" width="400"/></td>
    <td><img src="./raahyab/public/screenshots/contactus.png" width="400"/></td>
  </tr>
   <tr>
    <td align="center"><b>Signup</b></td>
    <td align="center"><b>Login Page</b></td>
  </tr>
  <tr>
    <td><img src="./raahyab/public/screenshots/signup.png" width="400"/></td>
    <td><img src="./raahyab/public/screenshots/login.png" width="400"/></td>
  </tr>
   <tr>
    <td align="center"><b>Notfound</b></td>
  </tr>
  <tr>
    <td><img src="./raahyab/public/screenshots/not_found.png" width="400"/></td>
  </tr>
</table>

```
raahyab/
app/
  (auth)/login/page.tsx           # Login page
  (auth)/signup/page.tsx          # Signup page
  (protected)/dashboard/page.tsx  # Main dashboard
  (protected)/dashboard/profile/  # Profile page
  (protected)/add-opportunity/    # Submit new opportunity
  (protected)/cv-builder/         # CV builder feature
  (protected)/saved/              # Saved opportunities page
  api/opportunities/route.ts      # Opportunity list/create endpoint
  api/opportunities/[id]/route.ts # Single opportunity get/update/delete
  api/opportunities/[id]/decision/route.ts  # Admin approve/decline logic
  api/auth/                       # Auth.js route handler
  api/account/route.ts            # Account/profile update endpoint
  api/signup/route.ts             # Custom signup endpoint
  opportunities/page.tsx          # Public opportunities listing
  opportunities/[id]/page.tsx     # Opportunity detail page
  opportunities/[id]/edit/page.tsx # Edit opportunity page
  layout.tsx                      # Root layout
  page.tsx                        # Homepage

components/
  auth/                # Login/signup forms
  dashboard/           # Charts, stat cards, sidebar
  dashboard/admin/PendingApprovals.tsx  # Admin approve/decline UI
  opportunities/       # Cards, filters, search bar
  opportunity/         # Add/edit opportunity forms
  cv-builder/          # CV builder form + PDF export
  ui/                  # shadcn/Radix base components

context/
  SavedContext.tsx     # Saved-opportunities state
  ThemeContext.tsx     # Light/dark mode state
  LanguageContext.tsx  # i18n state

lib/
  auth.ts              # Auth.js config — providers, session logic
  prisma.ts            # Prisma client singleton
  opportunities.ts     # Data access + dashboard stats calculations
  schemas/             # Zod validation schemas
  generated/prisma/    # Auto-generated Prisma client (don't edit)

prisma/
  schema.prisma         # Database schema

messages/
  en.json / fa.json / ps.json  # i18n translation files

proxy.ts                # Route protection (runs before protected pages load)

```

## Future Improvements

- **Company/organization pages with full CRUD** — a separate `Organization` model with its own profile page, instead of storing org names as plain text
- **Profile page with real editing** — a form to update username, email, password, and profile photo
- **Automated testing** — no unit or end-to-end tests yet; priority areas are the dashboard stats, approve/decline logic, and signup/login flow
- **Contact form** — wire it up to save submissions to the database or send them via an email service (e.g. Resend)
- **Google OAuth** — schema already supports it via the `Account` model; just needs adding to `lib/auth.ts`
- **Email notifications** — notify users when their submission is approved/declined, and notify admins on new submissions
- **Opportunities filters** — fix filter visibility on small screens (currently not visible on mobile)
- **Dashboard** — expand admin controls, insights, and refinements beyond current stats/charts
- **CV Builder** — add more templates, sections, and export options

## What I Learned

- Working with Prisma and Supabase — this was my first time using Prisma as an ORM connected to a Supabase PostgreSQL database, and I ran into a fair number of setup and configuration challenges along the way, especially since I'd never used either tool before
- Understanding how APIs are actually built — writing the API routes for opportunities, auth, and admin decisions gave me a much clearer picture of how backend APIs work in practice, not just in theory
- Thinking about scalability and security, not just UI — this project pushed me to consider how the app would hold up with more users and data, and where security mattered (validation, auth checks), instead of only focusing on how things looked


## Demo Accounts

You can use the credentials below to log in and explore the platform without creating a new account.

**Admin Account**
- Email: `admin44@gmail.com`
- Password: `Admin4444`

**User Account**
- Email: `userr@gmail.com`
- Password: `Userdemo123`


## Contact Me

Have questions or suggestion about this project? Feel free to reach out.

**Email:** humirakhaliq2@gmail.com


## Author

Humaira Hotaki