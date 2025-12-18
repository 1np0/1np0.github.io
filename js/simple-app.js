// Simple Inventory App
class SimpleInventory {
    constructor() {
        this.items = this.loadItems();
        this.currentView = 'dashboard-view';
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadItemsList();
        this.updateNavState();
    }

    bindEvents() {
        // Form submission
        const form = document.getElementById('itemForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveItem();
            });

            // Show/hide save button
            form.addEventListener('input', () => {
                this.toggleSaveButton();
            });
        }

        // Search functionality
        const searchInput = document.getElementById('searchItems');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchItems(e.target.value);
            });
        }

        // Filter chips
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('chip')) {
                this.setFilter(e.target.dataset.filter);
            }
        });

        // Auto-generate code
        document.getElementById('itemName')?.addEventListener('input', (e) => {
            if (document.getElementById('itemCode').value === '') {
                this.generateCode();
            }
        });
    }

    // View Management
    showView(viewId) {
        // Hide all views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });

        // Show target view
        const targetView = document.getElementById(viewId);
        if (targetView) {
            targetView.classList.add('active');
            this.currentView = viewId;
            this.updateNavState();
            
            // Load data for specific views
            if (viewId === 'items-view') {
                this.loadItemsList();
            } else if (viewId === 'add-item-view') {
                this.resetForm();
            }
        }

        // Hide save button when leaving add-item view
        if (viewId !== 'add-item-view') {
            this.hideSaveButton();
        }
    }

    updateNavState() {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });

        const activeNav = document.querySelector(`[onclick="showView('${this.currentView}')"]`);
        if (activeNav) {
            activeNav.classList.add('active');
        }
    }

    // Item Management
    generateCode() {
        const name = document.getElementById('itemName').value;
        if (name) {
            const prefix = name.substring(0, 2).toUpperCase();
            const timestamp = Date.now().toString().slice(-4);
            const code = `${prefix}${timestamp}`;
            document.getElementById('itemCode').value = code;
        }
    }

    saveItem() {
        const formData = {
            id: Date.now(),
            name: document.getElementById('itemName').value,
            code: document.getElementById('itemCode').value || this.generateCode(),
            category: document.getElementById('itemCategory').value,
            stock: parseInt(document.getElementById('itemStock').value) || 0,
            unit: document.getElementById('itemUnit').value,
            cost: parseFloat(document.getElementById('itemCost').value) || 0,
            price: parseFloat(document.getElementById('itemPrice').value) || 0,
            description: document.getElementById('itemDescription').value,
            minStock: parseInt(document.getElementById('minStock').value) || 5,
            createdAt: new Date().toISOString()
        };

        // Validation
        if (!formData.name || !formData.stock) {
            alert('Nama item dan stok harus diisi!');
            return;
        }

        this.items.push(formData);
        this.saveItems();
        this.showView('items-view');
        
        // Show success message
        this.showMessage('Item berhasil ditambahkan!', 'success');
    }

    deleteItem(id) {
        if (confirm('Apakah Anda yakin ingin menghapus item ini?')) {
            this.items = this.items.filter(item => item.id !== id);
            this.saveItems();
            this.loadItemsList();
            this.showMessage('Item berhasil dihapus!', 'success');
        }
    }

    editItem(id) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            // Populate form with item data
            document.getElementById('itemName').value = item.name;
            document.getElementById('itemCode').value = item.code;
            document.getElementById('itemCategory').value = item.category;
            document.getElementById('itemStock').value = item.stock;
            document.getElementById('itemUnit').value = item.unit;
            document.getElementById('itemCost').value = item.cost;
            document.getElementById('itemPrice').value = item.price;
            document.getElementById('itemDescription').value = item.description;
            document.getElementById('minStock').value = item.minStock;
            
            // Set form to edit mode
            this.currentEditId = id;
            this.showView('add-item-view');
            this.showSaveButton();
        }
    }

    // List Management
    loadItemsList() {
        const container = document.getElementById('itemsList');
        if (!container) return;

        if (this.items.length === 0) {
            container.innerHTML = this.getEmptyState();
            return;
        }

        let filteredItems = [...this.items];

        // Apply search filter
        const searchTerm = document.getElementById('searchItems')?.value.toLowerCase();
        if (searchTerm) {
            filteredItems = filteredItems.filter(item => 
                item.name.toLowerCase().includes(searchTerm) ||
                item.code.toLowerCase().includes(searchTerm)
            );
        }

        // Apply category filter
        const activeFilter = document.querySelector('.chip.active')?.dataset.filter;
        if (activeFilter && activeFilter !== 'all') {
            filteredItems = filteredItems.filter(item => {
                if (activeFilter === 'available') return item.stock > 0;
                if (activeFilter === 'low') return item.stock > 0 && item.stock <= item.minStock;
                return true;
            });
        }

        container.innerHTML = filteredItems.map(item => this.renderItemCard(item)).join('');
    }

    renderItemCard(item) {
        const stockStatus = this.getStockStatus(item);
        const stockClass = stockStatus.class;
        const stockText = stockStatus.text;

        return `
            <div class="item-card" onclick="inventoryApp.editItem(${item.id})">
                <div class="item-avatar">
                    ${item.name.substring(0, 2).toUpperCase()}
                </div>
                <div class="item-info">
                    <div class="item-name">${item.name}</div>
                    <div class="item-code">${item.code}</div>
                </div>
                <div class="item-stock">
                    <div class="stock-number ${stockClass}">${item.stock}</div>
                    <div class="stock-label">${stockText}</div>
                    ${item.price > 0 ? `<div class="item-price">Rp ${this.formatNumber(item.price)}</div>` : ''}
                </div>
            </div>
        `;
    }

    getStockStatus(item) {
        if (item.stock <= 0) {
            return { class: 'empty', text: 'Habis' };
        } else if (item.stock <= item.minStock) {
            return { class: 'low', text: 'Rendah' };
        } else {
            return { class: 'available', text: 'Tersedia' };
        }
    }

    searchItems(query) {
        this.loadItemsList();
    }

    setFilter(filter) {
        document.querySelectorAll('.chip').forEach(chip => {
            chip.classList.remove('active');
        });
        
        const activeChip = document.querySelector(`[data-filter="${filter}"]`);
        if (activeChip) {
            activeChip.classList.add('active');
        }
        
        this.loadItemsList();
    }

    // Form Management
    toggleSaveButton() {
        const name = document.getElementById('itemName').value;
        const stock = document.getElementById('itemStock').value;
        
        if (name && stock) {
            this.showSaveButton();
        } else {
            this.hideSaveButton();
        }
    }

    showSaveButton() {
        const saveBtn = document.getElementById('saveBtn');
        if (saveBtn) {
            saveBtn.style.display = 'block';
        }
    }

    hideSaveButton() {
        const saveBtn = document.getElementById('saveBtn');
        if (saveBtn) {
            saveBtn.style.display = 'none';
        }
    }

    resetForm() {
        const form = document.getElementById('itemForm');
        if (form) {
            form.reset();
            this.hideSaveButton();
        }
    }

    // Data Persistence
    saveItems() {
        localStorage.setItem('inventory_items', JSON.stringify(this.items));
    }

    loadItems() {
        const saved = localStorage.getItem('inventory_items');
        return saved ? JSON.parse(saved) : this.getSampleItems();
    }

    getSampleItems() {
        return [
            {
                id: 1,
                name: 'Kopi Arabika',
                code: 'KO001',
                category: 'minuman',
                stock: 25,
                unit: 'pcs',
                cost: 15000,
                price: 25000,
                description: 'Kopi arabika premium',
                minStock: 10,
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                name: 'Teh Tarik',
                code: 'TE002',
                category: 'minuman',
                stock: 5,
                unit: 'pcs',
                cost: 5000,
                price: 12000,
                description: 'Teh tarik manis',
                minStock: 8,
                createdAt: new Date().toISOString()
            },
            {
                id: 3,
                name: 'Nasi Ayam',
                code: 'NA003',
                category: 'makanan',
                stock: 0,
                unit: 'pcs',
                cost: 8000,
                price: 15000,
                description: 'Nasi dengan ayam',
                minStock: 15,
                createdAt: new Date().toISOString()
            }
        ];
    }

    // UI Utilities
    formatNumber(num) {
        return new Intl.NumberFormat('id-ID').format(num);
    }

    showMessage(message, type = 'info') {
        // Simple toast notification
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 14px;
            z-index: 1000;
            animation: slideDown 0.3s ease;
        `;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    getEmptyState() {
        return `
            <div class="empty-state">
                <div class="icon">📦</div>
                <h3>Belum ada items</h3>
                <p>Mulai dengan menambahkan item pertama Anda</p>
            </div>
        `;
    }
}

// Global functions for onclick handlers
function showView(viewId) {
    inventoryApp.showView(viewId);
}

function generateCode() {
    inventoryApp.generateCode();
}

function saveItem() {
    inventoryApp.saveItem();
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.inventoryApp = new SimpleInventory();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideUp {
        from {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        to {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);