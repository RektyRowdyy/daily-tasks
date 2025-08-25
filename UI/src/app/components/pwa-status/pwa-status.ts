import { Component, inject } from '@angular/core';
import { PwaService } from '../../services/pwa';

@Component({
  selector: 'app-pwa-status',
  imports: [],
  templateUrl: './pwa-status.html',
  styleUrl: './pwa-status.css'
})
export class PwaStatus {
  private pwaService = inject(PwaService);

  readonly isOnline = this.pwaService.isOnline;
  readonly updateAvailable = this.pwaService.updateAvailable;
  readonly isInstallable = this.pwaService.isInstallable;

  async installApp(): Promise<void> {
    await this.pwaService.installApp();
  }

  async updateApp(): Promise<void> {
    await this.pwaService.updateApp();
  }
}
