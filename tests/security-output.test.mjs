import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import test from 'node:test';
const out = new URL('../out/', import.meta.url);
async function pages(dir) {
 const entries = await readdir(dir, {withFileTypes:true});
 const groups = await Promise.all(entries.map(e => e.isDirectory() ? pages(new URL(e.name+'/',dir)) : e.name.endsWith('.html') ? [new URL(e.name,dir)] : []));
 return groups.flat();
}
test('all application pages constrain base URLs, embedded objects and form destinations', async () => {
 let checked=0;
 for(const file of await pages(out)) {
  const html=await readFile(file,'utf8');
  if(!html.includes('<html')) continue;
  assert.match(html, /http-equiv="Content-Security-Policy"/i, file.pathname);
  assert.match(html, /base-uri (?:'|&#x27;)self(?:'|&#x27;)/, file.pathname);
  assert.match(html, /object-src (?:'|&#x27;)none(?:'|&#x27;)/, file.pathname);
  assert.match(html, /form-action (?:'|&#x27;)self(?:'|&#x27;) https:\/\/mailer\.ideamos\.com\.ar/, file.pathname);
  checked++;
 }
 assert.ok(checked>=9);
});
test('all public pages preload the compressed brand font', async () => {
 for (const route of ['index.html','contacto/index.html','tiendas-online/index.html']) {
  const html=await readFile(new URL(route,out),'utf8');
  assert.ok(html.includes('/fonts/Gilroy-ExtraBold.woff2'));
  assert.ok(!html.includes('/fonts/Gilroy-ExtraBold.otf'));
 }
});
