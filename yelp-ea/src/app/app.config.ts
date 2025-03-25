import { ApplicationConfig } from '@angular/core';
import { Routes, provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

// Import your routes
import { routes } from './app.routes';

// Define your application configuration
export const appConfig: ApplicationConfig = {
  providers: [
    // Provide your routes
    provideRouter(routes),
    // Provide client-side hydration
    provideClientHydration(),
    // Provide HttpClient
    provideHttpClient()
  ]
};
