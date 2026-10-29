(() => {
  const p = new URLSearchParams(location.search);
  const tema = p.get('tema');
  if (tema === 'claro' || tema === 'escuro') document.documentElement.dataset.tema = tema;

  let categoria = p.get('categoria') || 'Todas';
  let busca = '';
  let itens = [];
  const $ = (id) => document.getElementById(id);
  const norm = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

  function renderChips() {
    const cats = ['Todas', ...new Set(itens.map((i) => i.categoria))];
    $('chips').replaceChildren(...cats.map((c) => {
      const b = document.createElement('button');
      b.className = 'chip';
      b.textContent = c;
      b.setAttribute('aria-pressed', c === categoria);
      b.onclick = () => { categoria = c; renderChips(); renderLista(); };
      return b;
    }));
  }

  function renderLista() {
    const termo = norm(busca);
    const achados = itens.filter((i) =>
      (categoria === 'Todas' || i.categoria === categoria) &&
      (!termo || norm(i.pergunta + ' ' + i.resposta).includes(termo)));
    $('estado').textContent = achados.length ? '' : 'Nenhuma dúvida encontrada. Tente outra palavra ou escolha "Todas".';
    $('lista').replaceChildren(...achados.map((i) => {
      const d = document.createElement('details');
      const s = document.createElement('summary');
      const r = document.createElement('p');
      s.textContent = i.pergunta;
      r.textContent = i.resposta;
      d.append(s, r);
      return d;
    }));
  }

  function erro() {
    const e = $('estado');
    e.textContent = 'Não foi possível carregar as dúvidas. Verifique sua conexão.';
    const b = document.createElement('button');
    b.textContent = 'Tentar de novo';
    b.onclick = () => location.reload();
    e.append(b);
  }

  $('busca').addEventListener('input', (e) => { busca = e.target.value; renderLista(); });

  fetch('faq.json')
    .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then((d) => { itens = d; renderChips(); renderLista(); })
    .catch(erro);
})();
