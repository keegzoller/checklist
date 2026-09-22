import test from 'node:test';
import assert from 'node:assert/strict';
import { captureQuote, forwardQuote, ghlPayload } from '../quote.js';
const fields = new URLSearchParams({ 'form-name':'homeowner-project', name:'Website Test', email:'test@example.com', phone:'518-555-0100', town:'Ballston Spa', message:'Test only', 'inquiry-type':'Homeowner', 'utm_source':'google' });
test('saves a correctly encoded quote to Netlify before reporting success', async () => {
  const ok = await captureQuote(fields, async (url, options) => {
    assert.equal(url, '/'); assert.equal(options.method, 'POST');
    assert.equal(new URLSearchParams(options.body).get('form-name'), 'homeowner-project');
    assert.equal(new URLSearchParams(options.body).get('email'), 'test@example.com');
    assert.ok(options.signal); return {ok:true};
  }); assert.equal(ok,true);
});
test('a rejected or unavailable capture never reports success', async () => {
  await assert.rejects(captureQuote(fields, async () => ({ok:false})));
  await assert.rejects(captureQuote(fields, async () => { throw new Error('offline'); }));
});
test('secondary CRM failure is contained after durable capture', async () => {
  assert.equal(await forwardQuote(fields, async () => { throw new Error('timeout'); }), false);
  assert.equal(await forwardQuote(fields, async () => ({ok:false})), false);
});
test('CRM mapping retains callback details and attribution', () => {
  const lead=ghlPayload(fields); assert.equal(lead.phone,'+15185550100'); assert.equal(lead.last_name,'Test');
  assert.equal(lead.address,'Ballston Spa'); assert.equal(lead.utm_source,'google'); assert.match(lead.message,/Test only/);
});
