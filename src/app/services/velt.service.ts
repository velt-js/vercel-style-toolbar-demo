import { Injectable, signal } from '@angular/core';
import { initVelt } from '@veltdev/client';
import { AuthService } from './auth.service';
import { User, Velt } from '@veltdev/types'

/**
 * Service for managing Velt integration in an Angular application.
 * Handles initialization, user identification, and various Velt-related operations.
 */
@Injectable({
	providedIn: 'root'
})
export class VeltService {

	private client = signal<Velt | null>(null);

	constructor(
		private authService: AuthService
	) { }

	/**
	 * Initializes the Velt client with the provided API key.
	 * @param apiKey The Velt API key
	 */
	async initializeVelt(apiKey: string): Promise<void> {
		const client = await initVelt(apiKey)
		this.client.set(client)
		this.authService.login();
	}

	/**
	 * Identifies a user with the Velt client.
	 * @param user The user object to identify
	 */
	async identifyUser(user: User): Promise<void> {
		if (this.client()) {
			await this.client()?.identify(user);
		}
	}

	/**
	 * Sets the current document for Velt collaboration.
	 * @param documentId The ID of the document
	 * @param metadata Optional metadata for the document
	 */
	async setDocument(documentId: string, metadata?: any): Promise<void> {
		if (this.client()) {
			await this.client()?.setDocument(documentId, metadata);
		}
	}

	/**
	 * Sets the dark mode for the Velt client.
	 * @param isDarkMode Boolean indicating whether dark mode should be enabled
	 */
	setDarkMode(isDarkMode: boolean): void {
		if (this.client()) {
			this.client()?.setDarkMode(isDarkMode);
		}
	}

	/**
	 * Gets the Velt client instance.
	 * @returns The Velt client instance
	 */
	get clientSignal() {
		return this.client.asReadonly();
	}

}
