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
test('student and builder context survives forwarding without a homeowner service', () => {
  const student = ghlPayload(new URLSearchParams({name:'Program Test','inquiry-type':'Student program',role:'Parent or guardian',school:'Example school',message:'Program questions'}));
  assert.equal(student.inquiry_type,'Student program'); assert.match(student.message,/role: Parent or guardian/);assert.match(student.message,/school: Example school/);
  const builder=ghlPayload(new URLSearchParams({name:'Builder Test','inquiry-type':'Builder / GC',company:'Example GC',location:'Malta',scope:'Siding: single home',timeline:'1-3 months'}));
  assert.equal(builder.company,'Example GC');assert.equal(builder.address,'Malta');assert.equal(builder.service,'Siding: single home');assert.equal(builder.timeline,'1-3 months');
});
