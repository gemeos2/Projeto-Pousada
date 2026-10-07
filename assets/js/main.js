/* Pousada Essenza · JS compartilhado (4 páginas) */
(function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const WA = '5500000000000'; /* troque pelo número real: 55 + DDD + número */
  const waLink = t => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
  const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const IMG = 'assets/img/';

  /* ───────── ESTRUTURA GLOBAL: header, menu, WhatsApp, footer, lightbox ───────── */
  const NAV = [['index.html', 'Início'], ['acomodacoes.html', 'Acomodações'], ['galeria.html', 'Galeria'], ['contato.html', 'Contato']];
  const WAICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>';
  document.body.insertAdjacentHTML('afterbegin', `
<nav id="mainNav">
  <a class="wm" href="index.html">ESSENZA</a>
  <div class="mn">${NAV.map(([h, t]) => `<a href="${h}"${h === page ? ' class="cur"' : ''}>${t}</a>`).join('')}
    <a class="pill" href="${waLink('Olá! Gostaria de fazer uma reserva na Pousada Essenza.')}" target="_blank" rel="noopener">Reservar</a>
  </div>
  <button class="burger" id="burger" aria-label="Abrir menu"><svg class="ico" viewBox="0 0 24 24"><path d="M4 8h16M4 16h16"/></svg></button>
</nav>
<div class="drawer" id="drawer">${NAV.map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}<a class="drawer-cta" href="${waLink('Olá! Gostaria de fazer uma reserva na Pousada Essenza.')}" target="_blank" rel="noopener"><em>Reservar</em></a></div>
<a class="wa-float" href="${waLink('Olá! Vim pelo site da Pousada Essenza.')}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${WAICON}</a>`);

  const IG = '<svg class="ig" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/></svg>';
  const FB = '<svg class="ig" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>';
  document.body.insertAdjacentHTML('beforeend', `
<footer class="foot">
  <div class="top">
    <div class="brand"><span class="wm">ESSENZA</span><p>A essência do descanso.</p>
      <div class="soc"><a href="#" aria-label="Instagram">${IG}</a><a href="#" aria-label="Facebook">${FB}</a></div></div>
    <div><h4>Endereço</h4><address>[Rua / Avenida, número]<br/>[Bairro] · [Cidade / Estado]<br/>CEP [00000-000]</address></div>
    <div><h4>Contatos</h4><ul><li><a href="${waLink('Olá!')}" target="_blank" rel="noopener">WhatsApp [(00) 00000-0000]</a></li><li><a href="tel:+5500000000000">Telefone [(00) 0000-0000]</a></li><li><a href="mailto:contato@pousadaessenza.com.br">contato@pousadaessenza.com.br</a></li></ul></div>
    <div><h4>Políticas</h4><ul><li><a href="contato.html#politicas">Check-in / Check-out</a></li><li><a href="contato.html#politicas">Pets</a></li><li><a href="contato.html#politicas">Cancelamento</a></li></ul></div>
  </div>
  <div class="bot"><span>© 2026 Pousada Essenza · Todos os direitos reservados</span><span>Navegação: ${NAV.map(([h, t]) => `<a href="${h}">${t}</a>`).join(' · ')}</span></div>
</footer>
<dialog class="lb" id="lb"><div class="st"><img id="lbImg" alt=""/></div><div class="cap" id="lbCap"></div><button class="x" data-c aria-label="Fechar"><i data-lucide="x"></i></button><button class="pv" data-p aria-label="Anterior"><i data-lucide="chevron-left"></i></button><button class="nx" data-n aria-label="Próxima"><i data-lucide="chevron-right"></i></button></dialog>`);

  const toastEl = $('#toast'); let tt;
  function toast(m) { $('#toastTxt').textContent = m; toastEl.classList.add('on'); clearTimeout(tt); tt = setTimeout(() => toastEl.classList.remove('on'), 2200); }

  /* ───────── DADOS (placeholders: troque pelos reais) ───────── */
  const P = { hero: 'aerial-hero.jpg', pool: 'infinity-pool.jpg', ham: 'hammock.jpg', night: 'night.jpg', din: 'dining.jpg', spa: 'spa.jpg', dusk: 'beach-dusk.jpg', reef: 'reef.jpg', suite: 'suite-interior.jpg', sea: 'seaplane.jpg', room: 'room-1.avif', room2: 'room-2.avif' };
  const ALL = Object.values(P).map(f => IMG + f);
  const ROOMS = [
    { id: 'standard', n: 'Quarto Standard', cat: 'casal', cap: 2, m2: 20, bed: '1 cama casal', p: 289, img: P.room, tag: '' },
    { id: 'superior', n: 'Quarto Superior', cat: 'casal', cap: 3, m2: 26, bed: '1 casal + 1 solteiro', p: 389, img: P.room2, tag: 'Mais reservado' },
    { id: 'familia', n: 'Quarto Família', cat: 'familia', cap: 5, m2: 38, bed: '1 casal + 3 solteiro', p: 529, img: P.suite, tag: '' },
    { id: 'suite-piscina', n: 'Suíte Piscina', cat: 'suite', cap: 2, m2: 34, bed: '1 cama king', p: 649, img: P.pool, tag: 'Vista da piscina' }
  ];
  const ico = n => `<i data-lucide="${n}"></i>`;
  const set = (sel, html) => { const e = $(sel); if (e) e.innerHTML = html; };

  /* ───────── INÍCIO ───────── */
  set('#homeRooms', ROOMS.map(r => `<div class="room rv"><div class="ph"><img alt="${r.n}" loading="lazy" data-ph="FOTO DO QUARTO · 800×600 (4:3)" src="${IMG + r.img}"/>${r.tag ? `<span class="badge b-ember tag">${r.tag}</span>` : ''}</div>
    <div class="bd"><h3>${r.n}</h3><p>Até ${r.cap} pessoas</p><div class="ft"><a class="btn btn-sm btn-ember" href="acomodacoes.html#${r.id}">Ver detalhes</a></div></div></div>`).join(''));
  const REV = [['Ana P.', 'Google', 'Ambiente impecável e atendimento caloroso. Voltaremos.'], ['Carlos M.', 'Booking', 'Café da manhã maravilhoso e a praia a dois passos.'], ['Juliana R.', 'Google', 'Perfeita para descansar. Quarto limpo e silencioso.'], ['Marcos T.', 'Booking', 'Equipe atenciosa e localização excelente. Recomendo.']];
  set('#reviews', REV.map(([n, s, t], i) => `<div class="review rv"><div class="stars">${ico('star').repeat(5)}</div><p>“${t}”</p><div class="who"><img alt="" data-ph="FOTO AVATAR (opcional)" src="${ALL[i + 3]}"/><span>${n}<small>${s}</small></span></div></div>`).join(''));
  set('#miniGal', [P.pool, P.ham, P.din, P.spa, P.night, P.dusk].map((s, i) => `<a class="gi rv" href="#" data-lb="mini" data-cap="Foto ${i + 1}"><img alt="" loading="lazy" src="${IMG + s}"/></a>`).join(''));

  /* ───────── ACOMODAÇÕES ───────── */
  const AM = [['snowflake', 'Ar-condicionado'], ['tv', 'TV a cabo'], ['wifi', 'Wi-Fi'], ['wine', 'Frigobar'], ['bath', 'Banheiro privativo'], ['coffee', 'Café da manhã']];
  set('#roomBlocks', ROOMS.map((r, k) => {
    const gal = [r.img, P.suite, P.ham, P.night, P.dusk, P.reef].map((s, i) => `<a class="gi" href="#" data-lb="${r.id}" data-cap="${r.n} · foto ${i + 1}"><img alt="${r.n}" loading="lazy" src="${IMG + s}"/></a>`).join('');
    return `<article class="rblock${k % 2 ? ' rev' : ''}" id="${r.id}"><div class="rg rv">${gal}</div>
    <div class="rinfo rv"><span class="eyebrow">${r.cat === 'suite' ? 'Suíte' : r.cat === 'familia' ? 'Família' : 'Casal'}</span><h2>${r.n}</h2><p>[Descrição curta do quarto.]</p>
    <div class="meta"><span>${ico('ruler')}${r.m2} m²</span><span>${ico('bed-double')}${r.bed}</span><span>${ico('users')}${r.cap} pessoas</span></div>
    <ul class="alist">${AM.map(([i, t]) => `<li>${ico(i)}${t}</li>`).join('')}</ul>
    <div class="pr">R$ ${r.p}<small>a partir de / noite</small></div>
    <a class="btn btn-wa" href="${waLink('Olá! Gostaria de reservar o ' + r.n + ' na Pousada Essenza.')}" target="_blank" rel="noopener">${WAICON}Reservar pelo WhatsApp</a></div></article>`;
  }).join(''));

  /* ───────── GALERIA ───────── */
  const GC = ['Quartos', 'Áreas comuns', 'Arredores'];
  const ratios = ['4/5', '1/1', '3/2', '4/3', '2/3', '16/10'];
  set('#galFilter', ['Todos', ...GC].map((c, i) => `<button class="chip${i ? '' : ' on'}" data-f="${c}">${c}</button>`).join(''));
  set('#masonry', Array.from({ length: 24 }, (_, i) => { const c = GC[i % GC.length]; return `<a class="gi" href="#" data-lb="gal" data-cat="${c}" data-cap="${c}"><img alt="${c}" loading="lazy" style="aspect-ratio:${ratios[i % ratios.length]}" src="${ALL[i % ALL.length]}"/></a>`; }).join(''));
  const gf = $('#galFilter');
  if (gf) gf.addEventListener('click', e => { const b = e.target.closest('.chip'); if (!b) return; $$('.chip', gf).forEach(x => x.classList.toggle('on', x === b)); const f = b.dataset.f; $$('#masonry .gi').forEach(it => it.classList.toggle('gone', !(f === 'Todos' || it.dataset.cat === f))); setTimeout(() => window.ScrollTrigger && ScrollTrigger.refresh(), 50); });

  /* ───────── CONTATO ───────── */
  const cf = $('#contactForm');
  if (cf) cf.addEventListener('submit', e => { e.preventDefault(); const v = id => ($('#' + id).value || '').trim(); window.open(waLink(`Olá! Meu nome é ${v('cN')}. Datas: ${v('cD')}. ${v('cM')}`), '_blank'); toast('Abrindo o WhatsApp…'); });

  $$('[data-wa]').forEach(a => { a.href = waLink(a.dataset.wa); a.target = '_blank'; a.rel = 'noopener'; });

  /* lightbox */
  const lb = $('#lb'); let grp = [], ix = 0;
  function show() { const a = grp[ix]; $('#lbImg').src = $('img', a).src; $('#lbCap').textContent = a.dataset.cap || ''; }
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-lb]'); if (a) { e.preventDefault(); grp = $$(`[data-lb="${a.dataset.lb}"]:not(.gone)`); ix = grp.indexOf(a); show(); lb.showModal(); return; }
    if (e.target.closest('.foot .soc a')) e.preventDefault();
  });
  lb.addEventListener('click', e => { if (e.target.closest('[data-c]') || e.target === lb) lb.close(); if (e.target.closest('[data-p]')) { ix = (ix - 1 + grp.length) % grp.length; show(); } if (e.target.closest('[data-n]')) { ix = (ix + 1) % grp.length; show(); } });
  lb.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') { ix = (ix - 1 + grp.length) % grp.length; show(); } if (e.key === 'ArrowRight') { ix = (ix + 1) % grp.length; show(); } });

  /* hero: slider + barra de reserva */
  const hs = $$('#heroBg img'), hd = $$('#heroDots b'); let hi = 0;
  function heroGo(i) { hi = i; hs.forEach((x, k) => x.classList.toggle('on', k === i)); hd.forEach((x, k) => x.classList.toggle('on', k === i)); }
  hd.forEach((x, i) => x.addEventListener('click', () => heroGo(i)));
  if (hs.length > 1 && !RM) setInterval(() => heroGo((hi + 1) % hs.length), 6000);
  const bb = $('#bookBar');
  if (bb) bb.addEventListener('submit', e => { e.preventDefault(); location.href = 'contato.html'; });

  if (window.lucide) lucide.createIcons();

  /* ───────── LOADER ───────── */
  const loader = $('#loader'); let started = false;
  const imgs = [...document.images].slice(0, 6); let n = 0;
  const bump = () => { n++; loader.style.setProperty('--lp', Math.min(1, n / Math.max(1, imgs.length))); };
  imgs.forEach(i => i.complete ? bump() : (i.addEventListener('load', bump), i.addEventListener('error', bump)));
  const lv = loader.querySelector('video'); if (lv) lv.playbackRate = 1.8;
  const MIN_MS = 2000;
  function fin() { if (started) return; started = true; setTimeout(() => { loader.classList.add('done'); start(); }, Math.max(150, MIN_MS - performance.now())); }
  addEventListener('load', fin); setTimeout(fin, 4000);

  /* ───────── WEBGL · cáusticas ───────── */
function makeCaustics(canvas) {
                    if (!canvas) return null;
                    let gl; try { gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false, antialias: false }); } catch (e) { }
                    if (!gl) { canvas.style.display = 'none'; return null; }
                    const vs = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
                    const fs = 'precision mediump float;uniform float t;uniform vec2 r;' +
                        'void main(){vec2 uv=gl_FragCoord.xy/r;vec2 q=uv*vec2(r.x/r.y,1.0)*3.2;' +
                        'for(int i=1;i<=4;i++){float f=float(i);q+=0.35*vec2(sin(t*0.5+q.y*1.3*f),cos(t*0.45+q.x*1.2*f));}' +
                        'float c=pow(abs(sin(q.x)*sin(q.y)),2.2);float vg=smoothstep(1.0,0.2,length(uv-0.5));' +
                        'vec3 col=mix(vec3(0.18,0.55,0.55),vec3(0.75,1.0,0.92),c)*c;gl_FragColor=vec4(col,c*0.55*vg);}';
                    const sh = (t, s) => { const o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); return o; };
                    const prog = gl.createProgram(); gl.attachShader(prog, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(prog); gl.useProgram(prog);
                    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
                    const loc = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
                    const uT = gl.getUniformLocation(prog, 't'), uR = gl.getUniformLocation(prog, 'r');
                    gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
                    function size() { const w = canvas.clientWidth || canvas.offsetWidth, h = canvas.clientHeight || canvas.offsetHeight, s = .5; canvas.width = Math.max(2, Math.floor(w * s)); canvas.height = Math.max(2, Math.floor(h * s)); gl.viewport(0, 0, canvas.width, canvas.height); }
                    size(); addEventListener('resize', size);
                    let active = false, raf = 0, t0 = null;
                    function frame(ts) { if (!active) return; if (t0 === null) t0 = ts; gl.uniform1f(uT, (ts - t0) / 1000); gl.uniform2f(uR, canvas.width, canvas.height); gl.drawArrays(gl.TRIANGLES, 0, 3); raf = requestAnimationFrame(frame); }
                    new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting && !RM) { if (!active) { active = true; t0 = null; raf = requestAnimationFrame(frame); } } else { active = false; cancelAnimationFrame(raf); } }), { threshold: .02 }).observe(canvas);
                    return true;
                }


  /* ───────── START ───────── */
  function start() {
    try { makeCaustics($('#causHero')); } catch (e) { }
    if (!window.gsap) { $$('.rv,.wipe').forEach(e => { e.style.opacity = 1; e.style.transform = 'none'; }); return; }
    gsap.registerPlugin(ScrollTrigger);
    let lenis = null;
    if (!RM && window.Lenis) { lenis = new Lenis({ lerp: .09, smoothWheel: true }); lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0); }
    const onScroll = fn => { addEventListener('scroll', fn, { passive: true }); if (lenis) lenis.on('scroll', fn); };
    const go = t => { lenis ? lenis.scrollTo(t, { duration: 1.4, offset: -60 }) : t.scrollIntoView({ behavior: 'smooth' }); };
    const drawer = $('#drawer');
    $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => { const id = a.getAttribute('href'); if (id === '#') return e.preventDefault(); const t = document.querySelector(id); if (!t) return; e.preventDefault(); drawer.classList.remove('is-open'); lenis && lenis.start(); go(t); }));
    if (location.hash && $(location.hash)) setTimeout(() => go($(location.hash)), 500);

    const navEl = $('#mainNav');
    function spy() {
      const y = 46; let light = false; for (const s of $$('.sec:not(.dark)')) { const r = s.getBoundingClientRect(); if (r.top <= y && r.bottom >= y) { light = true; break; } }
      navEl.classList.toggle('on-light', light); navEl.classList.toggle('scrolled', scrollY > 40);
      $('#progress').style.transform = `scaleX(${scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)})`;
    }
    spy(); onScroll(spy);
    drawer.addEventListener('click', e => { if (e.target === drawer && e.clientX < innerWidth * .2) { drawer.classList.remove('is-open'); lenis && lenis.start(); } });
    $('#burger').addEventListener('click', () => { drawer.classList.toggle('is-open'); lenis && (drawer.classList.contains('is-open') ? lenis.stop() : lenis.start()); });

    if (!RM) {
      gsap.from('.open .ct .eyebrow', { opacity: 0, y: 18, duration: 1, delay: .15, ease: 'power3.out' });
      gsap.from('.open h1 .ln > span', { yPercent: 115, duration: 1.25, delay: .3, ease: 'power4.out', stagger: .12 });
      gsap.from('.open .sub,.open .book', { opacity: 0, y: 18, duration: 1, delay: .7, ease: 'power3.out', stagger: .1 });
      $$('.par').forEach(img => { const host = img.closest('.bleed,.reserve,.feat') || img.parentElement; gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: host, start: 'top bottom', end: 'bottom top', scrub: true } }); });
    }
    $$('.rv').forEach(el => { if (el.closest('.open')) return; gsap.fromTo(el, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' }, onComplete: () => el.style.removeProperty('transform') }); });
    $$('.wipe').forEach(el => gsap.fromTo(el, { opacity: 0, clipPath: 'inset(0 0 100% 0)', y: 10 }, { opacity: 1, clipPath: 'inset(0 0 -5% 0)', y: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } }));
    $$('.review').forEach(r => ScrollTrigger.create({ trigger: r, start: 'top 88%', once: true, onEnter: () => r.classList.add('in') }));
    setTimeout(() => ScrollTrigger.refresh(), 400);
    addEventListener('load', () => setTimeout(() => ScrollTrigger.refresh(), 300));
  }
})();
