/* ==========================================================================
   GUIA TUTORIAL FRONT-END COMPLETO — JAVASCRIPT (Lógica e Interatividade)
   ==========================================================================
   O JavaScript é o motor da aplicação. É ele quem responde aos cliques do usuário,
   lê formulários, faz cálculos em tempo real e altera a tela dinamicamente.
   
   📖 CONCEITOS FUNDAMENTAIS DE JAVASCRIPT PARA INICIANTES:
   - Variáveis / Objetos / Arrays: Guardam informações na memória (ex: `state`).
   - Funções (function): Bloco de código reutilizável executado sob comando (ex: `addItem()`).
   - Eventos (DOMContentLoaded, click, submit): Ouvem ações do usuário na página.
   - Manipulação do DOM (Document Object Model): O JS lê e altera o HTML diretamente
     usando comandos como `document.getElementById('...')` e `.innerText`.
   
   🔗 MAPA DE COMUNICAÇÃO DO JAVASCRIPT:
   1. O JS CAPTURA os elementos do HTML usando `document.getElementById('id-do-elemento')`.
   2. O JS LÊ os dados digitados ou os cliques feitos nos botões com `onclick="..."`.
   3. O JS ALTERA o HTML inserindo textos (`.innerText`), alterando classes (`.classList.add(...)`) 
      e criando novos cartões de produto dinamicamente na tela!
========================================================================== */

/* 
  1. ESTADO DA APLICAÇÃO (DADOS NA MEMÓRIA)
  Esta lista guarda os dados brutos. O JS lê este array e desenha os produtos no HTML!
  
  💡 EXPERIMENTE: 
  Adicione um novo item aqui no array `items` como este exemplo:
  { id: 6, title: 'Biscoito Recheado 140g', category: 'Alimentos', price: 3.50, user: 'Você', done: false }
  Salve e recarregue o site para ver o item aparecer automaticamente na tela!
*/
const state = {
    user: { name: 'Clara', family: 'Família Silva' },
    filter: 'all',
    items: [
        { id: 1, title: 'Café Torrado 500g', category: 'Alimentos', price: 18.90, user: 'Clara', done: false },
        { id: 2, title: 'Arroz Tipo 1 (5kg)', category: 'Alimentos', price: 26.50, user: 'Lucas', done: false },
        { id: 3, title: 'Detergente Ypê 500ml (3x)', category: 'Limpeza', price: 7.20, user: 'Clara', done: false },
        { id: 4, title: 'Açúcar Refinado 1kg', category: 'Alimentos', price: 4.50, user: 'Lucas', done: true },
        { id: 5, title: 'Leite Integral 1L (6x)', category: 'Bebidas', price: 29.40, user: 'Clara', done: true }
    ]
};

/* 
  2. INICIALIZAÇÃO AUTOMÁTICA
  `document.addEventListener('DOMContentLoaded', ...)` roda a função renderItems() 
  assim que o HTML termina de ser lido pelo navegador.
*/
document.addEventListener('DOMContentLoaded', () => {
    renderItems();
});

/* 
  3. FUNÇÃO DE LOGIN
  🔗 CONEXÃO COM HTML & CSS:
  - Chamada pelo formulário no HTML: <form onsubmit="handleLogin(event)">
  - Pega o valor digitado no <input id="family-code"> no index.html
  - Remove a classe CSS 'active' do <section id="screen-login"> para escondê-lo
  - Adiciona a classe CSS 'active' no <section id="screen-dashboard"> para exibi-lo!
*/
function handleLogin(event) {
    // event.preventDefault() impede o recarregamento automático da página ao enviar formulário
    event.preventDefault();

    // Captura os valores dos inputs do HTML
    const familyCode = document.getElementById('family-code').value.trim();
    const userName = document.getElementById('user-name').value.trim();

    if (!familyCode || !userName) return; // Se algum estiver vazio, ignora

    // Atualiza o estado da memória
    state.user.name = userName;
    state.user.family = `Família ${familyCode.charAt(0).toUpperCase() + familyCode.slice(1)}`;

    // Injeta o novo nome da família e a letra inicial do usuário de volta no HTML!
    document.getElementById('display-family-name').innerText = state.user.family;
    document.getElementById('display-user-avatar').innerText = userName.charAt(0).toUpperCase();

    // Alterna a tela visível alterando as classes CSS
    document.getElementById('screen-login').classList.remove('active');
    document.getElementById('screen-dashboard').classList.add('active');
}

/* 
  4. LOGIN DEMO (ATALHO RÁPIDO)
  Preenche os campos do HTML programaticamente e envia o formulário.
*/
function demoLogin() {
    document.getElementById('family-code').value = 'silva2024';
    document.getElementById('user-name').value = 'Clara';
    document.getElementById('form-login').dispatchEvent(new Event('submit'));
}

/* 
  5. LOGOUT (SAIR)
  Volta para a tela de login trocando as classes 'active'.
*/
function logout() {
    document.getElementById('screen-dashboard').classList.remove('active');
    document.getElementById('screen-login').classList.add('active');
}

/* 
  6. ALTERNADOR DE ABAS DA NAVEGAÇÃO
  🔗 CONEXÃO COM HTML & CSS:
  - Chamado pelos botões do menu no HTML: <button onclick="switchTab('tab-comparador')">
  - Remove a classe '.active' do CSS de todas as abas e coloca apenas na aba clicada!
*/
function switchTab(tabId) {
    document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    event.currentTarget.classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

/* 
  7. ADICIONAR NOVO ITEM À LISTA
  🔗 CONEXÃO COM HTML & CSS:
  - Chamado pelo formulário: <form id="form-add-item" onsubmit="addItem(event)">
  - Pega o que o usuário digitou em <input id="item-title">, <select id="item-category"> e <input id="item-price">
  - Adiciona o produto no array `state.items` e chama renderItems() para desenhá-lo no HTML!
*/
function addItem(event) {
    event.preventDefault();

    const titleInput = document.getElementById('item-title');
    const categorySelect = document.getElementById('item-category');
    const priceInput = document.getElementById('item-price');

    const title = titleInput.value.trim();
    if (!title) return;

    // Criamos um novo objeto de produto
    const newItem = {
        id: Date.now(), // Date.now() cria um número único baseado nos milissegundos atuais
        title: title,
        category: categorySelect.value,
        price: parseFloat(priceInput.value) || 0,
        user: state.user.name,
        done: false // Todo produto novo começa como NÃO comprado
    };

    state.items.unshift(newItem); // Adiciona no início da lista

    // Limpa as caixas de texto no HTML para a próxima digitação
    titleInput.value = '';
    priceInput.value = '';

    renderItems();
}

/* 
  8. MARCAR / DESMARCAR PRODUTO COMO COMPRADO
  🔗 CONEXÃO COM CSS & HTML:
  - Chamado quando o usuário clica no checkbox personalizado no HTML.
  - Inverte o status `done` do item. Quando done === true, o JS aplica a classe CSS `.completed`, 
    fazendo o estilo em style.css RISCAR O TEXTO do produto!
*/
function toggleItem(id) {
    const item = state.items.find(i => i.id === id);
    if (item) {
        item.done = !item.done;
        renderItems();
    }
}

/* 
  9. EXCLUIR PRODUTO
  Remove o item do array e atualiza a tela.
*/
function deleteItem(id) {
    state.items = state.items.filter(i => i.id !== id);
    renderItems();
}

/* 
  10. FILTRAR VISUALIZAÇÃO DA LISTA
  Filtra entre Todos / Pendentes / Comprados.
*/
function setFilter(filterType) {
    state.filter = filterType;
    document.querySelectorAll('.filter-pill').forEach(pill => pill.classList.remove('active'));
    event.currentTarget.classList.add('active');
    renderItems();
}

/* 
  11. RENDERIZADOR PRINCIPAL (GERADOR DE HTML DINÂMICO)
  🔗 CONEXÃO TRIÁDICA MAIS IMPORTANTE DO PROJETO:
  1. Lê os produtos do array `state.items`.
  2. Cria elementos `<div>` no JavaScript (`document.createElement('div')`).
  3. Aplica as classes do CSS (`card.className = 'item-card'`).
  4. Injeta todo esse HTML gerado dentro da `<div id="items-list">` do index.html!
  5. Atualiza os contadores `<span id="badge-count">` e a soma de dinheiro `<strong id="total-estimated">`.
*/
function renderItems() {
    const container = document.getElementById('items-list'); // Pega a div no HTML
    container.innerHTML = ''; // Limpa a lista antes de redesenhar

    let filteredItems = state.items;
    if (state.filter === 'pending') {
        filteredItems = state.items.filter(i => !i.done);
    } else if (state.filter === 'done') {
        filteredItems = state.items.filter(i => i.done);
    }

    if (filteredItems.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; color: var(--text-muted); padding: 32px;">
                <p>Nenhum item encontrado nesta visualização.</p>
            </div>
        `;
    } else {
        filteredItems.forEach(item => {
            const card = document.createElement('div');
            // Aplica as classes do CSS (se tiver comprado, adiciona 'completed' para riscar o texto no CSS)
            card.className = `item-card ${item.done ? 'completed' : ''}`;
            
            const priceFormatted = item.price > 0 ? `R$ ${item.price.toFixed(2).replace('.', ',')}` : 'A calcular';

            // Cria a estrutura HTML completa do produto dinamicamente
            card.innerHTML = `
                <div class="item-left">
                    <div class="custom-checkbox" onclick="toggleItem(${item.id})">
                        ${item.done ? '✓' : ''}
                    </div>
                    <div class="item-details">
                        <span class="item-title">${escapeHtml(item.title)}</span>
                        <div class="item-meta">
                            <span class="meta-category">${item.category}</span>
                            <span class="meta-user">Adicionado por ${escapeHtml(item.user)}</span>
                        </div>
                    </div>
                </div>
                <div class="item-right">
                    <span class="item-price-tag">${priceFormatted}</span>
                    <button class="btn-delete" title="Excluir" onclick="deleteItem(${item.id})">✕</button>
                </div>
            `;

            // Coloca o produto gerado dentro da div do HTML
            container.appendChild(card);
        });
    }

    // Atualiza os contadores e a somatória de valores de dinheiro no HTML
    const totalCount = state.items.length;
    const pendingCount = state.items.filter(i => !i.done).length;
    const doneCount = state.items.filter(i => i.done).length;

    document.getElementById('badge-count').innerText = pendingCount;
    document.getElementById('count-all').innerText = totalCount;
    document.getElementById('count-pending').innerText = pendingCount;
    document.getElementById('count-done').innerText = doneCount;

    // Array.reduce() soma os preços de todos os produtos da lista
    const totalEst = state.items.reduce((acc, curr) => acc + curr.price, 0);
    document.getElementById('total-estimated').innerText = `R$ ${totalEst.toFixed(2).replace('.', ',')}`;
}

/* 
  12. SEGURANÇA (EVITA INJEÇÃO DE CÓDIGOS MALICIOSOS)
  Converte caracteres especiais como < e > em texto simples.
*/
function escapeHtml(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
}
