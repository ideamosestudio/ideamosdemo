import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
test('entrega de diseño del 24/11 conserva publicación, URL y alcance editorial',async()=>{
 const slug='blog/diseno-web-profesional/diseno-web-profesional/';
 const html=await readFile(new URL('../out/'+slug+'index.html',import.meta.url),'utf8');
 const graph=[...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].flatMap(m=>{const s=JSON.parse(m[1]);return s['@graph']??[s];});
 const post=graph.find(s=>s['@type']==='BlogPosting');
 assert.equal(post.datePublished,'2026-10-24');assert.equal(post.dateModified,'2026-11-24');
 assert.match(html,/Pedí entregables que puedas comprobar/);assert.match(html,/Ejemplo ilustrativo/);assert.match(html,/www.w3.org\/WAI\/test-evaluate\/preliminary/);
 const xml=await readFile(new URL('../out/sitemap.xml',import.meta.url),'utf8');
 const entry=[...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(m=>m[1]).find(e=>e.includes('/'+slug+'</loc>'));
 assert.match(entry,/<lastmod>2026-11-24<\/lastmod>/);
});
