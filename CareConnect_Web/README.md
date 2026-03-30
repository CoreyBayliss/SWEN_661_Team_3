
  # CareConnect Web

  This is a code bundle for CareConnect Web. The original project is available at https://www.figma.com/design/1fxeZEHDGyDCbeXGKzdmaa/CareConnect-Web.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Accessibility testing

  - Run Axe (component/page checks with Vitest): `npm run test:a11y:axe`
  - Run screen reader checks (Vitest): `npm run test:a11y:screen-reader`
  - Run Axe (Electron E2E scan): `npm run test:e2e:a11y`
  - Run screen reader checks (Electron E2E): `npm run test:e2e:screen-reader`
  - Run WAVE API scan: `npm run test:a11y:wave -- http://localhost:5173`

  ### WAVE API key

  WAVE testing requires an API key in environment variable `WAVE_API_KEY`.

  Example (PowerShell):

  `$env:WAVE_API_KEY="your_key_here"; npm run test:a11y:wave -- http://localhost:5173`
  