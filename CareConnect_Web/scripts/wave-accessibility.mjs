#!/usr/bin/env node

/**
 * WAVE API accessibility scan helper.
 *
 * Usage:
 *   WAVE_API_KEY=your_key node scripts/wave-accessibility.mjs http://localhost:5173
 *
 * Optional env vars:
 *   WAVE_FAIL_ON_ALERTS=true   // fail build when alerts are present
 */

const targetUrl = process.argv[2] ?? 'http://localhost:5173';
const apiKey = process.env.WAVE_API_KEY;
const failOnAlerts = process.env.WAVE_FAIL_ON_ALERTS === 'true';

if (!apiKey) {
  console.error('WAVE_API_KEY is required. Get one from https://wave.webaim.org/api/.');
  process.exit(1);
}

const endpoint = new URL('https://wave.webaim.org/api/request');
endpoint.searchParams.set('key', apiKey);
endpoint.searchParams.set('url', targetUrl);
endpoint.searchParams.set('reporttype', '4');
endpoint.searchParams.set('format', 'json');

function getCount(data, category) {
  return Number(data?.categories?.[category]?.count ?? 0);
}

try {
  const response = await fetch(endpoint);

  if (!response.ok) {
    console.error(`WAVE API request failed: ${response.status} ${response.statusText}`);
    process.exit(1);
  }

  const data = await response.json();

  if (data?.status?.success === false) {
    console.error('WAVE API returned an error:', data?.status?.description ?? 'Unknown error');
    process.exit(1);
  }

  const summary = {
    errors: getCount(data, 'error'),
    contrastErrors: getCount(data, 'contrast'),
    alerts: getCount(data, 'alert'),
    features: getCount(data, 'feature'),
    structure: getCount(data, 'structure'),
    aria: getCount(data, 'aria'),
  };

  console.log('WAVE accessibility summary');
  console.log(`Target: ${targetUrl}`);
  console.table(summary);

  const blockingIssues = summary.errors + summary.contrastErrors + (failOnAlerts ? summary.alerts : 0);

  if (blockingIssues > 0) {
    console.error(
      `WAVE scan failed with ${blockingIssues} blocking issue(s). ` +
        `Set WAVE_FAIL_ON_ALERTS=false to ignore alerts.`
    );
    process.exit(1);
  }

  console.log('WAVE scan passed (no blocking issues).');
} catch (error) {
  console.error('WAVE scan failed to execute:', error instanceof Error ? error.message : String(error));
  process.exit(1);
}
