import test from 'node:test';
import assert from 'node:assert/strict';
import { captureQuote } from '../quote.js';
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
for (const formName of ['homeowner-project', 'builder-project', 'student-program']) {
  test(`${formName} retains inquiry details in Netlify capture`, async () => {
    const inquiry = new URLSearchParams({ 'form-name': formName, name: 'Test Contact', email: 'test@example.com', company: 'Test Builder', school: 'Test School', message: 'Details & questions', 'page-url': 'https://vermacconstruction.com/' });
    let calls = 0;
    await captureQuote(inquiry, async (url, options) => {
      calls++;
      assert.equal(url, '/');
      assert.equal(options.headers['Content-Type'], 'application/x-www-form-urlencoded');
      assert.deepEqual([...new URLSearchParams(options.body)], [...inquiry]);
      return {ok: true};
    });
    assert.equal(calls, 1);
  });
}
