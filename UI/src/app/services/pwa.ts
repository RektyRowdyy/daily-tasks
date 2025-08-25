import { Injectable, signal, inject } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  private swUpdate = inject(SwUpdate);
  
  readonly isOnline = signal(navigator.onLine);
  readonly updateAvailable = signal(false);
  readonly isInstallable = signal(false);
  
  private deferredPrompt: any = null;

  constructor() {
    this.setupOnlineDetection();
    this.setupUpdateDetection();
    this.setupInstallPrompt();
  }

  private setupOnlineDetection(): void {
    window.addEventListener('online', () => {
      this.isOnline.set(true);
    });
    
    window.addEventListener('offline', () => {
      this.isOnline.set(false);
    });
  }

  private setupUpdateDetection(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates
        .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
        .subscribe(() => {
          this.updateAvailable.set(true);
        });

      // Check for updates every 30 minutes
      setInterval(() => {
        this.swUpdate.checkForUpdate();
      }, 30 * 60 * 1000);
    }
  }

  private setupInstallPrompt(): void {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.isInstallable.set(true);
    });

    window.addEventListener('appinstalled', () => {
      this.isInstallable.set(false);
      this.deferredPrompt = null;
    });
  }

  async installApp(): Promise<boolean> {
    if (!this.deferredPrompt) {
      return false;
    }

    const result = await this.deferredPrompt.prompt();
    this.deferredPrompt = null;
    this.isInstallable.set(false);
    
    return result.outcome === 'accepted';
  }

  async updateApp(): Promise<void> {
    if (this.swUpdate.isEnabled && this.updateAvailable()) {
      await this.swUpdate.activateUpdate();
      window.location.reload();
    }
  }

  checkForUpdate(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.checkForUpdate();
    }
  }
}
