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

/** Convert a base64 data URI into a File for upload. */
export function dataUriToFile(dataUri: string, baseName: string): File {
  const [meta, b64 = ''] = dataUri.split(',')
  const mime = /data:([^;]+)/.exec(meta)?.[1] || 'image/png'
  const bin = atob(b64)
  const bytes = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
  const ext = (mime.split('/')[1] || 'png').replace('+xml', '')
  return new File([bytes], `${baseName}.${ext}`, { type: mime })
}

/**
 * Replaces inline base64 `<img src="data:image/…">` sources in rich-text HTML with uploaded
 * Firebase Storage URLs. Pasted images embed as huge base64 strings that blow past Firestore's
 * 1 MB document limit — uploading them keeps the stored content tiny.
 */
export async function inlineImagesToUrls(html: string): Promise<string> {
  if (!html || !html.includes('data:image/')) return html
  const re = /data:image\/[a-zA-Z0-9.+-]+;base64,[^"')\s]+/g
  const unique = Array.from(new Set(html.match(re) ?? []))
  let out = html
  let i = 0
  for (const dataUri of unique) {
    try {
      const url = await uploadFile(dataUriToFile(dataUri, `pasted_${Date.now()}_${i++}`), 'uploads')
      out = out.split(dataUri).join(url)
    } catch { /* leave inline if the upload fails */ }
  }
  return out
}

/** Upload any inline base64 images found in a sections array's rich-text bodies. */
export async function uploadInlineSectionImages<T extends { body?: string; serviceBody?: string; tabs?: { body?: string }[] }>(
  sections: T[] | undefined,
): Promise<T[] | undefined> {
  if (!sections) return sections
  for (const s of sections) {
    if (s.body) s.body = await inlineImagesToUrls(s.body)
    if (s.serviceBody) s.serviceBody = await inlineImagesToUrls(s.serviceBody)
    if (s.tabs) for (const t of s.tabs) { if (t.body) t.body = await inlineImagesToUrls(t.body) }
  }
  return sections
}
