import { storage } from '../config'
import { ref, uploadBytes } from 'firebase/storage'
import { adminCollection } from '../collections'

// Create
export async function createAdmin (email, password, name, lastName) {
}

// Read
export async function getAllAdmins () {
}

export async function getAdmin (uid) {
}

// Upload files
// Upload Profile Picture
export async function setAdminProfilePic (uid, file) {
  try {
    const imageRef = ref(storage, `fotos-admins/${uid}`)
    const resUpload = await uploadBytes(imageRef, file)
    return resUpload
  } catch (error) {
    console.error('Error al subir archivo: ' + error)
  }
}
