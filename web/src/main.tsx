import React from 'react';
import ReactDOM from 'react-dom/client';
import { VisibilityProvider } from './providers/VisibilityProvider';
import { ThemeProvider} from "@/providers/theme-provider";
import App from './components/App';
import './index.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <VisibilityProvider>
        <ThemeProvider defaultTheme="dark">
            <App />
        </ThemeProvider>
    </VisibilityProvider>
  </React.StrictMode>
);
