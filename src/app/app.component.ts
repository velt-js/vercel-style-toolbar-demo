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
		private veltService: VeltService, private authService: AuthService
	) { }

	async ngOnInit(): Promise<void> {
		// Follow the Setup Guide for more info: https://docs.velt.dev/get-started/setup/install
		
		await this.veltService.initializeVelt('AN5s6iaYIuLLXul0X4zf');

		const user = this.authService.getUser()(); // Getting Random User
		if (user) {
			await this.veltService.identifyUser(user);
		}

		await this.veltService.setDocument('toolbar', { documentName: 'toolbar' });
		this.veltService.setDarkMode(true);

	}

	toggleDarkMode() {
		this.isDarkMode = !this.isDarkMode;
		this.updateColorScheme();
	}

	private updateColorScheme() {
		document.body.style.colorScheme = this.isDarkMode ? 'dark' : 'light';
		this.veltService.setDarkMode(this.isDarkMode);
	}
}
