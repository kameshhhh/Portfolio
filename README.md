# Kamesh — Portfolio (React + Node)

A full-stack portfolio site with an admin panel to edit every section and upload
project screenshots, no rebuild required.

- **Frontend:** React 18 + Vite, React Router
- **Backend:** Node.js + Express, JWT auth, Multer for image uploads
- **Storage:** a JSON file (`backend/data/portfolio.json`) + an `uploads/` folder for images — no database to set up

## Project structure

```
portfolio/
  backend/     Express API (auth, content, uploads)
  frontend/    React app (public site + /admin)
```

## 1. Install dependencies

```bash
cd backend && npm install
cd ../frontend && npm install
```

## 2. Run in development (two terminals)

```bash
# Terminal 1
cd backend
npm run dev        # http://localhost:5050

# Terminal 2
cd frontend
npm run dev         # http://localhost:5173
```

Open **http://localhost:5173** for the public site.
Open **http://localhost:5173/admin** to sign in.

### Admin login

```
Username: admin
Password: admin123
```

Change these before deploying — see "Changing the admin password" below.

## 3. Editing your content

Once signed in at `/admin`, use the left-hand tabs to edit:

- **Profile** — name, tagline, summary, contact links
- **Skills** — grouped, comma-separated skill tags
- **Projects** — title, meta line, problem / flow / shipped copy, and screenshots
  (upload directly from the dashboard — no need to touch any files)
- **Hackathons / Education / Certifications** — add, edit, or remove entries

Click **Save changes** in the top bar after editing each tab. Changes are written
to `backend/data/portfolio.json` and are live on the public site immediately —
no rebuild needed in development.

## 4. Changing the admin password

Set environment variables before starting the backend (don't leave the defaults
in production):

```bash
# backend/.env  (create this file)
ADMIN_USER=your_username
ADMIN_PASS=your_strong_password
JWT_SECRET=some-long-random-string
PORT=5050
```

The server reads `process.env.ADMIN_USER` / `ADMIN_PASS` / `JWT_SECRET` — no
code changes needed. If you use a `.env` file, load it with a tool like
`node --env-file=.env server.js` (Node 20+) or add the `dotenv` package.

## 5. Building for production

```bash
cd frontend
npm run build       # outputs frontend/dist

cd ../backend
npm start            # serves the API AND the built frontend from one process
```

Then visit **http://localhost:5050** for everything — the Express server serves
the compiled React app and the API from the same origin.

## Notes

- Uploaded screenshots are saved to `backend/uploads/` and served at `/uploads/<file>`.
- All portfolio content lives in `backend/data/portfolio.json` — back this file
  up before making big changes, or restore your resume defaults by re-seeding it.
- The design is a custom "blueprint schematic" theme: dark background, subtle
  grid, and a signature animated diagram in the hero that mirrors the
  Problem → Flow → Shipped structure used in every project write-up.
