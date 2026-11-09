# ALMOST EXTINCT: setup and deployment

Static site (HTML/CSS/JS) + Supabase (database, photo storage, admin login). Hosts free on Vercel.

## 1. Supabase (10 minutes)
1. Create a free project at supabase.com.
2. SQL Editor > paste all of `schema.sql` > Run. This creates the tables, the hard 50-plant cap, row-level security and the photo bucket.
3. Authentication > Users > Add user (your admin email + a strong password, tick "auto confirm").
4. Authentication > Providers > Email: turn OFF "Allow new users to sign up".
5. SQL Editor, run (with your email):
   `insert into public.admins (user_id) select id from auth.users where email = 'YOUR_EMAIL_HERE';`
6. Project Settings > API: copy the Project URL and the `anon` public key into `config.js`.

### Already have a live database?
Don't re-run `schema.sql`. Run only these in the SQL Editor (one at a time). First, so the featured carousel and pop-ups can show contributor names:

```sql
create or replace view public.public_plants as
  select id, common_name, scientific_name, status, location, population, description, image_path, approved_at, submitter_name
  from public.plants where state = 'approved';
```

Second, so the form can accept all nine IUCN Red List categories (Least Concern, Extinct, Data Deficient and Not Evaluated are new):

```sql
alter table public.plants drop constraint if exists plants_status_check;
alter table public.plants add constraint plants_status_check
  check (status in ('Critically Endangered','Endangered','Vulnerable','Near Threatened','Least Concern','Extinct in the Wild','Extinct','Data Deficient','Not Evaluated'));
```

## 2. Photos
Put your photographs in `images/` and set `HERO_SRC`, `INTRO_SRC`, `WHY_SRC` in `config.js` (e.g. `images/hero.jpg`). Use compressed JPG/WebP (hero under ~300 KB, the other two under ~150 KB).

## 3. Deploy
Push this folder to GitHub and import it in Vercel (or drag the folder into vercel.com/new). `vercel.json` adds security headers. In Supabase > Authentication > URL Configuration, set Site URL to your domain.

## How it works
- Visitors submit on the site (photo is resized in the browser to 1280 px, max 3 MB). Entries are saved as `pending` and are invisible to the public.
- You sign in at `/admin`, then Approve, Reject, Edit, Unpublish or Delete. Only approved entries appear publicly.
- The 50-plant limit is enforced by the database: approving a 51st plant fails, and public submissions close automatically at 50. At 49 the site says one slot remains.
- Submitter emails are never exposed publicly. The optional submitter name is public, but the site shows it only beneath the photos in the Featured carousel ("Contributor: Name", or "Contributor: Anonymous" when left blank), never in the archive.
- The Featured carousel shows the three newest approved plants that have a photo: image and contributor only, no plant name. It auto-advances, pauses on hover or touch, and can be swiped or driven with the round dots.
- Every contributor who typed a name gets their own glass pop-up ("Name is one of our contributors") at a random spot on the first page. They appear one after another just after the page opens and fade after about 5 seconds. Visitors who leave the name blank are never shown.

## Notes
- To change the cap from 50, edit `MAX` in `script.js` and the number 50 in `schema.sql` (3 places), and re-run the changed functions.
- Spam: a hidden honeypot field, a 100-entry pending limit and a 3 MB image limit are built in. For heavier traffic add Cloudflare Turnstile.
- Supabase free projects pause after a week of inactivity; visit or upgrade to keep it live.
- Rejected entries keep their photos until you Delete them in the admin.
- The opening animation (sprout to seed) runs in CSS (`.intro-screen` in `style.css`) and is skipped for visitors who prefer reduced motion.
