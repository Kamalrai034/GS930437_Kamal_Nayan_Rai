This is a Progressive Web Application (PWA) built using Vite with the following tech stack:

React (using Vite)
Redux (for state management)
AG-Grid Community (for data grid functionality)
Material-UI (MUI) (for UI components)
TypeScript
Service Workers (for offline support)
Recharts (for data visualization)

-- FOLDER STRUCTURE --
src/
├── assets/                   # Static files (SVGs, images, etc.)
├── components/               # Reusable React components (e.g., Navbar, Sidebar)
├── context/                  # React context for themes and other global state
├── features/                 # Redux features (e.g., stores, skus, planning)
├── hooks/                    # Custom hooks
├── pages/                    # Pages (e.g., Stores, SKUs, Planning, Chart)
├── routes/                   # Protected Routes and Route Handling
├── store/                    # Redux store configuration
├── styles/                   # Global styles
├── types/                    # TypeScript types
├── utils/                    # Utility functions (e.g., Excel import, date formatting)
└── service-worker.js         # Service Worker for offline caching

-- SETUP --

git clone https://github.com/your-repo-name.git
cd your-repo-name
npm install
npm run dev
-- USAGE GUIDE --
1. Authentication 
Navigate to /login
If no account → Register first.
Login stores userId in cookies.

2. Stores Page
View, edit, delete, and reorder rows.
Import data from Excel.

3. SKUs Page
Similar to Stores Page.
Import SKUs from Excel.

4. Planning Page
Edit sales units directly in AG-Grid.
Computed fields auto-update.
Drag-and-drop row reordering.

5. Charts Page
Select store -->> View GM Dollars and GM % as dual-axis chart.
