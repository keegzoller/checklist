// Netlify Forms is the durable source of truth. GHL remains a secondary integration.
const GHL_WEBHOOK = 'https://services.leadconnectorhq.com/hooks/Ysazlze58nVZM8Pk4GPw/webhook-trigger/e17cf22c-b9a7-4119-b719-095070068193';

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

export function ghlPayload(fields) {
  const get = key => String(fields.get(key) || '').trim();
  const name = get('name');
  const digits = get('phone').replace(/\D/g, '');
  const phone = digits.length === 10 ? '+1' + digits : digits.length === 11 && digits.startsWith('1') ? '+' + digits : get('phone');
  return {
    first_name: name.split(/\s+/)[0], last_name: name.split(/\s+/).slice(1).join(' '), full_name: name,
    email: get('email'), phone, address: get('town') || get('location'),
    service: get('service') || get('scope'), inquiry_type: get('inquiry-type'), company: get('company'),
    scope: get('scope'), timeline: get('timeline'),
    message: ['message', 'company', 'scope', 'timeline', 'town', 'location'].map(key => get(key) ? `${key}: ${get(key)}` : '').filter(Boolean).join('\n'),
    source: 'vermacconstruction.com ' + get('inquiry-type') + ' form', page_url: get('page-url'),
    utm_source: get('utm_source'), utm_medium: get('utm_medium'), utm_campaign: get('utm_campaign'),
  };
}

export async function forwardQuote(fields, fetcher = fetch) {
  // A secondary-system failure must never turn a saved lead into an apparent failure.
  try {
    const response = await fetcher(GHL_WEBHOOK, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ghlPayload(fields)), signal: AbortSignal.timeout(4000), keepalive: true,
    });
    return response.ok;
  } catch { return false; }
}

if (typeof document !== 'undefined') {
  const campaignKeys = ['utm_source', 'utm_medium', 'utm_campaign'];
  let attribution = { 'landing-page': location.pathname };
  try {
    attribution = JSON.parse(sessionStorage.getItem('vermac-attribution') || 'null') || attribution;
    const query = new URLSearchParams(location.search);
    campaignKeys.forEach(key => { if (query.has(key)) attribution[key] = query.get(key).slice(0, 200); });
    sessionStorage.setItem('vermac-attribution', JSON.stringify(attribution));
  } catch { /* Requests still work when browser storage is disabled. */ }

  document.querySelectorAll('form[data-netlify], form[name="homeowner-project"], form[name="builder-project"]').forEach(form => {
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
      try { if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead', { form_name: form.name }); } catch {}
      await forwardQuote(fields);
      location.assign('/thank-you');
    });
  });
}
