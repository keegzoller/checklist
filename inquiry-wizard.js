// Builder and student forms remain ordinary, usable Netlify forms without JavaScript.
export function initInquiryWizards() {
  document.querySelectorAll('form[data-inquiry-wizard]').forEach(form => {
    const fields = [...form.querySelectorAll('.field')];
    const inputs = fields.map(field => field.querySelector('input,select,textarea'));
    if (!fields.length) return;
    form.classList.add('wizard-form'); form.noValidate=true;
    inputs.filter(input=>input.type==='tel').forEach(input=>{input.addEventListener('input',()=>{const digits=input.value.replace(/\D/g,'');input.setCustomValidity(!input.value || (digits.length>=7 && digits.length<=15 && /^[+()0-9 .-]+$/.test(input.value))?'':'Please enter a valid phone number.');});});
    const labels=fields.map(field=>field.querySelector('label').textContent.replace(/\s*\*|\s*\(optional\)/g,'').trim());
    const header=document.createElement('div');header.className='wizard-heading';
    header.innerHTML='<span class="wizard-count"></span><progress aria-label="Inquiry progress"></progress><h2 tabindex="-1"></h2><p></p>';
    form.prepend(header);
    const title=header.querySelector('h2'), hint=header.querySelector('p'), progress=header.querySelector('progress');
    progress.max=fields.length+1;
    const review=document.createElement('div');review.className='wizard-review';review.hidden=true;form.appendChild(review);
    const actions=document.createElement('div');actions.className='wizard-actions';
    const back=document.createElement('button');back.type='button';back.className='wizard-back';back.textContent='← Back';
    const next=document.createElement('button');next.type='button';next.className='btn btn-primary';next.textContent='Continue →';
    const submit=form.querySelector('button[type="submit"]'), note=form.querySelector('.form-note');
    actions.append(back,next,submit);form.append(actions,note);
    let current=0,editing=false;
    function show(index,focus=true){
      current=index; fields.forEach((f,i)=>{f.hidden=i!==index;});
      const isReview=index===fields.length;
      title.textContent=isReview?'Review your inquiry':labels[index];
      hint.textContent=isReview?'Check the details below, then send your inquiry.':inputs[index].required?'Please complete this field to continue.':'Optional — you can skip this for now.';
      header.querySelector('.wizard-count').textContent=`${form.dataset.inquiryWizard} · Step ${index+1} of ${fields.length+1}`;
      progress.value=index+1;review.hidden=!isReview;submit.hidden=!isReview;next.hidden=isReview;back.hidden=index===0;
      next.textContent=editing?'Save changes →':'Continue →';
      const status=form.querySelector('.form-status');if(status&&!isReview)status.textContent='';
      if(isReview){review.replaceChildren();inputs.forEach((input,i)=>{const row=document.createElement('div');row.className='wizard-review-row';const value=document.createElement('div');const label=document.createElement('strong');label.textContent=labels[i];const answer=document.createElement('span');answer.textContent=input.value||'Not provided';value.append(label,answer);const edit=document.createElement('button');edit.type='button';edit.textContent='Edit';edit.setAttribute('aria-label','Edit '+labels[i]);edit.addEventListener('click',()=>{editing=true;show(i);});row.append(value,edit);review.appendChild(row);});}
      if(focus){title.focus({preventScroll:true});const box=form.getBoundingClientRect();if(box.top<0||box.top>innerHeight*.7)form.scrollIntoView({block:'start',behavior:'instant'});}
    }
    function advance(){if(current===fields.length)return;if(!inputs[current].reportValidity())return;const to=editing?fields.length:current+1;editing=false;show(to);}
    next.addEventListener('click',advance);back.addEventListener('click',()=>{const to=editing?fields.length:Math.max(0,current-1);editing=false;show(to);});

    form.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.tagName==='INPUT'){e.preventDefault();advance();}});
    form.addEventListener('submit',e=>{if(current!==fields.length){e.preventDefault();e.stopImmediatePropagation();advance();return;}const invalid=inputs.findIndex(input=>!input.checkValidity());if(invalid!==-1){e.preventDefault();e.stopImmediatePropagation();show(invalid);inputs[invalid].reportValidity();}});
    new MutationObserver(()=>{form.querySelectorAll('button').forEach(button=>{button.disabled=form.getAttribute('aria-busy')==='true';});}).observe(form,{attributes:true,attributeFilter:['aria-busy']});
    show(0,false);
  });
}
