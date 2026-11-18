import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Resolve each advisory, not the propagated count of affected packages.
// No allowlist: withdrawal is verified against GitHub on every run.
export async function evaluateAudit(report, lookup) {
  if (report.error || report.auditReportVersion !== 2 || !report.vulnerabilities || !report.metadata?.vulnerabilities) throw Error('Invalid npm audit response');
  const advisories = new Map();
  const visited = new Set();
  function visit(name) {
    if (visited.has(name)) return;
    visited.add(name);
    const item = report.vulnerabilities[name];
    if (!item || !Array.isArray(item.via) || !item.via.length) throw Error(`Unresolved vulnerability: ${name}`);
    for (const via of item.via) {
      if (typeof via === 'string') visit(via);
      else {
        const match = /^https:\/\/github\.com\/advisories\/(GHSA-[a-z0-9-]+)$/.exec(via.url ?? '');
        if (!match) throw Error('Unknown advisory source');
        advisories.set(match[1], via);
      }
    }
  }
  for (const [name, item] of Object.entries(report.vulnerabilities)) {
    if (['high', 'critical'].includes(item.severity)) visit(name);
  }
  const withdrawn = [];
  for (const id of advisories.keys()) {
    const official = await lookup(id);
    if (official.ghsa_id !== id || !official.withdrawn_at || !Number.isFinite(Date.parse(official.withdrawn_at))) throw Error(`Active or unverified high/critical advisory: ${id}`);
    withdrawn.push({ id, withdrawnAt: official.withdrawn_at });
  }
  if ((report.metadata.vulnerabilities.high || report.metadata.vulnerabilities.critical) && !advisories.size) throw Error('Missing high/critical advisory details');
  return withdrawn;
}

async function main() {
  const result = spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['audit', '--json'], { encoding: 'utf8', shell: process.platform === 'win32', timeout: 180000, maxBuffer: 10 * 1024 * 1024 });
  if (result.error || ![0, 1].includes(result.status)) throw Error('npm audit failed');
  const withdrawn = await evaluateAudit(JSON.parse(result.stdout), async id => {
    const response = await fetch(`https://api.github.com/advisories/${id}`, {
      headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'ideamos-security-audit', ...(process.env.GH_TOKEN ? { Authorization: `Bearer ${process.env.GH_TOKEN}` } : {}) },
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw Error(`GitHub advisory verification failed: ${response.status}`);
    return response.json();
  });
  for (const item of withdrawn) console.log(`Verified withdrawn: ${item.id} (${item.withdrawnAt})`);
  console.log('No active high/critical advisories. Verification fails closed.');
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main().catch(error => { console.error(error.message); process.exitCode = 1; });
