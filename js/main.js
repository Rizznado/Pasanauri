/* Pasanauri landing page — interactions & motion (no dependencies) */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  let lang = 'en';
  try { lang = localStorage.getItem('pasanauri-lang') || 'en'; } catch (e) {}

  /* ---------------- Menu data (edit names / prices here) ---------------- */
  const DISHES = [
    { cat: 'khinkali', img: 'khinkali-plate', ka: 'ხინკალი ქალაქური', en: 'Khinkali Kalakuri', tag: { en: 'Bestseller', ka: 'ფავორიტი' },
      d: { en: 'City-style, with beef & pork, coriander and a peppery broth.', ka: 'ქალაქური, საქონლისა და ღორის ხორცით, ქინძით.' }, price: '1.30', unit: { en: '/ pc', ka: '/ ცალი' } },
    { cat: 'khinkali', img: 'khinkali-closeup', ka: 'ხინკალი მთიულური', en: 'Khinkali Mtiuluri', tag: { en: 'Village recipe', ka: 'სოფლის რეცეპტი' },
      d: { en: 'The mountain original: meat, onion, chilli and pepper — no herbs.', ka: 'მთის ორიგინალი: ხორცი, ხახვი, წიწაკა — მწვანილის გარეშე.' }, price: '1.30', unit: { en: '/ pc', ka: '/ ცალი' } },
    { cat: 'bakery', img: 'khachapuri-adjaruli', ka: 'აჭარული ხაჭაპური', en: 'Adjaruli Khachapuri', tag: { en: 'From the oven', ka: 'ღუმელიდან' },
      d: { en: 'Boat of bread, molten sulguni, egg yolk and a cube of butter.', ka: 'სულგუნი, კვერცხის გული და კარაქი — ცხელ-ცხელი.' }, price: '18', unit: { en: '₾', ka: '₾' } },
    { cat: 'grill', img: 'mtsvadi-grill', ka: 'მწვადი', en: 'Mtsvadi', tag: { en: 'On the coals', ka: 'ნაკვერჩხალზე' },
      d: { en: 'Pork skewers over vine-wood coals, with onion and tkemali.', ka: 'ღორის მწვადი ვაზის ნაკვერჩხალზე, ხახვით და ტყემლით.' }, price: '22', unit: { en: '₾', ka: '₾' } },
    { cat: 'cold', img: 'pkhali-bowls', ka: 'ფხალეულობის ასორტი', en: 'Pkhali Selection', tag: { en: 'Vegetarian', ka: 'ვეგეტარიანული' },
      d: { en: 'Spinach, beet and leek with walnut paste and pomegranate.', ka: 'ისპანახი, ჭარხალი, პრასი — ნიგვზით და ბროწეულით.' }, price: '16', unit: { en: '₾', ka: '₾' } },
    { cat: 'bakery', img: 'khachapuri-khinkali', ka: 'სეტი „ფასანაური“', en: 'The Pasanauri Set', tag: { en: 'For two', ka: 'ორისთვის' },
      d: { en: 'Adjaruli khachapuri plus ten khinkali of your choice.', ka: 'აჭარული ხაჭაპური და 10 ხინკალი თქვენი არჩევანით.' }, price: '30', unit: { en: '₾', ka: '₾' } },
    { cat: 'cold', img: 'georgian-spread', ka: 'ქართული სუფრა', en: 'Supra Platter', tag: { en: 'To share', ka: 'გასაზიარებელი' },
      d: { en: 'A table-filling spread of starters, stews and bread.', ka: 'ცივი და ცხელი კერძების ასორტი მთელი სუფრისთვის.' }, price: '65', unit: { en: '₾', ka: '₾' } },
    { cat: 'drinks', img: 'craft-beer', ka: 'ლუდი ჩამოსასხმელი', en: 'Draft Craft Beer', tag: { en: 'Ice cold', ka: 'ცივი' },
      d: { en: 'Light and crisp — the khinkali’s best friend.', ka: 'მსუბუქი და გამაგრილებელი — ხინკლის საუკეთესო მეგობარი.' }, price: '7', unit: { en: '₾', ka: '₾' } },
  ];

  /* ---------------- i18n ---------------- */
  const KA = {
    'tagline': 'ქართული სამზარეულო · თბილისი',
    'nav.menu': 'მენიუ', 'nav.story': 'ჩვენი ისტორია', 'nav.spaces': 'სივრცე', 'nav.delivery': 'მიტანა', 'nav.visit': 'გვეწვიეთ',
    'loc': 'ყაზბეგის გამზ., თბილისი', 'cta.book': 'დაჯავშნე მაგიდა',
    'hero.eyebrow': 'ღიაა ყოველდღე · 11:00 – 00:00',
    'hero.title': 'მთის <br>რეცეპტები, ქალაქის <br><em>სუფრაზე</em>',
    'hero.lead': 'ხელით დაკეცილი ხინკალი იმ სოფლიდან, რომელმაც მას სახელი მისცა, ცხელი ხაჭაპური და ნაკვერჩხალზე შემწვარი მწვადი — ყაზბეგის გამზირზე.',
    'cta.menu': 'ნახე მენიუ', 'cta.how': 'როგორ ვჭამოთ ხინკალი',
    'mini.pleats': 'ნაკეცი ყველა ხინკალზე', 'mini.branches': 'ფასანაური თბილისში',
    'float.a.t': 'პირდაპირ ნაკვერჩხლიდან', 'float.a.s': 'მწვადი შეკვეთისთანავე',
    'float.b.t': 'ჩამოსასხმელი ლუდი', 'float.b.s': 'ხინკლის საუკეთესო მეგობარი',
    'flavor.title': 'აირჩიე გემო',
    'cat.all': 'ყველა', 'cat.khinkali': 'ხინკალი', 'cat.bakery': 'ხაჭაპური', 'cat.grill': 'მწვადი', 'cat.cold': 'ფხალი და სალათები', 'cat.drinks': 'სასმელი',
    'book.title': 'დაჯავშნე მაგიდა', 'book.sub': 'დაბადების დღე, სუფრა თუ სწრაფი სადილი', 'book.btn': 'დაჯავშნა',
    'menu.kicker': 'სამზარეულოდან', 'menu.title': 'სახლის <em>ფირმული</em> კერძები', 'menu.full': 'სრული მენიუ რესტორანში',
    'story.kicker': 'რატომ „ფასანაური“?',
    'story.title': 'სოფლის სახელი <br><em>სამხედრო გზიდან</em>',
    'story.lead': 'ფასანაური არაგვის ხეობაშია, ყაზბეგისკენ მიმავალ გზაზე — ამბობენ, ხინკალი სწორედ აქ დაიბადა. ჩვენ ვინარჩუნებთ მთის რეცეპტს: თხელი ცომი, წვნიანი გული და ხელით დაკეცილი ნაკეცები.',
    'stat.1': 'ნაკეცი ხელით', 'stat.2': 'ღიაა ყოველდღე', 'stat.3': 'ფილიალი თბილისში', 'stat.4': 'სოფლის რეცეპტი',
    'how.kicker': 'პატარა რიტუალი', 'how.title': 'როგორ ვჭამოთ <em>ხინკალი</em>',
    'how.s1.t': 'დაიჭირე კუდით', 'how.s1.p': 'მხოლოდ ხელით — ჩანგალი და დანა წვენს დაღვრის. ამოაბრუნე და დაიჭირე „კუდით“.',
    'how.s2.t': 'პატარა პირველი ლუკმა', 'how.s2.p': 'ფრთხილად მოკბიჩე გვერდიდან — შიგნით ცხელია.',
    'how.s3.t': 'შესვი წვენი', 'how.s3.p': 'ეს საუკეთესო ნაწილია. თეფშზე არც ერთი წვეთი — ეს წესია.',
    'how.s4.t': 'კუდი დატოვე', 'how.s4.p': 'შეჭამე დანარჩენი, კუდი თეფშზე დადე და დაითვალე. შავი პილპილი აუცილებელია.',
    'spaces.kicker': 'ყველა შემთხვევისთვის', 'spaces.title': 'მაგიდა <em>ყველა</em> ისტორიისთვის',
    'sp.1.t': 'სუფრა', 'sp.1.p': 'დიდი მაგიდა, სადღეგრძელოები და თამადა',
    'sp.2.t': 'ბანკეტი', 'sp.2.p': 'დაბადების დღე, გუნდი, ზეიმი',
    'sp.3.t': 'ოჯახური სადილი', 'sp.3.p': 'გასაზიარებელი კერძები ყველა ასაკისთვის',
    'sp.4.t': 'სწრაფი წახემსება', 'sp.4.p': 'ათი ხინკალი და ცივი ლუდი',
    'guests.kicker': 'რისთვის ბრუნდებიან სტუმრები',
    'g.1.t': 'მწვანილიანი ხინკალი', 'g.1.p': 'ქალაქური — წვნიანი და სურნელოვანი',
    'g.2.t': 'სწრაფი, თბილი მომსახურება', 'g.2.p': 'კერძები მაგიდაზე რამდენიმე წუთში',
    'g.3.t': 'სამართლიანი ფასები', 'g.3.p': 'ნამდვილი ნადიმი ზედმეტი ხარჯის გარეშე',
    'g.4.t': 'რუსტიკული ინტერიერი', 'g.4.p': 'ძველი თბილისი დეტალებში',
    'guests.btn': 'შეფასებები Google-ზე',
    'del.title': 'ფასანაური შენს კართან', 'del.sub': 'ხინკალი გინდა სახლში? შეუკვეთე Glovo-ით და ცხელს მოგიტანთ.',
    'del.s1': 'შეკვეთილია', 'del.s2': 'მზადდება', 'del.s3': 'გზაშია', 'del.s4': 'გემრიელად', 'del.btn': 'შეუკვეთე Glovo-ზე',
    'visit.kicker': 'მოდი მშიერი', 'visit.title': 'გვიპოვე <em>ყაზბეგის</em> გამზირზე',
    'visit.addr.t': 'მისამართი', 'visit.addr': 'ალექსანდრე ყაზბეგის გამზირი, საბურთალო, თბილისი',
    'visit.hours.t': 'სამუშაო საათები', 'visit.hours': 'ყოველდღე · 11:00 – 00:00',
    'visit.phone.t': 'ჯავშანი', 'visit.dir': 'მარშრუტი',
    'footer.made': 'მომზადებულია ცომით, ცეცხლით და მოთმინებით.',
    'tab.home': 'მთავარი', 'tab.menu': 'მენიუ', 'tab.book': 'ჯავშანი', 'tab.delivery': 'მიტანა', 'tab.visit': 'მისამართი',
    'modal.kicker': 'ფასანაური · ყაზბეგის გამზ.', 'modal.title': 'დაჯავშნე მაგიდა',
    'f.name': 'სახელი', 'f.phone': 'ტელეფონი', 'f.date': 'თარიღი', 'f.time': 'დრო', 'f.guests': 'სტუმრები',
    'f.submit': 'გაგზავნა', 'f.note': 'დასადასტურებლად დაგირეკავთ.', 'f.done': 'გმადლობთ! მოთხოვნა მიღებულია.', 'f.done2': 'მალე დაგირეკავთ მაგიდის დასადასტურებლად.'
  };
  const EN = {};
  $$('[data-i18n]').forEach(el => EN[el.dataset.i18n] = el.textContent);
  $$('[data-i18n-html]').forEach(el => EN[el.dataset.i18nHtml] = el.innerHTML);

  function applyLang(l, first) {
    lang = l;
    document.documentElement.lang = l === 'ka' ? 'ka' : 'en';
    const dict = l === 'ka' ? KA : EN;
    $$('[data-i18n]').forEach(el => { const v = dict[el.dataset.i18n]; if (v != null) el.textContent = v; });
    $$('[data-i18n-html]').forEach(el => {
      const v = dict[el.dataset.i18nHtml]; if (v == null) return;
      el.innerHTML = v;
      if (el.classList.contains('split')) { splitText(el); if (!first) requestAnimationFrame(() => el.classList.add('is-in')); }
    });
    $$('.lang__opt').forEach(o => o.classList.toggle('is-active', o.dataset.lang === l));
    renderDishes(currentFilter, !first);
    try { localStorage.setItem('pasanauri-lang', l); } catch (e) {}
  }
  $('.lang').addEventListener('click', () => applyLang(lang === 'en' ? 'ka' : 'en'));

  /* ---------------- Split text into animated words ---------------- */
  function splitText(el) {
    let i = 0;
    const walk = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            const w = document.createElement('span'); w.className = 'w';
            const inner = document.createElement('span'); inner.textContent = part; inner.style.setProperty('--i', i++);
            w.appendChild(inner); frag.appendChild(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
      });
    };
    walk(el);
  }
  $$('.split').forEach(splitText);

  /* ---------------- Menu render & filter ---------------- */
  const grid = $('#dishGrid');
  let currentFilter = 'all';
  function renderDishes(filter = 'all', animate = true) {
    currentFilter = filter;
    grid.innerHTML = DISHES.filter(d => filter === 'all' || d.cat === filter).map((d, i) => `
      <article class="dish ${animate ? 'is-entering' : 'reveal'}" style="${animate ? `animation-delay:${i * 70}ms` : `--d:${(i % 4) * 0.08}s`}">
        <div class="dish__img">
          <img src="images/${d.img}.webp" alt="${d.en}" loading="lazy">
          <span class="dish__tag">${d.tag[lang]}</span>
        </div>
        <div class="dish__body">
          <div class="dish__ka">${lang === 'ka' ? d.en : d.ka}</div>
          <h3>${lang === 'ka' ? d.ka : d.en}</h3>
          <p>${d.d[lang]}</p>
          <div class="dish__foot">
            <span class="dish__price">${d.unit.en === '₾' ? d.price + ' ₾' : d.price + ' ₾ <small>' + d.unit[lang] + '</small>'}</span>
            <button class="dish__add open-booking" aria-label="Book a table">+</button>
          </div>
        </div>
      </article>`).join('');
    if (!animate) $$('.reveal', grid).forEach(el => io.observe(el));
    bindTilt(); bindBooking();
  }
  $$('.chip').forEach(chip => chip.addEventListener('click', () => {
    $$('.chip').forEach(c => { c.classList.remove('is-active'); c.setAttribute('aria-selected', 'false'); });
    chip.classList.add('is-active'); chip.setAttribute('aria-selected', 'true');
    renderDishes(chip.dataset.filter, true);
    const top = $('#menu').getBoundingClientRect().top;
    if (top > window.innerHeight * .6 || top < -200) $('#menu').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  }));

  /* ---------------- Reveal on scroll ---------------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      $$('.count', e.target).forEach(countUp);
      if (e.target.classList.contains('count')) countUp(e.target);
      io.unobserve(e.target);
    });
  }, { threshold: .15, rootMargin: '0px 0px -8% 0px' });

  function observeAll() {
    // stagger siblings
    $$('.stats, .visit__list, .spaces__track, .hero__copy').forEach(group => {
      $$('.reveal', group).forEach((el, i) => el.style.setProperty('--d', `${i * 0.1}s`));
    });
    $$('.reveal, .split, .delivery, .hero__mini').forEach(el => io.observe(el));
  }

  /* ---------------- Count up ---------------- */
  function countUp(el) {
    if (el.dataset.done) return; el.dataset.done = 1;
    const to = +el.dataset.to, dur = 1600, t0 = performance.now();
    if (reduce) { el.textContent = to; return; }
    const tick = t => {
      const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(to * e);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------------- Scroll: header, progress, parallax, tabbar ---------------- */
  const header = $('.header'), progress = $('.scroll-progress');
  const parallax = $$('[data-parallax]');
  const sections = ['menu', 'book', 'delivery', 'visit'].map(id => document.getElementById(id));
  let lastY = 0, ticking = false;
  function onScroll() {
    const y = window.scrollY, h = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
    header.classList.toggle('is-scrolled', y > 20);
    header.classList.toggle('is-hidden', y > 400 && y > lastY + 4 && !document.body.classList.contains('modal-open'));
    if (y < lastY - 4) header.classList.remove('is-hidden');
    lastY = y;
    if (!reduce) parallax.forEach(el => {
      const r = el.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      const offset = (r.top + r.height / 2 - innerHeight / 2) * +el.dataset.parallax;
      el.style.transform = `translate3d(0,${offset}px,0)`;
    });
    // active tab / nav
    let current = 'top';
    sections.forEach(s => { if (s && s.getBoundingClientRect().top < innerHeight * .45) current = s.id; });
    if (current === 'book') current = 'top';
    $$('.tabbar a').forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + current));
    $$('.nav a').forEach(a => a.classList.toggle('is-current', a.getAttribute('href') === '#' + current));
    ticking = false;
  }
  addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });

  /* ---------------- Card tilt & magnetic buttons (desktop) ---------------- */
  function bindTilt() {
    if (!fine || reduce) return;
    $$('.dish').forEach(card => {
      if (card.dataset.tilt) return; card.dataset.tilt = 1;
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px)`;
      });
      card.addEventListener('pointerleave', () => card.style.transform = '');
    });
  }
  if (fine && !reduce) {
    $$('.magnetic').forEach(btn => {
      btn.addEventListener('pointermove', e => {
        const r = btn.getBoundingClientRect();
        btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px,${(e.clientY - r.top - r.height / 2) * .35}px)`;
      });
      btn.addEventListener('pointerleave', () => btn.style.transform = '');
    });
    // cursor dot
    const cur = document.createElement('div'); cur.className = 'cursor'; document.body.appendChild(cur);
    addEventListener('pointermove', e => { cur.style.opacity = .9; cur.style.left = e.clientX + 'px'; cur.style.top = e.clientY + 'px'; });
    document.addEventListener('pointerover', e => cur.classList.toggle('is-big', !!e.target.closest('a,button,.dish,.space-card,.step')));
    // hero visual follows pointer
    const hv = $('.hero__visual');
    $('.hero').addEventListener('pointermove', e => {
      const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
      $$('.float-card, .badge-spin', hv).forEach((el, i) => el.style.translate = `${x * (14 + i * 8)}px ${y * (14 + i * 8)}px`);
    });
  }

  /* ---------------- How to eat khinkali (auto stepper) ---------------- */
  const steps = $$('.step'), visual = $('.howto__visual'), cap = $('#howCaption');
  let stepIdx = 0, stepTimer;
  function setStep(i) {
    stepIdx = i;
    steps.forEach((s, k) => s.classList.toggle('is-active', k === i));
    visual.dataset.step = i;
    cap.textContent = `0${i + 1} / 04`;
  }
  function autoStep() { clearInterval(stepTimer); stepTimer = setInterval(() => setStep((stepIdx + 1) % steps.length), 3200); }
  steps.forEach((s, i) => s.addEventListener('click', () => { setStep(i); autoStep(); }));
  setStep(0);
  new IntersectionObserver(([e]) => e.isIntersecting ? autoStep() : clearInterval(stepTimer), { threshold: .3 }).observe($('#how-to-eat'));

  /* ---------------- Spaces slider ---------------- */
  const track = $('#spacesTrack');
  $$('[data-slide]').forEach(b => b.addEventListener('click', () => {
    const card = $('.space-card', track);
    track.scrollBy({ left: +b.dataset.slide * (card.offsetWidth + 20), behavior: 'smooth' });
  }));

  /* ---------------- Booking modal ---------------- */
  const modal = $('#bookingModal'), form = $('#bookingForm');
  let guests = 2;
  function openModal(e) {
    if (e) e.preventDefault();
    modal.hidden = false; document.body.classList.add('modal-open');
    form.reset(); guests = 2; $('#gCount').textContent = guests;
    $$('.form-grid, .guests-pick, .form-note', form).forEach(el => el.hidden = false);
    $('button[type=submit]', form).hidden = false; $('.form-done', form).hidden = true;
    const d = $('input[name=date]', form); const today = new Date().toISOString().slice(0, 10); d.min = today; d.value = today;
    setTimeout(() => $('input[name=name]', form).focus(), 300);
  }
  function closeModal() {
    modal.classList.add('is-closing');
    setTimeout(() => { modal.hidden = true; modal.classList.remove('is-closing'); document.body.classList.remove('modal-open'); }, 340);
  }
  function bindBooking() { $$('.open-booking').forEach(b => { if (b.dataset.bound) return; b.dataset.bound = 1; b.addEventListener('click', openModal); }); }
  bindBooking();
  $$('[data-close]', modal).forEach(b => b.addEventListener('click', closeModal));
  addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });
  $$('[data-g]', form).forEach(b => b.addEventListener('click', () => { guests = Math.min(40, Math.max(1, guests + +b.dataset.g)); $('#gCount').textContent = guests; }));
  form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    $$('input[required]', form).forEach(inp => {
      const bad = !inp.value.trim() || (inp.name === 'phone' && inp.value.replace(/\D/g, '').length < 9);
      inp.classList.toggle('is-invalid', bad); if (bad) ok = false;
    });
    if (!ok) return;
    // TODO: connect to the restaurant's booking channel (Formspree, WhatsApp, email or a booking system).
    $$('.form-grid, .guests-pick, .form-note', form).forEach(el => el.hidden = true);
    $('button[type=submit]', form).hidden = true; $('.form-done', form).hidden = false;
  });

  /* ---------------- Preloader & start ---------------- */
  $$('.preloader__word span').forEach((s, i) => s.style.setProperty('--i', i));
  $('#year').textContent = new Date().getFullYear();
  document.body.classList.add('is-loading');
  applyLang(lang, true);

  const start = () => {
    $('.preloader').classList.add('is-done');
    document.body.classList.remove('is-loading');
    document.body.classList.add('is-ready');
    setTimeout(() => { $$('.hero .split').forEach(el => { el.style.setProperty('--base', '0s'); el.classList.add('is-in'); }); }, 300);
    observeAll(); onScroll();
  };
  const minTime = reduce ? 0 : 1500, t0 = performance.now();
  const go = () => setTimeout(start, Math.max(0, minTime - (performance.now() - t0)));
  if (document.readyState === 'complete') go(); else addEventListener('load', go);
  setTimeout(() => { if (!document.body.classList.contains('is-ready')) start(); }, 4000); // safety
})();
