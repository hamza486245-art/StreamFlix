# StreamFlix — Dark Neumorphic Video Streaming Platform

StreamFlix is a fully functional video streaming web application featuring a dark **Neumorphic design system**, authentic 4K movie & TV series artwork, **Bootstrap Icons**, and a complete **Client-Side JavaScript Backend (`backend.js`)** that powers authentication, user profiles, watchlists, video progress tracking, live discussions, instant catalog search, and account management.

---

## 🌟 Highlights & Key Features

- **Full JavaScript Backend Engine (`backend.js`)**:
  - **Persistent Authentication**: User registration with validation, sign in (with hashed passwords), "Remember Me", session management, and one-click sign out.
  - **Multi-Profile Management**: Profile switcher with active indicator, "+ Add Profile" support (with Kids Mode toggle), and profile deletion.
  - **Watchlist Engine (My List)**: 1-click bookmarking on any card across all 15 pages, live badge count in the navigation bar, category filtering (Movies, Series, Downloads), and dynamic removal with animations.
  - **Playback Resume & Time Tracking**: Video player saves real-time playback percentage to local storage; "Continue Watching" on the home dashboard syncs dynamic progress bars and lets viewers resume right where they left off. Direct chapter jumps seek to key timestamps.
  - **Live Discussion & Comments**: Interactive viewer discussions with instant posting, spoiler blur protection (click to reveal), like counter increments, and relative timestamps ("Just now", "X mins ago").
  - **Instant Search & Genre Filtering**: Live real-time card filtering as you type in search bars, plus instant category/genre pill switching without page reloads.
  - **Account Settings & Preferences**: Full profile editing (name, phone, language), subscription tier changes (Basic, Standard, Premium), password updating, 2FA toggle, and simulated PDF invoice downloads.
  - **Help Center FAQ Search**: Real-time filtering and automatic accordion expansion based on search queries.
  - **Neumorphic Toast Notifications**: Non-intrusive floating toasts for feedback across all interactions.
- **Bootstrap Icons (`bi bi-*`)**: Replaced all emojis with vector icons via Bootstrap Icons CDN.
- **Real Movie & Series Artwork**: Authentic 4K poster art, backdrops, and actor portraits from globally recognized titles (*Dune: Part Two*, *Oppenheimer*, *Stranger Things*, *Interstellar*, *The Dark Knight*, *Shōgun*, *Breaking Bad*, *Arcane*, *The Batman*, *The Last of Us*, etc.).
- **Dark Neumorphic Design System**:
  - Soft dual-tone lighting and shadows (`box-shadow: 6px 6px 14px rgba(0,0,0,0.55), -6px -6px 14px rgba(255,255,255,0.06)`)
  - Recessed/inset neumorphic form controls and inputs
  - Raised convex cards with smooth hover lift and glow
  - Pill badges, buttons, and glowing neon accent highlights (`#e94560`)
- **Single Shared Stylesheet (`style.css`)**: Centralized design tokens, CSS custom properties, utility classes, and page-specific styles.
- **Pure CSS & JS Interactivity**:
  - CSS-only mobile hamburger navigation using hidden checkbox hack (`input[type="checkbox"]#hamburger`)
  - CSS-only multi-tab switching using radio buttons (`#tab1:checked ~ .tab-panels ...`)
  - Accordions using semantic HTML5 `<details>` and `<summary>` elements
  - Smooth card hover lift and scale effects
  - Native HTML5 `<video controls autoplay>` player
- **15 Linked & Navigable Web Pages**: Comprehensive user flow from landing, sign up, and plan selection to browsing, playback, and account management.

---

## 📑 15-Page Directory & Work Division

The 15 pages are structured across 3 main functional modules:

### 👤 Module 1: Public Flow, Onboarding & User Profiles
1. **`index.html`** — Landing / Welcome Page  
   *Hero banner with real Dune 2 backdrop, statistics bar with Bootstrap icons, 6 feature cards, trending blockbusters scroll row, film critic reviews, FAQ accordion, and trial signup banner.*
2. **`signup.html`** — Registration Form  
   *Multi-field form with full name, email, password strength fields, date of birth, country selector dropdown, plan tier radio selector, terms checkbox, and social authentication buttons with icons.*
3. **`login.html`** — Sign In / Authentication  
   *Recessed neumorphic input fields, password visibility styling, "Remember me" checkbox, forgot password link, and single sign-on options.*
4. **`plans.html`** — Subscription Plans  
   *3 plan cards (Basic $8.99, Standard $13.99 Featured, Premium $17.99), comprehensive 10-row comparison table with checkmark icons, and plan FAQ accordions.*
5. **`profiles.html`** — Profile Selection Screen ("Who's Watching?")  
   *Avatar selection grid with real cast portraits (Alexander, Sarah, Liam, Kids Zone, and Add Profile), manage profiles toggle, and direct navigation into personal dashboards.*

### 🎬 Module 2: Content Catalog & Discovery Dashboard
6. **`home.html`** — Main Browse Dashboard  
   *Dune 2 spotlight hero banner, live search bar, genre filter pills, "Continue Watching" row with CSS progress bars, "Trending Now" row with real posters, "Top Picks For You" 4-column card grid, and "New Releases".*
7. **`movies.html`** — Movies Catalog  
   *16-card movie poster grid with real blockbuster posters, hover overlays (synopsis, ratings, genre tags, year), search bar, and genre filter pills.*
8. **`series.html`** — TV Series & Shows Catalog  
   *16-card real TV series grid featuring season count tags, ratings, genre filters, and load-more pagination.*
9. **`trending.html`** — Trending Now  
   *CSS-only radio tabs ("Today", "This Week", "This Month") with 8 real posters per tab, plus a numbered "Top 10 in Your Region" rank list.*
10. **`new-releases.html`** — New Releases & Premieres  
    *Horizontal scroll row of "Just Added", 2-column preview cards for "Coming Soon" (*The Batman: Part II*, *Stranger Things 5*, *Avatar 3*, *Severance 2*), and "Last 30 Days" grid.*

### 🍿 Module 3: Playback, Personalization & Support
11. **`details.html`** — Title Details & Cast Overview  
    *Real Dune 2 backdrop, movie metadata badges, synopsis, 6 circular cast character portraits (Timothée Chalamet, Zendaya, Florence Pugh, etc.), CSS-only tabs (Key Chapters, More Like This, Technical Specs), and audience review cards.*
12. **`player.html`** — Video Player Page  
    *HTML5 `<video>` player element with controls and real poster, episode info bar, related videos / up next sidebar with real posters, and viewer discussion section with pure HTML comment submission form.*
13. **`my-list.html`** — Personal Watchlist  
    *Filter pills (All, Movies, TV Series, Offline Downloads), 12 bookmarked real poster cards with "✕ Remove" badges, and recommended titles row.*
14. **`account.html`** — Account Settings & Billing  
    *Two-column layout: sidebar navigation with icons, editable personal info form, active subscription card with upgrade link, 5-row billing history table with PDF download triggers, password update form with 2FA toggle, and playback/notification preferences.*
15. **`help.html`** — Help Center & FAQ  
    *Help search bar, 4 category cards with icons, 12 expandable `<details>/<summary>` FAQ accordions, and 24/7 customer support contact cards (Live Chat, Email, Phone).*

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **JavaScript (ES6+)** | Complete client-side backend (`backend.js`), state management, persistence (`localStorage`), DOM event routing |
| **HTML5** | Semantic structure, forms, tables, `<details>/<summary>`, and `<video>` player |
| **CSS3** | Neumorphic styling, Flexbox, Grid, custom properties, media queries, CSS tabs |
| **Bootstrap Icons** | Consistent vector iconography (`bi bi-*`) via CDN |
| **Real TMDB Posters** | High-definition artwork for all real movies, series, and cast members |
| **Sample Video** | High-compatibility HTML5 video streaming stream |

---

## 🚀 How to Run & Test the Website

1. Open any `.html` file (e.g. `index.html` or `home.html`) in Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari.
2. **Default Demo Account**:
   - Email: `alexander@example.com`
   - Password: `password123` (or register any new account on `signup.html`!)
3. **Key Features to Try**:
   - **Bookmark any title**: Click the bookmark icon on any movie poster or "+ Add to My List" on `details.html`. Visit `my-list.html` to see your saved titles!
   - **Play video & track progress**: Start watching on `player.html`. Let it play or seek, then return to `home.html` to see the "Continue Watching" progress bar sync!
   - **Jump to Chapters**: On `details.html`, click "Jump" on Chapter 2 or 3 to launch `player.html` seeking directly to that sequence.
   - **Post in discussions**: On `player.html`, submit a comment with the "Contains Plot Spoilers" checkbox to see blurred text with click-to-reveal.
   - **Switch Profiles**: On `profiles.html`, switch between Alexander, Sarah, Liam, or Kids Zone, or click "+ Add Profile" to create a new profile.
   - **Live Search**: Type in the search box on `movies.html` or `series.html` to instantly filter titles as you type.
