import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VeltService } from './services/velt.service';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, CommonModule],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
	title = 'toolbar';

	isDarkMode: boolean = true;
	client: any;

	constructor(
		private veltService: VeltService, 
		private authService: AuthService
	) { }

	/**
	 * Initializes the Velt service and set up the collaboration environment.
	 */
	async ngOnInit(): Promise<void> {
		
		// Initialize Velt with the API key
		await this.veltService.initializeVelt('AN5s6iaYIuLLXul0X4zf');

		// Identify the current user if authenticated
		const user = this.authService.userSignal();
		if (user) {
			await this.veltService.identifyUser(user);
		}

		// Contain your comments in a document by setting a Document ID & Name
		this.veltService.setDocument('toolbar', { documentName: 'toolbar' });

		// Enable dark mode for Velt UI
		this.veltService.setDarkMode(true);

	}

	// Change theme when user clicks on theme button
	toggleDarkMode() {
		this.isDarkMode = !this.isDarkMode;
		this.updateColorScheme();
	}

	// Update HTML & Velt Color theme 
	private updateColorScheme() {
		document.body.style.colorScheme = this.isDarkMode ? 'dark' : 'light';
		this.veltService.setDarkMode(this.isDarkMode);
	}
}
