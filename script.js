// PRODUCTS DATABASE WITH IMG SOURCES FOR USER REPLACEMENT
const PRODUCTS = [
	{
		id: 'p1',
		title: 'High-Torque Planetary Gear Set',
		category: 'Functional Parts',
		basePrice: 34.50,
		rating: 4.9,
		baseWeight: 65,
		basePrintTimeHours: 3.5,
		materials: ['PLA', 'PETG', 'ABS'],
		description: 'Precision mechanical gear set with 5:1 reduction ratio for robotics.',
		imageSrc: 'gear-set.jpg'
	},
	{
		id: 'p2',
		title: 'Cyberpunk Visor Prop',
		category: 'Props',
		basePrice: 110.00,
		rating: 4.8,
		baseWeight: 380,
		basePrintTimeHours: 14.0,
		materials: ['PLA', 'PETG'],
		description: 'Wearable futuristic prop visor with embedded mounting clips.',
		imageSrc: 'cyber-visor.jpg'
	},
	{
		id: 'p3',
		title: 'Modular Desk Organizer Block',
		category: 'Decor',
		basePrice: 12.99,
		rating: 4.6,
		baseWeight: 30,
		basePrintTimeHours: 1.2,
		materials: ['PLA', 'PETG', 'TPU'],
		description: 'Sleek geometric cable and pen holder with weighted cavities.',
		imageSrc: 'desk-organizer.jpg'
	},
	{
		id: 'p4',
		title: 'Dragon Miniature Figurine',
		category: 'Miniatures',
		basePrice: 24.00,
		rating: 5.0,
		baseWeight: 25,
		basePrintTimeHours: 4.0,
		materials: ['Resin', 'PLA'],
		description: 'Ultra-detailed high precision tabletop miniature figurine.',
		imageSrc: 'dragon-mini.jpg'
	},
	{
		id: 'p5',
		title: 'NEMA 17 Stepper Mount Bracket',
		category: 'Functional Parts',
		basePrice: 8.50,
		rating: 4.7,
		baseWeight: 40,
		basePrintTimeHours: 1.8,
		materials: ['PETG', 'ABS'],
		description: 'Heavy duty motor mounting bracket for CNC machines and printers.',
		imageSrc: 'motor-bracket.jpg'
	},
	{
		id: 'p6',
		title: 'FPV Drone Structural Arm',
		category: 'Prototypes',
		basePrice: 18.00,
		rating: 4.5,
		baseWeight: 35,
		basePrintTimeHours: 2.1,
		materials: ['PETG', 'ABS', 'TPU'],
		description: 'Lightweight high-impact motor arm replacement for quadcopters.',
		imageSrc: 'drone-arm.jpg'
	}
];

// LOCAL STATE
let state = {
	searchQuery: '',
	selectedCategories: [],
	selectedMaterials: [],
	maxPrice: 150,
	sortBy: 'default',
	cart: [],
	activeCustomizer: {
		product: null,
		material: 'PLA',
		materialCostMultiplier: 1.0,
		materialDensity: 1.24,
		colorHex: '#38bdf8',
		colorName: 'Cyan',
		infill: 20,
		layerHeight: 0.12,
		speedMultiplier: 1.4,
		scale: 100
	}
};

// DOM ELEMENTS
const catalogGrid = document.getElementById('catalogGrid');
const searchInput = document.getElementById('searchInput');
const categoryFiltersContainer = document.getElementById('categoryFilters');
const materialFiltersContainer = document.getElementById('materialFilters');
const priceRange = document.getElementById('priceRange');
const priceRangeValue = document.getElementById('priceRangeValue');
const resetFiltersBtn = document.getElementById('resetFilters');
const resultsCount = document.getElementById('resultsCount');
const sortSelect = document.getElementById('sortSelect');

// Modal Elements
const customizerModal = document.getElementById('customizerModal');
const closeCustomizer = document.getElementById('closeCustomizer');
const modalPreviewImg = document.getElementById('modalPreviewImg');
const modalProductTitle = document.getElementById('modalProductTitle');
const modalProductCategory = document.getElementById('modalProductCategory');
const calcTime = document.getElementById('calcTime');
const calcWeight = document.getElementById('calcWeight');
const infillSlider = document.getElementById('infillSlider');
const infillVal = document.getElementById('infillVal');
const scaleSlider = document.getElementById('scaleSlider');
const scaleVal = document.getElementById('scaleVal');
const modalCalculatedPrice = document.getElementById('modalCalculatedPrice');
const addToQuoteBtn = document.getElementById('addToQuoteBtn');

// Drawer Elements
const cartTrigger = document.getElementById('cartTrigger');
const cartBadge = document.getElementById('cartBadge');
const cartDrawer = document.getElementById('cartDrawer');
const drawerOverlay = document.getElementById('drawerOverlay');
const closeDrawer = document.getElementById('closeDrawer');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartTotalItems = document.getElementById('cartTotalItems');
const cartLeadTime = document.getElementById('cartLeadTime');
const cartSubtotal = document.getElementById('cartSubtotal');
const checkoutBtn = document.getElementById('checkoutBtn');

// Checkout Modal
const checkoutModal = document.getElementById('checkoutModal');
const closeCheckout = document.getElementById('closeCheckout');
const quoteForm = document.getElementById('quoteForm');

window.addEventListener('DOMContentLoaded', () => {
	initFilters();
	renderCatalog();
	setupEventListeners();
});

function initFilters() {
	const categories = [...new Set(PRODUCTS.map(p => p.category))];
	const materials = [...new Set(PRODUCTS.flatMap(p => p.materials))];

	categoryFiltersContainer.innerHTML = categories.map(cat => `
		<label class="checkbox-label">
			<input type="checkbox" value="${cat}" class="cat-checkbox">
			${cat}
		</label>
	`).join('');

	materialFiltersContainer.innerHTML = materials.map(mat => `
		<label class="checkbox-label">
			<input type="checkbox" value="${mat}" class="mat-checkbox">
			${mat}
		</label>
	`).join('');
}

function renderCatalog() {
	let filtered = PRODUCTS.filter(product => {
		const matchesSearch = product.title.toLowerCase().includes(state.searchQuery) ||
							  product.description.toLowerCase().includes(state.searchQuery) ||
							  product.category.toLowerCase().includes(state.searchQuery);
		
		const matchesCategory = state.selectedCategories.length === 0 || 
								state.selectedCategories.includes(product.category);

		const matchesMaterial = state.selectedMaterials.length === 0 || 
								product.materials.some(m => state.selectedMaterials.includes(m));

		const matchesPrice = product.basePrice <= state.maxPrice;

		return matchesSearch && matchesCategory && matchesMaterial && matchesPrice;
	});

	if (state.sortBy === 'price-asc') {
		filtered.sort((a, b) => a.basePrice - b.basePrice);
	} else if (state.sortBy === 'price-desc') {
		filtered.sort((a, b) => b.basePrice - a.basePrice);
	} else if (state.sortBy === 'rating') {
		filtered.sort((a, b) => b.rating - a.rating);
	}

	resultsCount.textContent = `Showing ${filtered.length} of ${PRODUCTS.length} parts`;

	if (filtered.length === 0) {
		catalogGrid.innerHTML = `
			<div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
				<h3>No matching items found</h3>
				<p style="font-size:0.875rem;">Adjust your filter selection to view products.</p>
			</div>
		`;
		return;
	}

	catalogGrid.innerHTML = filtered.map(product => `
		<div class="product-card">
			<div class="card-preview">
				<img src="${product.imageSrc}" alt="${product.title}" class="product-img">
			</div>
			<div class="card-body">
				<div class="card-category">${product.category}</div>
				<h4 class="card-title">${product.title}</h4>
				<div class="card-specs">
					${product.materials.map(m => `<span class="spec-pill">${m}</span>`).join('')}
					<span class="spec-pill" style="color:var(--accent-amber);">★ ${product.rating}</span>
				</div>
				<p style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 1rem;">${product.description}</p>
				<div class="card-footer">
					<span class="price-val">R$${product.basePrice.toFixed(2)}</span>
					<button class="btn btn-outline" onclick="openCustomizer('${product.id}')">Personalisar</button>
				</div>
			</div>
		</div>
	`).join('');
}

function openCustomizer(productId) {
	const product = PRODUCTS.find(p => p.id === productId);
	if (!product) return;

	state.activeCustomizer.product = product;
	state.activeCustomizer.scale = 100;
	state.activeCustomizer.infill = 20;

	modalProductTitle.textContent = product.title;
	modalProductCategory.textContent = product.category;
	modalPreviewImg.src = product.imageSrc;
	modalPreviewImg.onerror = function() {
		this.onerror = null;
		this.src = ``;
	};

	infillSlider.value = 20;
	infillVal.textContent = '20%';
	scaleSlider.value = 100;
	scaleVal.textContent = '100%';

	updateCustomizerCalculations();
	customizerModal.classList.add('active');
}

function updateCustomizerCalculations() {
	const c = state.activeCustomizer;
	if (!c.product) return;

	const scaleFactor = c.scale / 100;
	modalPreviewImg.style.transform = `scale(${Math.min(1.2, Math.max(0.8, scaleFactor))})`;

	const scaleMultiplier = Math.pow(c.scale / 100, 3);
	const infillFactor = 0.6 + (c.infill / 100) * 0.4;
	const estimatedWeight = Math.round(c.product.baseWeight * scaleMultiplier * infillFactor * (c.materialDensity / 1.24));
	const estimatedTimeHours = (c.product.basePrintTimeHours * scaleMultiplier * c.speedMultiplier * (0.8 + (c.infill / 100) * 0.2)).toFixed(1);

	const materialCost = estimatedWeight * 0.08 * c.materialCostMultiplier;
	const machineTimeCost = estimatedTimeHours * 3.50;
	const finalPrice = Math.max(c.product.basePrice * 0.5, c.product.basePrice * scaleMultiplier * 0.4 + materialCost + machineTimeCost);

	calcWeight.textContent = `${estimatedWeight}g`;
	const hours = Math.floor(estimatedTimeHours);
	const mins = Math.round((estimatedTimeHours - hours) * 60);
	calcTime.textContent = `${hours}h ${mins}m`;

	modalCalculatedPrice.textContent = `R$${finalPrice.toFixed(2)}`;
	
	c.computedPrice = finalPrice;
	c.computedWeight = estimatedWeight;
	c.computedTime = `${hours}h ${mins}m`;
}

function setupEventListeners() {
	searchInput.addEventListener('input', (e) => {
		state.searchQuery = e.target.value.toLowerCase().trim();
		renderCatalog();
	});

	categoryFiltersContainer.addEventListener('change', () => {
		state.selectedCategories = Array.from(document.querySelectorAll('.cat-checkbox:checked')).map(cb => cb.value);
		renderCatalog();
	});

	materialFiltersContainer.addEventListener('change', () => {
		state.selectedMaterials = Array.from(document.querySelectorAll('.mat-checkbox:checked')).map(cb => cb.value);
		renderCatalog();
	});

	priceRange.addEventListener('input', (e) => {
		state.maxPrice = parseFloat(e.target.value);
		priceRangeValue.textContent = `R$${state.maxPrice}`;
		renderCatalog();
	});

	sortSelect.addEventListener('change', (e) => {
		state.sortBy = e.target.value;
		renderCatalog();
	});

	resetFiltersBtn.addEventListener('click', () => {
		state.searchQuery = '';
		state.selectedCategories = [];
		state.selectedMaterials = [];
		state.maxPrice = 150;
		state.sortBy = 'default';

		searchInput.value = '';
		priceRange.value = 150;
		priceRangeValue.textContent = '$150';
		sortSelect.value = 'default';

		document.querySelectorAll('.cat-checkbox, .mat-checkbox').forEach(cb => cb.checked = false);

		renderCatalog();
		showToast('Filters reset');
	});

	document.getElementById('materialSelector').addEventListener('click', (e) => {
		if (e.target.classList.contains('btn-select')) {
			document.querySelectorAll('#materialSelector .btn-select').forEach(b => b.classList.remove('active'));
			e.target.classList.add('active');
			state.activeCustomizer.material = e.target.dataset.mat;
			state.activeCustomizer.materialCostMultiplier = parseFloat(e.target.dataset.cost);
			state.activeCustomizer.materialDensity = parseFloat(e.target.dataset.density);
			updateCustomizerCalculations();
		}
	});

	document.getElementById('colorSelector').addEventListener('click', (e) => {
		if (e.target.classList.contains('color-swatch')) {
			document.querySelectorAll('#colorSelector .color-swatch').forEach(s => s.classList.remove('active'));
			e.target.classList.add('active');
			state.activeCustomizer.colorHex = e.target.dataset.color;
			state.activeCustomizer.colorName = e.target.dataset.name;
			updateCustomizerCalculations();
		}
	});

	infillSlider.addEventListener('input', (e) => {
		state.activeCustomizer.infill = parseInt(e.target.value);
		infillVal.textContent = `${e.target.value}%`;
		updateCustomizerCalculations();
	});

	document.getElementById('layerSelector').addEventListener('click', (e) => {
		if (e.target.classList.contains('btn-select')) {
			document.querySelectorAll('#layerSelector .btn-select').forEach(b => b.classList.remove('active'));
			e.target.classList.add('active');
			state.activeCustomizer.layerHeight = parseFloat(e.target.dataset.layer);
			state.activeCustomizer.speedMultiplier = parseFloat(e.target.dataset.speed);
			updateCustomizerCalculations();
		}
	});

	scaleSlider.addEventListener('input', (e) => {
		state.activeCustomizer.scale = parseInt(e.target.value);
		scaleVal.textContent = `${e.target.value}%`;
		updateCustomizerCalculations();
	});

	closeCustomizer.addEventListener('click', () => {
		customizerModal.classList.remove('active');
	});

	addToQuoteBtn.addEventListener('click', () => {
		const c = state.activeCustomizer;
		const cartItem = {
			cartItemId: 'item_' + Date.now(),
			product: c.product,
			material: c.material,
			colorName: c.colorName,
			infill: c.infill,
			layerHeight: c.layerHeight,
			scale: c.scale,
			unitPrice: c.computedPrice,
			quantity: 1
		};

		state.cart.push(cartItem);
		updateCartUI();
		customizerModal.classList.remove('active');
		showToast(`Added ${c.product.title} to quote`);
	});

	cartTrigger.addEventListener('click', () => {
		cartDrawer.classList.add('active');
		drawerOverlay.classList.add('active');
	});

	const closeDrawerFn = () => {
		cartDrawer.classList.remove('active');
		drawerOverlay.classList.remove('active');
	};

	closeDrawer.addEventListener('click', closeDrawerFn);
	drawerOverlay.addEventListener('click', closeDrawerFn);

	checkoutBtn.addEventListener('click', () => {
		if (state.cart.length === 0) {
			showToast('Quote cart is empty');
			return;
		}
		closeDrawerFn();
		checkoutModal.classList.add('active');
	});

	closeCheckout.addEventListener('click', () => {
		checkoutModal.classList.remove('active');
	});

	quoteForm.addEventListener('submit', (e) => {
		e.preventDefault();
		checkoutModal.classList.remove('active');
		state.cart = [];
		updateCartUI();
		showToast('Quote request submitted successfully!');
	});
}

function updateCartUI() {
	cartBadge.textContent = state.cart.reduce((sum, item) => sum + item.quantity, 0);

	if (state.cart.length === 0) {
		cartItemsContainer.innerHTML = `
			<div style="text-align:center; padding: 3rem 1rem; color:var(--text-muted);">
				<p style="font-size:0.9rem;">Seu carrinho está vazio.</p>
			</div>
		`;
		cartTotalItems.textContent = '0';
		cartLeadTime.textContent = '--';
		cartSubtotal.textContent = '$0.00';
		return;
	}

	let subtotal = 0;
	let totalCount = 0;

	cartItemsContainer.innerHTML = state.cart.map(item => {
		const itemTotal = item.unitPrice * item.quantity;
		subtotal += itemTotal;
		totalCount += item.quantity;

		return `
			<div class="cart-item">
				<div class="cart-item-preview">
					<img src="${item.product.imageSrc}" alt="${item.product.title}">
				</div>
				<div class="cart-item-details">
					<div class="cart-item-title">${item.product.title}</div>
					<div class="cart-item-meta">${item.material} • ${item.colorName} • ${item.infill}% Infill</div>
					<div class="cart-item-price">R$${itemTotal.toFixed(2)}</div>
					<div class="qty-control">
						<button class="qty-btn" onclick="changeQty('${item.cartItemId}', -1)">-</button>
						<span style="font-size:0.85rem;">${item.quantity}</span>
						<button class="qty-btn" onclick="changeQty('${item.cartItemId}', 1)">+</button>
					</div>
				</div>
				<button onclick="removeItem('${item.cartItemId}')" style="background:none; border:none; color:var(--text-muted); cursor:pointer; position:absolute; top:8px; right:8px;">✕</button>
			</div>
		`;
	}).join('');

	cartTotalItems.textContent = totalCount;
	cartLeadTime.textContent = totalCount > 5 ? '3-5 Dias' : '24-48 Horas';
	cartSubtotal.textContent = `R$${subtotal.toFixed(2)}`;
}

function changeQty(cartItemId, delta) {
	const item = state.cart.find(i => i.cartItemId === cartItemId);
	if (item) {
		item.quantity += delta;
		if (item.quantity <= 0) {
			state.cart = state.cart.filter(i => i.cartItemId !== cartItemId);
		}
		updateCartUI();
	}
}

function removeItem(cartItemId) {
	state.cart = state.cart.filter(i => i.cartItemId !== cartItemId);
	updateCartUI();
	showToast('Item removido');
}

function showToast(message) {
	const container = document.getElementById('toastContainer');
	const toast = document.createElement('div');
	toast.className = 'toast';
	toast.innerHTML = `<span>${message}</span>`;
	container.appendChild(toast);

	setTimeout(() => {
		toast.style.opacity = '0';
		toast.style.transform = 'translateX(100%)';
		toast.style.transition = 'all 0.3s ease';
		setTimeout(() => toast.remove(), 300);
	}, 2500);
}
