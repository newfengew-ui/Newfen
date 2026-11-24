const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

async function computeSri(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const hash = crypto.createHash('sha384').update(buf).digest('base64');
  return `sha384-${hash}`;
}

async function main() {
  const htmlPath = path.join(process.cwd(), 'index.html');
  if (!fs.existsSync(htmlPath)) return;
  let html = fs.readFileSync(htmlPath, 'utf8');
  const tagRe = /<(script|link)\b([^>]+?(?:src|href)="(https:\/\/cdn\.jsdelivr\.net\/[^"]+)"[^>]*)>/gi;
  const matches = [...html.matchAll(tagRe)];
  let updated = 0;

  for (const m of matches) {
    const fullTag = m[0];
    const attrs = m[2];
    const url = m[3];
    if (/\bintegrity="/i.test(attrs)) continue;
    try {
      const sri = await computeSri(url);
      let newTag = fullTag.replace(
        new RegExp(`((?:src|href)="${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}")`),
        `$1 integrity="${sri}"`
      );
      if (!/\bcrossorigin=/i.test(newTag)) {
        newTag = newTag.replace(/>$/, ' crossorigin="anonymous">');
      }
      html = html.replace(fullTag, newTag);
      updated++;
      console.log(`[SRI] Added ${sri.slice(0, 18)}... for ${url}`);
    } catch (err) {
      console.warn(`[SRI] Skipped ${url}: ${err.message}`);
    }
  }

  if (updated > 0) {
    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log(`[SRI] Updated ${updated} external resource(s) in index.html`);
  }
}

main().catch(err => {
  console.warn('[SRI] Non-fatal error:', err.message);
});
