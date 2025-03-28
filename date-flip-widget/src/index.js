import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// Desktop-specific styles
const desktopStyles = {
  body: {
    backgroundColor: 'transparent',
    margin: 0,
    padding: 0,
    overflow: 'hidden'
  },
  app: {
    width: '350px',
    height: '600px',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  }
};

// Apply desktop-specific styling
Object.assign(document.body.style, desktopStyles.body);

function DesktopApp() {
  return (
    <div style={desktopStyles.app}>
      <App />
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DesktopApp />
  </React.StrictMode>
);

// Optional: Add drag functionality
function enableDrag() {
  const { remote } = window.require('electron');
  const currentWindow = remote.getCurrentWindow();
  
  document.addEventListener('mousedown', (e) => {
    if (e.buttons === 1) { // Left mouse button
      currentWindow.dragMove();
    }
  });
}

// Call drag functionality if in Electron environment
if (window.require) {
  enableDrag();
}