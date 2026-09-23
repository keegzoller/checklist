(() => {
  const track = document.getElementById('galleryGrid');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!track) return;
  const figures = [...track.querySelectorAll('figure')];
  let hovered = false, visible = false, drag = null, suppressClick = false, resumeAt = 0;
  const behavior = () => reduced.matches ? 'instant' : 'smooth';
  function step(direction) {
    const max = track.scrollWidth - track.clientWidth;
    const distance = figures[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap);
    const end = direction > 0 && track.scrollLeft >= max - 3;
    const start = direction < 0 && track.scrollLeft <= 3;
    track.scrollTo({ left: end ? 0 : start ? max : track.scrollLeft + direction * distance, behavior: behavior() });
  }
  function manualStep(direction) {
    resumeAt = Date.now() + 6000;
    step(direction);
  }
  ['Prev', 'Next'].forEach((side,i) => document.getElementById('project'+side).addEventListener('click', () => manualStep(i ? 1 : -1)));
  track.addEventListener('pointerenter', () => {hovered=true;});
  track.addEventListener('pointerleave', () => {hovered=false;});
  track.addEventListener('keydown', e => {
    if (e.key==='ArrowRight' || e.key==='ArrowLeft') { e.preventDefault(); manualStep(e.key==='ArrowRight'?1:-1); }
  });
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => {visible=entries[0].isIntersecting;},{threshold:.5}).observe(track);
  setInterval(() => { if(!reduced.matches && Date.now() >= resumeAt && !drag && !hovered && visible && !document.hidden && !track.contains(document.activeElement) && !document.querySelector('dialog[open], .lightbox.open')) step(1); }, 5000);
  // Native touch swipe; desktop pointer drag without accidentally opening the lightbox.
  track.addEventListener('pointerdown', e => { if(e.pointerType!=='mouse'||e.button!==0)return;drag={x:e.clientX,left:track.scrollLeft,id:e.pointerId};suppressClick=false; });
  track.addEventListener('pointermove', e => {if(!drag)return;const distance=e.clientX-drag.x;if(Math.abs(distance)>6){suppressClick=true;resumeAt=Date.now()+6000;track.classList.add('dragging');track.setPointerCapture(drag.id);track.scrollLeft=drag.left-distance;}});
  const finish=()=>{drag=null;track.classList.remove('dragging');};
  track.addEventListener('pointerup',finish);track.addEventListener('pointercancel',finish);
  track.addEventListener('click',e=>{if(suppressClick){e.preventDefault();e.stopImmediatePropagation();suppressClick=false;}},true);
  figures.forEach((figure,i)=>{figure.setAttribute('role','button');figure.setAttribute('aria-label',`View project ${i+1} of ${figures.length}: ${figure.querySelector('figcaption').textContent}`);});
})();
