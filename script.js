const shoeImages = [
    'https://themewagon.github.io/stylish/images/card-image3.jpg',
    'https://static.tildacdn.com/tild3533-3330-4266-b963-616462613564/image_401_.jpg',
    'https://akramjon-eccommerce.netlify.app/img/gallery-1.jpg',
    'https://bespoke-daffodil-48f985.netlify.app/assets/image-product-4-cb692237.webp',
  ];
  const shoeLabels = ['Side View', 'Front', 'Angle', 'Top'];

  let currentIdx = 0;
  let qty = 0;

  const mainImgEl  = document.getElementById('mainImg');
  const thumbsEl   = document.getElementById('thumbsContainer');
  const overlay    = document.getElementById('lightboxOverlay');
  const lbImg      = document.getElementById('lbMainImg');
  const lbThumbsEl = document.getElementById('lbThumbsContainer');

  function handleMainClick(e) {
    if (window.innerWidth > 700) openLightbox(currentIdx);
  }

  function mobNav(dir) {
    const next = (currentIdx + dir + shoeImages.length) % shoeImages.length;
    setActive(next);
  }

  shoeImages.forEach((src, i) => {
    const div = document.createElement('div');
    div.className = 'thumb' + (i === 0 ? ' active' : '');
    div.innerHTML = `<img src="${src}" alt="${shoeLabels[i]}"/>`;
    div.addEventListener('click', () => {
      setActive(i);
      openLightbox(i);
    });
    thumbsEl.appendChild(div);
  });

  mainImgEl.src = shoeImages[0];

  function setActive(idx) {
    currentIdx = idx;
    mainImgEl.style.opacity = '0';
    setTimeout(() => {
      mainImgEl.src = shoeImages[idx];
      mainImgEl.style.opacity = '1';
    }, 120);
    document.querySelectorAll('.thumb').forEach((t, i) =>
      t.classList.toggle('active', i === idx));
  }

  shoeImages.forEach((src, i) => {
    const div = document.createElement('div');
    div.className = 'lb-thumb' + (i === 0 ? ' active' : '');
    div.innerHTML = `<img src="${src}" alt="${shoeLabels[i]}"/>`;
    div.addEventListener('click', () => lbSetActive(i));
    lbThumbsEl.appendChild(div);
  });

  function openLightbox(idx) {
    lbSetActive(idx);
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function overlayClick(e) {
    if (e.target === overlay) closeLightbox();
  }

  function lbSetActive(idx) {
    currentIdx = idx;
    lbImg.style.opacity = '0';
    setTimeout(() => {
      lbImg.src = shoeImages[idx];
      lbImg.style.opacity = '1';
    }, 100);
    document.querySelectorAll('.lb-thumb').forEach((t, i) =>
      t.classList.toggle('active', i === idx));
    document.querySelectorAll('.thumb').forEach((t, i) =>
      t.classList.toggle('active', i === idx));
    mainImgEl.src = shoeImages[idx];
  }

  function lbNav(dir) {
    lbSetActive((currentIdx + dir + shoeImages.length) % shoeImages.length);
  }

  document.addEventListener('keydown', e => {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'ArrowRight') lbNav(1);
    if (e.key === 'ArrowLeft')  lbNav(-1);
    if (e.key === 'Escape')     closeLightbox();
  });

  function changeQty(d) {
    qty = Math.max(0, qty + d);
    document.getElementById('qtyVal').textContent = qty;
  }

  function addToCart() {
    if (qty === 0) changeQty(1);
    const btn = document.querySelector('.btn-cart');
    btn.innerHTML = '✓ Added!';
    btn.style.background = '#22c55e';
    setTimeout(() => {
      btn.innerHTML = `<svg width='17' height='17' fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><path d='M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z'/><line x1='3' y1='6' x2='21' y2='6'/><path d='M16 10a4 4 0 01-8 0'/></svg> Add to cart`;
      btn.style.background = '';
    }, 1500);
  }