import { Injectable, signal } from '@angular/core';
import { GUEST_USERS } from '../utils/constant';
import { User } from '@veltdev/types';

/**
 * AuthService handles user authentication and management for the application.
 * It uses Angular's dependency injection system and signal for state management.
 */
@Injectable({
	providedIn: 'root'
})
export class AuthService {
	/**
	 * Signal to store and manage the current user state.
	 */
	public userSignal = signal<User | null>(null);

	constructor() {
		// Load user from localStorage on service initialization
		this.loadUserFromStorage();
	}

	/**
	 * Loads the user data from localStorage if available.
	 */
	private loadUserFromStorage(): void {
		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			this.userSignal.set(JSON.parse(storedUser));
			console.log(JSON.parse(storedUser));
		}
	}

	/**
	 * Generates a random user from the GUEST_USERS array.
	 * @returns {User} A randomly generated user object.
	 */
	private generateRandomUser(): User {
		const randomIndex = Math.floor(Math.random() * GUEST_USERS.length);
		const randomUser = GUEST_USERS[randomIndex];
		return {
			userId: `user${randomIndex}`,
			name: randomUser.name,
			email: `${randomUser.name.toLowerCase().replace(' ', '.')}@velt.dev`,
			photoUrl: randomUser.photoUrl,
			textColor: "#fff",
			organizationId: "velt-sample-app",
		};
	}

	/**
	 * Logs in a user. If no user exists, generates a random user.
	 * Stores the user in localStorage and updates the userSignal.
	 */
	login(): void {
		let user = this.userSignal();
		if (!user) {
			user = this.generateRandomUser();
			localStorage.setItem('user', JSON.stringify(user));
		}
		this.userSignal.set(user);
	}

	/**
	 * Returns a readonly version of the userSignal.
	 * @returns {Signal<User | null>} A readonly signal of the current user.
	 */
	getUser() {
		return this.userSignal.asReadonly();
	}
}