import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import RouterSetup from './components/routing';



// Ensure the container is correct and present in your index.html file
const container = document.getElementById('root');

// Create a root.
const root = createRoot(container); 

// Initial render: Render an element to the root.
root.render(
    <React.StrictMode>
      <RouterSetup />
    </React.StrictMode>
);
