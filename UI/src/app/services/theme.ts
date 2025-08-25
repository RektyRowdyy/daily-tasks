import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'daily-tasks-theme';
  
  private theme = signal<Theme>('system');
  private systemPreference = signal<'light' | 'dark'>('light');
  
  readonly currentTheme = this.theme.asReadonly();
  readonly isDarkMode = signal(false);

  constructor() {
    this.initializeTheme();
    this.setupSystemPreferenceListener();
    this.setupThemeEffect();
  }

  private initializeTheme(): void {
    // Load theme from localStorage or default to system
    const savedTheme = localStorage.getItem(this.STORAGE_KEY) as Theme;
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      this.theme.set(savedTheme);
    }

    // Detect system preference
    this.detectSystemPreference();
  }

  private detectSystemPreference(): void {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.systemPreference.set(prefersDark ? 'dark' : 'light');
  }

  private setupSystemPreferenceListener(): void {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      this.systemPreference.set(e.matches ? 'dark' : 'light');
    });
  }

  private setupThemeEffect(): void {
    effect(() => {
      const theme = this.theme();
      const systemPref = this.systemPreference();
      
      let actualTheme: 'light' | 'dark';
      
      if (theme === 'system') {
        actualTheme = systemPref;
      } else {
        actualTheme = theme;
      }

      this.isDarkMode.set(actualTheme === 'dark');
      this.applyTheme(actualTheme);
      
      // Save theme preference (but not system preference)
      localStorage.setItem(this.STORAGE_KEY, theme);
    });
  }

  private applyTheme(theme: 'light' | 'dark'): void {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
    } else {
      root.classList.add('light-theme');
      root.classList.remove('dark-theme');
    }
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
  }

  toggleTheme(): void {
    const current = this.theme();
    if (current === 'light') {
      this.setTheme('dark');
    } else if (current === 'dark') {
      this.setTheme('system');
    } else {
      this.setTheme('light');
    }
  }

  getEffectiveTheme(): 'light' | 'dark' {
    const theme = this.theme();
    if (theme === 'system') {
      return this.systemPreference();
    }
    return theme;
  }
}
