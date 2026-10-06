import { initQuoteWizard } from './quote-wizard.js';
import { initInquiryWizards } from './inquiry-wizard.js';
// Netlify Forms saves inquiries and sends the configured email notifications.
export async function captureQuote(fields, fetcher = fetch) {
  const response = await fetcher('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(fields).toString(),
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error('Quote could not be saved.');
  return true;
}

if (typeof document !== 'undefined') {
  initQuoteWizard();
  initInquiryWizards();
  const campaignKeys = ['utm_source', 'utm_medium', 'utm_campaign'];
  let attribution = { 'landing-page': location.pathname };
  try {
    attribution = JSON.parse(sessionStorage.getItem('vermac-attribution') || 'null') || attribution;
    const query = new URLSearchParams(location.search);
    campaignKeys.forEach(key => { if (query.has(key)) attribution[key] = query.get(key).slice(0, 200); });
    sessionStorage.setItem('vermac-attribution', JSON.stringify(attribution));
  } catch { /* Requests still work when browser storage is disabled. */ }

  document.querySelectorAll('form[data-netlify], form[name="homeowner-project"], form[name="builder-project"], form[name="student-program"]').forEach(form => {
    Object.entries({ ...attribution, 'page-url': location.origin + location.pathname }).forEach(([key, value]) => {
      const field = form.elements.namedItem(key);
      if (field) field.value = value;
    });
    const status = document.createElement('p');
    status.className = 'form-status'; status.setAttribute('role', 'status'); status.setAttribute('aria-live', 'polite');
    form.appendChild(status);
    let submitting = false;
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (submitting || !form.reportValidity()) return;
      const fields = new FormData(form);
      if (fields.get('bot-field')) { location.assign('/thank-you'); return; }
      submitting = true;
      const button = form.querySelector('button[type="submit"]');
      button.disabled = true; form.setAttribute('aria-busy', 'true'); status.textContent = 'Sending your request…';
      try {
        await captureQuote(fields);
      } catch {
        status.replaceChildren(document.createTextNode('We could not confirm your request was saved. Please try again or call '));
        const call = document.createElement('a'); call.href = 'tel:+15186368008'; call.textContent = '518-636-8008'; status.appendChild(call);
        button.disabled = false; form.removeAttribute('aria-busy'); submitting = false; return;
      }
      // Optional analytics integration: no personal contact data is sent to analytics.
      try { if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead', { form_name: form.getAttribute('name') }); } catch {}
      location.assign('/thank-you');
    });
  });
}
