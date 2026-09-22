// Progressive enhancement: the original contact forms remain usable without JS.
export function initQuoteWizard() {
  const original = document.getElementById('form-homeowner');
  const container = original?.closest('.quote-form');
  if (!original || !container) return;
  const panel = document.createElement('section');
  panel.id = 'guided-quote'; panel.className = 'guided-quote';
  panel.setAttribute('aria-label', 'Request a free estimate');
  panel.innerHTML = `<div class="wizard-shell"><div class="wizard-top"><span class="eyebrow">YOUR HOME. YOUR NEXT PROJECT.</span><button type="button" class="wizard-close" aria-label="Close quote form">Close ×</button></div><div class="wizard-progress"><span class="wizard-count"></span><span>No obligation</span></div><progress max="7" value="1" aria-label="Quote form progress"></progress><div class="wizard-heading"><h2 tabindex="-1"></h2><p></p></div></div>`;
  const placeholder = document.createElement('div');
  placeholder.id = container.id || 'quote-card';
  container.replaceWith(placeholder);
  placeholder.appendChild(panel);
  const dialog = document.createElement('dialog');
  dialog.id='quote-popup'; dialog.className='quote-dialog';
  dialog.setAttribute('aria-label','Request a free estimate');
  document.body.appendChild(dialog);
  const shell = panel.querySelector('.wizard-shell');
  const form = original.cloneNode(true);
  form.id = 'guided-homeowner'; form.className = 'wizard-form';
  form.removeAttribute('role'); form.removeAttribute('aria-labelledby'); form.setAttribute('aria-label','Your project details');
  form.noValidate = true;
  form.querySelectorAll('[id]').forEach(el => { el.id = 'inline-' + el.id; });
  form.querySelectorAll('label[for]').forEach(el => { el.htmlFor = 'inline-' + el.htmlFor; });
  form.querySelector('.form-status')?.remove();
  shell.appendChild(form);
  const definitions = [
    ['service','What can we help you with?','Choose the option that best fits your project.'],
    ['town','Where is your home?','Your town is enough for now. We serve Saratoga County and can confirm your location.'],
    ['message','Tell us a little about the project.','What would you like to change? Include timing or anything you want us to know.'],
    ['name','What’s your name?','So our local team knows who to ask for.'],
    ['phone','What’s the best number to reach you?','We’ll use this to follow up about your estimate.'],
    ['email','Where can we email you?','For follow-up about your project.'],
  ];
  const steps = definitions.map(([key,title,hint]) => {
    const input = form.elements.namedItem(key);
    const field = input.closest('.field'); field.classList.add('wizard-step');
    field.querySelector('label').classList.add('wizard-sr-only');
    input.setAttribute('aria-label',title);
    if (key === 'town') { input.required = true; input.placeholder = 'e.g. Ballston Spa'; }
    if (key === 'name') input.placeholder = 'Your full name';
    if (key === 'phone') { input.placeholder = '(518) 555-0123'; input.inputMode = 'tel'; }
    if (key === 'email') input.placeholder = 'you@example.com';
    if (key === 'message') input.placeholder = 'e.g. Replace the siding on our two-story home this fall…';
    return {key,title,hint,input,field};
  });
  const select = steps[0].input;
  select.innerHTML = '<option value="">Choose a project</option>';
  const choices = ['Siding replacement','Siding for a new home or addition','Remodel / Addition','Another home project'];
  const options = document.createElement('div'); options.className = 'wizard-options';
  choices.forEach(label => {
    select.add(new Option(label,label));
    const button = document.createElement('button'); button.type='button'; button.className='wizard-option';
    button.textContent=label; button.setAttribute('aria-pressed','false');
    button.addEventListener('click', () => { select.value=label; const target=editing?steps.length:1; editing=false; show(target); }); options.appendChild(button);
  });
  select.hidden=true; steps[0].field.appendChild(options);
  const review = document.createElement('div'); review.className='wizard-review'; review.hidden=true;
  form.appendChild(review);
  const submit = form.querySelector('button[type="submit"]'); submit.textContent='Send My Quote Request';
  const note = form.querySelector('.form-note');
  const actions=document.createElement('div'); actions.className='wizard-actions';
  const back=document.createElement('button');back.type='button';back.className='wizard-back';back.textContent='← Back';
  const next=document.createElement('button');next.type='button';next.className='btn btn-primary';next.textContent='Continue →';
  actions.append(back,next,submit); form.append(actions,note);
  let current=0, opener=null, editing=false;
  function show(index, focus=true) {
    current=index;
    steps.forEach((step,i) => { step.field.hidden=i!==index; });
    review.hidden=index!==steps.length;
    submit.hidden=index!==steps.length; next.hidden=index===steps.length || index===0; back.hidden=index===0;
    next.textContent=editing?'Save changes →':index===2 && !steps[index].input.value?'Skip for now →':'Continue →';
    const status=form.querySelector('.form-status'); if(status && index!==steps.length) status.textContent='';
    panel.querySelector('h2').textContent=index===steps.length?'Everything look right?':steps[index].title;
    panel.querySelector('.wizard-heading p').textContent=index===steps.length?'Review your details, then send your request. We’ll contact you to discuss an estimate.':steps[index].hint;
    panel.querySelector('.wizard-count').textContent=`Step ${index+1} of 7${index===2?' · Optional':''}`;
    panel.querySelector('progress').value=index+1;
    options.querySelectorAll('button').forEach((b,i)=>b.setAttribute('aria-pressed',String(select.value===choices[i])));
    if(index===steps.length){
      review.replaceChildren();
      steps.forEach((step,i)=>{
        const row=document.createElement('div'); row.className='wizard-review-row';
        const text=document.createElement('div');const label=document.createElement('strong');label.textContent={service:'Project',town:'Town',message:'Details',name:'Name',phone:'Phone',email:'Email'}[step.key];
        const value=document.createElement('span');value.textContent=step.input.value || 'Not provided';text.append(label,value);
        const edit=document.createElement('button');edit.type='button';edit.textContent='Edit';edit.setAttribute('aria-label','Edit '+label.textContent.toLowerCase());edit.addEventListener('click',()=>{editing=true;show(i);});
        row.append(text,edit); review.appendChild(row);
      });
    }
    if(focus) { panel.querySelector('h2').focus({preventScroll:true}); if(dialog.open)dialog.scrollTop=0; }
  }
  function advance(){
    if(current>=steps.length)return;
    if(current===0 && !select.value)return;
    if(!steps[current].input.reportValidity())return;
    const target=editing?steps.length:current+1; editing=false; show(target);
  }
  next.addEventListener('click',advance);back.addEventListener('click',()=>{const target=editing?steps.length:Math.max(0,current-1);editing=false;show(target);});
  steps[2].input.addEventListener('input',()=>{if(!editing)next.textContent=steps[2].input.value?'Continue →':'Skip for now →';});
  const phone=steps[4].input;
  phone.addEventListener('input',()=>{const digits=phone.value.replace(/\D/g,'');phone.setCustomValidity(digits.length>=7 && digits.length<=15 && /^[+()0-9 .-]+$/.test(phone.value)?'':'Please enter a valid phone number.');});
  // Enter advances text fields, while Enter in the details box remains a newline.
  form.addEventListener('keydown',e=>{if(e.key==='Enter' && e.target.tagName==='INPUT'){e.preventDefault();advance();}});
  form.addEventListener('submit',e=>{
    if(current!==steps.length){e.preventDefault();e.stopImmediatePropagation();advance();return;}
    const invalid=steps.findIndex(step=>!step.input.checkValidity());
    if(invalid!==-1){e.preventDefault();e.stopImmediatePropagation();show(invalid);steps[invalid].input.reportValidity();}
  });
  // Keep answers stable during capture, including the brief secondary CRM forwarding.
  new MutationObserver(()=>{
    const busy=form.getAttribute('aria-busy')==='true';
    panel.querySelectorAll('button').forEach(button=>{button.disabled=busy;});
  }).observe(form,{attributes:true,attributeFilter:['aria-busy']});
  const links=[...document.querySelectorAll('a[href="#quote"]')];
  const closeButton=panel.querySelector('.wizard-close');
  closeButton.hidden=true;
  let previousOverflow='';
  links.forEach(link=>{
    link.setAttribute('aria-controls',dialog.id);link.setAttribute('aria-haspopup','dialog');
    link.addEventListener('click',e=>{
      e.preventDefault();e.stopImmediatePropagation();opener=link;
      const menu=document.getElementById('mobileMenu');
      if(menu?.classList.contains('open')) document.getElementById('menuClose')?.click();
      previousOverflow=document.body.style.overflow;
      document.body.style.overflow='hidden';
      dialog.appendChild(panel);closeButton.hidden=false;dialog.showModal();show(current);
    },true);
  });
  function close(){if(form.getAttribute('aria-busy')==='true')return;dialog.close();}
  closeButton.addEventListener('click',close);
  dialog.addEventListener('cancel',e=>{if(form.getAttribute('aria-busy')==='true')e.preventDefault();});
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close();}});
  dialog.addEventListener('close',()=>{
    placeholder.appendChild(panel);closeButton.hidden=true;
    document.body.style.overflow=previousOverflow;opener?.focus({preventScroll:true});
  });
  show(0,false);
  if(location.hash==='#quote') requestAnimationFrame(()=>document.getElementById('quote')?.scrollIntoView({block:'start'}));
}
