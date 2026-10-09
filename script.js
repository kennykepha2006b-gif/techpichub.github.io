document.addEventListener('DOMContentLoaded',()=>{
  const y=document.getElementById('year'); if(y)y.textContent=new Date().getFullYear();
  const search=document.getElementById('product-search');
  const cards=[...document.querySelectorAll('.product-card')];
  const filters=[...document.querySelectorAll('.filter')];
  const noResults=document.getElementById('no-results');
  let active='all';
  function applyFilters(){
    const q=(search?.value||'').trim().toLowerCase();
    let visible=0;
    cards.forEach(card=>{
      const category=card.dataset.category||'';
      const haystack=((card.dataset.search||'')+' '+card.textContent).toLowerCase();
      const matchCategory=active==='all'||category===active;
      const matchSearch=!q||haystack.includes(q);
      card.hidden=!(matchCategory&&matchSearch);
      if(!card.hidden)visible++;
    });
    if(noResults)noResults.hidden=visible!==0;
  }
  filters.forEach(btn=>btn.addEventListener('click',()=>{
    active=btn.dataset.filter||'all';
    filters.forEach(item=>item.classList.toggle('active',item===btn));
    applyFilters();
  }));
  if(search)search.addEventListener('input',applyFilters);
});