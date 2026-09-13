# Tech Society Voting

A futuristic, responsive student project competition and one-vote-only voting website built with Next.js, TypeScript, Tailwind CSS and PostgreSQL/Prisma.

## 1. Install

```bash
npm install
```

## 2. Create environment

Copy `.env.example` to `.env` and set:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/tech_society"
ADMIN_SECRET="use-a-long-random-secret"
```

For Vercel, use a hosted PostgreSQL provider such as Neon, Supabase or another PostgreSQL service.

## 3. Database

```bash
npx prisma generate
npx prisma db push
```

Optional:

```bash
npx prisma studio
```

## 4. Run in VS Code

```bash
npm run dev
```

Open:

http://localhost:3000

The exact pages are:

- `/` — futuristic landing page + live Top 3
- `/submit` — project owner submission
- `/vote` — voter registration + live voting
- `/admin/login` — admin login
- `/admin` — admin dashboard

## 5. Voting security

The database contains a unique constraint on `Voter.rollNo` and a unique constraint on `Vote.voterId`.

The vote action checks whether a voter already has a vote and performs the final insert inside a Prisma transaction. Therefore the server, not the browser button, enforces the one-vote rule.

## 6. Project images

This starter uses a public image URL to keep the app deployable without a storage provider.

For a real competition, replace the image URL field with Cloudinary, Vercel Blob or S3 upload. Store only the resulting public URL in `Project.imageUrl`.

## 7. Deploy to Vercel

Push the project to GitHub, import it into Vercel, add:

- `DATABASE_URL`
- `ADMIN_SECRET`

Then deploy.

Build command:

```bash
npm run build
```

## Design

The UI intentionally follows the supplied reference: dark navy/black background, electric blue/cyan/purple accents, glass panels, thin neon borders, futuristic typography, project cards, live leaderboard, voting cards, modal details, admin control center and responsive mobile layout.
