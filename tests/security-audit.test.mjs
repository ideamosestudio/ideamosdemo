import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateAudit } from '../scripts/security-audit.mjs';
const id = 'GHSA-fc5q-39xc-vjpf';
const report = () => ({auditReportVersion:2,metadata:{vulnerabilities:{high:2,critical:0}},vulnerabilities:{parent:{severity:'high',via:['child']},child:{severity:'high',via:[{url:`https://github.com/advisories/${id}`}]} }});
test('audit accepts only verified withdrawals and deduplicates transitive warnings', async()=>{
  let calls=0;
  const result=await evaluateAudit(report(),async()=>{calls++;return{ghsa_id:id,withdrawn_at:'2026-11-18T15:38:56Z'};});
  assert.equal(calls,1);assert.equal(result.length,1);
});
test('audit fails closed for active, mismatched, unavailable or malformed data',async()=>{
  for(const lookup of [async()=>({ghsa_id:id,withdrawn_at:null}),async()=>({ghsa_id:'wrong',withdrawn_at:'2026-11-18'}),async()=>{throw Error('offline');}]) await assert.rejects(evaluateAudit(report(),lookup));
  await assert.rejects(evaluateAudit({error:'offline'},async()=>({})));
  const broken=report();broken.vulnerabilities.child.via=[];await assert.rejects(evaluateAudit(broken,async()=>({})));
});
