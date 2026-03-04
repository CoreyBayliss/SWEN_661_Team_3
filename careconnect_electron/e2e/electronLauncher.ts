import { ElectronApplication, _electron as electron } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

export async function launchCareConnectElectron(): Promise<ElectronApplication> {
  const packagedExePath = path.resolve(__dirname, '../release/win-unpacked/CareConnect.exe');
  const distMainPath = path.resolve(__dirname, '../dist/main.js');

  if (fs.existsSync(packagedExePath)) {
    return electron.launch({
      executablePath: packagedExePath,
      args: [],
    });
  }

  if (!fs.existsSync(distMainPath)) {
    throw new Error('Could not find release/win-unpacked/CareConnect.exe or dist/main.js. Run npm run build first.');
  }

  return electron.launch({
    args: [distMainPath],
  });
}
