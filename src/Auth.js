import { Facebook } from 'expo'

import { Firebase, configFacebook, db } from './integrations'
import 'firebase/firestore'

import { ObjectFromEntries } from './utils/shims'

export class AuthService {
  /**
   * Login with Facebook and Firebase
   *
   * Uses Expo Facebook API and authenticates the Facebook user in Firebase
   */
  static async loginWithFacebook() {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        configFacebook.appId,
        { permissions: ['public_profile', 'email'] }
      )

      if (type === 'success' && token) {
        // Build Firebase credential with the Facebook access token.
        const credential = Firebase.auth.FacebookAuthProvider.credential(token)

        // Sign in with credential from the Facebook user.
        const data = await Firebase
          .auth()
          .signInAndRetrieveDataWithCredential(credential)

        // prevent null's
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

        // await db
        //   .collection('users')
        //   .doc(user.uid)
        //   .set(user, { merge: true })

        return user
      }
    } catch (error) {
      console.error('loginWithFacebook failed:')
      console.error(error)
    }

    return null
  }

  static async logout() {
    return Firebase.auth().signOut()
  }

  /**
   * Register a subscription callback for changes of the currently authenticated user
   *
   * @param callback Called with the current authenticated user as first argument
   */
  static async subscribeAuthChange(callback) {
    Firebase.auth().onAuthStateChanged(callback)
  }
}
