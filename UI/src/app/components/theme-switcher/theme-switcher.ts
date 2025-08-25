import { Component, inject } from '@angular/core';
import { ThemeService, Theme } from '../../services/theme';

@Component({
  selector: 'app-theme-switcher',
  imports: [],
  templateUrl: './theme-switcher.html',
  styleUrl: './theme-switcher.css'
})
export class ThemeSwitcher {
  private themeService = inject(ThemeService);
  
  readonly currentTheme = this.themeService.currentTheme;
  readonly isDarkMode = this.themeService.isDarkMode;

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  setTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
  }

  getThemeIcon(): string {
    const theme = this.currentTheme();
    switch (theme) {
      case 'light':
        return '☀️';
      case 'dark':
        return '🌙';
      case 'system':
        return '💻';
      default:
        return '💻';
    }
  }

  getThemeLabel(): string {
    const theme = this.currentTheme();
    switch (theme) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'system':
        return 'System';
      default:
        return 'System';
    }
  }
}
