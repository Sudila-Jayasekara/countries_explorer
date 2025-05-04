# REST Countries Explorer

A modern React application that leverages the REST Countries API to provide a beautiful and interactive way to explore countries around the world.

## Features

- **Country Exploration**: Browse through countries with a visually appealing grid layout
- **Search Functionality**: Easily search for countries by name
- **Filtering System**: Filter countries by region
- **Detailed Information**: View comprehensive details about each country
- **User Authentication**: Create an account and manage your favorite countries
- **Responsive Design**: Works seamlessly across all devices
- **Dark/Light Theme**: Toggle between light and dark modes for comfortable viewing
- **Smooth Animations**: Enjoy polished transitions and interactive elements

## Technology Stack

- **Frontend**: React (with functional components)
- **State Management**: React Context API
- **Routing**: React Router
- **Styling**: Tailwind CSS
- **HTTP Requests**: Axios
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Image Optimization**: React Lazy Load Image Component

## API Integration

The application integrates with the [REST Countries API](https://restcountries.com/) using the following endpoints:

- GET /all – to get a list of all countries
- GET /name/{name} – to search a country by its name
- GET /region/{region} – to get countries from a specific region
- GET /alpha/{code} – to get full details using a country code

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/sudilajayasekara/rest-countries-explorer.git
cd rest-countries-explorer
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

To build the application for production, run:

```bash
npm run build
```

The build files will be located in the `dist` directory.

## Project Structure

```
src/
├── components/       # Reusable UI components
├── context/          # React Context for state management
├── pages/            # Page components
├── utils/            # Utility functions and API calls
├── App.jsx           # Main App component
└── main.jsx          # Entry point
```

## User Authentication

The application includes a simulated authentication system that allows users to:

- Register a new account
- Sign in to an existing account
- Add countries to favorites
- View and manage favorite countries

Note: This is a frontend-only implementation that uses localStorage for persistence.

## Testing

To run tests:

```bash
npm run test
```

## Deployment

The application can be deployed to any static hosting service such as Vercel, Netlify, or GitHub Pages.

## Challenges and Solutions

- **API Rate Limiting**: Implemented request caching and debounced search to reduce API calls
- **Performance**: Used React's lazy loading and code splitting to improve initial load time
- **Mobile Responsiveness**: Designed with a mobile-first approach using Tailwind's responsive utilities
- **User Experience**: Added loading states and smooth animations to enhance the user experience

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [REST Countries API](https://restcountries.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Framer Motion](https://www.framer.com/motion/)