import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.ed4f2e9bbbc146d4abc0d3bbad32737c',
  appName: 'Et-Taqwa Moschee',
  webDir: 'dist',
  server: {
    // Die native App lädt die /app Route direkt (ohne Navbar/Footer)
    url: 'https://ed4f2e9b-bbc1-46d4-abc0-d3bbad32737c.lovableproject.com/app?forceHideBadge=true',
    cleartext: true
  }
};

export default config;
