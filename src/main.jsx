import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Create an audio element and set it to play background music
const audio = new Audio('./public/sounds/background-music.mp3'); // Replace with your music file path
audio.loop = true;
audio.volume = 0.007;

// Add event listener to start playing when user interacts with the page
document.addEventListener('click', () => {
  audio.play().catch(error => {
    console.log("Audio playback failed:", error);
  });
}, { once: true });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
