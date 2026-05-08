# SP2-helene-syre

**Desktop:** ![Homepage Desktop](/src/assets/images/nudge-desktop.jpg)

A modern, responsive auction web application built for students at Noroff. This platform allows users with a @stud.noroff.no email to create listings, bid using virtual credits, and manage their profiles, while visitors can browse and explore available auctions.

Project Link: [https://helenesyre.github.io/SP2-helene-syre/#/](https://helenesyre.github.io/SP2-helene-syre/#/)

---

## Description

A student-only auction platform where registered users can create listings, manage their profiles, and place bids using virtual credits. Visitors can browse and search listings, while full participation requires an account with a @stud.noroff.no email address.

## User stories

### All users

- Browse listings without logging in.
- Search through available listings.
- Filter listings by keywords, categories, or other relevant attributes.
- View a single listing, including its details and bid history.

### Registered users

#### Account access

- Register with an email ending in @stud.noroff.no
- Log in securely
- Log out
- Access authenticated features

#### Profile management

- Edit and update profile bio
- Edit and update a custom avatar
- Edit and update a custom banner
- View profile page showing:
  - Listings they created
  - Listings they have bid on

#### Credits

- View total credits (available funds for bidding)
- See credit balance on every page while logged in

#### Listings

- Create a listing with:
  - Title
  - Deadline date
  - Media gallery (images)
  - Description
- Update listings they created
- Delete listings they created

#### Bidding

- Place bids on another user’s listing
- View bid history on each listing

### Unregistered Users (Visitors)

- Browse available listings
- Search through listings
- View a single listing

#### Restrictions

- Cannot register unless they have an email ending in @stud.noroff.no
- Cannot log in
- Cannot create listings
- Cannot place bids
- Cannot view or manage a personal profile or credits

---

## Project Structure

Here’s an overview of the folders and files in this project:

```
├── docs/
│   ├── AI_LOG.md
│   └── SOURCES.md
├── node_modules/
├── public/
├── index.html
├── src/
│   ├── favicon/
│   ├── images/
│   │   ├── assets/
│   │   │   ├── images
│   │   │   ├── js
│   │   │   │   ├── components
│   │   │   │   ├── router
│   │   │   │   └── utils
│   │   │   └── logo
│   │   └── pages/
│   │       ├── comingSoon.js
│   │       ├── home.js
│   │       ├── listing.js
│   │       ├── login.js
│   │       ├── pageNotFound.js
│   │       ├── profile.js
│   │       └── register.js
│   ├── main.js
│   └── style.css
├── .env.example
├── .gitignore
├── .nojekyll
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

## Tech Stack

- **Language:** Vanilla JavaScript
- **CSS Framework:** Tailwind CSS
- **API:** Noroff API v2 — Auction House
- **Hosting:** GitHub Pages
- **Planning:** GitHub Projects
- **Design:** Figma

## Built With

Main tools and technologies used in this project:

![Static Badge](https://img.shields.io/badge/HTML-red)

![Static Badge](https://img.shields.io/badge/CSS-yellow)

![Static Badge](https://img.shields.io/badge/JavaScript-blue)

![Static Badge](https://img.shields.io/badge/TailwindCSS-38B2AC)

---

## Installation

Follow these steps to get a copy of the project running locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/helenesyre/SP2-helene-syre.git
   ```

2. Open the repository:

   ```bash
    cd SP2-helene-syre
   ```

3. Run Local Server

   Install dependencies and start the development server:

   ```bash
   npm install
   npm run dev
   ```

## Available Scripts

In the project directory, you can run:

- `npm run dev` – Starts the development server and watches for changes in your files.
- `npm run build` – Builds the project for production by compiling and minifying the CSS using TailwindCSS.

---

## Contact

Helene Syre - [@syre_design](https://www.instagram.com/syre_design/) - syrehelene@gmail.com - [Linkedin](https://www.linkedin.com/in/helene-syre/) - [Portfolio](https://helenesyre.github.io/portfolio/#/)
