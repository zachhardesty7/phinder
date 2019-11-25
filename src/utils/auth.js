import firebase from 'firebase/app'
import * as Facebook from 'expo-facebook'

import { db } from './firebase'
import { secret } from './secret'
import { ObjectFromEntries } from './shims'

const configFacebook = Object.freeze({
	appId: secret.FACEBOOK_APP_ID || '',
	appSecret: secret.FACEBOOK_APP_SECRET || '',
})

/**
 * Login with Facebook and Firebase
 *
 * Uses Expo Facebook API and authenticates the Facebook user in Firebase
 *
 * @returns {firebase.UserInfo} data of profile attributes
 */
export async function loginWithFacebook() {
	try {
		const { type, token } = await Facebook.logInWithReadPermissionsAsync(
			configFacebook.appId,
			{ permissions: ['public_profile', 'email'] },
		)

		if (type === 'success' && token) {
			// Build Firebase credential with the Facebook access token.
			const credential = firebase.auth.FacebookAuthProvider.credential(token)

			// Sign in with credential from the Facebook user.
			const data = await firebase
				.auth()
				.signInWithCredential(credential)

			// remove keys with null val
			const user = ObjectFromEntries(Object.entries(data.user.providerData[0])
				.map(([key, val]) => [key, val || '']))

			// REVIEW: probably unnecessary
			// soft merge data and only add fields or doc if non-existent
			db.runTransaction(async(transaction) => {
				// This code may get re-run multiple times if there are conflicts.
				const originalUser = await transaction.get(db.collection('users').doc(user.uid))
				const newUser = { ...user, ...originalUser.data() }
				transaction.update(db.collection('users').doc(user.uid), newUser)
			})

			return user
		}
	} catch (error) {
		console.error('loginWithFacebook failed:')
		console.error(error)
	}

	return null
}

/**
 * firebase helper with try/catch
 *
 * @returns {Promise<void>} result of call or null
 */
export function logout() {
	try {
		return firebase.auth().signOut()
	} catch (error) {
		console.error('logout of firebase failed')
		console.error(error)
	}

	return null
}

/**
 * Register a subscription callback for changes of the currently authenticated user
 *
 * @param {(a: firebase.User) => any} callback - Called with the current authenticated
 * user as first argument
 */
export function subscribeAuthChange(callback) {
	firebase.auth().onAuthStateChanged(callback)
}
