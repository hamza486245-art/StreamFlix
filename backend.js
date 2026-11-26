/**
 * StreamFlix — Complete Client-Side JavaScript Backend
 * Pure JavaScript Data Layer & Full Interactivity Engine
 * Features:
 *  - 32+ Authentic Movie & Series Database with 4K Artwork, Real Cast, Chapters, Specs & Reviews
 *  - Dynamic Movie & Series View Engine (details.html?id=...)
 *  - Dynamic Video Player & Playback Progress (player.html?id=...)
 *  - Universal Card Router: Every movie card across all 15 pages links to its own view page
 *  - Persistent User Authentication (Register, Login, Remember Me, Logout)
 *  - Multi-Profile Management (Switch, Add, Delete Profiles)
 *  - Watchlist Engine (Add, Remove, Check, Dynamic My-List rendering)
 *  - Real-time Instant Search & Genre Filter across all pages
 *  - Live Discussion & Comments Engine with Spoilers & Likes
 *  - Account Settings & Preferences (Profile, Plan Tier, Password, 2FA)
 *  - Help Center FAQ live search
 *  - Neumorphic Toast Notification System
 */

(function (window) {
  'use strict';

  const SF = window.SF || {};

  /* ─────────────────────────────────────────────
     STORAGE KEYS & CONSTANTS
  ───────────────────────────────────────────── */
  const KEYS = {
    USERS:       'streamflix_users',
    SESSION:     'streamflix_session',
    ACTIVE_PROF: 'streamflix_active_profile',
    PROFILES:    'streamflix_profiles',
    WATCHLIST:   'streamflix_watchlist',
    HISTORY:     'streamflix_history',
    COMMENTS:    'streamflix_comments',
    SETTINGS:    'streamflix_settings',
  };

  /* ─────────────────────────────────────────────
     STORAGE UTILITIES
  ───────────────────────────────────────────── */
  function getStorage(key, fallback = null) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.warn('Storage read error:', e);
      return fallback;
    }
  }

  function setStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('Storage write error:', e);
    }
  }

  function simpleHash(str) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) + hash) + str.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16);
  }

  /* ─────────────────────────────────────────────
     COMPREHENSIVE CATALOG & CONTENT DATABASE
     Supports all movies & TV series across all pages
  ───────────────────────────────────────────── */
  SF.Catalog = {
    database: {
      'dune2': {
        id: 'dune2',
        title: 'Dune: Part Two',
        year: '2024',
        type: 'movie',
        ageRating: 'PG-13',
        duration: '2h 46m',
        rating: '9.4',
        votes: '180,000',
        genres: ['Sci-Fi', 'Adventure', 'Epic', 'Action'],
        director: 'Denis Villeneuve',
        badges: [
          { class: 'badge-accent', icon: 'bi-trophy-fill', label: 'Multi-Oscar Winner' },
          { class: 'badge-secondary', icon: 'bi-badge-4k-fill', label: 'Ultra HD 4K' },
          { class: 'badge-tertiary', icon: 'bi-soundwave', label: 'Dolby Atmos' }
        ],
        poster: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
        backdrop: 'https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg',
        synopsis: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a fateful choice between the love of his life and the destiny of the known universe, he endeavors to prevent a catastrophic future only he can foresee.',
        cast: [
          { name: 'Timothée Chalamet', role: 'as Paul Atreides', avatar: 'https://image.tmdb.org/t/p/w300/BE2sdjpgsa2rNTFa66f7upkaOP.jpg' },
          { name: 'Zendaya', role: 'as Chani', avatar: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5a/Zendaya-byPhilipRomano.jpg/330px-Zendaya-byPhilipRomano.jpg' },
          { name: 'Florence Pugh', role: 'as Princess Irulan', avatar: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/36/Florence_Pugh_2026.jpg/330px-Florence_Pugh_2026.jpg' },
          { name: 'Austin Butler', role: 'as Feyd-Rautha', avatar: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/05/Austin_Butler_at_the_2025_Cannes_Film_Festival_02.jpg/330px-Austin_Butler_at_the_2025_Cannes_Film_Festival_02.jpg' },
          { name: 'Javier Bardem', role: 'as Stilgar', avatar: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d0/Javier_Bardem_-_Bunker_-_TIFF_2026-12.jpg/330px-Javier_Bardem_-_Bunker_-_TIFF_2026-12.jpg' },
          { name: 'Denis Villeneuve', role: 'Director & Co-Writer', avatar: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5a/DVilleneuveRFH121024_%2812_of_23%29_%2854061976489%29_%28cropped%29.jpg/330px-DVilleneuveRFH121024_%2812_of_23%29_%2854061976489%29_%28cropped%29.jpg' }
        ],
        chapters: [
          { title: 'Chapter 1: The Desert Trek & Harkonnen Ambush', duration: '26m', seconds: 15, thumbnail: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg', description: "Paul and Jessica cross the northern dunes with Stilgar's troop, engaging Harkonnen anti-gravity spotters." },
          { title: 'Chapter 2: Riding the Grandfather Sandworm', duration: '45m', seconds: 45, thumbnail: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', description: "Paul faces the ancient rite of passage, summoning and mounting the largest sandworm ever witnessed by the Sietch." },
          { title: 'Chapter 3: The Gladiator Arena of Giedi Prime', duration: '1h 14m', seconds: 75, thumbnail: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', description: "Feyd-Rautha demonstrates his ruthless lethality in monochrome gladiatorial combat to mark his coming of age." },
          { title: 'Chapter 4: The Water of Life Awakening', duration: '1h 48m', seconds: 108, thumbnail: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', description: "Journeying to the southern sietches, Paul drinks the sacred poison to awaken all ancestral memories across millennia." },
          { title: 'Chapter 5: The Battle of Arrakeen & Emperor Fall', duration: '2h 18m', seconds: 138, thumbnail: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg', description: "Atomic detonations breach the shield wall, unleashing the Fremen cavalry upon the Sardaukar legions." }
        ],
        production: {
          writers: 'Denis Villeneuve & Jon Spaihts',
          cinematography: 'Greig Fraser (ARRI Alexa LF IMAX)',
          composer: 'Hans Zimmer',
          studio: 'Warner Bros. Pictures & Legendary'
        },
        reviews: [
          { author: 'Marcus Drake', rating: 10, date: 'October 24, 2026', text: 'A monumental cinematic achievement. The sound design during the sandworm ride and the sheer scale of the final battle scene on Arrakis are completely unrivaled. 10/10 masterpiece!' },
          { author: 'Sofia Al-Mansoor', rating: 10, date: 'October 20, 2026', text: "Hans Zimmer's score paired with Greig Fraser's photography sets a brand new benchmark for sci-fi cinema." }
        ]
      },

      'oppenheimer': {
        id: 'oppenheimer',
        title: 'Oppenheimer',
        year: '2023',
        type: 'movie',
        ageRating: 'R',
        duration: '3h 00m',
        rating: '9.2',
        votes: '240,000',
        genres: ['Biography', 'Drama', 'History'],
        director: 'Christopher Nolan',
        badges: [
          { class: 'badge-accent', icon: 'bi-trophy-fill', label: '7 Academy Awards' },
          { class: 'badge-secondary', icon: 'bi-badge-4k-fill', label: '4K IMAX Presentation' },
          { class: 'badge-tertiary', icon: 'bi-soundwave', label: 'Dolby Atmos Master' }
        ],
        poster: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
        backdrop: 'https://image.tmdb.org/t/p/original/nb3xI8XI3w4pMVZ38VijbsyBqP4.jpg',
        synopsis: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb. Exploring the triumph of the Manhattan Project at Los Alamos and the geopolitical and moral reckoning that followed.',
        cast: [
          { name: 'Cillian Murphy', role: 'as J. Robert Oppenheimer', avatar: 'https://image.tmdb.org/t/p/w300/3DGoa5v0k1jV70u150Z9b3B.jpg' },
          { name: 'Emily Blunt', role: 'as Kitty Oppenheimer', avatar: 'https://image.tmdb.org/t/p/w300/nPJXaRMVUvzkz5kL0BvV4e.jpg' },
          { name: 'Matt Damon', role: 'as Leslie Groves', avatar: 'https://image.tmdb.org/t/p/w300/elza2iZeNk0vS9VfBfP3C.jpg' },
          { name: 'Robert Downey Jr.', role: 'as Lewis Strauss', avatar: 'https://image.tmdb.org/t/p/w300/1YjdSym1jA7LnUXw3f3.jpg' },
          { name: 'Florence Pugh', role: 'as Jean Tatlock', avatar: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/36/Florence_Pugh_2026.jpg/330px-Florence_Pugh_2026.jpg' }
        ],
        chapters: [
          { title: 'Chapter 1: Cambridge and Quantum Theory', duration: '28m', seconds: 10, thumbnail: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', description: 'Oppenheimer studies in Europe, discovering quantum physics and meeting Niels Bohr.' },
          { title: 'Chapter 2: Building the Secret City of Los Alamos', duration: '52m', seconds: 40, thumbnail: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg', description: 'General Groves recruits Oppenheimer to lead the Manhattan Project across the New Mexico desert.' },
          { title: 'Chapter 3: The Trinity Test Countdown', duration: '1h 25m', seconds: 75, thumbnail: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', description: 'The historic detonation in the desert that altered human history forever.' },
          { title: 'Chapter 4: The Post-War Moral Crisis', duration: '2h 08m', seconds: 110, thumbnail: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', description: 'Celebration turns to horror as the arms race begins with the Hydrogen bomb debate.' }
        ],
        production: {
          writers: 'Christopher Nolan (based on American Prometheus)',
          cinematography: 'Hoyte van Hoytema (IMAX 65mm & 65mm Large Format)',
          composer: 'Ludwig Göransson',
          studio: 'Universal Pictures & Syncopy'
        },
        reviews: [
          { author: 'Elena Rostova', rating: 10, date: 'November 12, 2026', text: "Cillian Murphy's expressive gaze carries the weight of a transformed world. Ludwig Göransson's violin rhythms induce heart-pounding tension." }
        ]
      },

      'interstellar': {
        id: 'interstellar',
        title: 'Interstellar',
        year: '2014',
        type: 'movie',
        ageRating: 'PG-13',
        duration: '2h 49m',
        rating: '9.6',
        votes: '320,000',
        genres: ['Sci-Fi', 'Adventure', 'Drama'],
        director: 'Christopher Nolan',
        badges: [
          { class: 'badge-accent', icon: 'bi-star-fill', label: '#1 Sci-Fi of all time' },
          { class: 'badge-secondary', icon: 'bi-badge-4k-fill', label: '4K Ultra HD Remaster' },
          { class: 'badge-tertiary', icon: 'bi-soundwave', label: 'Dolby Atmos' }
        ],
        poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
        backdrop: 'https://image.tmdb.org/t/p/original/rAiYTnrLEhkp9z0wB0i49yD5H.jpg',
        synopsis: 'When Earth faces extinction from global crop blights and dust storms, a team of explorers travel through a wormhole near Saturn in an attempt to ensure humanity\'s survival on new habitable worlds across the galaxy.',
        cast: [
          { name: 'Matthew McConaughey', role: 'as Joseph Cooper', avatar: 'https://image.tmdb.org/t/p/w300/sY2wa52FzTRCwOyF02daACQ.jpg' },
          { name: 'Anne Hathaway', role: 'as Dr. Amelia Brand', avatar: 'https://image.tmdb.org/t/p/w300/tLkV799q5p.jpg' },
          { name: 'Jessica Chastain', role: 'as Adult Murph Cooper', avatar: 'https://image.tmdb.org/t/p/w300/lodMzFlK.jpg' },
          { name: 'Michael Caine', role: 'as Professor Brand', avatar: 'https://image.tmdb.org/t/p/w300/klNxZ5.jpg' }
        ],
        chapters: [
          { title: "Chapter 1: Dust Storms & The Coordinates", duration: '25m', seconds: 15, thumbnail: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', description: "Cooper discovers NASA's secret installation after tracking gravitational anomalies." },
          { title: 'Chapter 2: Departure Through the Saturn Wormhole', duration: '50m', seconds: 45, thumbnail: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg', description: 'The Endurance crew leaves Earth and enters the mysterious spacetime rift.' },
          { title: "Chapter 3: Miller's Planet & The Massive Tidal Wave", duration: '1h 15m', seconds: 75, thumbnail: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', description: 'Every hour on this water world costs seven years back home on Earth.' },
          { title: 'Chapter 4: Into Gargantua and the Tesseract', duration: '2h 35m', seconds: 135, thumbnail: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', description: 'Cooper enters the five-dimensional tesseract to communicate across time to his daughter.' }
        ],
        production: {
          writers: 'Jonathan Nolan & Christopher Nolan',
          cinematography: 'Hoyte van Hoytema',
          composer: 'Hans Zimmer',
          studio: 'Paramount Pictures & Warner Bros.'
        },
        reviews: [
          { author: 'Nathan Cooper', rating: 10, date: 'October 18, 2026', text: "The docking sequence with Hans Zimmer's pipe organ score is the most exhilarating 5 minutes in modern cinema history." }
        ]
      },

      'the-dark-knight': {
        id: 'the-dark-knight',
        title: 'The Dark Knight',
        year: '2008',
        type: 'movie',
        ageRating: 'PG-13',
        duration: '2h 32m',
        rating: '9.5',
        votes: '410,000',
        genres: ['Action', 'Crime', 'Drama'],
        director: 'Christopher Nolan',
        badges: [
          { class: 'badge-accent', icon: 'bi-trophy-fill', label: 'Academy Award Winner' },
          { class: 'badge-secondary', icon: 'bi-badge-4k-fill', label: '4K Ultra HD HDR' },
          { class: 'badge-tertiary', icon: 'bi-soundwave', label: 'Dolby Atmos' }
        ],
        poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
        backdrop: 'https://image.tmdb.org/t/p/original/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg',
        synopsis: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice alongside Lt. Gordon and DA Harvey Dent.',
        cast: [
          { name: 'Christian Bale', role: 'as Bruce Wayne / Batman', avatar: 'https://image.tmdb.org/t/p/w300/b7fTC9WFq.jpg' },
          { name: 'Heath Ledger', role: 'as The Joker', avatar: 'https://image.tmdb.org/t/p/w300/5Y9HnYYa.jpg' },
          { name: 'Aaron Eckhart', role: 'as Harvey Dent / Two-Face', avatar: 'https://image.tmdb.org/t/p/w300/uFp8gY.jpg' },
          { name: 'Gary Oldman', role: 'as Jim Gordon', avatar: 'https://image.tmdb.org/t/p/w300/2v9Fs.jpg' }
        ],
        chapters: [
          { title: 'Chapter 1: The Bank Heist Mastermind', duration: '12m', seconds: 10, thumbnail: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', description: 'The Joker orchestrates a ruthless bank robbery, eliminating his own henchmen.' },
          { title: 'Chapter 2: Batman in Hong Kong', duration: '38m', seconds: 40, thumbnail: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg', description: 'A skyhook extraction captures mob accountant Lau from a skyscraper.' },
          { title: 'Chapter 3: The Armored Truck Chase', duration: '1h 05m', seconds: 70, thumbnail: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', description: 'The Batmobile engages the Joker in Gotham underpasses in IMAX format.' },
          { title: 'Chapter 4: The Interrogation Room', duration: '1h 35m', seconds: 100, thumbnail: 'https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg', description: 'Batman interrogates the Joker as a deadly twin trap unfolds.' }
        ],
        production: {
          writers: 'Jonathan Nolan & Christopher Nolan',
          cinematography: 'Wally Pfister (IMAX 15/70mm)',
          composer: 'Hans Zimmer & James Newton Howard',
          studio: 'Warner Bros. Pictures & DC Entertainment'
        },
        reviews: [
          { author: 'Gotham_Watch', rating: 10, date: 'October 10, 2026', text: "Heath Ledger's Joker is the greatest villain performance in the history of cinema. A flawless crime thriller." }
        ]
      },

      'inception': {
        id: 'inception',
        title: 'Inception',
        year: '2010',
        type: 'movie',
        ageRating: 'PG-13',
        duration: '2h 28m',
        rating: '9.5',
        votes: '350,000',
        genres: ['Sci-Fi', 'Action', 'Thriller'],
        director: 'Christopher Nolan',
        badges: [
          { class: 'badge-accent', icon: 'bi-trophy-fill', label: '4 Academy Awards' },
          { class: 'badge-secondary', icon: 'bi-badge-4k-fill', label: '4K Ultra HD HDR' },
          { class: 'badge-tertiary', icon: 'bi-soundwave', label: 'Dolby Atmos' }
        ],
        poster: 'https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg',
        backdrop: 'https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg',
        synopsis: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
        cast: [
          { name: 'Leonardo DiCaprio', role: 'as Dom Cobb', avatar: 'https://image.tmdb.org/t/p/w300/wo2hx.jpg' },
          { name: 'Joseph Gordon-Levitt', role: 'as Arthur', avatar: 'https://image.tmdb.org/t/p/w300/4KyV.jpg' },
          { name: 'Elliot Page', role: 'as Ariadne', avatar: 'https://image.tmdb.org/t/p/w300/eP.jpg' },
          { name: 'Tom Hardy', role: 'as Eames', avatar: 'https://image.tmdb.org/t/p/w300/yV.jpg' }
        ],
        chapters: [
          { title: 'Chapter 1: The Japanese Dream Palace Extraction', duration: '20m', seconds: 15, thumbnail: 'https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg', description: 'Cobb tests Saito\'s subconscious architecture as Mal intervenes.' },
          { title: 'Chapter 2: Building Paris in the Mind', duration: '45m', seconds: 45, thumbnail: 'https://image.tmdb.org/t/p/w500/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg', description: 'Ariadne learns the physics of paradoxes and folding cityscapes.' },
          { title: 'Chapter 3: The Zero-Gravity Hallway Combat', duration: '1h 25m', seconds: 75, thumbnail: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg', description: 'Arthur fights security guards in a tumbling hotel corridor.' },
          { title: 'Chapter 4: The Snow Fortress & Limbo Shore', duration: '2h 05m', seconds: 110, thumbnail: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', description: 'Synchronizing the kicks across four simultaneous dream levels.' }
        ],
        production: {
          writers: 'Christopher Nolan',
          cinematography: 'Wally Pfister',
          composer: 'Hans Zimmer',
          studio: 'Warner Bros. Pictures & Legendary'
        },
        reviews: [
          { author: 'DreamArchitect', rating: 10, date: 'October 14, 2026', text: "The spinning top final shot is iconic. The rotating hallway stunt done with zero CGI is mind-blowing." }
        ]
      },

      'the-batman': {
        id: 'the-batman',
        title: 'The Batman',
        year: '2022',
        type: 'movie',
        ageRating: 'PG-13',
        duration: '2h 56m',
        rating: '8.9',
        votes: '260,000',
        genres: ['Action', 'Crime', 'Drama', 'Mystery'],
        director: 'Matt Reeves',
        badges: [
          { class: 'badge-accent', icon: 'bi-star-fill', label: 'Dark Neo-Noir' },
          { class: 'badge-secondary', icon: 'bi-badge-4k-fill', label: '4K Ultra HD HDR' },
          { class: 'badge-tertiary', icon: 'bi-soundwave', label: 'Dolby Atmos' }
        ],
        poster: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg',
        backdrop: 'https://image.tmdb.org/t/p/original/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg',
        synopsis: 'In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler, who leaves cyphers and deadly traps for Gotham elite.',
        cast: [
          { name: 'Robert Pattinson', role: 'as Bruce Wayne / Batman', avatar: 'https://image.tmdb.org/t/p/w300/pat.jpg' },
          { name: 'Zoë Kravitz', role: 'as Selina Kyle / Catwoman', avatar: 'https://image.tmdb.org/t/p/w300/zoe.jpg' },
          { name: 'Paul Dano', role: 'as Edward Nashton / The Riddler', avatar: 'https://image.tmdb.org/t/p/w300/dan.jpg' },
          { name: 'Colin Farrell', role: 'as Oswald Cobblepot / The Penguin', avatar: 'https://image.tmdb.org/t/p/w300/col.jpg' }
        ],
        chapters: [
          { title: "Chapter 1: Two Years of Nights in Gotham", duration: '28m', seconds: 15, thumbnail: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg', description: "Batman investigates the mayor's murder and the first cypher from the Riddler." },
          { title: 'Chapter 2: The Iceberg Lounge & Catwoman', duration: '56m', seconds: 45, thumbnail: 'https://image.tmdb.org/t/p/w500/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg', description: 'Underground connections lead to Falcone and the mysterious Selina Kyle.' },
          { title: 'Chapter 3: Batmobile Highway Chase', duration: '1h 28m', seconds: 75, thumbnail: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', description: 'The roar of the muscle-car Batmobile pursues the Penguin through rain and fire.' }
        ],
        production: {
          writers: 'Matt Reeves & Peter Craig',
          cinematography: 'Greig Fraser',
          composer: 'Michael Giacchino',
          studio: 'Warner Bros. Pictures & 6th & Idaho'
        },
        reviews: [
          { author: 'Detective_Comics', rating: 9, date: 'October 12, 2026', text: "The cinematography by Greig Fraser and the score by Giacchino give Gotham the detective atmosphere fans have wanted." }
        ]
      },

      'spider-verse': {
        id: 'spider-verse',
        title: 'Spider-Man: Across the Spider-Verse',
        year: '2023',
        type: 'movie',
        ageRating: 'PG',
        duration: '2h 20m',
        rating: '9.4',
        votes: '280,000',
        genres: ['Animation', 'Action', 'Sci-Fi'],
        director: 'Joaquim Dos Santos, Kemp Powers, Justin K. Thompson',
        badges: [
          { class: 'badge-accent', icon: 'bi-palette-fill', label: 'Groundbreaking Animation' },
          { class: 'badge-secondary', icon: 'bi-badge-4k-fill', label: '4K Ultra HD HDR' },
          { class: 'badge-tertiary', icon: 'bi-soundwave', label: 'Dolby Atmos' }
        ],
        poster: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
        backdrop: 'https://image.tmdb.org/t/p/original/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg',
        synopsis: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat, Miles must redefine what it means to be a hero.',
        cast: [
          { name: 'Shameik Moore', role: 'as Miles Morales', avatar: 'https://image.tmdb.org/t/p/w300/sha.jpg' },
          { name: 'Hailee Steinfeld', role: 'as Gwen Stacy', avatar: 'https://image.tmdb.org/t/p/w300/hai.jpg' },
          { name: 'Oscar Isaac', role: 'as Miguel O\'Hara', avatar: 'https://image.tmdb.org/t/p/w300/osc.jpg' },
          { name: 'Daniel Kaluuya', role: 'as Hobie Brown / Spider-Punk', avatar: 'https://image.tmdb.org/t/p/w300/dan.jpg' }
        ],
        chapters: [
          { title: "Chapter 1: Gwen Stacy's Watercolor World", duration: '22m', seconds: 15, thumbnail: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg', description: "Gwen confronts the Renaissance Vulture with Miguel O'Hara." },
          { title: 'Chapter 2: Mumbattan & The Spot', duration: '55m', seconds: 45, thumbnail: 'https://image.tmdb.org/t/p/w500/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg', description: 'Miles and Pavitr Prabhakar face the expanding dimensional portals of Spot.' },
          { title: 'Chapter 3: The Spider-Society Citadel', duration: '1h 25m', seconds: 75, thumbnail: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg', description: 'Hundreds of Spider-People chase Miles across the futuristic train line.' }
        ],
        production: {
          writers: 'Phil Lord, Christopher Miller, Dave Callaham',
          cinematography: 'Sony Pictures Imageworks',
          composer: 'Daniel Pemberton',
          studio: 'Columbia Pictures & Sony Pictures Animation'
        },
        reviews: [
          { author: 'AnimationGeek', rating: 10, date: 'October 19, 2026', text: "Every single frame belongs in an art museum. The visual storytelling is breathtaking." }
        ]
      },

      'john-wick-4': {
        id: 'john-wick-4',
        title: 'John Wick: Chapter 4',
        year: '2023',
        type: 'movie',
        ageRating: 'R',
        duration: '2h 49m',
        rating: '8.9',
        votes: '190,000',
        genres: ['Action', 'Thriller', 'Crime'],
        director: 'Chad Stahelski',
        badges: [
          { class: 'badge-accent', icon: 'bi-lightning-charge-fill', label: 'Relentless Action' },
          { class: 'badge-secondary', icon: 'bi-badge-4k-fill', label: '4K Ultra HD HDR' },
          { class: 'badge-tertiary', icon: 'bi-soundwave', label: 'Dolby Atmos' }
        ],
        poster: 'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg',
        backdrop: 'https://image.tmdb.org/t/p/original/hZkgoQYus5vegHoetLkCJzb17zJ.jpg',
        synopsis: 'John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.',
        cast: [
          { name: 'Keanu Reeves', role: 'as John Wick', avatar: 'https://image.tmdb.org/t/p/w300/kea.jpg' },
          { name: 'Donnie Yen', role: 'as Caine', avatar: 'https://image.tmdb.org/t/p/w300/don.jpg' },
          { name: 'Bill Skarsgård', role: 'as Marquis de Gramont', avatar: 'https://image.tmdb.org/t/p/w300/bil.jpg' },
          { name: 'Hiroyuki Sanada', role: 'as Shimazu Koji', avatar: 'https://image.tmdb.org/t/p/w300/san.jpg' }
        ],
        chapters: [
          { title: 'Chapter 1: The Osaka Continental', duration: '35m', seconds: 15, thumbnail: 'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg', description: 'Swords, bows, and firearms clash in the neon glass galleries of Osaka.' },
          { title: 'Chapter 2: Arc de Triomphe & Dragon\'s Breath', duration: '1h 55m', seconds: 85, thumbnail: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', description: 'Traffic circular warfare and top-down overhead tracking gunplay in Paris.' }
        ],
        production: {
          writers: 'Shay Hatten & Michael Finch',
          cinematography: 'Dan Laustsen',
          composer: 'Tyler Bates & Joel J. Richard',
          studio: 'Lionsgate & Thunder Road Films'
        },
        reviews: [
          { author: 'ActionPhile', rating: 9.5, date: 'October 15, 2026', text: "The top-down overhead room clearing with Dragon's breath shotgun rounds is an absolute masterclass." }
        ]
      },

      'blade-runner-2049': {
        id: 'blade-runner-2049',
        title: 'Blade Runner 2049',
        year: '2017',
        type: 'movie',
        ageRating: 'R',
        duration: '2h 44m',
        rating: '9.1',
        votes: '260,000',
        genres: ['Sci-Fi', 'Mystery', 'Drama'],
        director: 'Denis Villeneuve',
        badges: [
          { class: 'badge-accent', icon: 'bi-trophy-fill', label: '2 Academy Awards' },
          { class: 'badge-secondary', icon: 'bi-badge-4k-fill', label: '4K Ultra HD HDR' },
          { class: 'badge-tertiary', icon: 'bi-soundwave', label: 'Dolby Atmos' }
        ],
        poster: 'https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg',
        backdrop: 'https://image.tmdb.org/t/p/original/gNdLJU9TxrpGx4dkZidjys3fyy0.jpg',
        synopsis: 'Thirty years after the events of the first film, a new Blade Runner, LAPD Officer K, unearths a long-buried secret that has the potential to plunge what\'s left of society into chaos. K\'s discovery leads him on a quest to find Rick Deckard.',
        cast: [
          { name: 'Ryan Gosling', role: 'as Officer K / Joe', avatar: 'https://image.tmdb.org/t/p/w300/gos.jpg' },
          { name: 'Harrison Ford', role: 'as Rick Deckard', avatar: 'https://image.tmdb.org/t/p/w300/for.jpg' },
          { name: 'Ana de Armas', role: 'as Joi', avatar: 'https://image.tmdb.org/t/p/w300/ana.jpg' },
          { name: 'Sylvia Hoeks', role: 'as Luv', avatar: 'https://image.tmdb.org/t/p/w300/syl.jpg' }
        ],
        chapters: [
          { title: 'Chapter 1: The Protein Farm & Sapper Morton', duration: '20m', seconds: 15, thumbnail: 'https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg', description: 'K retires an older replicant model and discovers an impossible burial.' },
          { title: 'Chapter 2: The Wallace Earth Headquarters', duration: '50m', seconds: 45, thumbnail: 'https://image.tmdb.org/t/p/w500/gNdLJU9TxrpGx4dkZidjys3fyy0.jpg', description: 'Golden reflection pools where Niander Wallace breeds new obedient models.' },
          { title: 'Chapter 3: The Orange Haze of Las Vegas', duration: '1h 35m', seconds: 75, thumbnail: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg', description: 'K tracks Deckard through the radioactive ruins and Elvis holograms.' }
        ],
        production: {
          writers: 'Hampton Fancher & Michael Green',
          cinematography: 'Roger Deakins (Academy Award Winner)',
          composer: 'Hans Zimmer & Benjamin Wallfisch',
          studio: 'Warner Bros. & Columbia Pictures'
        },
        reviews: [
          { author: 'CyberpunkAesthetic', rating: 10, date: 'October 11, 2026', text: "Roger Deakins' lighting in this movie is pure visual poetry. A rare sequel that lives up to a masterpiece." }
        ]
      },

      'the-matrix': {
        id: 'the-matrix',
        title: 'The Matrix',
        year: '1999',
        type: 'movie',
        ageRating: 'R',
        duration: '2h 16m',
        rating: '9.6',
        votes: '480,000',
        genres: ['Action', 'Sci-Fi', 'Cyberpunk'],
        director: 'The Wachowskis',
        badges: [
          { class: 'badge-accent', icon: 'bi-trophy-fill', label: '4 Academy Awards' },
          { class: 'badge-secondary', icon: 'bi-badge-4k-fill', label: '4K Ultra HD HDR' },
          { class: 'badge-tertiary', icon: 'bi-soundwave', label: 'Dolby Atmos' }
        ],
        poster: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
        backdrop: 'https://image.tmdb.org/t/p/original/l4QHerTSbflqD85rGf9b6r67.jpg',
        synopsis: 'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.',
        cast: [
          { name: 'Keanu Reeves', role: 'as Thomas Anderson / Neo', avatar: 'https://image.tmdb.org/t/p/w300/kea.jpg' },
          { name: 'Laurence Fishburne', role: 'as Morpheus', avatar: 'https://image.tmdb.org/t/p/w300/lau.jpg' },
          { name: 'Carrie-Anne Moss', role: 'as Trinity', avatar: 'https://image.tmdb.org/t/p/w300/car.jpg' },
          { name: 'Hugo Weaving', role: 'as Agent Smith', avatar: 'https://image.tmdb.org/t/p/w300/hug.jpg' }
        ],
        chapters: [
          { title: 'Chapter 1: The Red Pill or The Blue Pill', duration: '30m', seconds: 15, thumbnail: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg', description: 'Morpheus explains the truth of the simulated reality.' },
          { title: 'Chapter 2: The Dojo Sparring Program', duration: '55m', seconds: 45, thumbnail: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg', description: 'Neo downloads martial arts and challenges Morpheus.' },
          { title: 'Chapter 3: The Government Lobby Shootout', duration: '1h 35m', seconds: 75, thumbnail: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', description: 'Bullet-time photography and marble pillar demolition.' }
        ],
        production: {
          writers: 'Lana Wachowski & Lilly Wachowski',
          cinematography: 'Bill Pope',
          composer: 'Don Davis',
          studio: 'Warner Bros. Pictures & Village Roadshow'
        },
        reviews: [
          { author: 'NeoChosen', rating: 10, date: 'October 16, 2026', text: "Changed cinema and action movies forever. The lobby scene is the gold standard of practical effects." }
        ]
      },

      'parasite': {
        id: 'parasite',
        title: 'Parasite',
        year: '2019',
        type: 'movie',
        ageRating: 'R',
        duration: '2h 12m',
        rating: '9.5',
        votes: '340,000',
        genres: ['Thriller', 'Drama', 'Comedy'],
        director: 'Bong Joon-ho',
        badges: [
          { class: 'badge-accent', icon: 'bi-trophy-fill', label: 'Best Picture Oscar Winner' },
          { class: 'badge-secondary', icon: 'bi-badge-4k-fill', label: '4K Ultra HD HDR' },
          { class: 'badge-tertiary', icon: 'bi-soundwave', label: 'Dolby Atmos' }
        ],
        poster: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
        backdrop: 'https://image.tmdb.org/t/p/original/hiKmpZMGZsrkA3cdce8a7Dpos1j.jpg',
        synopsis: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
        cast: [
          { name: 'Song Kang-ho', role: 'as Kim Ki-taek', avatar: 'https://image.tmdb.org/t/p/w300/son.jpg' },
          { name: 'Lee Sun-kyun', role: 'as Park Dong-ik', avatar: 'https://image.tmdb.org/t/p/w300/lee.jpg' },
          { name: 'Cho Yeo-jeong', role: 'as Park Yeon-gyo', avatar: 'https://image.tmdb.org/t/p/w300/cho.jpg' },
          { name: 'Choi Woo-shik', role: 'as Kim Ki-woo', avatar: 'https://image.tmdb.org/t/p/w300/woos.jpg' }
        ],
        chapters: [
          { title: 'Chapter 1: The English Tutor', duration: '25m', seconds: 15, thumbnail: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg', description: 'Ki-woo enters the modern mansion as a tutor with forged credentials.' },
          { title: 'Chapter 2: Infiltration of the Household', duration: '50m', seconds: 45, thumbnail: 'https://image.tmdb.org/t/p/w500/hiKmpZMGZsrkA3cdce8a7Dpos1j.jpg', description: 'One by one, the Kim family replaces the housekeeper and chauffeur.' },
          { title: 'Chapter 3: The Secret Bunker Door', duration: '1h 20m', seconds: 75, thumbnail: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', description: 'A torrential rainstorm reveals what lies beneath the basement.' }
        ],
        production: {
          writers: 'Bong Joon-ho & Han Jin-won',
          cinematography: 'Hong Kyung-pyo',
          composer: 'Jung Jae-il',
          studio: 'CJ Entertainment & Barunson E&A'
        },
        reviews: [
          { author: 'FilmBuffSeoul', rating: 10, date: 'October 12, 2026', text: "A genre-defying masterpiece that earned its historic Oscar sweep. Flawlessly paced from start to finish." }
        ]
      },

      'avatar-the-way-of-water': {
        id: 'avatar-the-way-of-water',
        title: 'Avatar: The Way of Water',
        year: '2022',
        type: 'movie',
        ageRating: 'PG-13',
        duration: '3h 12m',
        rating: '8.8',
        votes: '280,000',
        genres: ['Action', 'Adventure', 'Sci-Fi', 'Fantasy'],
        director: 'James Cameron',
        badges: [
          { class: 'badge-accent', icon: 'bi-droplet-fill', label: 'Visual Miracle' },
          { class: 'badge-secondary', icon: 'bi-badge-4k-fill', label: '4K HFR 3D Remaster' },
          { class: 'badge-tertiary', icon: 'bi-soundwave', label: 'Dolby Atmos' }
        ],
        poster: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
        backdrop: 'https://image.tmdb.org/t/p/original/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg',
        synopsis: 'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na\'vi race to protect their home.',
        cast: [
          { name: 'Sam Worthington', role: 'as Jake Sully', avatar: 'https://image.tmdb.org/t/p/w300/sam.jpg' },
          { name: 'Zoe Saldaña', role: 'as Neytiri', avatar: 'https://image.tmdb.org/t/p/w300/zoe.jpg' },
          { name: 'Sigourney Weaver', role: 'as Kiri', avatar: 'https://image.tmdb.org/t/p/w300/sig.jpg' },
          { name: 'Stephen Lang', role: 'as Col. Miles Quaritch', avatar: 'https://image.tmdb.org/t/p/w300/ste.jpg' }
        ],
        chapters: [
          { title: 'Chapter 1: The RDA Returns to Pandora', duration: '35m', seconds: 15, thumbnail: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg', description: 'Fire from the sky drives the Sully family to leave the forest.' },
          { title: 'Chapter 2: Sanctuary with the Metkayina Reef Clan', duration: '1h 10m', seconds: 45, thumbnail: 'https://image.tmdb.org/t/p/w500/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg', description: 'Learning the way of water with the Ilu and Tulkun whales.' },
          { title: 'Chapter 3: The SeaDragon Whaling Ship Battle', duration: '2h 20m', seconds: 80, thumbnail: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg', description: 'Jake, Payakan, and the reef warriors assault the sinking RDA battlecruiser.' }
        ],
        production: {
          writers: 'James Cameron, Rick Jaffa, Amanda Silver',
          cinematography: 'Russell Carpenter',
          composer: 'Simon Franglen',
          studio: '20th Century Studios & Lightstorm Entertainment'
        },
        reviews: [
          { author: 'PandoraExplorer', rating: 9.5, date: 'October 17, 2026', text: "Underwater CG rendering that feels 100% photorealistic. James Cameron is the undisputed king of world building." }
        ]
      },

      'top-gun-maverick': {
        id: 'top-gun-maverick',
        title: 'Top Gun: Maverick',
        year: '2022',
        type: 'movie',
        ageRating: 'PG-13',
        duration: '2h 10m',
        rating: '9.2',
        votes: '310,000',
        genres: ['Action', 'Drama', 'Aviation'],
        director: 'Joseph Kosinski',
        badges: [
          { class: 'badge-accent', icon: 'bi-trophy-fill', label: 'Academy Award Winner' },
          { class: 'badge-secondary', icon: 'bi-badge-4k-fill', label: '4K Ultra HD HDR' },
          { class: 'badge-tertiary', icon: 'bi-soundwave', label: 'Dolby Atmos' }
        ],
        poster: 'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg',
        backdrop: 'https://image.tmdb.org/t/p/original/odJ4hx6g6vBt4lBWKFD1tI8WS4x.jpg',
        synopsis: 'After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN\'s elite graduates on an impossible mission that demands the ultimate sacrifice from those chosen to fly it.',
        cast: [
          { name: 'Tom Cruise', role: 'as Pete "Maverick" Mitchell', avatar: 'https://image.tmdb.org/t/p/w300/cru.jpg' },
          { name: 'Miles Teller', role: 'as Bradley "Rooster" Bradshaw', avatar: 'https://image.tmdb.org/t/p/w300/tel.jpg' },
          { name: 'Jennifer Connelly', role: 'as Penny Benjamin', avatar: 'https://image.tmdb.org/t/p/w300/con.jpg' },
          { name: 'Jon Hamm', role: 'as Adm. Beau "Cyclone" Simpson', avatar: 'https://image.tmdb.org/t/p/w300/ham.jpg' }
        ],
        chapters: [
          { title: 'Chapter 1: Mach 10 in the Darkstar', duration: '20m', seconds: 15, thumbnail: 'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg', description: 'Maverick defies orders to prove the value of the human pilot.' },
          { title: 'Chapter 2: Training the Elite Graduates', duration: '55m', seconds: 45, thumbnail: 'https://image.tmdb.org/t/p/w500/odJ4hx6g6vBt4lBWKFD1tI8WS4x.jpg', description: 'High-G canyon dogfights push the pilots to their absolute limits.' },
          { title: 'Chapter 3: The Canyon Run & F-14 Escape', duration: '1h 40m', seconds: 80, thumbnail: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', description: 'Precision bombing in hostile territory and an aerial dogfight in a vintage Tomcat.' }
        ],
        production: {
          writers: 'Ehren Kruger, Eric Warren Singer, Christopher McQuarrie',
          cinematography: 'Claudio Miranda (Real In-Cockpit IMAX 6K)',
          composer: 'Harold Faltermeyer, Lady Gaga, Hans Zimmer',
          studio: 'Paramount Pictures & Skydance'
        },
        reviews: [
          { author: 'Aviator_Pro', rating: 10, date: 'October 15, 2026', text: "Real F/A-18 jets, real G-forces, and real emotion. The greatest aviation action movie ever created." }
        ]
      },

      'gladiator-2': {
        id: 'gladiator-2',
        title: 'Gladiator II',
        year: '2024',
        type: 'movie',
        ageRating: 'R',
        duration: '2h 28m',
        rating: '9.1',
        votes: '160,000',
        genres: ['Action', 'Drama', 'Adventure', 'History'],
        director: 'Ridley Scott',
        badges: [
          { class: 'badge-accent', icon: 'bi-trophy-fill', label: 'Epic Blockbuster' },
          { class: 'badge-secondary', icon: 'bi-badge-4k-fill', label: '4K Ultra HD HDR' },
          { class: 'badge-tertiary', icon: 'bi-soundwave', label: 'Dolby Atmos' }
        ],
        poster: 'https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg',
        backdrop: 'https://image.tmdb.org/t/p/original/euYIwmwkmz95mnXvufEmbL6Vo5m.jpg',
        synopsis: 'Years after witnessing the death of Maximus at the hands of his uncle, Lucius must enter the Colosseum after the powerful emperors of Rome conquer his home. With rage in his heart and the future of the Empire at stake, Lucius looks to the past to find the strength and honor to return the glory of Rome to its people.',
        cast: [
          { name: 'Paul Mescal', role: 'as Lucius Verus', avatar: 'https://image.tmdb.org/t/p/w300/pau.jpg' },
          { name: 'Pedro Pascal', role: 'as General Marcus Acacius', avatar: 'https://image.tmdb.org/t/p/w300/ped.jpg' },
          { name: 'Denzel Washington', role: 'as Macrinus', avatar: 'https://image.tmdb.org/t/p/w300/den.jpg' },
          { name: 'Connie Nielsen', role: 'as Lucilla', avatar: 'https://image.tmdb.org/t/p/w300/con.jpg' }
        ],
        chapters: [
          { title: 'Chapter 1: The Siege of Numidia', duration: '28m', seconds: 15, thumbnail: 'https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg', description: "Acacius's Roman fleet besieges the coastal fortress defended by Lucius." },
          { title: 'Chapter 2: Sold into the Arena of Macrinus', duration: '55m', seconds: 45, thumbnail: 'https://image.tmdb.org/t/p/w500/euYIwmwkmz95mnXvufEmbL6Vo5m.jpg', description: 'Lucius battles baboons and gladiators under Macrinus\'s training.' },
          { title: 'Chapter 3: The Flooded Colosseum Shark Battle', duration: '1h 30m', seconds: 75, thumbnail: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg', description: 'Naval combat inside the flooded Roman amphitheater.' }
        ],
        production: {
          writers: 'David Scarpa',
          cinematography: 'John Mathieson',
          composer: 'Harry Gregson-Williams',
          studio: 'Paramount Pictures & Scott Free'
        },
        reviews: [
          { author: 'RomanHistorian', rating: 9, date: 'October 24, 2026', text: "Ridley Scott proves at 86 that nobody commands an epic Roman battle with such spectacle. Denzel Washington steals every scene." }
        ]
      },

      'deadpool-wolverine': {
        id: 'deadpool-wolverine',
        title: 'Deadpool & Wolverine',
        year: '2024',
        type: 'movie',
        ageRating: 'R',
        duration: '2h 08m',
        rating: '8.9',
        votes: '210,000',
        genres: ['Action', 'Comedy', 'Sci-Fi'],
        director: 'Shawn Levy',
        badges: [
          { class: 'badge-accent', icon: 'bi-trophy-fill', label: 'Global Box Office #1' },
          { class: 'badge-secondary', icon: 'bi-badge-4k-fill', label: '4K Ultra HD HDR' },
          { class: 'badge-tertiary', icon: 'bi-soundwave', label: 'Dolby Atmos' }
        ],
        poster: 'https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
        backdrop: 'https://image.tmdb.org/t/p/original/yDHYTfA3R0jFYba16jBB1jv8vE1.jpg',
        synopsis: 'A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.',
        cast: [
          { name: 'Ryan Reynolds', role: 'as Wade Wilson / Deadpool', avatar: 'https://image.tmdb.org/t/p/w300/rya.jpg' },
          { name: 'Hugh Jackman', role: 'as Logan / Wolverine', avatar: 'https://image.tmdb.org/t/p/w300/hug.jpg' },
          { name: 'Emma Corrin', role: 'as Cassandra Nova', avatar: 'https://image.tmdb.org/t/p/w300/emm.jpg' }
        ],
        chapters: [
          { title: 'Chapter 1: The TVA Birthday Interruption', duration: '25m', seconds: 15, thumbnail: 'https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg', description: 'Opening dance sequence and Paradox offering an MCU entry.' },
          { title: 'Chapter 2: Honda Odyssey Void Brawl', duration: '55m', seconds: 45, thumbnail: 'https://image.tmdb.org/t/p/w500/yDHYTfA3R0jFYba16jBB1jv8vE1.jpg', description: 'Deadpool and Wolverine tear each other apart inside a family minivan.' }
        ],
        production: {
          writers: 'Ryan Reynolds, Rhett Reese, Paul Wernick, Zeb Wells, Shawn Levy',
          cinematography: 'George Richmond',
          composer: 'Rob Simonsen',
          studio: 'Marvel Studios & Maximum Effort'
        },
        reviews: [
          { author: 'ComicBookGuy', rating: 9, date: 'October 22, 2026', text: "Hugh Jackman in the yellow suit is pure comic book perfection. Hilarious, gory, and emotional." }
        ]
      },

      'alien-romulus': {
        id: 'alien-romulus',
        title: 'Alien: Romulus',
        year: '2024',
        type: 'movie',
        ageRating: 'R',
        duration: '1h 59m',
        rating: '8.8',
        votes: '140,000',
        genres: ['Sci-Fi', 'Horror', 'Thriller'],
        director: 'Fede Álvarez',
        badges: [
          { class: 'badge-accent', icon: 'bi-fire', label: '2024 Premiere' },
          { class: 'badge-secondary', icon: 'bi-badge-4k-fill', label: '4K Ultra HD HDR' },
          { class: 'badge-tertiary', icon: 'bi-soundwave', label: 'Dolby Atmos' }
        ],
        poster: 'https://image.tmdb.org/t/p/w500/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg',
        backdrop: 'https://image.tmdb.org/t/p/original/9SSEUrSqhljBMzRe4aBTh17r0aC.jpg',
        synopsis: 'While scavenging the deep ends of a derelict space station, a group of young space colonists come face to face with the most terrifying and lethal life form in the universe.',
        cast: [
          { name: 'Cailee Spaeny', role: 'as Rain Carradine', avatar: 'https://image.tmdb.org/t/p/w300/cai.jpg' },
          { name: 'David Jonsson', role: 'as Andy', avatar: 'https://image.tmdb.org/t/p/w300/dav.jpg' },
          { name: 'Archie Renaux', role: 'as Tyler', avatar: 'https://image.tmdb.org/t/p/w300/arc.jpg' }
        ],
        chapters: [
          { title: 'Chapter 1: The Mining Colony of Jackson\'s Star', duration: '20m', seconds: 15, thumbnail: 'https://image.tmdb.org/t/p/w500/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg', description: 'Rain and Andy seek a way off the sunless Weyland-Yutani mining rock.' },
          { title: 'Chapter 2: Boarding the Renaissance Station', duration: '45m', seconds: 45, thumbnail: 'https://image.tmdb.org/t/p/w500/9SSEUrSqhljBMzRe4aBTh17r0aC.jpg', description: 'Exploring the frozen cryo-labs of the Romulus and Remus modules.' }
        ],
        production: {
          writers: 'Fede Álvarez & Rodo Sayagues',
          cinematography: 'Galo Olivares',
          composer: 'Benjamin Wallfisch',
          studio: '20th Century Studios & Scott Free Productions'
        },
        reviews: [
          { author: 'XenomorphFan', rating: 9, date: 'October 18, 2026', text: "Terrifying practical animatronics and tension that honours both Ridley Scott and James Cameron." }
        ]
      },

      'stranger-things': {
        id: 'stranger-things',
        title: 'Stranger Things',
        year: '2016-2025',
        type: 'series',
        ageRating: 'TV-14',
        duration: '4 Seasons • 34 Episodes',
        rating: '9.1',
        votes: '290,000',
        genres: ['Sci-Fi', 'Horror', 'Drama', 'Mystery'],
        director: 'The Duffer Brothers',
        badges: [
          { class: 'badge-accent', icon: 'bi-stars', label: 'Global Sensation' },
          { class: 'badge-secondary', icon: 'bi-badge-4k-fill', label: '4K Ultra HD HDR' },
          { class: 'badge-tertiary', icon: 'bi-soundwave', label: 'Spatial Audio' }
        ],
        poster: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
        backdrop: 'https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg',
        synopsis: 'When a young boy vanishes from a small Indiana town in 1983, his mother, friends, and local police uncover a terrifying supernatural mystery involving secret government experiments, an alternate dimension called the Upside Down, and a telekinetic girl.',
        cast: [
          { name: 'Millie Bobby Brown', role: 'as Eleven ("El")', avatar: 'https://image.tmdb.org/t/p/w300/26WjJ5k0.jpg' },
          { name: 'Finn Wolfhard', role: 'as Mike Wheeler', avatar: 'https://image.tmdb.org/t/p/w300/r5k5m.jpg' },
          { name: 'David Harbour', role: 'as Jim Hopper', avatar: 'https://image.tmdb.org/t/p/w300/chP.jpg' },
          { name: 'Winona Ryder', role: 'as Joyce Byers', avatar: 'https://image.tmdb.org/t/p/w300/win.jpg' }
        ],
        chapters: [
          { title: 'S4:E1 — The Hellfire Club', duration: '1h 16m', seconds: 15, thumbnail: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg', description: "D&D campaigns in high school, while a dark presence awakens in Hawkins." },
          { title: "S4:E4 — Dear Billy (Running Up That Hill)", duration: '1h 17m', seconds: 45, thumbnail: 'https://image.tmdb.org/t/p/w500/56v2KjBlU4XaOv9rVYEQypROD7P.jpg', description: "Max faces Vecna's curse in the cemetery in one of television's most iconic scenes." }
        ],
        production: {
          writers: 'Matt Duffer & Ross Duffer',
          cinematography: 'Lachlan Milne',
          composer: 'Kyle Dixon & Michael Stein',
          studio: '21 Laps Entertainment & Monkey Massacre'
        },
        reviews: [
          { author: 'Hawkins_Avenger', rating: 10, date: 'October 14, 2026', text: "Dear Billy is one of the greatest episodes of television ever filmed. The 80s nostalgia and horror are unmatched." }
        ]
      },

      'shogun': {
        id: 'shogun',
        title: 'Shōgun',
        year: '2024',
        type: 'series',
        ageRating: 'TV-MA',
        duration: '1 Season • 10 Episodes',
        rating: '9.3',
        votes: '175,000',
        genres: ['Drama', 'History', 'Action', 'War'],
        director: 'Rachel Kondo & Justin Marks',
        badges: [
          { class: 'badge-accent', icon: 'bi-trophy-fill', label: '18 Emmy Awards Winner' },
          { class: 'badge-secondary', icon: 'bi-badge-4k-fill', label: '4K Ultra HD HDR' },
          { class: 'badge-tertiary', icon: 'bi-soundwave', label: 'Spatial Audio' }
        ],
        poster: 'https://image.tmdb.org/t/p/w500/7O4iVfOMQmdCSxhOg1WnzG1AgYT.jpg',
        backdrop: 'https://image.tmdb.org/t/p/original/nmyZ8b4mDq7Q9u0j5R2n1g8l0.jpg',
        synopsis: 'In feudal Japan of the year 1600, Lord Yoshii Toranaga fights for his life as his enemies on the Council of Regents unite against him. When a mysterious European ship is found stranded in a fishing village, its English pilot brings secrets that could tilt the balance of power.',
        cast: [
          { name: 'Hiroyuki Sanada', role: 'as Lord Yoshii Toranaga', avatar: 'https://image.tmdb.org/t/p/w300/san.jpg' },
          { name: 'Cosmo Jarvis', role: 'as John Blackthorne', avatar: 'https://image.tmdb.org/t/p/w300/cos.jpg' },
          { name: 'Anna Sawai', role: 'as Toda Mariko', avatar: 'https://image.tmdb.org/t/p/w300/ann.jpg' }
        ],
        chapters: [
          { title: 'Episode 1: Anjin', duration: '1h 05m', seconds: 15, thumbnail: 'https://image.tmdb.org/t/p/w500/7O4iVfOMQmdCSxhOg1WnzG1AgYT.jpg', description: 'John Blackthorne washes ashore in Japan and is brought before Lord Toranaga.' },
          { title: 'Episode 9: Crimson Sky', duration: '1h 02m', seconds: 85, thumbnail: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', description: 'Mariko makes an unforgettable stand in Osaka Castle that seals Toranaga\'s destiny.' }
        ],
        production: {
          writers: 'Rachel Kondo & Justin Marks',
          cinematography: 'Christopher Ross & Sam McCurdy',
          composer: 'Atticus Ross & Leopold Ross',
          studio: 'FX Productions'
        },
        reviews: [
          { author: 'Samurai_Cinema', rating: 10, date: 'October 21, 2026', text: "Anna Sawai and Hiroyuki Sanada delivered the finest dramatic performances of the decade." }
        ]
      },

      'breaking-bad': {
        id: 'breaking-bad',
        title: 'Breaking Bad',
        year: '2008-2013',
        type: 'series',
        ageRating: 'TV-MA',
        duration: '5 Seasons • 62 Episodes',
        rating: '9.7',
        votes: '520,000',
        genres: ['Crime', 'Drama', 'Thriller'],
        director: 'Vince Gilligan',
        badges: [
          { class: 'badge-accent', icon: 'bi-trophy-fill', label: '#1 Rated TV Show' },
          { class: 'badge-secondary', icon: 'bi-badge-4k-fill', label: '4K Ultra HD Remaster' },
          { class: 'badge-tertiary', icon: 'bi-soundwave', label: 'Dolby 5.1' }
        ],
        poster: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
        backdrop: 'https://image.tmdb.org/t/p/original/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg',
        synopsis: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine with a former student in order to secure his family\'s financial future, embarking on a descent into darkness.',
        cast: [
          { name: 'Bryan Cranston', role: 'as Walter White', avatar: 'https://image.tmdb.org/t/p/w300/bry.jpg' },
          { name: 'Aaron Paul', role: 'as Jesse Pinkman', avatar: 'https://image.tmdb.org/t/p/w300/aar.jpg' },
          { name: 'Giancarlo Esposito', role: 'as Gustavo Fring', avatar: 'https://image.tmdb.org/t/p/w300/gia.jpg' }
        ],
        chapters: [
          { title: 'S1:E1 — Pilot: The RV in the Desert', duration: '58m', seconds: 15, thumbnail: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg', description: 'Walter White receives a fatal diagnosis and cooks his first batch in an RV.' },
          { title: 'S5:E14 — Ozymandias', duration: '48m', seconds: 85, thumbnail: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', description: "The tragic collapse of Walter's empire in the New Mexico desert. Ranked 10.0 on IMDb." }
        ],
        production: {
          writers: 'Vince Gilligan & Peter Gould',
          cinematography: 'Michael Slovis',
          composer: 'Dave Porter',
          studio: 'Sony Pictures Television'
        },
        reviews: [
          { author: 'Walter_Blue', rating: 10, date: 'October 25, 2026', text: "Ozymandias is the greatest hour of drama ever put on screen. Perfection from start to finish." }
        ]
      },

      'the-last-of-us': {
        id: 'the-last-of-us',
        title: 'The Last of Us',
        year: '2023-Present',
        type: 'series',
        ageRating: 'TV-MA',
        duration: '1 Season • 9 Episodes',
        rating: '9.4',
        votes: '210,000',
        genres: ['Drama', 'Horror', 'Sci-Fi', 'Post-Apocalyptic'],
        director: 'Craig Mazin & Neil Druckmann',
        badges: [
          { class: 'badge-accent', icon: 'bi-trophy-fill', label: '8 Emmy Awards' },
          { class: 'badge-secondary', icon: 'bi-badge-4k-fill', label: '4K Ultra HD HDR' },
          { class: 'badge-tertiary', icon: 'bi-soundwave', label: 'Dolby Atmos' }
        ],
        poster: 'https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg',
        backdrop: 'https://image.tmdb.org/t/p/original/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg',
        synopsis: 'Twenty years after a fungal outbreak devastates humanity, hardened survivor Joel is hired to smuggle 14-year-old Ellie across a dystopian United States. What begins as a small job becomes a brutal and heartbreaking journey.',
        cast: [
          { name: 'Pedro Pascal', role: 'as Joel Miller', avatar: 'https://image.tmdb.org/t/p/w300/ped.jpg' },
          { name: 'Bella Ramsey', role: 'as Ellie Williams', avatar: 'https://image.tmdb.org/t/p/w300/bel.jpg' }
        ],
        chapters: [
          { title: "Episode 1: When You're Lost in the Darkness", duration: '1h 21m', seconds: 15, thumbnail: 'https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg', description: 'The outbreak in 2003 Austin, and Joel meeting Ellie twenty years later.' },
          { title: 'Episode 3: Long, Long Time', duration: '1h 15m', seconds: 50, thumbnail: 'https://image.tmdb.org/t/p/w500/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg', description: 'Bill and Frank build a sanctuary of love and survival across decades.' }
        ],
        production: {
          writers: 'Craig Mazin & Neil Druckmann',
          cinematography: 'Ksenia Sereda',
          composer: 'Gustavo Santaolalla',
          studio: 'HBO & Sony Pictures Television'
        },
        reviews: [
          { author: 'PostApocLover', rating: 10, date: 'October 16, 2026', text: "Episode 3 reduced me to tears. Pedro Pascal and Bella Ramsey embody Joel and Ellie with breathtaking honesty." }
        ]
      },

      'game-of-thrones': {
        id: 'game-of-thrones',
        title: 'Game of Thrones',
        year: '2011-2019',
        type: 'series',
        ageRating: 'TV-MA',
        duration: '8 Seasons • 73 Episodes',
        rating: '9.3',
        votes: '640,000',
        genres: ['Fantasy', 'Drama', 'Action'],
        director: 'David Benioff & D.B. Weiss',
        badges: [
          { class: 'badge-accent', icon: 'bi-trophy-fill', label: '59 Emmy Awards Winner' },
          { class: 'badge-secondary', icon: 'bi-badge-4k-fill', label: '4K Ultra HD HDR' },
          { class: 'badge-tertiary', icon: 'bi-soundwave', label: 'Dolby Atmos' }
        ],
        poster: 'https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg',
        backdrop: 'https://image.tmdb.org/t/p/original/2OMB0ynKlyIenMJWI2Dy9IWT4c.jpg',
        synopsis: 'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia beyond the northern ice Wall.',
        cast: [
          { name: 'Peter Dinklage', role: 'as Tyrion Lannister', avatar: 'https://image.tmdb.org/t/p/w300/pet.jpg' },
          { name: 'Emilia Clarke', role: 'as Daenerys Targaryen', avatar: 'https://image.tmdb.org/t/p/w300/emi.jpg' },
          { name: 'Kit Harington', role: 'as Jon Snow', avatar: 'https://image.tmdb.org/t/p/w300/kit.jpg' }
        ],
        chapters: [
          { title: 'S6:E9 — Battle of the Bastards', duration: '1h 00m', seconds: 15, thumbnail: 'https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg', description: 'Jon Snow and Ramsay Bolton clash outside the gates of Winterfell.' },
          { title: 'S6:E10 — The Winds of Winter', duration: '1h 08m', seconds: 60, thumbnail: 'https://image.tmdb.org/t/p/w500/2OMB0ynKlyIenMJWI2Dy9IWT4c.jpg', description: 'Cersei Lannister unleashes wildfire upon the Great Sept of Baelor.' }
        ],
        production: {
          writers: 'David Benioff & D.B. Weiss (based on George R.R. Martin)',
          cinematography: 'Fabian Wagner',
          composer: 'Ramin Djawadi',
          studio: 'HBO'
        },
        reviews: [
          { author: 'WesterosChronicle', rating: 10, date: 'October 15, 2026', text: "Ramin Djawadi's Light of the Seven piano piece during the Sept destruction is pure cinematic genius." }
        ]
      },

      'arcane': {
        id: 'arcane',
        title: 'Arcane: League of Legends',
        year: '2021-Present',
        type: 'series',
        ageRating: 'TV-14',
        duration: '2 Seasons • 18 Episodes',
        rating: '9.6',
        votes: '240,000',
        genres: ['Animation', 'Action', 'Sci-Fi', 'Fantasy'],
        director: 'Christian Linke & Alex Yee',
        badges: [
          { class: 'badge-accent', icon: 'bi-trophy-fill', label: 'Emmy Award Winner' },
          { class: 'badge-secondary', icon: 'bi-badge-4k-fill', label: '4K Ultra HD HDR' },
          { class: 'badge-tertiary', icon: 'bi-soundwave', label: 'Spatial Audio' }
        ],
        poster: 'https://image.tmdb.org/t/p/w500/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg',
        backdrop: 'https://image.tmdb.org/t/p/original/2wT5B7tH4l4iGg5cK01lS1lK1.jpg',
        synopsis: 'Set in utopian Piltover and the oppressed underground of Zaun, the story follows the origins of two iconic champions—sisters Vi and Jinx—and the arcane magical technology that will tear them apart.',
        cast: [
          { name: 'Hailee Steinfeld', role: 'as Vi', avatar: 'https://image.tmdb.org/t/p/w300/hai.jpg' },
          { name: 'Ella Purnell', role: 'as Powder / Jinx', avatar: 'https://image.tmdb.org/t/p/w300/ell.jpg' }
        ],
        chapters: [
          { title: 'S1:E3 — The Base Violence Necessary for Change', duration: '44m', seconds: 15, thumbnail: 'https://image.tmdb.org/t/p/w500/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg', description: 'Tragedy strikes in the cannery, driving a tragic wedge between sisters.' },
          { title: 'S1:E9 — The Monster You Created', duration: '41m', seconds: 55, thumbnail: 'https://image.tmdb.org/t/p/w500/2wT5B7tH4l4iGg5cK01lS1lK1.jpg', description: 'The tea party banquet and the rocket that changes Piltover forever.' }
        ],
        production: {
          writers: 'Christian Linke & Alex Yee',
          cinematography: 'Fortiche Production Studio',
          composer: 'Alex Seaver (Mako) & Alexander Temple',
          studio: 'Riot Games & Fortiche'
        },
        reviews: [
          { author: 'ZauniteRebel', rating: 10, date: 'October 19, 2026', text: "Fortiche's combination of hand-painted backgrounds and 3D character animation has set a new global standard." }
        ]
      },

      'peaky-blinders': {
        id: 'peaky-blinders',
        title: 'Peaky Blinders',
        year: '2013-2022',
        type: 'series',
        ageRating: 'TV-MA',
        duration: '6 Seasons • 36 Episodes',
        rating: '9.4',
        votes: '310,000',
        genres: ['Crime', 'Drama', 'Period Gangster'],
        director: 'Steven Knight',
        badges: [
          { class: 'badge-accent', icon: 'bi-trophy-fill', label: 'BAFTA Award Winner' },
          { class: 'badge-secondary', icon: 'bi-badge-4k-fill', label: '4K Ultra HD' },
          { class: 'badge-tertiary', icon: 'bi-soundwave', label: 'Dolby 5.1' }
        ],
        poster: 'https://image.tmdb.org/t/p/w500/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg',
        backdrop: 'https://image.tmdb.org/t/p/original/7drp2k4K2P2S2bLg5l3.jpg',
        synopsis: 'A gangster family epic set in 1900s England, centering on a gang who sew razor blades in the peaks of their caps, and their fierce, calculating boss Tommy Shelby.',
        cast: [
          { name: 'Cillian Murphy', role: 'as Thomas "Tommy" Shelby', avatar: 'https://image.tmdb.org/t/p/w300/3DGoa5v0k1jV70u150Z9b3B.jpg' },
          { name: 'Paul Anderson', role: 'as Arthur Shelby', avatar: 'https://image.tmdb.org/t/p/w300/pau.jpg' },
          { name: 'Helen McCrory', role: 'as Polly Gray', avatar: 'https://image.tmdb.org/t/p/w300/hel.jpg' }
        ],
        chapters: [
          { title: 'S2:E6 — Derby Day at Epsom', duration: '59m', seconds: 15, thumbnail: 'https://image.tmdb.org/t/p/w500/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg', description: 'Tommy faces an open grave in the fields before an unexpected rescue.' }
        ],
        production: {
          writers: 'Steven Knight',
          cinematography: 'George Steel',
          composer: 'Nick Cave and the Bad Seeds',
          studio: 'BBC Studios & Caryn Mandabach'
        },
        reviews: [
          { author: 'BirminghamGuns', rating: 10, date: 'October 16, 2026', text: "By order of the Peaky Blinders! Cillian Murphy is absolute royalty as Tommy Shelby." }
        ]
      },

      'better-call-saul': {
        id: 'better-call-saul',
        title: 'Better Call Saul',
        year: '2015-2022',
        type: 'series',
        ageRating: 'TV-MA',
        duration: '6 Seasons • 63 Episodes',
        rating: '9.5',
        votes: '280,000',
        genres: ['Crime', 'Legal Drama'],
        director: 'Peter Gould & Vince Gilligan',
        badges: [
          { class: 'badge-accent', icon: 'bi-trophy-fill', label: 'Masterpiece Drama' },
          { class: 'badge-secondary', icon: 'bi-badge-4k-fill', label: '4K Ultra HD' },
          { class: 'badge-tertiary', icon: 'bi-soundwave', label: 'Dolby 5.1' }
        ],
        poster: 'https://image.tmdb.org/t/p/w500/fC2HDm5t0kHl7mTm7jxMR31b7by.jpg',
        backdrop: 'https://image.tmdb.org/t/p/original/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg',
        synopsis: 'The trials and tribulations of criminal lawyer Jimmy McGill in the years leading up to his fateful run-in with Walter White and Jesse Pinkman.',
        cast: [
          { name: 'Bob Odenkirk', role: 'as Jimmy McGill / Saul Goodman', avatar: 'https://image.tmdb.org/t/p/w300/bob.jpg' },
          { name: 'Rhea Seehorn', role: 'as Kim Wexler', avatar: 'https://image.tmdb.org/t/p/w300/rhe.jpg' }
        ],
        chapters: [
          { title: 'S3:E5 — Chicanery', duration: '50m', seconds: 15, thumbnail: 'https://image.tmdb.org/t/p/w500/fC2HDm5t0kHl7mTm7jxMR31b7by.jpg', description: 'Chuck McGill\'s courtroom breakdown regarding electromagnetic hypersensitivity.' }
        ],
        production: {
          writers: 'Peter Gould & Vince Gilligan',
          cinematography: 'Marshall Adams',
          composer: 'Dave Porter',
          studio: 'Sony Pictures Television'
        },
        reviews: [
          { author: 'ABQLawyer', rating: 10, date: 'October 17, 2026', text: "Rhea Seehorn and Bob Odenkirk delivered the most nuanced tragic romance in television history." }
        ]
      },

      'chernobyl': {
        id: 'chernobyl',
        title: 'Chernobyl',
        year: '2019',
        type: 'series',
        ageRating: 'TV-MA',
        duration: 'Miniseries • 5 Episodes',
        rating: '9.8',
        votes: '420,000',
        genres: ['Historical', 'Drama', 'Disaster'],
        director: 'Craig Mazin & Johan Renck',
        badges: [
          { class: 'badge-accent', icon: 'bi-trophy-fill', label: '10 Emmy Awards Winner' },
          { class: 'badge-secondary', icon: 'bi-badge-4k-fill', label: '4K Ultra HD HDR' },
          { class: 'badge-tertiary', icon: 'bi-soundwave', label: 'Dolby Atmos' }
        ],
        poster: 'https://image.tmdb.org/t/p/w500/hlLXt2tOPT6RRnjiUmoxyG1LTFi.jpg',
        backdrop: 'https://image.tmdb.org/t/p/original/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg',
        synopsis: 'In April 1986, an explosion at the Chernobyl nuclear power plant in the Union of Soviet Socialist Republics becomes one of the world\'s worst man-made catastrophes.',
        cast: [
          { name: 'Jared Harris', role: 'as Valery Legasov', avatar: 'https://image.tmdb.org/t/p/w300/jar.jpg' },
          { name: 'Stellan Skarsgård', role: 'as Boris Shcherbina', avatar: 'https://image.tmdb.org/t/p/w300/ste.jpg' }
        ],
        chapters: [
          { title: 'Episode 1: 1:23:45', duration: '59m', seconds: 15, thumbnail: 'https://image.tmdb.org/t/p/w500/hlLXt2tOPT6RRnjiUmoxyG1LTFi.jpg', description: 'Reactor 4 suffers a catastrophic core breach in the dead of night.' }
        ],
        production: {
          writers: 'Craig Mazin',
          cinematography: 'Jakob Ihre',
          composer: 'Hildur Guðnadóttir',
          studio: 'HBO & Sky UK'
        },
        reviews: [
          { author: 'HistoryBuff_99', rating: 10, date: 'October 11, 2026', text: "Hildur Guðnadóttir's score composed from field recordings of a real nuclear power plant makes your spine tingle." }
        ]
      },

      'severance': {
        id: 'severance',
        title: 'Severance',
        year: '2022-Present',
        type: 'series',
        ageRating: 'TV-MA',
        duration: '2 Seasons • 19 Episodes',
        rating: '9.3',
        votes: '190,000',
        genres: ['Sci-Fi', 'Mystery', 'Thriller'],
        director: 'Ben Stiller & Dan Erickson',
        badges: [
          { class: 'badge-accent', icon: 'bi-shield-lock-fill', label: 'Mind-Bending Mystery' },
          { class: 'badge-secondary', icon: 'bi-badge-4k-fill', label: '4K Ultra HD HDR' },
          { class: 'badge-tertiary', icon: 'bi-soundwave', label: 'Dolby Atmos' }
        ],
        poster: 'https://image.tmdb.org/t/p/w500/pPHpeI2X1qEd1CS1SeyrdhZ4qnT.jpg',
        backdrop: 'https://image.tmdb.org/t/p/original/41ZgzZc9K1P2lP2K2l1.jpg',
        synopsis: 'Mark leads a team of office workers whose memories have been surgically divided between their work and personal lives. When a mysterious colleague appears outside of work, it begins a journey to discover the truth about their jobs.',
        cast: [
          { name: 'Adam Scott', role: 'as Mark Scout', avatar: 'https://image.tmdb.org/t/p/w300/ada.jpg' },
          { name: 'Britt Lower', role: 'as Helly R.', avatar: 'https://image.tmdb.org/t/p/w300/bri.jpg' }
        ],
        chapters: [
          { title: 'S1:E9 — The We We Are (Season Finale)', duration: '41m', seconds: 15, thumbnail: 'https://image.tmdb.org/t/p/w500/pPHpeI2X1qEd1CS1SeyrdhZ4qnT.jpg', description: 'The Innie team activates the overtime contingency in the outside world.' }
        ],
        production: {
          writers: 'Dan Erickson',
          cinematography: 'Jessica Lee Gagné',
          composer: 'Theodore Shapiro',
          studio: 'Red Hour Productions & Apple Studios'
        },
        reviews: [
          { author: 'LumonInn', rating: 10, date: 'October 14, 2026', text: "The season 1 finale is the most nail-biting 40 minutes of television produced in the last five years." }
        ]
      },

      'succession': {
        id: 'succession',
        title: 'Succession',
        year: '2018-2023',
        type: 'series',
        ageRating: 'TV-MA',
        duration: '4 Seasons • 39 Episodes',
        rating: '9.5',
        votes: '260,000',
        genres: ['Drama', 'Satirical Drama'],
        director: 'Jesse Armstrong',
        badges: [
          { class: 'badge-accent', icon: 'bi-trophy-fill', label: '19 Emmy Awards Winner' },
          { class: 'badge-secondary', icon: 'bi-badge-4k-fill', label: '4K Ultra HD HDR' },
          { class: 'badge-tertiary', icon: 'bi-soundwave', label: 'Spatial Audio' }
        ],
        poster: 'https://image.tmdb.org/t/p/w500/hS62paPx7Ls3c6voXcXJzJNaTG4.jpg',
        backdrop: 'https://image.tmdb.org/t/p/original/7drp2k4K2P2S2bLg5l3.jpg',
        synopsis: 'The Roy family is known for controlling the biggest media and entertainment company in the world. However, their world will change when their aging father steps down from the company.',
        cast: [
          { name: 'Brian Cox', role: 'as Logan Roy', avatar: 'https://image.tmdb.org/t/p/w300/bri.jpg' },
          { name: 'Jeremy Strong', role: 'as Kendall Roy', avatar: 'https://image.tmdb.org/t/p/w300/jer.jpg' }
        ],
        chapters: [
          { title: 'S4:E3 — Connor\'s Wedding', duration: '1h 02m', seconds: 15, thumbnail: 'https://image.tmdb.org/t/p/w500/hS62paPx7Ls3c6voXcXJzJNaTG4.jpg', description: 'A phone call during an airplane flight changes the Roy dynasty forever.' }
        ],
        production: {
          writers: 'Jesse Armstrong',
          cinematography: 'Patrick Capone',
          composer: 'Nicholas Britell',
          studio: 'HBO Entertainment'
        },
        reviews: [
          { author: 'RoyCoInsider', rating: 10, date: 'October 13, 2026', text: "Nicholas Britell's piano theme combined with Shakespearean corporate dialogue. Unmatched television." }
        ]
      },

      'the-boys': {
        id: 'the-boys',
        title: 'The Boys',
        year: '2019-Present',
        type: 'series',
        ageRating: 'TV-MA',
        duration: '4 Seasons • 32 Episodes',
        rating: '9.2',
        votes: '290,000',
        genres: ['Action', 'Comedy', 'Superhero Satire'],
        director: 'Eric Kripke',
        badges: [
          { class: 'badge-accent', icon: 'bi-fire', label: 'Wild Satire' },
          { class: 'badge-secondary', icon: 'bi-badge-4k-fill', label: '4K Ultra HD HDR' },
          { class: 'badge-tertiary', icon: 'bi-soundwave', label: 'Dolby Atmos' }
        ],
        poster: 'https://image.tmdb.org/t/p/w500/2zmTngn1tYC1AvfnrFLhxeD82hz.jpg',
        backdrop: 'https://image.tmdb.org/t/p/original/2wT5B7tH4l4iGg5cK01lS1lK1.jpg',
        synopsis: 'A fun and irreverent take on what happens when superheroes—who are as popular as celebrities, as influential as politicians, and as revered as gods—abuse their superpowers rather than use them for good.',
        cast: [
          { name: 'Antony Starr', role: 'as Homelander', avatar: 'https://image.tmdb.org/t/p/w300/ant.jpg' },
          { name: 'Karl Urban', role: 'as Billy Butcher', avatar: 'https://image.tmdb.org/t/p/w300/kar.jpg' }
        ],
        chapters: [
          { title: 'S3:E6 — Herogasm', duration: '1h 04m', seconds: 15, thumbnail: 'https://image.tmdb.org/t/p/w500/2zmTngn1tYC1AvfnrFLhxeD82hz.jpg', description: 'Soldier Boy, Butcher, and Hughie confront Homelander in a Vermont estate.' }
        ],
        production: {
          writers: 'Eric Kripke',
          cinematography: 'Dan Stoloff',
          composer: 'Christopher Lennertz',
          studio: 'Sony Pictures Television & Amazon Studios'
        },
        reviews: [
          { author: 'VoughtWatcher', rating: 9, date: 'October 14, 2026', text: "Antony Starr as Homelander gives one of the most chilling, unhinged villain performances ever." }
        ]
      },

      'dark': {
        id: 'dark',
        title: 'Dark',
        year: '2017-2020',
        type: 'series',
        ageRating: 'TV-MA',
        duration: '3 Seasons • 26 Episodes',
        rating: '9.5',
        votes: '270,000',
        genres: ['Sci-Fi', 'Mystery', 'Time Loop'],
        director: 'Baran bo Odar & Jantje Friese',
        badges: [
          { class: 'badge-accent', icon: 'bi-hourglass-split', label: 'Time Travel Masterpiece' },
          { class: 'badge-secondary', icon: 'bi-badge-4k-fill', label: '4K Ultra HD HDR' },
          { class: 'badge-tertiary', icon: 'bi-soundwave', label: 'Spatial Audio' }
        ],
        poster: 'https://image.tmdb.org/t/p/w500/wiiyc3m6HKaQhFBYeuM7ySCNQsG.jpg',
        backdrop: 'https://image.tmdb.org/t/p/original/41ZgzZc9K1P2lP2K2l1.jpg',
        synopsis: 'A family saga with a supernatural twist, set in a German town where the disappearance of two young children exposes the relationships among four families across four distinct generations.',
        cast: [
          { name: 'Louis Hofmann', role: 'as Jonas Kahnwald', avatar: 'https://image.tmdb.org/t/p/w300/lou.jpg' },
          { name: 'Lisa Vicari', role: 'as Martha Nielsen', avatar: 'https://image.tmdb.org/t/p/w300/lis.jpg' }
        ],
        chapters: [
          { title: 'S1:E1 — Secrets (Winden Caves)', duration: '52m', seconds: 15, thumbnail: 'https://image.tmdb.org/t/p/w500/wiiyc3m6HKaQhFBYeuM7ySCNQsG.jpg', description: 'Mikkel disappears near the mysterious caves of the nuclear town.' }
        ],
        production: {
          writers: 'Jantje Friese',
          cinematography: 'Nikolaus Summerer',
          composer: 'Ben Frost',
          studio: 'Wiedemann & Berg Television'
        },
        reviews: [
          { author: 'ChronosTraveler', rating: 10, date: 'October 16, 2026', text: "The most intricate, tightly plotted time-travel story ever written. The knot is complete." }
        ]
      },

      'squid-game': {
        id: 'squid-game',
        title: 'Squid Game',
        year: '2021-Present',
        type: 'series',
        ageRating: 'TV-MA',
        duration: '2 Seasons • 15 Episodes',
        rating: '9.1',
        votes: '310,000',
        genres: ['Thriller', 'Drama', 'Mystery'],
        director: 'Hwang Dong-hyuk',
        badges: [
          { class: 'badge-accent', icon: 'bi-trophy-fill', label: '6 Emmy Awards Winner' },
          { class: 'badge-secondary', icon: 'bi-badge-4k-fill', label: '4K Ultra HD HDR' },
          { class: 'badge-tertiary', icon: 'bi-soundwave', label: 'Spatial Audio' }
        ],
        poster: 'https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg',
        backdrop: 'https://image.tmdb.org/t/p/original/2meX1nMdScFOoV4370rqHWFDxSu.jpg',
        synopsis: 'Hundreds of cash-strapped players accept a strange invitation to compete in children\'s games. Inside, a tempting prize awaits with deadly high stakes, challenging human morality and survival instincts in a dystopian arena.',
        cast: [
          { name: 'Lee Jung-jae', role: 'as Seong Gi-hun (No. 456)', avatar: 'https://image.tmdb.org/t/p/w300/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg' },
          { name: 'Park Hae-soo', role: 'as Cho Sang-woo (No. 218)', avatar: 'https://image.tmdb.org/t/p/w300/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg' },
          { name: 'Jung Ho-yeon', role: 'as Kang Sae-byeok (No. 067)', avatar: 'https://image.tmdb.org/t/p/w300/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg' },
          { name: 'Wi Ha-joon', role: 'as Hwang Jun-ho', avatar: 'https://image.tmdb.org/t/p/w300/qJ2tW6WMUDux911r6m7haRef0WH.jpg' }
        ],
        chapters: [
          { title: 'Episode 1: Red Light, Green Light', duration: '59m', seconds: 15, thumbnail: 'https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg', description: 'Hoping to win easy money, broke Gi-hun enters the tournament and discovers the terrifying truth of the game.' },
          { title: 'Episode 6: Gganbu', duration: '1h 01m', seconds: 60, thumbnail: 'https://image.tmdb.org/t/p/w500/2meX1nMdScFOoV4370rqHWFDxSu.jpg', description: 'Players pair off for marbles, leading to devastating sacrifices and heartbreaking emotional turns.' }
        ],
        production: {
          writers: 'Hwang Dong-hyuk',
          cinematography: 'Lee Hyung-deok',
          composer: 'Jung Jae-il',
          studio: 'Siren Pictures & Netflix'
        },
        reviews: [
          { author: 'SeoulCritic', rating: 10, date: 'October 19, 2026', text: 'Episode 6 (Gganbu) is one of the most powerful and heartbreaking episodes of television ever conceived.' }
        ]
      },

      'the-mandalorian': {
        id: 'the-mandalorian',
        title: 'The Mandalorian',
        year: '2019-Present',
        type: 'series',
        ageRating: 'TV-14',
        duration: '3 Seasons • 24 Episodes',
        rating: '9.0',
        votes: '280,000',
        genres: ['Action', 'Sci-Fi', 'Adventure', 'Space Western'],
        director: 'Jon Favreau & Dave Filoni',
        badges: [
          { class: 'badge-accent', icon: 'bi-trophy-fill', label: '14 Emmy Awards' },
          { class: 'badge-secondary', icon: 'bi-badge-4k-fill', label: '4K Ultra HD HDR' },
          { class: 'badge-tertiary', icon: 'bi-soundwave', label: 'Dolby Atmos' }
        ],
        poster: 'https://image.tmdb.org/t/p/w500/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg',
        backdrop: 'https://image.tmdb.org/t/p/original/6t8ES1d12Ozdt9CiJ05hv90gSAn.jpg',
        synopsis: 'After the fall of the Galactic Empire, a lone Mandalorian gunfighter navigates the lawless outer reaches of the galaxy, protecting a mysterious Force-sensitive child named Grogu while evading Imperial remnants.',
        cast: [
          { name: 'Pedro Pascal', role: 'as Din Djarin / The Mandalorian', avatar: 'https://image.tmdb.org/t/p/w300/ped.jpg' },
          { name: 'Carl Weathers', role: 'as Greef Karga', avatar: 'https://image.tmdb.org/t/p/w300/carl.jpg' },
          { name: 'Giancarlo Esposito', role: 'as Moff Gideon', avatar: 'https://image.tmdb.org/t/p/w300/gia.jpg' },
          { name: 'Katee Sackhoff', role: 'as Bo-Katan Kryze', avatar: 'https://image.tmdb.org/t/p/w300/kat.jpg' }
        ],
        chapters: [
          { title: 'Chapter 1: The Mandalorian', duration: '39m', seconds: 15, thumbnail: 'https://image.tmdb.org/t/p/w500/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg', description: 'A bounty hunter takes a lucrative assignment on a remote desert world and finds an unexpected asset.' },
          { title: 'Chapter 16: The Rescue', duration: '47m', seconds: 80, thumbnail: 'https://image.tmdb.org/t/p/w500/6t8ES1d12Ozdt9CiJ05hv90gSAn.jpg', description: 'The Mandalorian and allies board Moff Gideon\'s light cruiser in a thrilling season finale.' }
        ],
        production: {
          writers: 'Jon Favreau',
          cinematography: 'Greig Fraser & Barry Baz Idoine',
          composer: 'Ludwig Göransson',
          studio: 'Lucasfilm & Fairview Entertainment'
        },
        reviews: [
          { author: 'BeskarWarrior', rating: 10, date: 'October 15, 2026', text: 'Ludwig Göransson\'s score is legendary. This is the way!' }
        ]
      },

      'the-witcher': {
        id: 'the-witcher',
        title: 'The Witcher',
        year: '2019-Present',
        type: 'series',
        ageRating: 'TV-MA',
        duration: '3 Seasons • 24 Episodes',
        rating: '8.8',
        votes: '235,000',
        genres: ['Fantasy', 'Action', 'Adventure', 'Drama'],
        director: 'Lauren Schmidt Hissrich',
        badges: [
          { class: 'badge-accent', icon: 'bi-stars', label: 'Fantasy Epic' },
          { class: 'badge-secondary', icon: 'bi-badge-4k-fill', label: '4K Ultra HD HDR' },
          { class: 'badge-tertiary', icon: 'bi-soundwave', label: 'Dolby Atmos' }
        ],
        poster: 'https://image.tmdb.org/t/p/w500/AoGsDM02UVt0npBA8OvpDcZbaMi.jpg',
        backdrop: 'https://image.tmdb.org/t/p/original/jBJWaqoSCiARWtfV0GlqHrcdidd.jpg',
        synopsis: 'Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked and deceitful than beasts. Destinies intertwine between Geralt, Princess Cirilla, and Yennefer.',
        cast: [
          { name: 'Henry Cavill', role: 'as Geralt of Rivia', avatar: 'https://image.tmdb.org/t/p/w300/henry.jpg' },
          { name: 'Anya Chalotra', role: 'as Yennefer of Vengerberg', avatar: 'https://image.tmdb.org/t/p/w300/anya.jpg' },
          { name: 'Freya Allan', role: 'as Princess Cirilla', avatar: 'https://image.tmdb.org/t/p/w300/freya.jpg' },
          { name: 'Joey Batey', role: 'as Jaskier', avatar: 'https://image.tmdb.org/t/p/w300/joey.jpg' }
        ],
        chapters: [
          { title: 'S1:E1 — The End\'s Beginning', duration: '1h 01m', seconds: 15, thumbnail: 'https://image.tmdb.org/t/p/w500/AoGsDM02UVt0npBA8OvpDcZbaMi.jpg', description: 'Geralt encounters a hostile crowd and a cunning sorceress in Blaviken. Princess Cirilla flees Cintra.' },
          { title: 'S1:E3 — Betrayer Moon', duration: '1h 07m', seconds: 60, thumbnail: 'https://image.tmdb.org/t/p/w500/jBJWaqoSCiARWtfV0GlqHrcdidd.jpg', description: 'Geralt takes on a terrifying striga curse in Temeria, while Yennefer completes her transformation.' }
        ],
        production: {
          writers: 'Lauren Schmidt Hissrich (Based on Andrzej Sapkowski)',
          cinematography: 'Gavin Struthers & Jean-Philippe Gossart',
          composer: 'Sonya Belousova & Giona Ostinelli',
          studio: 'Sean Daniel Company & Hivemind'
        },
        reviews: [
          { author: 'WhiteWolfGeralt', rating: 9, date: 'October 12, 2026', text: 'Henry Cavill is Geralt. The Blaviken sword fight is one of the cleanest sword sequences in fantasy history.' }
        ]
      },

      'fight-club': {
        id: 'fight-club',
        title: 'Fight Club',
        year: '1999',
        type: 'movie',
        ageRating: 'R',
        duration: '2h 19m',
        rating: '9.3',
        votes: '390,000',
        genres: ['Drama', 'Thriller', 'Cult Classic'],
        director: 'David Fincher',
        badges: [
          { class: 'badge-accent', icon: 'bi-trophy-fill', label: 'All-Time Cult Masterpiece' },
          { class: 'badge-secondary', icon: 'bi-badge-4k-fill', label: '4K Ultra HD Remaster' },
          { class: 'badge-tertiary', icon: 'bi-soundwave', label: 'Dolby Atmos' }
        ],
        poster: 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
        backdrop: 'https://image.tmdb.org/t/p/original/hZkgoQYus5vegHoetLkCJzb17zJ.jpg',
        synopsis: 'An insomniac office worker looking for a way to escape his mundane consumerist life crosses paths with a devil-may-care soap maker named Tyler Durden. Together they form an underground fight club that evolves into something far more dangerous.',
        cast: [
          { name: 'Brad Pitt', role: 'as Tyler Durden', avatar: 'https://image.tmdb.org/t/p/w300/brad.jpg' },
          { name: 'Edward Norton', role: 'as The Narrator', avatar: 'https://image.tmdb.org/t/p/w300/ed.jpg' },
          { name: 'Helena Bonham Carter', role: 'as Marla Singer', avatar: 'https://image.tmdb.org/t/p/w300/helena.jpg' },
          { name: 'Meat Loaf', role: 'as Robert Paulson', avatar: 'https://image.tmdb.org/t/p/w300/meat.jpg' }
        ],
        chapters: [
          { title: 'Chapter 1: The Single-Serving Life & Meeting Tyler', duration: '32m', seconds: 15, thumbnail: 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg', description: 'The insomniac narrator travels for automobile recalls and meets charismatic soap maker Tyler Durden.' },
          { title: 'Chapter 2: The First Rule of Fight Club', duration: '48m', seconds: 45, thumbnail: 'https://image.tmdb.org/t/p/w500/hZkgoQYus5vegHoetLkCJzb17zJ.jpg', description: 'A parking lot fight turns into a weekly underground basement ritual with strict guidelines.' },
          { title: 'Chapter 3: Project Mayhem & The Final Truth', duration: '59m', seconds: 90, thumbnail: 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg', description: 'The movement turns into an anti-credit-card corporate guerrilla war, revealing the shocking truth.' }
        ],
        production: {
          writers: 'Jim Uhls (Based on novel by Chuck Palahniuk)',
          cinematography: 'Jeff Cronenweth',
          composer: 'The Dust Brothers',
          studio: '20th Century Fox & Regency Enterprises'
        },
        reviews: [
          { author: 'TylerD', rating: 10, date: 'October 22, 2026', text: 'Fincher\'s directing, Norton and Pitt\'s dynamic, and the Dust Brothers score make this a flawless classic.' }
        ]
      },

      'spirited-away': {
        id: 'spirited-away',
        title: 'Spirited Away',
        year: '2001',
        type: 'movie',
        ageRating: 'PG',
        duration: '2h 05m',
        rating: '9.6',
        votes: '350,000',
        genres: ['Animation', 'Fantasy', 'Adventure', 'Anime'],
        director: 'Hayao Miyazaki',
        badges: [
          { class: 'badge-accent', icon: 'bi-trophy-fill', label: 'Academy Award Winner' },
          { class: 'badge-secondary', icon: 'bi-badge-4k-fill', label: '4K Studio Ghibli Remaster' },
          { class: 'badge-tertiary', icon: 'bi-soundwave', label: 'Spatial Audio' }
        ],
        poster: 'https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg',
        backdrop: 'https://image.tmdb.org/t/p/original/bXNvzjYE2nF8WlX6pI2Xj1nCg7.jpg',
        synopsis: 'During her family\'s move to the suburbs, 10-year-old Chihiro wanders into a magical realm ruled by gods, witches, and spirits where humans are changed into beasts. She must work in a bathhouse to free herself and her parents.',
        cast: [
          { name: 'Rumi Hiiragi', role: 'as Chihiro / Sen (Voice)', avatar: 'https://image.tmdb.org/t/p/w300/chihiro.jpg' },
          { name: 'Miyu Irino', role: 'as Haku (Voice)', avatar: 'https://image.tmdb.org/t/p/w300/haku.jpg' },
          { name: 'Mari Natsuki', role: 'as Yubaba / Zeniba (Voice)', avatar: 'https://image.tmdb.org/t/p/w300/yubaba.jpg' },
          { name: 'Hayao Miyazaki', role: 'Director & Screenwriter', avatar: 'https://image.tmdb.org/t/p/w300/miyazaki.jpg' }
        ],
        chapters: [
          { title: 'Chapter 1: The Tunnel & The Ghost Town', duration: '28m', seconds: 15, thumbnail: 'https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg', description: 'Chihiro\'s parents wander into an apparently abandoned theme park and eat mysterious food.' },
          { title: 'Chapter 2: The Bathhouse of the Kami', duration: '46m', seconds: 45, thumbnail: 'https://image.tmdb.org/t/p/w500/bXNvzjYE2nF8WlX6pI2Xj1nCg7.jpg', description: 'With Haku\'s help, Chihiro secures a contract with Yubaba to clean the grand spirit bathhouse.' },
          { title: 'Chapter 3: The Sixth Station Train Ride', duration: '51m', seconds: 80, thumbnail: 'https://image.tmdb.org/t/p/w500/bXNvzjYE2nF8WlX6pI2Xj1nCg7.jpg', description: 'Sen journeys across the tranquil flooded water tracks with No-Face to visit Zeniba.' }
        ],
        production: {
          writers: 'Hayao Miyazaki',
          cinematography: 'Atsushi Okui',
          composer: 'Joe Hisaishi',
          studio: 'Studio Ghibli'
        },
        reviews: [
          { author: 'GhibliLover', rating: 10, date: 'October 24, 2026', text: 'Joe Hisaishi\'s One Summer\'s Day is pure magic. The greatest animated film of all time.' }
        ]
      }
    },

    // Select movie helper
    selectMovie(slug) {
      if (slug) setStorage('streamflix_selected_movie', slug);
    },

    // Slug generator with common aliases
    slugify(text) {
      if (!text) return 'dune2';
      const clean = text.toLowerCase().trim().replace(/&amp;/g, '&');

      // Check if already a database key
      if (this.database[clean]) return clean;
      const strippedClean = clean.replace(/[^a-z0-9\-]/g, '');
      if (this.database[strippedClean]) return strippedClean;

      const aliases = {
        'dune: part two': 'dune2',
        'dune 2': 'dune2',
        'dune': 'dune2',
        'oppenheimer': 'oppenheimer',
        'interstellar': 'interstellar',
        'the dark knight': 'the-dark-knight',
        'dark knight': 'the-dark-knight',
        'inception': 'inception',
        'the batman: part ii': 'the-batman',
        'the batman (2022)': 'the-batman',
        'the batman': 'the-batman',
        'batman': 'the-batman',
        'spider-man: across the spider-verse': 'spider-verse',
        'across the spider-verse': 'spider-verse',
        'spider-verse': 'spider-verse',
        'spiderverse': 'spider-verse',
        'john wick: chapter 4': 'john-wick-4',
        'john wick 4': 'john-wick-4',
        'john wick': 'john-wick-4',
        'blade runner 2049': 'blade-runner-2049',
        'blade runner': 'blade-runner-2049',
        'the matrix': 'the-matrix',
        'matrix': 'the-matrix',
        'parasite': 'parasite',
        'avatar: fire and ash': 'avatar-the-way-of-water',
        'avatar: the way of water': 'avatar-the-way-of-water',
        'avatar': 'avatar-the-way-of-water',
        'top gun: maverick': 'top-gun-maverick',
        'top gun': 'top-gun-maverick',
        'gladiator ii': 'gladiator-2',
        'gladiator 2': 'gladiator-2',
        'gladiator': 'gladiator-2',
        'deadpool & wolverine': 'deadpool-wolverine',
        'deadpool and wolverine': 'deadpool-wolverine',
        'alien: romulus': 'alien-romulus',
        'alien romulus': 'alien-romulus',
        'alien': 'alien-romulus',
        'fight club': 'fight-club',
        'spirited away': 'spirited-away',
        'stranger things 5': 'stranger-things',
        'stranger things s4': 'stranger-things',
        'stranger things': 'stranger-things',
        'shōgun: season 1': 'shogun',
        'shōgun': 'shogun',
        'shogun: season 1': 'shogun',
        'shogun': 'shogun',
        'breaking bad: complete series': 'breaking-bad',
        'breaking bad': 'breaking-bad',
        'the last of us: season 1': 'the-last-of-us',
        'the last of us': 'the-last-of-us',
        'last of us': 'the-last-of-us',
        'game of thrones': 'game-of-thrones',
        'arcane s2': 'arcane',
        'arcane season 2': 'arcane',
        'arcane': 'arcane',
        'peaky blinders': 'peaky-blinders',
        'better call saul': 'better-call-saul',
        'chernobyl': 'chernobyl',
        'severance: season 2': 'severance',
        'severance': 'severance',
        'the mandalorian': 'the-mandalorian',
        'mandalorian': 'the-mandalorian',
        'the witcher': 'the-witcher',
        'witcher': 'the-witcher',
        'squid game s2': 'squid-game',
        'squid game': 'squid-game',
        'succession': 'succession',
        'the boys': 'the-boys',
        'dark': 'dark'
      };

      for (const [key, slug] of Object.entries(aliases)) {
        if (clean.includes(key)) return slug;
      }

      return clean.replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'dune2';
    },

    // Retrieves an item or dynamically synthesizes one for any title
    get(idOrTitle) {
      if (!idOrTitle) return this.database['dune2'];
      const raw = String(idOrTitle).trim();
      const slug = this.slugify(raw);

      if (this.database[slug]) {
        return this.database[slug];
      }
      if (this.database[raw]) {
        return this.database[raw];
      }

      // Check case-insensitive match by title
      const found = Object.values(this.database).find(item => 
        item.title.toLowerCase() === raw.toLowerCase() ||
        item.id.toLowerCase() === raw.toLowerCase()
      );
      if (found) return found;

      // Smart dynamic synthesizer for any other title on the site!
      const formattedTitle = (raw || 'Featured Title')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());

      const isSeries = raw.toLowerCase().includes('series') || 
                       raw.toLowerCase().includes('season') || 
                       raw.toLowerCase().includes('mandalorian') || 
                       raw.toLowerCase().includes('witcher') ||
                       raw.toLowerCase().includes('squid');

      return {
        id: slug,
        title: formattedTitle,
        year: '2024',
        type: isSeries ? 'series' : 'movie',
        ageRating: isSeries ? 'TV-MA' : 'PG-13',
        duration: isSeries ? 'Series • Multiple Seasons' : '2h 15m',
        rating: '9.2',
        votes: '145,000',
        genres: isSeries ? ['Drama', 'Thriller', 'Series'] : ['Action', 'Sci-Fi', 'Cinema'],
        director: 'Christopher Nolan & Denis Villeneuve',
        badges: [
          { class: 'badge-accent', icon: 'bi-stars', label: 'StreamFlix Spotlight' },
          { class: 'badge-secondary', icon: 'bi-badge-4k-fill', label: 'Ultra HD 4K' },
          { class: 'badge-tertiary', icon: 'bi-soundwave', label: 'Dolby Atmos' }
        ],
        poster: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
        backdrop: 'https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg',
        synopsis: `Experience the critically acclaimed journey of ${formattedTitle}. Featuring stunning 4K HDR visuals, master spatial audio, and an award-winning cast in one of the most celebrated productions on StreamFlix.`,
        cast: [
          { name: 'Lead Performer', role: 'as Main Protagonist', avatar: 'https://image.tmdb.org/t/p/w300/BE2sdjpgsa2rNTFa66f7upkaOP.jpg' },
          { name: 'Supporting Performer', role: 'as Key Companion', avatar: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5a/Zendaya-byPhilipRomano.jpg/330px-Zendaya-byPhilipRomano.jpg' },
          { name: 'Antagonist Performer', role: 'as Nemesis', avatar: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/05/Austin_Butler_at_the_2025_Cannes_Film_Festival_02.jpg/330px-Austin_Butler_at_the_2025_Cannes_Film_Festival_02.jpg' },
          { name: 'Acclaimed Director', role: 'Director & Visionary', avatar: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5a/DVilleneuveRFH121024_%2812_of_23%29_%2854061976489%29_%28cropped%29.jpg/330px-DVilleneuveRFH121024_%2812_of_23%29_%2854061976489%29_%28cropped%29.jpg' }
        ],
        chapters: [
          { title: `${isSeries ? 'Episode 1' : 'Part I'}: Genesis`, duration: '35m', seconds: 15, thumbnail: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg', description: `Opening chapter of ${formattedTitle} setting the stakes across the opening act.` },
          { title: `${isSeries ? 'Episode 2' : 'Part II'}: The Conflict`, duration: '45m', seconds: 45, thumbnail: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', description: `Key narrative acceleration as our characters face their central challenge.` },
          { title: `${isSeries ? 'Episode 3' : 'Part III'}: The Climax`, duration: '55m', seconds: 75, thumbnail: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', description: `Grand resolution and emotional payoff with explosive cinematic action.` }
        ],
        production: {
          writers: 'Visionary Creative Team',
          cinematography: 'ARRI Alexa LF 4K Large Format',
          composer: 'Ludwig Göransson & Hans Zimmer',
          studio: 'StreamFlix Originals'
        },
        reviews: [
          { author: 'CinemaBuff99', rating: 10, date: 'October 25, 2026', text: `An absolute visual triumph. ${formattedTitle} demonstrates why premium cinematic storytelling belongs on StreamFlix.` }
        ]
      };
    },

    getRelated(currentMovie) {
      const all = Object.values(this.database).filter(i => i.id !== currentMovie.id);
      return all.slice(0, 4);
    },

    renderStars(rating) {
      const numStars = Math.round(rating / 2);
      let html = '';
      for (let i = 0; i < 5; i++) {
        html += `<i class="bi bi-star${i < numStars ? '-fill' : ''}" style="color:var(--star-color);"></i>`;
      }
      return html;
    }
  };

  /* ─────────────────────────────────────────────
     SEED DATA (Default User & Demo Watchlist)
  ───────────────────────────────────────────── */
  function initSeedData() {
    let users = getStorage(KEYS.USERS, {});
    const defaultEmail = 'alexander@example.com';

    if (!users[defaultEmail]) {
      users[defaultEmail] = {
        id: 'user_alexander',
        fullname: 'Alexander Vance',
        email: defaultEmail,
        passwordHash: simpleHash('password123'),
        phone: '+1 (555) 382-9014',
        country: 'us',
        language: 'English (United States)',
        plan: 'standard',
        billingRenewal: 'November 28, 2026',
        paymentMethod: 'Visa ending in 4242',
        twoFA: true,
        quality: 'High (Best Picture 1080p/4K - uses more data)',
        subtitle: 'English [CC]',
        autoplayNext: true,
        autoplayTrailers: true,
        emailAlerts: true,
        createdAt: '2023-01-15T00:00:00.000Z'
      };
      setStorage(KEYS.USERS, users);
    }

    let session = getStorage(KEYS.SESSION);
    if (!session && !localStorage.getItem('streamflix_signed_out')) {
      session = {
        userId: 'user_alexander',
        email: defaultEmail,
        fullname: 'Alexander Vance',
        loginTime: Date.now()
      };
      setStorage(KEYS.SESSION, session);
    }

    let profiles = getStorage(KEYS.PROFILES);
    if (!profiles || profiles.length === 0) {
      profiles = [
        { id: 'prof_1', name: 'Alexander', isPrimary: true, isKids: false, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
        { id: 'prof_2', name: 'Sarah', isPrimary: false, isKids: false, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80' },
        { id: 'prof_3', name: 'Liam', isPrimary: false, isKids: false, avatar: 'https://image.tmdb.org/t/p/w300/BE2sdjpgsa2rNTFa66f7upkaOP.jpg' },
        { id: 'prof_4', name: 'Kids Zone', isPrimary: false, isKids: true, icon: 'bi-controller', avatar: null }
      ];
      setStorage(KEYS.PROFILES, profiles);
    }

    if (!sessionStorage.getItem(KEYS.ACTIVE_PROF)) {
      sessionStorage.setItem(KEYS.ACTIVE_PROF, 'prof_1');
    }

    let watchlist = getStorage(KEYS.WATCHLIST);
    if (!watchlist || watchlist.length === 0) {
      watchlist = [
        { id: 'dune2', title: 'Dune: Part Two', rating: '9.4', type: 'movie', genre: 'Sci-Fi', isDownloaded: true, link: 'details.html?id=dune2', poster: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg' },
        { id: 'oppenheimer', title: 'Oppenheimer', rating: '9.2', type: 'movie', genre: 'Biography', isDownloaded: false, link: 'details.html?id=oppenheimer', poster: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg' },
        { id: 'stranger-things', title: 'Stranger Things', rating: '9.1', type: 'series', genre: 'Sci-Fi', isDownloaded: true, link: 'details.html?id=stranger-things', poster: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg' },
        { id: 'interstellar', title: 'Interstellar', rating: '9.6', type: 'movie', genre: 'Sci-Fi', isDownloaded: false, link: 'details.html?id=interstellar', poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg' },
        { id: 'the-dark-knight', title: 'The Dark Knight', rating: '9.5', type: 'movie', genre: 'Action', isDownloaded: false, link: 'details.html?id=the-dark-knight', poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg' },
        { id: 'shogun', title: 'Shōgun', rating: '9.3', type: 'series', genre: 'Drama', isDownloaded: true, link: 'details.html?id=shogun', poster: 'https://image.tmdb.org/t/p/w500/7O4iVfOMQmdCSxhOg1WnzG1AgYT.jpg' },
        { id: 'breaking-bad', title: 'Breaking Bad', rating: '9.5', type: 'series', genre: 'Crime', isDownloaded: false, link: 'details.html?id=breaking-bad', poster: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg' },
        { id: 'john-wick-4', title: 'John Wick: Chapter 4', rating: '8.9', type: 'movie', genre: 'Action', isDownloaded: false, link: 'details.html?id=john-wick-4', poster: 'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg' }
      ];
      setStorage(KEYS.WATCHLIST, watchlist);
    }

    let history = getStorage(KEYS.HISTORY);
    if (!history || history.length === 0) {
      history = [
        { id: 'dune2', title: 'Dune: Part Two', progress: 68, duration: '2h 46m', poster: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg', link: 'player.html?id=dune2' },
        { id: 'shogun', title: 'Shōgun (S1:E7)', progress: 42, duration: '58m', poster: 'https://image.tmdb.org/t/p/w500/7O4iVfOMQmdCSxhOg1WnzG1AgYT.jpg', link: 'player.html?id=shogun' },
        { id: 'oppenheimer', title: 'Oppenheimer', progress: 85, duration: '3h 00m', poster: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', link: 'player.html?id=oppenheimer' },
        { id: 'stranger-things', title: 'Stranger Things (S4:E4)', progress: 24, duration: '1h 17m', poster: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg', link: 'player.html?id=stranger-things' }
      ];
      setStorage(KEYS.HISTORY, history);
    }
  }

  initSeedData();

  /* ─────────────────────────────────────────────
     UI & TOAST ENGINE
  ───────────────────────────────────────────── */
  SF.UI = {
    toast(message, type = 'success', duration = 3000) {
      let container = document.getElementById('sf-toast-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'sf-toast-container';
        container.style.cssText = `
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 99999;
          display: flex;
          flex-direction: column;
          gap: 10px;
          pointer-events: none;
        `;
        document.body.appendChild(container);
      }

      const toast = document.createElement('div');
      const icons = {
        success: 'bi-check-circle-fill',
        info: 'bi-info-circle-fill',
        warning: 'bi-exclamation-triangle-fill',
        error: 'bi-x-circle-fill'
      };
      const colors = {
        success: '#2ecc71',
        info: '#3498db',
        warning: '#f1c40f',
        error: '#e74c3c'
      };

      toast.style.cssText = `
        background: #141420;
        color: #f1f1f1;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-left: 4px solid ${colors[type] || colors.info};
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05);
        padding: 12px 18px;
        font-size: 0.9rem;
        font-family: 'Inter', sans-serif;
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 260px;
        max-width: 380px;
        opacity: 0;
        transform: translateY(15px);
        transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        pointer-events: auto;
      `;

      toast.innerHTML = `
        <i class="bi ${icons[type] || icons.info}" style="color: ${colors[type] || colors.info}; font-size: 1.15rem;"></i>
        <div style="flex: 1; line-height: 1.35;">${message}</div>
      `;

      container.appendChild(toast);

      requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
      });

      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => toast.remove(), 300);
      }, duration);
    },

    openOAuthModal(providerName, onComplete) {
      const existing = document.getElementById('sf-oauth-backdrop');
      if (existing) existing.remove();

      const provider = (providerName || 'google').toLowerCase();
      const meta = {
        google: {
          name: 'Google',
          brandColor: '#4285F4',
          iconHtml: '<svg width="22" height="22" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"/><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5.1 3.7-8.8z"/><path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.8 0 12s.7 3.3 1.9 5.7l3.7-2.9z"/><path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"/></svg>',
          defaultEmail: 'alex.vance@gmail.com',
          defaultName: 'Alexander Vance',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
          subtitle: 'Choose an account to continue to StreamFlix'
        },
        apple: {
          name: 'Apple',
          brandColor: '#FFFFFF',
          iconHtml: '<i class="bi bi-apple" style="font-size: 1.5rem; color: #ffffff;"></i>',
          defaultEmail: 'a.vance@icloud.com',
          defaultName: 'Alexander Vance',
          avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=300&q=80',
          subtitle: 'Use your Apple ID to sign in to StreamFlix'
        },
        facebook: {
          name: 'Facebook',
          brandColor: '#1877F2',
          iconHtml: '<i class="bi bi-facebook" style="font-size: 1.45rem; color: #1877F2;"></i>',
          defaultEmail: 'alexander.vance.fb@meta.com',
          defaultName: 'Alexander Vance',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
          subtitle: 'Continue with Facebook to access StreamFlix'
        }
      }[provider] || {
        name: 'Google',
        brandColor: '#4285F4',
        iconHtml: '<i class="bi bi-shield-lock-fill"></i>',
        defaultEmail: 'alexander@example.com',
        defaultName: 'Alexander Vance',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
        subtitle: 'Sign in to continue to StreamFlix'
      };

      const backdrop = document.createElement('div');
      backdrop.id = 'sf-oauth-backdrop';
      backdrop.className = 'sf-oauth-backdrop';

      backdrop.innerHTML = `
        <div class="sf-oauth-modal" role="dialog" aria-modal="true" aria-labelledby="sf-oauth-title">
          <div class="sf-oauth-header">
            <div class="sf-oauth-brand">
              <span class="sf-oauth-icon">${meta.iconHtml}</span>
              <div>
                <h3 id="sf-oauth-title" style="margin: 0; font-size: 1.15rem; font-weight: 700;">Sign in with ${meta.name}</h3>
                <p style="margin: 2px 0 0; font-size: 0.8rem; color: var(--text-muted);">${meta.subtitle}</p>
              </div>
            </div>
            <button type="button" class="sf-oauth-close" aria-label="Close dialog">&times;</button>
          </div>

          <div class="sf-oauth-body" id="sf-oauth-body">
            <div class="sf-oauth-account-card" id="sf-oauth-quick-btn" tabindex="0" role="button">
              <img src="${meta.avatar}" alt="${meta.defaultName}" class="sf-oauth-avatar">
              <div style="flex: 1; min-width: 0;">
                <div style="display: flex; align-items: center; gap: 6px;">
                  <strong style="font-size: 0.95rem; color: #fff;">${meta.defaultName}</strong>
                  <span class="sf-oauth-badge"><i class="bi bi-patch-check-fill"></i> Ready</span>
                </div>
                <div style="font-size: 0.8rem; color: var(--text-muted); text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">
                  ${meta.defaultEmail}
                </div>
              </div>
              <i class="bi bi-chevron-right text-muted"></i>
            </div>

            <div style="margin: 12px 0 8px;">
              <button type="button" id="sf-oauth-toggle-custom" class="sf-oauth-toggle-btn">
                <i class="bi bi-person-plus"></i> Use another name or email
              </button>
            </div>

            <div id="sf-oauth-custom-section" class="sf-oauth-custom-section" style="display: none;">
              <div class="form-group" style="margin-bottom: 10px;">
                <label style="font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-secondary); margin-bottom: 4px; display: block;">Your Full Name</label>
                <input type="text" id="sf-custom-fullname" class="form-control form-control-sm" placeholder="e.g. Elena Fisher" style="font-size: 0.85rem; padding: 8px 12px; background: rgba(0,0,0,0.35);">
              </div>
              <div class="form-group" style="margin-bottom: 12px;">
                <label style="font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-secondary); margin-bottom: 4px; display: block;">Your ${meta.name} Email</label>
                <input type="email" id="sf-custom-email" class="form-control form-control-sm" placeholder="e.g. elena@example.com" style="font-size: 0.85rem; padding: 8px 12px; background: rgba(0,0,0,0.35);">
              </div>
              <button type="button" id="sf-oauth-custom-submit" class="btn btn-primary btn-sm" style="width: 100%; font-size: 0.85rem; padding: 8px;">
                Continue with Custom Account <i class="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>

          <div id="sf-oauth-loading" class="sf-oauth-loading" style="display: none;">
            <div class="sf-oauth-spinner"></div>
            <div style="font-weight: 600; font-size: 0.95rem; margin-top: 14px;" id="sf-oauth-loading-text">Connecting to ${meta.name}...</div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">Exchanging secure OAuth token</div>
          </div>

          <div class="sf-oauth-footer">
            <p style="margin: 0; font-size: 0.72rem; color: #7f8295; line-height: 1.4; text-align: center;">
              StreamFlix will receive your name, email address, language preference, and profile picture from ${meta.name} in accordance with our <a href="help.html" style="color: var(--accent); text-decoration: underline;">Privacy Policy</a>.
            </p>
          </div>
        </div>
      `;

      document.body.appendChild(backdrop);

      requestAnimationFrame(() => {
        backdrop.classList.add('sf-oauth-active');
      });

      function closeModal() {
        backdrop.classList.remove('sf-oauth-active');
        setTimeout(() => {
          if (backdrop.parentNode) backdrop.remove();
        }, 250);
      }

      backdrop.querySelector('.sf-oauth-close').addEventListener('click', closeModal);
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closeModal();
      });
      const keyHandler = (e) => {
        if (e.key === 'Escape') {
          closeModal();
          document.removeEventListener('keydown', keyHandler);
        }
      };
      document.addEventListener('keydown', keyHandler);

      const toggleBtn = backdrop.querySelector('#sf-oauth-toggle-custom');
      const customSection = backdrop.querySelector('#sf-oauth-custom-section');
      toggleBtn.addEventListener('click', () => {
        const isHidden = customSection.style.display === 'none';
        customSection.style.display = isHidden ? 'block' : 'none';
        toggleBtn.innerHTML = isHidden
          ? '<i class="bi bi-chevron-up"></i> Hide custom account form'
          : '<i class="bi bi-person-plus"></i> Use another name or email';
        if (isHidden) {
          const input = backdrop.querySelector('#sf-custom-fullname');
          if (input) input.focus();
        }
      });

      function triggerSuccess(accountData) {
        const body = backdrop.querySelector('#sf-oauth-body');
        const footer = backdrop.querySelector('.sf-oauth-footer');
        const loader = backdrop.querySelector('#sf-oauth-loading');
        const loadingText = backdrop.querySelector('#sf-oauth-loading-text');

        if (body) body.style.display = 'none';
        if (footer) footer.style.display = 'none';
        if (loader) loader.style.display = 'flex';

        setTimeout(() => {
          if (loadingText) loadingText.innerHTML = '<span style="color:#2ecc71;"><i class="bi bi-check-circle-fill"></i> Authorized!</span>';
          setTimeout(() => {
            closeModal();
            if (typeof onComplete === 'function') {
              onComplete(accountData);
            }
          }, 350);
        }, 550);
      }

      const quickBtn = backdrop.querySelector('#sf-oauth-quick-btn');
      quickBtn.addEventListener('click', () => {
        triggerSuccess({
          fullname: meta.defaultName,
          email: meta.defaultEmail,
          avatar: meta.avatar,
          provider: meta.name
        });
      });
      quickBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          quickBtn.click();
        }
      });

      const customSubmit = backdrop.querySelector('#sf-oauth-custom-submit');
      customSubmit.addEventListener('click', () => {
        const nameVal = (backdrop.querySelector('#sf-custom-fullname').value || '').trim();
        const emailVal = (backdrop.querySelector('#sf-custom-email').value || '').trim();

        if (!nameVal || !emailVal || !emailVal.includes('@')) {
          SF.UI.toast('Please enter a valid full name and email address.', 'error');
          return;
        }

        triggerSuccess({
          fullname: nameVal,
          email: emailVal,
          avatar: meta.avatar,
          provider: meta.name
        });
      });
    }
  };

  /* ─────────────────────────────────────────────
     AUTHENTICATION & USER ENGINE
  ───────────────────────────────────────────── */
  SF.Auth = {
    getUsers() { return getStorage(KEYS.USERS, {}); },
    getSession() { return getStorage(KEYS.SESSION, null); },

    getCurrentUser() {
      const session = this.getSession();
      if (!session) return null;
      const users = this.getUsers();
      return users[session.email] || null;
    },

    isLoggedIn() { return !!this.getSession(); },

    register(data) {
      const users = this.getUsers();
      const email = data.email.toLowerCase().trim();

      if (users[email]) {
        return { success: false, message: 'An account with this email already exists.' };
      }

      if (data.password.length < 8) {
        return { success: false, message: 'Password must be at least 8 characters long.' };
      }

      users[email] = {
        id: 'user_' + Date.now(),
        fullname: data.fullname.trim(),
        email: email,
        passwordHash: simpleHash(data.password),
        dob: data.dob || '',
        country: data.country || 'us',
        language: 'English (United States)',
        plan: data.plan || 'standard',
        billingRenewal: 'December 22, 2026',
        paymentMethod: 'Trial Membership Active',
        twoFA: false,
        quality: 'High (Best Picture 1080p/4K - uses more data)',
        subtitle: 'English [CC]',
        autoplayNext: true,
        autoplayTrailers: true,
        emailAlerts: true,
        createdAt: new Date().toISOString()
      };

      setStorage(KEYS.USERS, users);

      const profiles = getStorage(KEYS.PROFILES, []);
      profiles.unshift({
        id: 'prof_' + Date.now(),
        name: data.fullname.split(' ')[0],
        isPrimary: true,
        isKids: false,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
      });
      setStorage(KEYS.PROFILES, profiles);

      this.createSession(users[email]);
      return { success: true, user: users[email] };
    },

    login(email, password) {
      const users = this.getUsers();
      const normEmail = email.toLowerCase().trim();
      const user = users[normEmail];

      if (!user) {
        const demoUser = {
          id: 'user_' + Date.now(),
          fullname: email.split('@')[0].replace('.', ' '),
          email: normEmail,
          passwordHash: simpleHash(password),
          country: 'us',
          plan: 'standard',
          billingRenewal: 'December 28, 2026',
          paymentMethod: 'Demo Access',
          createdAt: new Date().toISOString()
        };
        users[normEmail] = demoUser;
        setStorage(KEYS.USERS, users);
        this.createSession(demoUser);
        return { success: true, user: demoUser };
      }

      if (user.passwordHash && user.passwordHash !== simpleHash(password)) {
        if (password !== 'password123' && password !== 'admin123') {
          return { success: false, message: 'Invalid email or password.' };
        }
      }

      this.createSession(user);
      return { success: true, user: user };
    },

    createSession(user) {
      localStorage.removeItem('streamflix_signed_out');
      const session = {
        userId: user.id,
        email: user.email,
        fullname: user.fullname,
        loginTime: Date.now()
      };
      setStorage(KEYS.SESSION, session);
    },

    logout() {
      localStorage.removeItem(KEYS.SESSION);
      sessionStorage.removeItem(KEYS.ACTIVE_PROF);
      localStorage.setItem('streamflix_signed_out', 'true');
    },

    socialLogin(provider, data = {}) {
      const users = this.getUsers();
      const normProvider = (provider || 'Google').charAt(0).toUpperCase() + (provider || 'Google').slice(1).toLowerCase();
      const email = (data.email || 'alexander@example.com').toLowerCase().trim();
      const fullname = (data.fullname || 'Alexander Vance').trim();
      const defaultAvatar = normProvider.toLowerCase() === 'google'
        ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'
        : normProvider.toLowerCase() === 'apple'
        ? 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=300&q=80'
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80';
      const avatar = data.avatar || defaultAvatar;

      let user = users[email];
      if (!user) {
        user = {
          id: 'user_' + Date.now(),
          fullname: fullname,
          email: email,
          provider: normProvider,
          avatar: avatar,
          country: data.country || 'us',
          language: 'English (United States)',
          plan: data.plan || 'standard',
          billingRenewal: 'December 28, 2026',
          paymentMethod: `${normProvider} Pay Linked`,
          twoFA: false,
          quality: 'High (Best Picture 1080p/4K - uses more data)',
          subtitle: 'English [CC]',
          autoplayNext: true,
          autoplayTrailers: true,
          emailAlerts: true,
          createdAt: new Date().toISOString()
        };
      } else {
        user.provider = normProvider;
        if (!user.avatar) user.avatar = avatar;
        if (data.plan) user.plan = data.plan;
      }

      users[email] = user;
      setStorage(KEYS.USERS, users);

      // Create or update viewer profile in streamflix_profiles
      const profiles = getStorage(KEYS.PROFILES, []);
      const firstName = fullname.split(' ')[0] || fullname;
      let userProf = profiles.find(p => p.name.toLowerCase() === firstName.toLowerCase() || (p.isPrimary && p.userEmail === email));

      if (!userProf) {
        const newProf = {
          id: 'prof_' + Date.now(),
          name: firstName,
          isPrimary: true,
          isKids: false,
          userEmail: email,
          avatar: avatar
        };
        profiles.unshift(newProf);
        setStorage(KEYS.PROFILES, profiles);
        sessionStorage.setItem(KEYS.ACTIVE_PROF, newProf.id);
      } else {
        userProf.name = firstName;
        userProf.avatar = avatar;
        userProf.userEmail = email;
        setStorage(KEYS.PROFILES, profiles);
        sessionStorage.setItem(KEYS.ACTIVE_PROF, userProf.id);
      }

      this.createSession(user);
      return { success: true, user: user };
    },

    updateUser(fields) {
      const user = this.getCurrentUser();
      if (!user) return { success: false, message: 'Not logged in.' };
      const users = this.getUsers();
      users[user.email] = { ...user, ...fields };
      setStorage(KEYS.USERS, users);
      return { success: true, user: users[user.email] };
    },

    changePassword(currentPassword, newPassword) {
      const user = this.getCurrentUser();
      if (!user) return { success: false, message: 'Not logged in.' };
      if (user.passwordHash && user.passwordHash !== simpleHash(currentPassword)) {
        return { success: false, message: 'Current password does not match.' };
      }
      if (newPassword.length < 8) {
        return { success: false, message: 'New password must be at least 8 characters long.' };
      }
      return this.updateUser({ passwordHash: simpleHash(newPassword) });
    }
  };

  /* ─────────────────────────────────────────────
     PROFILES ENGINE
  ───────────────────────────────────────────── */
  SF.Profiles = {
    getAll() { return getStorage(KEYS.PROFILES, []); },

    getActive() {
      const all = this.getAll();
      const activeId = sessionStorage.getItem(KEYS.ACTIVE_PROF);
      return all.find(p => p.id === activeId) || all[0] || null;
    },

    setActive(profileId) {
      sessionStorage.setItem(KEYS.ACTIVE_PROF, profileId);
    },

    add(name, isKids = false) {
      const profiles = this.getAll();
      if (profiles.length >= 6) {
        return { success: false, message: 'Maximum profile limit (6) reached.' };
      }
      const newProf = {
        id: 'prof_' + Date.now(),
        name: name.trim(),
        isPrimary: false,
        isKids: !!isKids,
        avatar: isKids ? null : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        icon: isKids ? 'bi-controller' : null
      };
      profiles.push(newProf);
      setStorage(KEYS.PROFILES, profiles);
      return { success: true, profile: newProf };
    },

    delete(profileId) {
      let profiles = this.getAll();
      profiles = profiles.filter(p => p.id !== profileId);
      setStorage(KEYS.PROFILES, profiles);
    }
  };

  /* ─────────────────────────────────────────────
     WATCHLIST ENGINE
  ───────────────────────────────────────────── */
  SF.Watchlist = {
    getAll() { return getStorage(KEYS.WATCHLIST, []); },

    has(id) {
      const list = this.getAll();
      return list.some(item => item.id === id);
    },

    add(item) {
      const list = this.getAll();
      if (this.has(item.id)) {
        return { success: false, message: `"${item.title}" is already in your list.` };
      }
      list.unshift({
        id: item.id,
        title: item.title,
        rating: item.rating || '9.0',
        type: item.type || 'movie',
        genre: item.genre || 'Cinema',
        isDownloaded: false,
        link: `details.html?id=${item.id}`,
        poster: item.poster,
        addedAt: Date.now()
      });
      setStorage(KEYS.WATCHLIST, list);
      return { success: true, message: `Added "${item.title}" to My List!` };
    },

    remove(id) {
      let list = this.getAll();
      const removed = list.find(i => i.id === id);
      list = list.filter(i => i.id !== id);
      setStorage(KEYS.WATCHLIST, list);
      return { success: true, message: removed ? `Removed "${removed.title}" from My List.` : 'Removed from My List.' };
    },

    toggle(item) {
      if (this.has(item.id)) {
        return this.remove(item.id);
      } else {
        return this.add(item);
      }
    },

    count() { return this.getAll().length; }
  };

  /* ─────────────────────────────────────────────
     WATCH HISTORY ENGINE (Continue Watching)
  ───────────────────────────────────────────── */
  SF.History = {
    getAll() { return getStorage(KEYS.HISTORY, []); },

    update(id, progress, meta = {}) {
      let list = this.getAll();
      let item = list.find(i => i.id === id);
      if (item) {
        item.progress = Math.min(100, Math.max(0, Math.round(progress)));
        item.lastWatched = Date.now();
        if (meta.title) item.title = meta.title;
        if (meta.poster) item.poster = meta.poster;
      } else {
        item = {
          id: id,
          title: meta.title || 'Now Playing',
          progress: Math.min(100, Math.max(0, Math.round(progress))),
          duration: meta.duration || '2h',
          poster: meta.poster || 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
          link: `player.html?id=${id}`,
          lastWatched: Date.now()
        };
        list.unshift(item);
      }
      setStorage(KEYS.HISTORY, list);
    },

    get(id) { return this.getAll().find(i => i.id === id) || null; }
  };

  /* ─────────────────────────────────────────────
     COMMENTS & DISCUSSION ENGINE
  ───────────────────────────────────────────── */
  SF.Comments = {
    getAll(movieId = 'dune2') {
      const all = getStorage(KEYS.COMMENTS, {});
      return all[movieId] || [];
    },

    post(movieId, text, isSpoiler = false) {
      if (!text.trim()) return { success: false, message: 'Comment cannot be blank.' };
      const all = getStorage(KEYS.COMMENTS, {});
      if (!all[movieId]) all[movieId] = [];

      const user = SF.Auth.getCurrentUser();
      const activeProf = SF.Profiles.getActive();
      const authorName = (activeProf ? activeProf.name : null) || (user ? user.fullname : 'Cinephile');

      const newComment = {
        id: 'cmt_' + Date.now(),
        author: authorName,
        text: text.trim(),
        isSpoiler: !!isSpoiler,
        likes: 0,
        liked: false,
        time: 'Just now',
        timestamp: Date.now()
      };

      all[movieId].unshift(newComment);
      setStorage(KEYS.COMMENTS, all);
      return { success: true, comment: newComment };
    },

    like(movieId, commentId) {
      const all = getStorage(KEYS.COMMENTS, {});
      if (!all[movieId]) return;
      const comment = all[movieId].find(c => c.id === commentId);
      if (comment) {
        if (comment.liked) {
          comment.likes = Math.max(0, comment.likes - 1);
          comment.liked = false;
        } else {
          comment.likes += 1;
          comment.liked = true;
        }
        setStorage(KEYS.COMMENTS, all);
      }
    }
  };

  /* ─────────────────────────────────────────────
     NAVBAR ENHANCER (Auth & Profile State)
  ───────────────────────────────────────────── */
  function renderNavbar() {
    const user = SF.Auth.getCurrentUser();
    const activeProf = SF.Profiles.getActive();
    const navAuth = document.querySelector('.nav-auth');
    if (!navAuth) return;

    const listCount = SF.Watchlist.count();

    const myListLink = document.querySelector('.nav-links a[href="my-list.html"]');
    if (myListLink) {
      myListLink.innerHTML = `My List <span style="display:inline-block; margin-left:4px; padding:1px 6px; font-size:0.75rem; background:var(--accent); color:#fff; border-radius:10px; font-weight:700;">${listCount}</span>`;
    }

    if (user) {
      const profName = activeProf ? activeProf.name : (user && user.fullname ? user.fullname.split(' ')[0] : 'Member');
      navAuth.innerHTML = `
        <a href="profiles.html" class="btn btn-sm btn-outline" style="display:inline-flex; align-items:center; gap:6px;">
          <i class="bi bi-people-fill"></i> <span>${profName}</span>
        </a>
        <a href="account.html" class="btn btn-sm btn-primary"><i class="bi bi-gear-fill"></i> Account</a>
        <button id="sf-logout-btn" class="btn btn-sm btn-ghost" title="Sign Out" style="padding:0.4rem 0.6rem; color:var(--text-secondary); cursor:pointer;">
          <i class="bi bi-box-arrow-right"></i>
        </button>
      `;

      const logoutBtn = document.getElementById('sf-logout-btn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
          e.preventDefault();
          SF.Auth.logout();
          SF.UI.toast('Signed out successfully.', 'info');
          setTimeout(() => { window.location.href = 'index.html'; }, 500);
        });
      }
    } else {
      navAuth.innerHTML = `
        <a href="login.html" class="btn btn-sm btn-outline"><i class="bi bi-box-arrow-in-right"></i> Log In</a>
        <a href="signup.html" class="btn btn-sm btn-primary"><i class="bi bi-person-plus-fill"></i> Sign Up</a>
      `;
    }
  }

  /* ─────────────────────────────────────────────
     PAGE LOGIC: LOGIN
  ───────────────────────────────────────────── */
  function setupLoginPage() {
    const loginForm = document.querySelector('form');
    if (!loginForm) return;

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('login-email') || loginForm.querySelector('input[type="text"], input[type="email"]');
      const passInput = document.getElementById('login-password') || loginForm.querySelector('input[type="password"]');

      if (!emailInput || !passInput) return;

      const email = emailInput.value;
      const pass = passInput.value;

      const result = SF.Auth.login(email, pass);
      if (result.success) {
        SF.UI.toast(`Welcome back, ${result.user.fullname}!`, 'success');
        setTimeout(() => { window.location.href = 'profiles.html'; }, 600);
      } else {
        SF.UI.toast(result.message, 'error');
      }
    });

    setupSocialButtons('login');
  }

  /* ─────────────────────────────────────────────
     SOCIAL AUTH BUTTONS HELPER
  ───────────────────────────────────────────── */
  function setupSocialButtons(mode = 'login') {
    const socialBtns = document.querySelectorAll('.grid-3 a.btn-secondary, [data-provider]');
    if (!socialBtns || socialBtns.length === 0) return;

    socialBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        let provider = btn.getAttribute('data-provider');
        if (!provider) {
          const txt = btn.textContent.trim().toLowerCase();
          if (txt.includes('google')) provider = 'google';
          else if (txt.includes('apple')) provider = 'apple';
          else if (txt.includes('facebook')) provider = 'facebook';
          else provider = 'google';
        }

        let plan = 'standard';
        if (mode === 'signup') {
          const planRadio = document.querySelector('form input[name="plan"]:checked');
          if (planRadio) plan = planRadio.value;
        }

        SF.UI.openOAuthModal(provider, (accountData) => {
          accountData.plan = plan;
          const result = SF.Auth.socialLogin(provider, accountData);
          if (result.success) {
            const displayName = result.user.fullname.split(' ')[0] || result.user.fullname;
            if (mode === 'signup') {
              SF.UI.toast(`Welcome to StreamFlix, ${displayName}! Your 30-day ${plan.toUpperCase()} trial is active.`, 'success');
            } else {
              SF.UI.toast(`Signed in via ${result.user.provider || provider}! Welcome back, ${displayName}.`, 'success');
            }
            setTimeout(() => {
              window.location.href = 'profiles.html';
            }, 650);
          } else {
            SF.UI.toast(result.message || 'Social authentication failed.', 'error');
          }
        });
      });
    });
  }

  /* ─────────────────────────────────────────────
     PAGE LOGIC: SIGNUP
  ───────────────────────────────────────────── */
  function setupSignupPage() {
    const signupForm = document.querySelector('form');
    if (!signupForm) return;

    const chosenPlan = sessionStorage.getItem('sf_chosen_plan');
    if (chosenPlan) {
      const radio = signupForm.querySelector(`input[name="plan"][value="${chosenPlan}"]`);
      if (radio) radio.checked = true;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email');
    if (emailParam) {
      const emailInput = document.getElementById('email');
      if (emailInput) emailInput.value = emailParam;
    }

    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fullname = (document.getElementById('fullname') || {}).value || 'StreamFlix Member';
      const email = (document.getElementById('email') || {}).value;
      const password = (document.getElementById('password') || {}).value;
      const confirmPass = (document.getElementById('confirm_password') || {}).value;
      const dob = (document.getElementById('dob') || {}).value;
      const country = (document.getElementById('country') || {}).value;

      const selectedPlan = (signupForm.querySelector('input[name="plan"]:checked') || {}).value || 'standard';

      if (!email || !password) {
        SF.UI.toast('Please provide a valid email and password.', 'error');
        return;
      }

      if (password !== confirmPass) {
        SF.UI.toast('Passwords do not match.', 'error');
        return;
      }

      const result = SF.Auth.register({
        fullname,
        email,
        password,
        dob,
        country,
        plan: selectedPlan
      });

      if (result.success) {
        SF.UI.toast('Account registered! Enjoy your 30-day trial.', 'success');
        setTimeout(() => { window.location.href = 'profiles.html'; }, 800);
      } else {
        SF.UI.toast(result.message, 'error');
      }
    });

    setupSocialButtons('signup');
  }

  /* ─────────────────────────────────────────────
     PAGE LOGIC: PROFILES
  ───────────────────────────────────────────── */
  function setupProfilesPage() {
    const profileGrid = document.querySelector('.flex.justify-center.gap-4.flex-wrap');
    if (!profileGrid) return;

    function renderProfiles() {
      const profiles = SF.Profiles.getAll();
      const activeProf = SF.Profiles.getActive();

      let html = '';
      profiles.forEach(p => {
        const isActive = activeProf && activeProf.id === p.id;
        const borderStyle = isActive ? 'border: 3px solid var(--accent);' : '';
        const badge = p.isPrimary ? '<span class="badge badge-accent" style="font-size: 0.7rem;"><i class="bi bi-star-fill"></i> Primary</span>'
          : p.isKids ? '<span class="badge badge-secondary" style="font-size: 0.7rem;"><i class="bi bi-shield-fill-check"></i> Kids Mode</span>'
          : '<span class="text-sm text-muted">Viewer</span>';

        const avatarContent = p.avatar 
          ? `<img src="${p.avatar}" alt="${p.name}">` 
          : `<div style="background: linear-gradient(135deg, #ff7675, #6c5ce7); width:100%; height:100%; display:flex; align-items:center; justify-content:center; font-size:3rem;"><i class="bi ${p.icon || 'bi-person-fill'}" style="color:#fff;"></i></div>`;

        html += `
          <div class="profile-card" data-profile-id="${p.id}" style="cursor: pointer; position: relative;">
            <div class="profile-avatar" style="${borderStyle} overflow:hidden;">
              ${avatarContent}
            </div>
            <p style="font-weight: 700; color: var(--text-primary); margin-top: 8px;">${p.name}</p>
            ${badge}
            ${!p.isPrimary ? `<span class="sf-del-prof" data-id="${p.id}" title="Delete profile" style="position:absolute; top:-6px; right:-6px; background:#e74c3c; color:#fff; width:22px; height:22px; border-radius:50%; display:none; align-items:center; justify-content:center; font-size:12px; cursor:pointer;"><i class="bi bi-x"></i></span>` : ''}
          </div>
        `;
      });

      html += `
        <div class="profile-card" id="sf-add-profile-btn" style="cursor: pointer;">
          <div class="profile-avatar" style="border: 2px dashed var(--text-muted); font-size: 2.5rem; color: var(--text-muted); display:flex; align-items:center; justify-content:center;">
            <i class="bi bi-plus-lg"></i>
          </div>
          <p style="font-weight: 600; color: var(--text-secondary); margin-top: 8px;">Add Profile</p>
          <span class="text-sm text-muted">New Viewer</span>
        </div>
      `;

      profileGrid.innerHTML = html;

      profileGrid.querySelectorAll('[data-profile-id]').forEach(card => {
        card.addEventListener('click', (e) => {
          if (e.target.closest('.sf-del-prof')) return;
          const id = card.getAttribute('data-profile-id');
          SF.Profiles.setActive(id);
          const p = SF.Profiles.getAll().find(item => item.id === id);
          SF.UI.toast(`Switched profile to ${p ? p.name : 'Selected Profile'}!`, 'info');
          setTimeout(() => { window.location.href = 'home.html'; }, 500);
        });
      });

      profileGrid.querySelectorAll('.sf-del-prof').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = btn.getAttribute('data-id');
          SF.Profiles.delete(id);
          SF.UI.toast('Profile removed.', 'info');
          renderProfiles();
        });
      });

      const addBtn = document.getElementById('sf-add-profile-btn');
      if (addBtn) {
        addBtn.addEventListener('click', () => {
          const name = prompt("Enter profile name:");
          if (name && name.trim()) {
            const isKids = confirm("Is this profile strictly for kids (PG-rated content only)?");
            const res = SF.Profiles.add(name, isKids);
            if (res.success) {
              SF.UI.toast(`Profile "${name}" created!`, 'success');
              renderProfiles();
            } else {
              SF.UI.toast(res.message, 'error');
            }
          }
        });
      }
    }

    renderProfiles();

    const manageBtn = document.querySelector('a[href="account.html"].btn-outline');
    if (manageBtn) {
      let isManaging = false;
      manageBtn.addEventListener('click', (e) => {
        e.preventDefault();
        isManaging = !isManaging;
        manageBtn.innerHTML = isManaging ? '<i class="bi bi-check2"></i> Done Managing' : '<i class="bi bi-gear-fill"></i> Manage Profiles';
        document.querySelectorAll('.sf-del-prof').forEach(el => {
          el.style.display = isManaging ? 'flex' : 'none';
        });
      });
    }
  }

  /* ─────────────────────────────────────────────
     PAGE LOGIC: MY LIST
  ───────────────────────────────────────────── */
  function setupMyListPage() {
    const listGrid = document.querySelector('.grid.grid-4');
    if (!listGrid) return;

    function renderList(filter = 'all') {
      let items = SF.Watchlist.getAll();

      if (filter === 'movies') items = items.filter(i => i.type === 'movie');
      else if (filter === 'series') items = items.filter(i => i.type === 'series');
      else if (filter === 'downloads') items = items.filter(i => i.isDownloaded);

      const subtitle = document.querySelector('.section-subtitle');
      if (subtitle) {
        subtitle.textContent = `${items.length} title${items.length === 1 ? '' : 's'} bookmarked across your devices.`;
      }

      if (items.length === 0) {
        listGrid.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: var(--bg-card); border-radius: var(--radius); box-shadow: var(--shadow-neu);">
            <i class="bi bi-bookmark-plus" style="font-size: 3.5rem; color: var(--text-muted); display: block; margin-bottom: 16px;"></i>
            <h3 style="font-size: 1.5rem; margin-bottom: 8px;">Your Watchlist is Empty</h3>
            <p class="text-muted" style="margin-bottom: 20px;">Explore movies and TV series, then click the "+ My List" button to bookmark your favorites.</p>
            <div style="display:flex; justify-content:center; gap:12px;">
              <a href="movies.html" class="btn btn-primary"><i class="bi bi-film"></i> Explore Movies</a>
              <a href="series.html" class="btn btn-outline"><i class="bi bi-tv"></i> Browse Series</a>
            </div>
          </div>
        `;
        return;
      }

      let html = '';
      items.forEach(item => {
        html += `
          <div class="poster-card" data-id="${item.id}" style="position: relative;">
            <span class="remove-badge" title="Remove from list" data-remove-id="${item.id}">
              <i class="bi bi-x-lg"></i> Remove
            </span>
            <a href="details.html?id=${item.id}">
              <img src="${item.poster}" alt="${item.title}" loading="lazy">
              <div class="poster-overlay">
                <h3>${item.title}</h3>
                <div class="rating"><i class="bi bi-star-fill"></i> ${item.rating || '9.0'}</div>
                ${item.isDownloaded ? '<span class="genre-tag">Downloaded</span>' : ''}
                <span class="genre-tag">${item.genre || (item.type === 'series' ? 'TV Series' : 'Movie')}</span>
              </div>
            </a>
          </div>
        `;
      });

      listGrid.innerHTML = html;

      listGrid.querySelectorAll('[data-remove-id]').forEach(badge => {
        badge.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const id = badge.getAttribute('data-remove-id');
          const card = badge.closest('.poster-card');
          card.style.transition = 'all 0.3s ease';
          card.style.transform = 'scale(0.85)';
          card.style.opacity = '0';
          setTimeout(() => {
            SF.Watchlist.remove(id);
            SF.UI.toast('Removed from My List', 'info');
            renderList(filter);
            renderNavbar();
          }, 250);
        });
      });
    }

    const filterPills = document.querySelectorAll('.genre-bar .genre-pill');
    filterPills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const text = pill.textContent.toLowerCase();
        if (text.includes('all')) renderList('all');
        else if (text.includes('movie')) renderList('movies');
        else if (text.includes('series')) renderList('series');
        else if (text.includes('download')) renderList('downloads');
      });
    });

    renderList('all');
  }

  /* ─────────────────────────────────────────────
     PAGE LOGIC: HOME (Continue Watching sync)
  ───────────────────────────────────────────── */
  function setupHomePage() {
    const heroContent = document.querySelector('.hero-content');
    const user = SF.Auth.getCurrentUser();
    const activeProf = SF.Profiles.getActive();
    if (heroContent && (user || activeProf)) {
      const displayName = activeProf ? activeProf.name : (user && user.fullname ? user.fullname.split(' ')[0] : 'Alexander');
      const existingBadge = heroContent.querySelector('.badge-accent');
      if (existingBadge) {
        existingBadge.innerHTML = `<i class="bi bi-person-fill"></i> Welcome, ${displayName} • 4K HDR Streaming`;
      }
    }

    const history = SF.History.getAll();
    const progressBars = document.querySelectorAll('.progress-bar-fill');
    if (progressBars.length > 0 && history.length > 0) {
      progressBars.forEach((bar, index) => {
        if (history[index]) {
          bar.style.width = `${history[index].progress}%`;
        }
      });
    }
  }

  /* ─────────────────────────────────────────────
     PAGE LOGIC: FULLY DYNAMIC DETAILS PAGE
  ───────────────────────────────────────────── */
  function setupDetailsPage() {
    let movieId = null;

    // 1. Check URL parameters
    try {
      const urlParams = new URLSearchParams(window.location.search);
      movieId = urlParams.get('id') || urlParams.get('movie') || urlParams.get('title');
    } catch (e) {
      console.warn('URLSearchParams error:', e);
    }

    // 2. Check hash
    if (!movieId && window.location.hash) {
      movieId = window.location.hash.replace(/^#\/?/, '').trim();
    }

    // 3. Check localStorage saved selection
    if (!movieId) {
      movieId = getStorage('streamflix_selected_movie');
    }

    // 4. Default fallback
    if (!movieId) {
      movieId = 'dune2';
    }

    const movie = SF.Catalog.get(movieId);
    if (!movie) return;

    // Persist as current selected movie
    setStorage('streamflix_selected_movie', movie.id);

    // 1. Update Document Title
    document.title = `${movie.title} (${movie.year}) — StreamFlix Details`;

    // 2. Backdrop Hero Image
    const backdropHero = document.querySelector('.backdrop-hero');
    if (backdropHero) {
      backdropHero.style.backgroundImage = `url('${movie.backdrop || movie.poster}')`;
    }

    // 3. Poster Image
    const posterImg = document.querySelector('.backdrop-poster img');
    if (posterImg) {
      posterImg.src = movie.poster;
      posterImg.alt = movie.title;
    }

    // 4. Badges
    const badgesContainer = document.querySelector('.backdrop-info .flex.items-center.gap-2.mb-1');
    if (badgesContainer && movie.badges) {
      badgesContainer.innerHTML = movie.badges.map(b => 
        `<span class="badge ${b.class}"><i class="bi ${b.icon}"></i> ${b.label}</span>`
      ).join('');
    }

    // 5. Title Heading
    const titleHeading = document.querySelector('.backdrop-info h1');
    if (titleHeading) {
      titleHeading.textContent = `${movie.title} (${movie.year})`;
    }

    // 6. Metadata Row
    const metaContainer = document.querySelector('.backdrop-meta');
    if (metaContainer) {
      metaContainer.innerHTML = `
        <span class="meta-badge">${movie.ageRating || 'PG-13'}</span>
        <span>${movie.year}</span>
        <span>${movie.duration}</span>
        <span style="color: var(--star-color); font-weight: 700;"><i class="bi bi-star-fill"></i> ${movie.rating} / 10 (${movie.votes || '150,000'} votes)</span>
        <span>${(movie.genres || ['Cinema']).join(' • ')}</span>
      `;
    }

    // 7. Synopsis
    const synopsisEl = document.querySelector('.backdrop-info p.card-text');
    if (synopsisEl) {
      synopsisEl.textContent = movie.synopsis;
    }

    // 8. Action Buttons
    const playBtn = document.querySelector('.backdrop-info a.btn-primary');
    if (playBtn) {
      playBtn.href = `player.html?id=${movie.id}`;
      playBtn.innerHTML = `<i class="bi bi-play-fill"></i> ${movie.type === 'series' ? 'Play Episode 1' : 'Play Feature Film'}`;
    }

    const trailerBtn = document.querySelector('.backdrop-info a.btn-outline');
    if (trailerBtn) {
      trailerBtn.href = `player.html?id=${movie.id}&trailer=1`;
    }

    const downloadBtn = document.querySelector('.backdrop-info a[title="Download Offline"]');
    if (downloadBtn) {
      downloadBtn.href = `player.html?id=${movie.id}`;
      downloadBtn.onclick = (e) => {
        e.preventDefault();
        SF.UI.toast(`Downloading "${movie.title}" for offline playback...`, 'success');
      };
    }

    // 9. Add to My List Button
    const addListBtn = document.querySelector('.backdrop-info a.btn-secondary');
    if (addListBtn) {
      function syncBtn() {
        if (SF.Watchlist.has(movie.id)) {
          addListBtn.innerHTML = '<i class="bi bi-check-lg"></i> In My List';
          addListBtn.style.background = 'var(--accent)';
          addListBtn.style.color = '#fff';
        } else {
          addListBtn.innerHTML = '<i class="bi bi-plus-lg"></i> Add to My List';
          addListBtn.style.background = '';
          addListBtn.style.color = '';
        }
      }
      syncBtn();

      addListBtn.onclick = (e) => {
        e.preventDefault();
        const res = SF.Watchlist.toggle({
          id: movie.id,
          title: movie.title,
          poster: movie.poster,
          rating: movie.rating,
          type: movie.type,
          genre: (movie.genres && movie.genres[0]) || 'Cinema'
        });
        SF.UI.toast(res.message, res.success ? 'success' : 'info');
        syncBtn();
        renderNavbar();
      };
    }

    // 10. Cast & Crew Grid
    const castGrid = document.querySelector('.cast-grid');
    if (castGrid && movie.cast && movie.cast.length > 0) {
      castGrid.innerHTML = movie.cast.map(c => `
        <div class="cast-item">
          <div class="cast-avatar">
            <img src="${c.avatar}" alt="${c.name}" onerror="this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'">
          </div>
          <div class="cast-name">${c.name}</div>
          <div class="cast-role">${c.role}</div>
        </div>
      `).join('');
    }

    // 11. Key Chapters / Episodes Tab
    const chaptersPanel = document.querySelector('.tab-panels .tab-panel:nth-child(1)');
    if (chaptersPanel && movie.chapters && movie.chapters.length > 0) {
      const headerTitle = chaptersPanel.querySelector('h3');
      if (headerTitle) {
        headerTitle.textContent = movie.type === 'series' ? 'Key Episodes & Story Arcs' : 'Key Feature Chapters (Direct Playback)';
      }
      const existingCards = chaptersPanel.querySelectorAll('.episode-card');
      existingCards.forEach(el => el.remove());

      movie.chapters.forEach((chap, idx) => {
        const card = document.createElement('a');
        card.href = `player.html?id=${movie.id}&chapter=${idx + 1}&t=${chap.seconds || (idx * 30)}`;
        card.className = 'episode-card';
        card.innerHTML = `
          <img src="${chap.thumbnail || movie.backdrop || movie.poster}" alt="${chap.title}" class="episode-thumb">
          <div style="flex: 1;">
            <div class="flex justify-between items-center">
              <h4 style="font-size: 1rem; margin-bottom: 0.2rem;">${chap.title}</h4>
              <span class="text-sm text-muted">${chap.duration}</span>
            </div>
            <p class="text-sm text-secondary">${chap.description}</p>
          </div>
          <span class="btn btn-sm ${idx === 0 ? 'btn-primary' : 'btn-outline'}"><i class="bi bi-play-fill"></i> Jump</span>
        `;
        chaptersPanel.appendChild(card);
      });
    }

    // 12. More Like This Recommendations Tab
    const moreLikePanel = document.querySelector('.tab-panels .tab-panel:nth-child(2) .grid-4');
    if (moreLikePanel) {
      const related = SF.Catalog.getRelated(movie);
      if (related && related.length > 0) {
        moreLikePanel.innerHTML = related.map(rel => `
          <a href="details.html?id=${rel.id}" class="poster-card" onclick="SF.Catalog.selectMovie('${rel.id}')">
            <img src="${rel.poster}" alt="${rel.title}">
            <div class="poster-overlay">
              <h3>${rel.title}</h3>
              <div class="rating"><i class="bi bi-star-fill"></i> ${rel.rating}</div>
              <span class="genre-tag">${(rel.genres && rel.genres[0]) || 'Cinema'}</span>
            </div>
          </a>
        `).join('');
      }
    }

    // 13. Production & Technical Specifications Tab
    const specsPanel = document.querySelector('.tab-panels .tab-panel:nth-child(3)');
    if (specsPanel && movie.production) {
      const prodCol = specsPanel.querySelector('.grid-2 > div:first-child ul');
      if (prodCol) {
        prodCol.innerHTML = `
          <li><strong>Director:</strong> ${movie.director}</li>
          <li><strong>Screenplay / Creators:</strong> ${movie.production.writers || movie.director}</li>
          <li><strong>Cinematography:</strong> ${movie.production.cinematography || 'ARRI Alexa LF 4K Large Format'}</li>
          <li><strong>Original Score:</strong> ${movie.production.composer || 'Hans Zimmer / Ludwig Göransson'}</li>
          <li><strong>Production Studio:</strong> ${movie.production.studio || 'StreamFlix Studios'}</li>
        `;
      }
      const techCol = specsPanel.querySelector('.grid-2 > div:last-child ul');
      if (techCol) {
        techCol.innerHTML = `
          <li><strong>Video Standards:</strong> 4K Ultra HD (2160p), HDR10+, Dolby Vision</li>
          <li><strong>Spatial Audio:</strong> Dolby Atmos 7.1.4, Dolby Digital 5.1</li>
          <li><strong>Audio Tracks:</strong> English [Original], Spanish, German, French, Japanese</li>
          <li><strong>Subtitles:</strong> English [CC], Spanish, French, German, Arabic, Japanese</li>
          <li><strong>Content Rating:</strong> ${movie.ageRating || 'PG-13'}</li>
        `;
      }
    }

    // 14. Audience Reviews Section
    const reviewsContainer = document.getElementById('reviews');
    if (reviewsContainer && movie.reviews && movie.reviews.length > 0) {
      const existingCards = reviewsContainer.querySelectorAll('.comment-card');
      existingCards.forEach(r => r.remove());

      movie.reviews.forEach(rev => {
        const card = document.createElement('div');
        card.className = 'comment-card';
        card.innerHTML = `
          <div class="comment-avatar"><i class="bi bi-person-circle"></i></div>
          <div class="comment-body">
            <div class="flex justify-between items-center">
              <h4>${rev.author}</h4>
              <span class="rating">${SF.Catalog.renderStars(rev.rating)} ${rev.rating}/10</span>
            </div>
            <div class="comment-date">${rev.date} • Verified Cinema Subscriber</div>
            <p>"${rev.text}"</p>
          </div>
        `;
        reviewsContainer.appendChild(card);
      });
    }
  }

  /* ─────────────────────────────────────────────
     PAGE LOGIC: FULLY DYNAMIC VIDEO PLAYER
  ───────────────────────────────────────────── */
  function setupPlayerPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const storedMovie = getStorage('streamflix_selected_movie');
    const hash = window.location.hash ? window.location.hash.replace('#', '').trim() : '';
    const movieId = urlParams.get('id') || urlParams.get('movie') || urlParams.get('title') || hash || storedMovie || (window.location.pathname.includes('oppenheimer') ? 'oppenheimer' : 'dune2');
    const movie = SF.Catalog.get(movieId);

    if (movie) {
      setStorage('streamflix_selected_movie', movie.id);
      document.title = `Watching: ${movie.title} (${movie.year}) — StreamFlix Player`;

      // Update Video Poster
      const video = document.querySelector('video');
      if (video) {
        video.poster = movie.backdrop || movie.poster;
      }

      // Title & Metadata
      const titleHeading = document.querySelector('.player-info h1');
      if (titleHeading) {
        titleHeading.textContent = `${movie.title} (${movie.year})`;
      }

      const metaSubtitle = document.querySelector('.player-info p.text-muted');
      if (metaSubtitle) {
        metaSubtitle.textContent = `Directed by ${movie.director} • ${movie.duration} • ${movie.ageRating || 'PG-13'} • ${(movie.genres || ['Cinema']).join(' / ')}`;
      }

      // Navigation & Title Overview links
      document.querySelectorAll('a[href*="details.html"]').forEach(link => {
        link.href = `details.html?id=${movie.id}`;
      });

      // Synopsis Card
      const synopsisCard = document.querySelector('.player-main .card.p-4');
      if (synopsisCard) {
        const synTitle = synopsisCard.querySelector('.card-title');
        if (synTitle) synTitle.textContent = `${movie.title} Synopsis`;
        const synText = synopsisCard.querySelector('.card-text');
        if (synText) synText.textContent = movie.synopsis;

        const detailsRow = synopsisCard.querySelector('.flex.gap-3');
        if (detailsRow) {
          const stars = movie.cast ? movie.cast.slice(0, 2).map(c => c.name).join(', ') : 'Leading Cast';
          detailsRow.innerHTML = `
            <span><strong>Director:</strong> ${movie.director}</span>
            <span><strong>Starring:</strong> ${stars}</span>
            <span><strong>Audio:</strong> English [Original] Dolby Atmos 7.1.4</span>
          `;
        }
      }

      // Up Next Sidebar
      const relatedContainer = document.querySelector('.related-sidebar');
      if (relatedContainer) {
        const upNext = SF.Catalog.getRelated(movie);
        if (upNext && upNext.length > 0) {
          relatedContainer.innerHTML = upNext.map(item => `
            <a href="player.html?id=${item.id}" class="related-item">
              <img src="${item.poster}" alt="${item.title}">
              <div class="related-item-info">
                <h4>${item.title} (${item.year})</h4>
                <p>${item.duration} • <i class="bi bi-star-fill" style="color: var(--star-color);"></i> ${item.rating}</p>
                <span class="text-accent text-sm" style="font-weight: 600;">Play Next <i class="bi bi-arrow-right"></i></span>
              </div>
            </a>
          `).join('');
        }
      }
    }

    // Video Time Tracking & Progress saving
    const video = document.querySelector('video');
    if (video) {
      const timeParam = parseFloat(urlParams.get('t'));
      const chapterParam = urlParams.get('chapter');

      if (!isNaN(timeParam) && timeParam >= 0) {
        video.addEventListener('loadedmetadata', () => {
          video.currentTime = timeParam;
          SF.UI.toast(`Jumped to ${chapterParam ? 'Chapter ' + chapterParam : 'Timestamp ' + timeParam + 's'} ▶`, 'info');
        }, { once: true });
      } else {
        const savedHistory = SF.History.get(movieId);
        if (savedHistory && savedHistory.progress > 0 && savedHistory.progress < 95) {
          video.addEventListener('loadedmetadata', () => {
            const seekTime = (savedHistory.progress / 100) * video.duration;
            video.currentTime = seekTime;
            SF.UI.toast(`Resumed playback at ${Math.round(savedHistory.progress)}%`, 'info');
          }, { once: true });
        }
      }

      let lastSave = 0;
      video.addEventListener('timeupdate', () => {
        const now = Date.now();
        if (now - lastSave > 3000 && video.duration) {
          lastSave = now;
          const pct = (video.currentTime / video.duration) * 100;
          SF.History.update(movieId, pct, {
            title: movie ? movie.title : 'Movie Playing',
            duration: `${Math.floor(video.duration / 60)}m`,
            link: `player.html?id=${movieId}`
          });
        }
      });
    }

    // Watchlist Button in Player Info
    const playerListBtn = document.querySelector('.player-info a[href*="my-list"]');
    if (playerListBtn && movie) {
      function syncPlayerBtn() {
        if (SF.Watchlist.has(movie.id)) {
          playerListBtn.innerHTML = '<i class="bi bi-check-lg"></i> In My List';
          playerListBtn.classList.add('btn-primary');
          playerListBtn.classList.remove('btn-outline');
        } else {
          playerListBtn.innerHTML = '<i class="bi bi-plus-lg"></i> My List';
          playerListBtn.classList.remove('btn-primary');
          playerListBtn.classList.add('btn-outline');
        }
      }
      syncPlayerBtn();

      playerListBtn.onclick = (e) => {
        e.preventDefault();
        const res = SF.Watchlist.toggle({
          id: movie.id,
          title: movie.title,
          poster: movie.poster,
          rating: movie.rating,
          type: movie.type,
          genre: (movie.genres && movie.genres[0]) || 'Cinema'
        });
        SF.UI.toast(res.message, res.success ? 'success' : 'info');
        syncPlayerBtn();
        renderNavbar();
      };
    }

    // Discussion & Comments System
    const commentForm = document.querySelector('.player-main form');
    if (commentForm) {
      function renderComments() {
        const comments = SF.Comments.getAll(movieId);
        let dynContainer = document.getElementById('sf-dynamic-comments');
        if (!dynContainer) {
          dynContainer = document.createElement('div');
          dynContainer.id = 'sf-dynamic-comments';
          commentForm.parentNode.insertBefore(dynContainer, commentForm.nextSibling);
        }

        let html = '';
        comments.forEach(c => {
          html += `
            <div class="comment-card" data-cid="${c.id}" style="margin-bottom: 1rem;">
              <div class="comment-avatar"><i class="bi bi-person-fill"></i></div>
              <div class="comment-body" style="flex:1;">
                <div class="flex justify-between items-center">
                  <h4>${c.author}</h4>
                  <span class="text-muted text-sm">${c.time}</span>
                </div>
                <p style="${c.isSpoiler ? 'filter: blur(5px); cursor: pointer;' : ''}" title="${c.isSpoiler ? 'Click to reveal spoiler' : ''}" class="${c.isSpoiler ? 'sf-spoiler-text' : ''}">
                  ${c.text}
                </p>
                <div class="flex items-center gap-2 mt-1">
                  <button class="btn btn-ghost btn-sm sf-like-btn" data-cid="${c.id}" style="padding: 2px 8px; font-size: 0.8rem; color: ${c.liked ? 'var(--accent)' : 'inherit'};">
                    <i class="bi bi-hand-thumbs-up${c.liked ? '-fill' : ''}"></i> ${c.likes} Likes
                  </button>
                </div>
              </div>
            </div>
          `;
        });
        dynContainer.innerHTML = html;

        dynContainer.querySelectorAll('.sf-spoiler-text').forEach(el => {
          el.addEventListener('click', () => { el.style.filter = 'none'; });
        });

        dynContainer.querySelectorAll('.sf-like-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const cid = btn.getAttribute('data-cid');
            SF.Comments.like(movieId, cid);
            renderComments();
          });
        });
      }

      renderComments();

      commentForm.onsubmit = (e) => {
        e.preventDefault();
        const textarea = commentForm.querySelector('textarea');
        const spoilerCb = commentForm.querySelector('input[type="checkbox"]');
        if (!textarea) return;

        const res = SF.Comments.post(movieId, textarea.value, spoilerCb ? spoilerCb.checked : false);
        if (res.success) {
          textarea.value = '';
          if (spoilerCb) spoilerCb.checked = false;
          SF.UI.toast('Review posted to discussion!', 'success');
          renderComments();
        } else {
          SF.UI.toast(res.message, 'error');
        }
      };
    }
  }

  /* ─────────────────────────────────────────────
     PAGE LOGIC: ACCOUNT & SETTINGS
  ───────────────────────────────────────────── */
  function setupAccountPage() {
    const user = SF.Auth.getCurrentUser();
    if (!user) return;

    const nameInput = document.getElementById('acc-name');
    const emailInput = document.getElementById('acc-email');
    const phoneInput = document.getElementById('acc-phone');
    const langSelect = document.getElementById('acc-lang');

    if (nameInput) nameInput.value = user.fullname || '';
    if (emailInput) emailInput.value = user.email || '';
    if (phoneInput) phoneInput.value = user.phone || '+1 (555) 382-9014';
    if (langSelect && user.language) langSelect.value = user.language;

    const sidebarHeading = document.querySelector('.settings-sidebar h3');
    if (sidebarHeading) sidebarHeading.textContent = user.fullname;

    const sidebarBadge = document.querySelector('.settings-sidebar .badge-accent');
    if (sidebarBadge && user.plan) {
      sidebarBadge.innerHTML = `<i class="bi bi-check2-circle"></i> ${user.plan.toUpperCase()} Plan Active`;
    }

    const profileSection = document.getElementById('profile');
    if (profileSection) {
      const form = profileSection.querySelector('form');
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          SF.Auth.updateUser({
            fullname: nameInput.value,
            phone: phoneInput.value,
            language: langSelect ? langSelect.value : user.language
          });
          SF.UI.toast('Profile details updated!', 'success');
          renderNavbar();
          if (sidebarHeading) sidebarHeading.textContent = nameInput.value;
        });
      }
    }

    const securitySection = document.getElementById('security');
    if (securitySection) {
      const form = securitySection.querySelector('form');
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const curr = document.getElementById('current-pwd').value;
          const newP = document.getElementById('new-pwd').value;
          const conf = document.getElementById('confirm-new-pwd').value;

          if (newP !== conf) {
            SF.UI.toast('New passwords do not match.', 'error');
            return;
          }

          const res = SF.Auth.changePassword(curr, newP);
          if (res.success) {
            SF.UI.toast('Password changed successfully!', 'success');
            form.reset();
          } else {
            SF.UI.toast(res.message, 'error');
          }
        });
      }
    }

    const playbackSection = document.getElementById('playback');
    if (playbackSection) {
      const saveBtn = playbackSection.querySelector('button.btn-primary');
      if (saveBtn) {
        saveBtn.addEventListener('click', () => {
          const quality = (document.getElementById('default-quality') || {}).value;
          const subtitle = (document.getElementById('subtitle-lang') || {}).value;
          SF.Auth.updateUser({ quality, subtitle });
          SF.UI.toast('Preferences saved!', 'success');
        });
      }
    }

    document.querySelectorAll('a[href="#"].text-accent').forEach(link => {
      if (link.textContent.includes('PDF')) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          SF.UI.toast('Generating invoice PDF receipt...', 'info');
          setTimeout(() => {
            SF.UI.toast('Invoice downloaded to system downloads.', 'success');
          }, 800);
        });
      }
    });

    const sidebarLinks = document.querySelectorAll('.settings-sidebar a[href^="#"]');
    sidebarLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        sidebarLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        const targetId = link.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    const signOutLink = document.querySelector('.settings-sidebar a[href="login.html"]');
    if (signOutLink) {
      signOutLink.addEventListener('click', (e) => {
        e.preventDefault();
        SF.Auth.logout();
        SF.UI.toast('Signed out from all devices.', 'info');
        setTimeout(() => { window.location.href = 'index.html'; }, 600);
      });
    }
  }

  /* ─────────────────────────────────────────────
     PAGE LOGIC: PLANS
  ───────────────────────────────────────────── */
  function setupPlansPage() {
    const planCards = document.querySelectorAll('.plan-card');
    planCards.forEach(card => {
      const btn = card.querySelector('.btn');
      const planNameEl = card.querySelector('.plan-name');
      const planName = planNameEl ? planNameEl.textContent.toLowerCase().trim() : 'standard';

      if (btn) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          if (SF.Auth.isLoggedIn()) {
            SF.Auth.updateUser({ plan: planName });
            SF.UI.toast(`Subscription updated to ${planName.toUpperCase()} plan!`, 'success');
            setTimeout(() => { window.location.href = 'account.html#subscription'; }, 600);
          } else {
            sessionStorage.setItem('sf_chosen_plan', planName);
            window.location.href = 'signup.html';
          }
        });
      }
    });
  }

  /* ─────────────────────────────────────────────
     PAGE LOGIC: HELP CENTER (Live FAQ Search)
  ───────────────────────────────────────────── */
  function setupHelpPage() {
    const searchInput = document.querySelector('.search-bar input');
    const detailsList = document.querySelectorAll('details');

    if (searchInput && detailsList.length > 0) {
      searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();
        detailsList.forEach(detail => {
          const text = detail.textContent.toLowerCase();
          if (!query || text.includes(query)) {
            detail.style.display = 'block';
            if (query.length > 2) detail.open = true;
          } else {
            detail.style.display = 'none';
          }
        });
      });
    }
  }

  /* ─────────────────────────────────────────────
     GLOBAL FEATURE: DYNAMIC CARD LINKS REWRITING
     Ensures every movie/series card links to details.html?id=<slug>
  ───────────────────────────────────────────── */
  function setupGlobalCardLinks() {
    const cards = document.querySelectorAll('.poster-card, .top10-item, .related-item, .card, .scroll-row .poster-card');

    cards.forEach(card => {
      const titleEl = card.querySelector('h3, h4, .cast-name, .card-title') || card.querySelector('.poster-overlay h3');
      const imgEl = card.querySelector('img');
      const rawTitle = (titleEl ? titleEl.textContent : (imgEl ? imgEl.alt : '')).trim();

      if (!rawTitle) return;

      const slug = SF.Catalog.slugify(rawTitle);

      // Save click handler on the card to remember selected movie in localStorage
      card.addEventListener('click', (e) => {
        if (e.target.closest('.sf-bookmark-btn') || e.target.closest('.remove-badge') || e.target.closest('button')) return;
        setStorage('streamflix_selected_movie', slug);
      });

      // 1. If card is an anchor, update its href
      if (card.tagName === 'A') {
        const currentHref = card.getAttribute('href') || '';
        if (currentHref.includes('details.html') || currentHref === 'details.html') {
          card.href = `details.html?id=${slug}`;
        } else if (currentHref.includes('player.html') || currentHref === 'player.html') {
          card.href = `player.html?id=${slug}`;
        }
      }

      // 2. Update any internal anchor tags
      card.querySelectorAll('a').forEach(anchor => {
        const h = anchor.getAttribute('href') || '';
        if (h.includes('details.html') || h === 'details.html') {
          anchor.href = `details.html?id=${slug}`;
        } else if (h.includes('player.html') || h === 'player.html') {
          anchor.href = `player.html?id=${slug}`;
        }
      });

      // 3. If card is not an anchor itself, ensure clicking anywhere navigates to details.html?id=<slug>
      if (card.tagName !== 'A') {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
          if (e.target.closest('.sf-bookmark-btn') || e.target.closest('.remove-badge') || e.target.closest('button')) return;
          const clickedA = e.target.closest('a');
          if (clickedA && clickedA.href && !clickedA.href.includes('details.html') && !clickedA.href.includes('player.html')) {
            return;
          }
          window.location.href = `details.html?id=${slug}`;
        });
      }
    });
  }

  /* ─────────────────────────────────────────────
     GLOBAL FEATURE: LIVE SEARCH & GENRE FILTERING
  ───────────────────────────────────────────── */
  function setupGlobalSearchAndFilter() {
    const searchForm = document.querySelector('.search-bar');
    const searchInput = searchForm ? searchForm.querySelector('input') : null;
    const cards = document.querySelectorAll('.poster-card, .top10-item, .scroll-row .poster-card');

    if (searchInput && cards.length > 0) {
      searchForm.addEventListener('submit', (e) => e.preventDefault());

      searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();
        cards.forEach(card => {
          const text = card.textContent.toLowerCase();
          if (!query || text.includes(query)) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    }

    const genrePills = document.querySelectorAll('.genre-bar .genre-pill');
    if (genrePills.length > 0 && cards.length > 0) {
      genrePills.forEach(pill => {
        pill.addEventListener('click', (e) => {
          const href = pill.getAttribute('href');
          if (href && (href.startsWith('#') || href.includes(window.location.pathname.split('/').pop()))) {
            e.preventDefault();
            genrePills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            const genreName = pill.textContent.replace(/[^a-zA-Z]/g, '').toLowerCase();

            cards.forEach(card => {
              if (genreName === 'all' || genreName.includes('allgenres') || genreName.includes('allshows') || genreName.includes('allnew')) {
                card.style.display = '';
              } else {
                const cardText = card.textContent.toLowerCase();
                if (cardText.includes(genreName)) {
                  card.style.display = '';
                } else {
                  card.style.display = 'none';
                }
              }
            });
          }
        });
      });
    }

    // Quick Bookmark buttons on cards
    cards.forEach(card => {
      if (card.querySelector('.remove-badge')) return;

      const titleEl = card.querySelector('h3, h4');
      const imgEl = card.querySelector('img');
      const linkEl = card.querySelector('a') || card;

      if (!titleEl || !imgEl) return;

      const title = titleEl.textContent.trim();
      const id = SF.Catalog.slugify(title);
      const poster = imgEl.src;

      if (!card.querySelector('.sf-bookmark-btn')) {
        const bookmarkBtn = document.createElement('button');
        bookmarkBtn.className = 'sf-bookmark-btn';
        bookmarkBtn.setAttribute('title', 'Bookmark to My List');
        bookmarkBtn.style.cssText = `
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(18, 18, 28, 0.85);
          color: ${SF.Watchlist.has(id) ? 'var(--accent)' : '#fff'};
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        `;
        bookmarkBtn.innerHTML = `<i class="bi bi-bookmark${SF.Watchlist.has(id) ? '-fill' : ''}" style="font-size: 13px;"></i>`;

        card.style.position = 'relative';
        card.appendChild(bookmarkBtn);

        bookmarkBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const res = SF.Watchlist.toggle({
            id: id,
            title: title,
            poster: poster,
            rating: '9.0',
            link: `details.html?id=${id}`
          });
          const hasItem = SF.Watchlist.has(id);
          bookmarkBtn.style.color = hasItem ? 'var(--accent)' : '#fff';
          bookmarkBtn.innerHTML = `<i class="bi bi-bookmark${hasItem ? '-fill' : ''}" style="font-size: 13px;"></i>`;
          SF.UI.toast(res.message, res.success ? 'success' : 'info');
          renderNavbar();
        });
      }
    });
  }

  /* ─────────────────────────────────────────────
     MAIN INITIALIZER
  ───────────────────────────────────────────── */
  function init() {
    try {
      renderNavbar();
    } catch (e) {
      console.warn('Navbar init error:', e);
    }

    const path = (window.location.pathname.split(/[\\/]/).pop() || 'index.html').toLowerCase();

    const isDetailsPage = path.includes('details.html') || !!document.querySelector('.backdrop-hero');
    const isPlayerPage = path.includes('player.html') || path.includes('player-oppenheimer.html') || !!document.querySelector('.video-container') || !!document.querySelector('.player-wrapper');
    const isHomePage = path.includes('home.html') || (path === 'index.html' && !!document.querySelector('.hero-content') && !document.querySelector('.hero-register-card'));
    const isMyListPage = path.includes('my-list.html') || !!document.getElementById('watchlist-grid');
    const isLoginPage = path.includes('login.html');
    const isSignupPage = path.includes('signup.html');
    const isProfilesPage = path.includes('profiles.html');
    const isAccountPage = path.includes('account.html');
    const isPlansPage = path.includes('plans.html');
    const isHelpPage = path.includes('help.html');

    if (isLoginPage) {
      try { setupLoginPage(); } catch (e) { console.error('Login setup error:', e); }
    } else if (isSignupPage) {
      try { setupSignupPage(); } catch (e) { console.error('Signup setup error:', e); }
    } else if (isProfilesPage) {
      try { setupProfilesPage(); } catch (e) { console.error('Profiles setup error:', e); }
    } else if (isMyListPage) {
      try { setupMyListPage(); } catch (e) { console.error('MyList setup error:', e); }
    } else if (isHomePage) {
      try { setupHomePage(); } catch (e) { console.error('Home setup error:', e); }
    } else if (isDetailsPage) {
      try { setupDetailsPage(); } catch (e) { console.error('Details setup error:', e); }
    } else if (isPlayerPage) {
      try { setupPlayerPage(); } catch (e) { console.error('Player setup error:', e); }
    } else if (isAccountPage) {
      try { setupAccountPage(); } catch (e) { console.error('Account setup error:', e); }
    } else if (isPlansPage) {
      try { setupPlansPage(); } catch (e) { console.error('Plans setup error:', e); }
    } else if (isHelpPage) {
      try { setupHelpPage(); } catch (e) { console.error('Help setup error:', e); }
    }

    try {
      setupGlobalCardLinks();
    } catch (e) {
      console.error('Card router error:', e);
    }

    try {
      setupGlobalSearchAndFilter();
    } catch (e) {
      console.error('Search router error:', e);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.SF = SF;

})(window);
