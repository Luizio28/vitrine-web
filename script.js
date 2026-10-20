// PRODUCTS, CATEGORIES, STORE e FILAMENT_COLORS vêm de products.js

const CART_KEY = 'euna3d-cart';
const MAX_PRICE = 250;

const STATUS_LABEL = {
	pronta: 'Pronta entrega',
	encomenda: 'Sob encomenda'
};

// LOCAL STATE
let state = {
	searchQuery: '',
	selectedCategories: [],
	status: 'todos',
	maxPrice: MAX_PRICE,
	sortBy: 'default',
	cart: loadCart(),
	activeProduct: {
		product: null,
		color: FILAMENT_COLORS[0].name,
		quantity: 1
	}
};

// DOM ELEMENTS
const $ = id => document.getElementById(id);

const catalogGrid = $('catalogGrid');
const searchInput = $('searchInput');
const categoryFiltersContainer = $('categoryFilters');
const categoryStrip = $('categoryStrip');
const statusFilter = $('statusFilter');
const priceRange = $('priceRange');
const priceRangeValue = $('priceRangeValue');
const resetFiltersBtn = $('resetFilters');
const resultsCount = $('resultsCount');
const sortSelect = $('sortSelect');

// Product Modal
const productModal = $('productModal');
const modalPreviewImg = $('modalPreviewImg');
const modalProductTitle = $('modalProductTitle');
const modalProductCategory = $('modalProductCategory');
const modalStatus = $('modalStatus');
const modalStatusInfo = $('modalStatusInfo');
const colorGroup = $('colorGroup');
const colorSelector = $('colorSelector');
const colorName = $('colorName');
const qtyValue = $('qtyValue');
const modalPrice = $('modalPrice');
const addToCartBtn = $('addToCartBtn');

// Drawer
const cartBadge = $('cartBadge');
const cartDrawer = $('cartDrawer');
const drawerOverlay = $('drawerOverlay');
const cartItemsContainer = $('cartItemsContainer');
const cartTotalItems = $('cartTotalItems');
const cartLeadTime = $('cartLeadTime');
const cartSubtotal = $('cartSubtotal');

// Checkout
const checkoutModal = $('checkoutModal');
const orderForm = $('orderForm');

window.addEventListener('DOMContentLoaded', () => {
	initStoreInfo();
	initFilters();
	renderCatalog();
	updateCartUI();
	setupEventListeners();
});

// HELPERS
function formatBRL(value) {
	return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function normalize(text) {
	return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

function whatsappLink(message) {
	return `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(message)}`;
}

function loadCart() {
	try {
		const saved = JSON.parse(localStorage.getItem(CART_KEY)) || [];
		// descarta itens que não existem mais no catálogo
		return saved.filter(item => PRODUCTS.some(p => p.id === item.productId));
	} catch {
		return [];
	}
}

function saveCart() {
	try {
		localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
	} catch {
		// navegação privada ou armazenamento bloqueado: o carrinho segue só na memória
	}
}

function getProduct(id) {
	return PRODUCTS.find(p => p.id === id);
}

// INIT
function initStoreInfo() {
	const hello = `Olá! Vim pela vitrine da ${STORE.name} e queria tirar uma dúvida.`;
	$('heroWhatsapp').href = whatsappLink(hello);

	const footerWhatsapp = $('footerWhatsapp');
	footerWhatsapp.href = whatsappLink(hello);
	footerWhatsapp.textContent = `WhatsApp ${STORE.whatsappLabel}`;

	const footerInstagram = $('footerInstagram');
	if (STORE.instagram) {
		footerInstagram.href = `https://www.instagram.com/${STORE.instagram}/`;
		footerInstagram.textContent = `@${STORE.instagram}`;
	} else {
		footerInstagram.hidden = true;
	}

	const ready = PRODUCTS.filter(p => p.status === 'pronta').length;
	const minPrice = Math.min(...PRODUCTS.map(p => p.price));
	$('heroStats').innerHTML = `
		<li><strong>${PRODUCTS.length}</strong> peças no catálogo</li>
		<li><strong>${ready}</strong> a pronta entrega</li>
		<li>a partir de <strong>${formatBRL(minPrice)}</strong></li>
	`;
}

function initFilters() {
	const counts = {};
	PRODUCTS.forEach(p => p.categories.forEach(cat => {
		counts[cat] = (counts[cat] || 0) + 1;
	}));

	const categories = Object.keys(CATEGORIES).filter(cat => counts[cat]);

	categoryFiltersContainer.innerHTML = categories.map(cat => `
		<label class="checkbox-label">
			<input type="checkbox" value="${cat}" class="cat-checkbox">
			<span>${CATEGORIES[cat]} ${cat}</span>
			<span class="count">${counts[cat]}</span>
		</label>
	`).join('');

	categoryStrip.innerHTML = `
		<button type="button" class="chip active" data-cat="">Tudo</button>
		${categories.map(cat => `<button type="button" class="chip" data-cat="${cat}">${CATEGORIES[cat]} ${cat}</button>`).join('')}
	`;
}

// CATALOG
function getFilteredProducts() {
	const query = normalize(state.searchQuery);

	let filtered = PRODUCTS.filter(product => {
		const matchesSearch = !query ||
			normalize(product.title).includes(query) ||
			product.categories.some(cat => normalize(cat).includes(query));

		const matchesCategory = state.selectedCategories.length === 0 ||
			product.categories.some(cat => state.selectedCategories.includes(cat));

		const matchesStatus = state.status === 'todos' || product.status === state.status;
		const matchesPrice = product.price <= state.maxPrice;

		return matchesSearch && matchesCategory && matchesStatus && matchesPrice;
	});

	if (state.sortBy === 'price-asc') {
		filtered.sort((a, b) => a.price - b.price);
	} else if (state.sortBy === 'price-desc') {
		filtered.sort((a, b) => b.price - a.price);
	} else if (state.sortBy === 'name') {
		filtered.sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'));
	}

	return filtered;
}

function renderCatalog() {
	const filtered = getFilteredProducts();

	resultsCount.textContent = `${filtered.length} de ${PRODUCTS.length} produtos`;

	if (filtered.length === 0) {
		catalogGrid.innerHTML = `
			<div class="empty-state">
				<h3>Nenhuma peça encontrada</h3>
				<p>Ajuste os filtros ou <a href="${whatsappLink('Olá! Não encontrei o que procurava na vitrine. Vocês fazem peças personalizadas?')}" target="_blank" rel="noopener">peça um orçamento personalizado</a>.</p>
			</div>
		`;
		return;
	}

	catalogGrid.innerHTML = filtered.map(product => `
		<article class="product-card">
			<button type="button" class="card-preview" data-open="${product.id}" aria-label="Ver detalhes de ${product.title}">
				<img src="${product.image}" alt="${product.title}" class="product-img" loading="lazy">
				<span class="status-badge ${product.status}">${STATUS_LABEL[product.status]}</span>
			</button>
			<div class="card-body">
				<div class="card-category">${product.categories.join(' · ')}</div>
				<h4 class="card-title">${product.title}</h4>
				<div class="card-footer">
					<span class="price-val">${formatBRL(product.price)}</span>
					<button type="button" class="btn btn-outline btn-sm" data-open="${product.id}">
						${product.status === 'pronta' ? 'Adicionar' : 'Encomendar'}
					</button>
				</div>
			</div>
		</article>
	`).join('');
}

function syncCategoryUI() {
	document.querySelectorAll('.cat-checkbox').forEach(cb => {
		cb.checked = state.selectedCategories.includes(cb.value);
	});
	document.querySelectorAll('#categoryStrip .chip').forEach(chip => {
		const cat = chip.dataset.cat;
		const active = cat === '' ? state.selectedCategories.length === 0 :
			state.selectedCategories.length === 1 && state.selectedCategories[0] === cat;
		chip.classList.toggle('active', active);
	});
}

// PRODUCT MODAL
function openProduct(productId) {
	const product = getProduct(productId);
	if (!product) return;

	const a = state.activeProduct;
	a.product = product;
	a.quantity = 1;
	a.color = FILAMENT_COLORS[0].name;

	modalProductTitle.textContent = product.title;
	modalProductCategory.textContent = product.categories.map(cat => `${CATEGORIES[cat]} ${cat}`).join(' · ');
	modalPreviewImg.src = product.image;
	modalPreviewImg.alt = product.title;

	modalStatus.textContent = STATUS_LABEL[product.status];
	modalStatus.className = `status-badge ${product.status}`;

	const isOrder = product.status === 'encomenda';
	modalStatusInfo.textContent = isOrder
		? 'Peça produzida sob encomenda em impressão 3D (FDM). Escolha a cor de preferência — prazo e disponibilidade do filamento são confirmados pela loja.'
		: 'Peça pronta para envio ou retirada. A cor é a da foto.';
	colorGroup.hidden = !isOrder;
	addToCartBtn.textContent = isOrder ? 'Adicionar encomenda' : 'Adicionar ao carrinho';

	colorSelector.innerHTML = FILAMENT_COLORS.map((c, i) => `
		<button type="button" class="color-swatch ${i === 0 ? 'active' : ''}" style="background: ${c.hex};" data-name="${c.name}" title="${c.name}" aria-label="${c.name}"></button>
	`).join('');

	updateModal();
	productModal.classList.add('active');
}

function updateModal() {
	const a = state.activeProduct;
	qtyValue.textContent = a.quantity;
	colorName.textContent = `· ${a.color}`;
	modalPrice.textContent = formatBRL(a.product.price * a.quantity);
}

function closeModal(modal) {
	modal.classList.remove('active');
}

// CART
function addToCart() {
	const a = state.activeProduct;
	const color = a.product.status === 'encomenda' ? a.color : null;
	const existing = state.cart.find(i => i.productId === a.product.id && i.color === color);

	if (existing) {
		existing.quantity += a.quantity;
	} else {
		state.cart.push({
			cartItemId: 'item_' + Date.now(),
			productId: a.product.id,
			color,
			quantity: a.quantity
		});
	}

	saveCart();
	updateCartUI();
	closeModal(productModal);
	showToast(`${a.product.title} adicionado ao carrinho`);
}

function updateCartUI() {
	const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
	cartBadge.textContent = totalCount;

	if (state.cart.length === 0) {
		cartItemsContainer.innerHTML = `
			<div class="empty-state">
				<p>Seu carrinho está vazio.</p>
				<p class="muted-small">Escolha uma peça na coleção para começar.</p>
			</div>
		`;
		cartTotalItems.textContent = '0';
		cartLeadTime.textContent = '--';
		cartSubtotal.textContent = formatBRL(0);
		return;
	}

	let subtotal = 0;

	cartItemsContainer.innerHTML = state.cart.map(item => {
		const product = getProduct(item.productId);
		const itemTotal = product.price * item.quantity;
		subtotal += itemTotal;

		return `
			<div class="cart-item">
				<div class="cart-item-preview">
					<img src="${product.image}" alt="${product.title}">
				</div>
				<div class="cart-item-details">
					<div class="cart-item-title">${product.title}</div>
					<div class="cart-item-meta">${STATUS_LABEL[product.status]}${item.color ? ` • ${item.color}` : ''}</div>
					<div class="cart-item-price">${formatBRL(itemTotal)}</div>
					<div class="qty-control">
						<button class="qty-btn" data-qty="-1" data-item="${item.cartItemId}" aria-label="Diminuir">−</button>
						<span>${item.quantity}</span>
						<button class="qty-btn" data-qty="1" data-item="${item.cartItemId}" aria-label="Aumentar">+</button>
					</div>
				</div>
				<button class="remove-btn" data-remove="${item.cartItemId}" aria-label="Remover ${product.title}">✕</button>
			</div>
		`;
	}).join('');

	const hasOrder = state.cart.some(item => getProduct(item.productId).status === 'encomenda');
	cartTotalItems.textContent = totalCount;
	cartLeadTime.textContent = hasOrder ? 'A combinar (encomenda)' : 'Pronta entrega';
	cartSubtotal.textContent = formatBRL(subtotal);
}

function changeQty(cartItemId, delta) {
	const item = state.cart.find(i => i.cartItemId === cartItemId);
	if (!item) return;

	item.quantity += delta;
	if (item.quantity <= 0) {
		state.cart = state.cart.filter(i => i.cartItemId !== cartItemId);
	}
	saveCart();
	updateCartUI();
}

function removeItem(cartItemId) {
	state.cart = state.cart.filter(i => i.cartItemId !== cartItemId);
	saveCart();
	updateCartUI();
	showToast('Item removido');
}

function buildOrderMessage(name, delivery, notes) {
	let total = 0;
	const lines = state.cart.map(item => {
		const product = getProduct(item.productId);
		const itemTotal = product.price * item.quantity;
		total += itemTotal;
		const details = [STATUS_LABEL[product.status], item.color].filter(Boolean).join(', ');
		return `• ${item.quantity}x ${product.title} (${details}) — ${formatBRL(itemTotal)}`;
	});

	return [
		`Olá, ${STORE.name}! Meu nome é ${name} e gostaria de fazer este pedido:`,
		'',
		...lines,
		'',
		`Total estimado: ${formatBRL(total)}`,
		`Recebimento: ${delivery}`,
		notes ? `Observações: ${notes}` : null
	].filter(line => line !== null).join('\n');
}

// EVENTS
function setupEventListeners() {
	searchInput.addEventListener('input', (e) => {
		state.searchQuery = e.target.value.trim();
		renderCatalog();
	});

	categoryFiltersContainer.addEventListener('change', () => {
		state.selectedCategories = Array.from(document.querySelectorAll('.cat-checkbox:checked')).map(cb => cb.value);
		syncCategoryUI();
		renderCatalog();
	});

	categoryStrip.addEventListener('click', (e) => {
		const chip = e.target.closest('.chip');
		if (!chip) return;
		state.selectedCategories = chip.dataset.cat ? [chip.dataset.cat] : [];
		syncCategoryUI();
		renderCatalog();
	});

	statusFilter.addEventListener('click', (e) => {
		const btn = e.target.closest('button');
		if (!btn) return;
		statusFilter.querySelectorAll('button').forEach(b => b.classList.toggle('active', b === btn));
		state.status = btn.dataset.status;
		renderCatalog();
	});

	priceRange.addEventListener('input', (e) => {
		state.maxPrice = parseFloat(e.target.value);
		priceRangeValue.textContent = `R$ ${state.maxPrice}`;
		renderCatalog();
	});

	sortSelect.addEventListener('change', (e) => {
		state.sortBy = e.target.value;
		renderCatalog();
	});

	resetFiltersBtn.addEventListener('click', () => {
		state.searchQuery = '';
		state.selectedCategories = [];
		state.status = 'todos';
		state.maxPrice = MAX_PRICE;
		state.sortBy = 'default';

		searchInput.value = '';
		priceRange.value = MAX_PRICE;
		priceRangeValue.textContent = `R$ ${MAX_PRICE}`;
		sortSelect.value = 'default';
		statusFilter.querySelectorAll('button').forEach(b => b.classList.toggle('active', b.dataset.status === 'todos'));

		syncCategoryUI();
		renderCatalog();
		showToast('Filtros limpos');
	});

	catalogGrid.addEventListener('click', (e) => {
		const trigger = e.target.closest('[data-open]');
		if (trigger) openProduct(trigger.dataset.open);
	});

	// Product modal
	colorSelector.addEventListener('click', (e) => {
		const swatch = e.target.closest('.color-swatch');
		if (!swatch) return;
		colorSelector.querySelectorAll('.color-swatch').forEach(s => s.classList.toggle('active', s === swatch));
		state.activeProduct.color = swatch.dataset.name;
		updateModal();
	});

	$('qtyMinus').addEventListener('click', () => {
		state.activeProduct.quantity = Math.max(1, state.activeProduct.quantity - 1);
		updateModal();
	});

	$('qtyPlus').addEventListener('click', () => {
		state.activeProduct.quantity += 1;
		updateModal();
	});

	addToCartBtn.addEventListener('click', addToCart);
	$('closeProduct').addEventListener('click', () => closeModal(productModal));

	// Drawer
	const openDrawer = () => {
		cartDrawer.classList.add('active');
		drawerOverlay.classList.add('active');
	};
	const closeDrawer = () => {
		cartDrawer.classList.remove('active');
		drawerOverlay.classList.remove('active');
	};

	$('cartTrigger').addEventListener('click', openDrawer);
	$('closeDrawer').addEventListener('click', closeDrawer);
	drawerOverlay.addEventListener('click', closeDrawer);

	cartItemsContainer.addEventListener('click', (e) => {
		const qtyBtn = e.target.closest('[data-qty]');
		if (qtyBtn) changeQty(qtyBtn.dataset.item, parseInt(qtyBtn.dataset.qty));
		const removeBtn = e.target.closest('[data-remove]');
		if (removeBtn) removeItem(removeBtn.dataset.remove);
	});

	// Checkout
	$('checkoutBtn').addEventListener('click', () => {
		if (state.cart.length === 0) {
			showToast('Seu carrinho está vazio');
			return;
		}
		closeDrawer();
		checkoutModal.classList.add('active');
		$('customerName').focus();
	});

	$('closeCheckout').addEventListener('click', () => {
		closeModal(checkoutModal);
		openDrawer();
	});

	orderForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const message = buildOrderMessage(
			$('customerName').value.trim(),
			$('deliveryMode').value,
			$('orderNotes').value.trim()
		);
		window.open(whatsappLink(message), '_blank', 'noopener');

		// o carrinho é mantido: se o WhatsApp não abrir, o cliente não perde o pedido
		closeModal(checkoutModal);
		showToast('Pedido aberto no WhatsApp. É só enviar!');
	});

	// Fecha modais clicando fora ou com Esc
	[productModal, checkoutModal].forEach(modal => {
		modal.addEventListener('click', (e) => {
			if (e.target === modal) closeModal(modal);
		});
	});

	document.addEventListener('keydown', (e) => {
		if (e.key !== 'Escape') return;
		closeModal(productModal);
		closeModal(checkoutModal);
		closeDrawer();
	});
}

function showToast(message) {
	const container = $('toastContainer');
	const toast = document.createElement('div');
	toast.className = 'toast';
	toast.textContent = message;
	container.appendChild(toast);

	setTimeout(() => {
		toast.style.opacity = '0';
		toast.style.transform = 'translateX(100%)';
		toast.style.transition = 'all 0.3s ease';
		setTimeout(() => toast.remove(), 300);
	}, 2500);
}
