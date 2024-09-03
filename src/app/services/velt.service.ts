import { Injectable } from '@angular/core';
import { initVelt } from '@veltdev/client';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})

export class VeltService {
	private client: any;

	constructor(
		private authService: AuthService
	) { }

	async initializeVelt(apiKey: string): Promise<void> {
		this.client = await initVelt(apiKey, { organizationId: 'velt-sample-app' });
		this.authService.login();
	}

	async identifyUser(user: any): Promise<void> {
		if (this.client) {
			await this.client.identify(user);
		}
	}

	async setDocument(documentId: string, metadata?: any): Promise<void> {
		if (this.client) {
			await this.client.setDocument(documentId, metadata);
		}
	}

	setDarkMode(isDarkMode: boolean): void {
		if (this.client) {
			this.client.setDarkMode(isDarkMode);
		}
	}

	getClient() {
		return this.client;
	}
}
