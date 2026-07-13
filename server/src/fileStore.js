import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_FILE = resolve(__dirname, '../data/contacts.json')

/** Append a contact to a local JSON file — used when MongoDB isn't configured. */
export async function appendContactToFile(record) {
  await mkdir(dirname(DATA_FILE), { recursive: true })
  let list = []
  try {
    list = JSON.parse(await readFile(DATA_FILE, 'utf8'))
    if (!Array.isArray(list)) list = []
  } catch {
    list = []
  }
  const entry = { ...record, _id: `local_${Date.now()}`, createdAt: new Date().toISOString() }
  list.push(entry)
  await writeFile(DATA_FILE, JSON.stringify(list, null, 2), 'utf8')
  return entry
}
