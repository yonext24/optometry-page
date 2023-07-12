import { signInWithEmailAndPassword } from 'firebase/auth'
import { USER_POSSIBLE_STATES } from '../utils/user-possible-states'
import { auth } from './config'
import { getUser } from './utils/user'

export async function getUserRole() {
  return await new Promise((resolve, reject) => {
    if (auth.currentUser === null) resolve(USER_POSSIBLE_STATES.NOT_LOGGED)
    auth.currentUser
      ?.getIdTokenResult()
      .then((idTokenResult) => {
        resolve(idTokenResult.claims['role'])
      })
      .catch(reject)
  })
}

export const onAuthStateChanged = (setState) => {
  return auth.onAuthStateChanged(async (user) => {
    if (user === null) {
      setState(USER_POSSIBLE_STATES.NOT_LOGGED)
      return
    }
    try {
      const role = await getUserRole()

      if (!role) setState(USER_POSSIBLE_STATES.NOT_LOGGED)
      const userFromFirestore = await getUser(user.uid, role)

      setState({ ...userFromFirestore, role })
    } catch (err) {
      setState(USER_POSSIBLE_STATES.NOT_LOGGED)
    }
  })
}

export const iniciarSesion = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password)
}
