import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { firebaseApp } from './firebase'

/**
 * Uploads a file to Firebase Storage under `<folder>/<timestamp>_<name>` and
 * returns its public download URL. Storage rules must allow writes to the folder.
 */
export async function uploadFile(file: File, folder: string): Promise<string> {
  const storage = getStorage(firebaseApp)
  const sanitized = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
  const storageRef = ref(storage, `${folder}/${Date.now()}_${sanitized}`)
  await new Promise<void>((resolve, reject) => {
    const task = uploadBytesResumable(storageRef, file)
    task.on('state_changed', null, reject, () => resolve())
  })
  return getDownloadURL(storageRef)
}
