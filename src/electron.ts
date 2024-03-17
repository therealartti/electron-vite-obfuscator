import path from 'node:path'
import fs from 'node:fs'
import { createRequire } from 'node:module'

const _require = createRequire(import.meta.url)

export function getElectronPath(): string {
  let electronExecPath = process.env.ELECTRON_EXEC_PATH || ''
  if (!electronExecPath) {
    const electronModulePath = path.dirname(_require.resolve('electron'))
    const pathFile = path.join(electronModulePath, 'path.txt')
    let executablePath
    if (fs.existsSync(pathFile)) {
      executablePath = fs.readFileSync(pathFile, 'utf-8')
    }
    if (executablePath) {
      electronExecPath = path.join(electronModulePath, 'dist', executablePath)
      process.env.ELECTRON_EXEC_PATH = electronExecPath
    } else {
      throw new Error('Electron uninstall')
    }
  }
  return electronExecPath
}
