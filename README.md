# Blackrock POI Guide – Full Stack Web Application

## Project Overview

Blackrock POI Guide is a full-stack web application developed using SvelteKit, Node.js, Express, and MongoDB.  
The application allows authenticated users to manage categories and placemarks, upload images, visualize locations on interactive maps, and analyze data using charts and dashboards.

The project demonstrates the following:

- Full-stack architecture
- JWT authentication
- REST API communication
- Interactive maps
- Analytics dashboards
- Cloud-ready deployment architecture
- Modular frontend/backend structure

# Features

1.  Authentication : User Signup, User Login, JWT Token Authentication, Protected Routes, Persistent Sessions using Local Storage, Logout functionality
2. Dashboard : Create Categories (Playlists), Create Placemarks, Edit/Delete Placemarks, Display category statistics, Responsive UI using Bulma CSS
3. Maps : Interactive Leaflet Maps, Placemark Markers, Coordinates & Popups, Dynamic map updates
4. Analytics: Charts and dashboards, Placemark statistics, Category analytics, Dynamic data visualization
5. Images: Upload images for placemarks, Display uploaded images, Cloud deployment ready image handling

# Technologies Used

## Frontend
- SvelteKit, TypeScript, Axios, Bulma CSS, Leaflet, Chart Libraries
## Backend
- Node.js, Express.js, Mongoose, JWT Authentication
## Database
- MongoDB Atlas
## Deployment
- Netlify (Frontend), Render (Backend), MongoDB Atlas (Database)


# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.


# References
## Authentication (JWT, Login, Signup)
- Creating eCharts reference GitHub: https://github.com/apache/echarts/tree/master/src and https://github.com/bherbruck/svelte-echarts/blob/main/src/lib/svelte-echarts/components/Chart.svelte
- Used as reference for JWT authentication flow and token handling - https://www.youtube.com/watch?v=mbsmsi7l3r4
- Referenced for backend authentication middleware structure - https://www.bezkoder.com/node-js-jwt-authentication-mysql
- Used for understanding protected routes and session handling in SvelteKit : https://joyofcode.xyz/sveltekit-authentication-using-cookies
- Used for JWT token generation and verification : https://www.npmjs.com/package/jsonwebtoken
- Used for password hashing implementation : https://www.npmjs.com/package/bcryptjs
## Maps / Leaflet
- Base implementation for interactive map rendering: https://leafletjs.com/examples/quick-start/?utm_source=chatgpt.com
- Used for placemark marker implementation : https://leafletjs.com/examples/custom-icons/
- Used for map tile integration: https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames
- Referenced for integrating Leaflet inside Svelte components: https://github.com/ngyewch/svelte-leafletjs
- Used for placemark popup implementation : https://leafletjs.com/reference.html
## Analytics / Charts
- Used for chart rendering and datasets: https://www.chartjs.org/docs/latest/
- Referenced for analytics dashboard implementation : https://www.chartjs.org/docs/latest/samples/information.html
- Used as inspiration for interactive analytics visualization - https://echarts.apache.org/examples/en/index.html
- Referenced for chart integration in SvelteKit: https://github.com/SauravKanchan/svelte-chartjs
- Used as reference for REST API architecture: https://restfulapi.net/
- Used for frontend-backend API communication: https://axios-http.com/docs/intro
- Referenced for backend route organization: https://expressjs.com/en/guide/routing.html
- Used for MongoDB CRUD implementation: https://mongoosejs.com/docs/models.html
## Images / Upload
- Used for image upload handling: https://www.npmjs.com/package/multer
- Referenced for cloud-ready image storage concepts : https://cloudinary.com/documentation/node_image_and_video_upload
- Used for frontend file upload forms : https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
## SvelteKit / Frontend Structure
- Used throughout frontend implementation : https://kit.svelte.dev/docs
- Referenced for global state/runes management: https://svelte.dev/docs/svelte-store
- Used for responsive UI design and layouts: https://bulma.io/documentation
- Used for component structure and reactive programming: https://svelte.dev/tutorial/basics
## Deployment
- Used for frontend deployment: https://docs.netlify.com/frameworks/sveltekit/overview
- Used for backend deployment: https://render.com/docs/deploy-node-express-app
- Used for cloud database deployment: https://www.mongodb.com/docs/atlas/getting-started/




