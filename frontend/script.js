// ========== DATA MANAGEMENT ==========
class ShoppingListManager {
    constructor() {
        this.items = [];
        this.loadFromLocalStorage();
    }

    // Load data from localStorage (simulating blockchain storage)
    loadFromLocalStorage() {
        const saved = localStorage.getItem('receiptvault_items');
        this.items = saved ? JSON.parse(saved) : [];
    }

    // Save data to localStorage
    saveToLocalStorage() {
        localStorage.setItem('receiptvault_items', JSON.stringify(this.items));
    }

    // Add new item
    addItem(name, category, price, quantity, imageData = null) {
        const item = {
            id: Date.now(), // Simple unique ID
            name,
            category,
            price: parseFloat(price), // Convert to number
            quantity: parseInt(quantity),
            purchased: false,
            timestamp: new Date().toLocaleString(),
            image: imageData // Store Base64 image if provided
        };
        this.items.unshift(item); // Add to beginning
        this.saveToLocalStorage();
        return item;
    }

    // Delete item
    deleteItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.saveToLocalStorage();
    }

    // Toggle purchased status
    togglePurchased(id) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.purchased = !item.purchased;
            this.saveToLocalStorage();
        }
    }

    // Get total spending
    getTotalSpending() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Get purchased count
    getPurchasedCount() {
        return this.items.filter(item => item.purchased).length;
    }

    // Clear all items
    clearAll() {
        this.items = [];
        this.saveToLocalStorage();
    }

    // Filter items
    filterItems(searchTerm, category) {
        return this.items.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = !category || item.category === category;
            return matchesSearch && matchesCategory;
        });
    }
}

// Initialize manager
const shoppingManager = new ShoppingListManager();

// ========== REWARD MANAGEMENT ==========
class RewardManager {
    constructor() {
        this.userPoints = 0;
        this.nfts = [];
        this.leaderboard = [];
        this.loadRewardsFromLocalStorage();
    }

    loadRewardsFromLocalStorage() {
        const points = localStorage.getItem('receiptvault_points');
        const nfts = localStorage.getItem('receiptvault_nfts');
        const leaderboard = localStorage.getItem('receiptvault_leaderboard');
        
        this.userPoints = points ? parseInt(points) : 0;
        this.nfts = nfts ? JSON.parse(nfts) : [];
        this.leaderboard = leaderboard ? JSON.parse(leaderboard) : [];
    }

    saveRewardsToLocalStorage() {
        localStorage.setItem('receiptvault_points', this.userPoints.toString());
        localStorage.setItem('receiptvault_nfts', JSON.stringify(this.nfts));
        localStorage.setItem('receiptvault_leaderboard', JSON.stringify(this.leaderboard));
    }

    // Add reward points (1 point per item)
    addPoints(amount = 1) {
        this.userPoints += amount;
        this.saveRewardsToLocalStorage();
    }

    // Claim NFT (10 points = 1 NFT)
    claimNFT() {
        if (this.userPoints >= 10) {
            const nft = {
                id: Date.now(),
                name: `Receipt Vault NFT #${this.nfts.length + 1}`,
                pointsUsed: 10,
                mintedAt: new Date().toLocaleString(),
            };
            
            this.nfts.push(nft);
            this.userPoints -= 10;
            
            // Update leaderboard
            this.updateLeaderboard(this.nfts.length);
            
            this.saveRewardsToLocalStorage();
            return nft;
        }
        return null;
    }

    // Update leaderboard
    updateLeaderboard(nftCount) {
        // Mock leaderboard - add current user
        const existingUser = this.leaderboard.find(u => u.id === 'user1');
        if (existingUser) {
            existingUser.nftCount = nftCount;
            existingUser.points = this.userPoints;
        } else {
            this.leaderboard.unshift({
                id: 'user1',
                name: 'Your Wallet',
                nftCount: nftCount,
                points: this.userPoints,
                timestamp: new Date().toLocaleString(),
            });
        }
        
        // Add some mock data for demonstration
        if (this.leaderboard.length === 1) {
            this.leaderboard.push(
                { id: 'user2', name: 'Alice.stellar', nftCount: 5, points: 38 },
                { id: 'user3', name: 'Bob.stellar', nftCount: 3, points: 22 },
                { id: 'user4', name: 'Charlie.stellar', nftCount: 2, points: 15 }
            );
        }
        
        // Sort by NFT count
        this.leaderboard.sort((a, b) => b.nftCount - a.nftCount);
        this.saveRewardsToLocalStorage();
    }

    getLeaderboardByPoints() {
        return [...this.leaderboard].sort((a, b) => b.points - a.points);
    }

    getLeaderboardByNFTs() {
        return [...this.leaderboard].sort((a, b) => b.nftCount - a.nftCount);
    }
}

const rewardManager = new RewardManager();

// ========== DOM ELEMENTS ==========
const addItemForm = document.getElementById('addItemForm');
const itemNameInput = document.getElementById('itemName');
const categorySelect = document.getElementById('category');
const priceInput = document.getElementById('price');
const quantityInput = document.getElementById('quantity');
const receiptImageInput = document.getElementById('receiptImage');
const imagePreview = document.getElementById('imagePreview');
const itemsList = document.getElementById('itemsList');
const totalItemsSpan = document.getElementById('totalItems');
const totalSpendingSpan = document.getElementById('totalSpending');
const purchasedCountSpan = document.getElementById('purchasedCount');
const clearAllBtn = document.getElementById('clearAllBtn');
const searchInput = document.getElementById('searchInput');
const filterCategory = document.getElementById('filterCategory');
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.querySelector('.modal-close');

// Reward elements
const rewardPointsSpan = document.getElementById('rewardPoints');
const nftCountSpan = document.getElementById('nftCount');
const nftGallery = document.getElementById('nftGallery');
const nftGalleryDiv = document.getElementById('nftGallery');
const mintNFTBtn = document.getElementById('mintNFTBtn');
const leaderboardContent = document.getElementById('leaderboardContent');

// Store selected image data
let selectedImageData = null;
let currentLeaderboardTab = 'points';

// ========== EVENT LISTENERS ==========

/**
 * Initialize seed data on first load
 */
function initializeSeedData() {
    // Check if app has been used before
    const hasInitialized = localStorage.getItem('receiptvault_initialized');
    
    if (!hasInitialized) {
        console.log('First time! Loading seed data...');
        
        // Add demo shopping items
        const seedItems = [
            { name: 'Organic Apple Bunch', category: 'groceries', price: 4.99, quantity: 2 },
            { name: 'MacBook Pro 16"', category: 'gadgets', price: 2499.00, quantity: 1 },
            { name: 'Winter Jacket', category: 'clothes', price: 89.99, quantity: 1 },
            { name: 'Standing Desk', category: 'home', price: 399.99, quantity: 1 },
            { name: 'Face Cream SPF 50', category: 'health', price: 29.99, quantity: 1 },
            { name: '4K Monitor', category: 'gadgets', price: 399.99, quantity: 1 },
            { name: 'Yoga Mat', category: 'health', price: 34.99, quantity: 2 },
            { name: 'Coffee Maker', category: 'home', price: 149.99, quantity: 1 },
            { name: 'Running Shoes Nike', category: 'clothes', price: 129.99, quantity: 1 },
        ];
        
        // Add items to shopping list
        seedItems.forEach((item, index) => {
            shoppingManager.addItem(item.name, item.category, item.price, item.quantity, null);
            
            // Mark some as purchased (first 4 items)
            const allItems = shoppingManager.items;
            if (index < 4 && allItems.length > 0) {
                allItems[0].purchased = true;
            }
        });
        
        // Save updated items
        shoppingManager.saveToLocalStorage();
        
        // Set reward points and NFTs
        rewardManager.userPoints = 45;
        rewardManager.nfts = [
            { id: 1001, name: 'Receipt Vault NFT #1', pointsUsed: 10, mintedAt: new Date(Date.now() - 3*24*60*60*1000).toLocaleString() },
            { id: 1002, name: 'Receipt Vault NFT #2', pointsUsed: 10, mintedAt: new Date(Date.now() - 2*24*60*60*1000).toLocaleString() },
            { id: 1003, name: 'Receipt Vault NFT #3', pointsUsed: 10, mintedAt: new Date(Date.now() - 1*24*60*60*1000).toLocaleString() },
        ];
        
        // Setup demo leaderboard
        rewardManager.leaderboard = [
            { id: 'user1', name: 'Your Wallet', nftCount: 3, points: 45, timestamp: new Date().toLocaleString() },
            { id: 'user2', name: 'alice.stellar', nftCount: 5, points: 68, timestamp: new Date().toLocaleString() },
            { id: 'user3', name: 'bob.stellar', nftCount: 4, points: 52, timestamp: new Date().toLocaleString() },
            { id: 'user4', name: 'charlie.stellar', nftCount: 2, points: 28, timestamp: new Date().toLocaleString() },
            { id: 'user5', name: 'diana.stellar', nftCount: 3, points: 38, timestamp: new Date().toLocaleString() },
        ];
        
        // Save rewards
        rewardManager.saveRewardsToLocalStorage();
        
        // Mark as initialized
        localStorage.setItem('receiptvault_initialized', 'true');
        
        console.log('✅ Seed data loaded successfully!');
    }
}

// ========== EVENT LISTENERS ==========

document.addEventListener('DOMContentLoaded', () => {
    // Initialize seed data on first load
    initializeSeedData();
    
    renderItems();
    updateStats();
    updateRewardStats();
    updateLeaderboard();
    
    // Initialize leaderboard with mock data if empty
    if (rewardManager.leaderboard.length === 0) {
        rewardManager.updateLeaderboard(0);
    }
});

addItemForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addNewItem();
});

receiptImageInput.addEventListener('change', handleImageSelect);

clearAllBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all items? This cannot be undone.')) {
        shoppingManager.clearAll();
        addItemForm.reset();
        imagePreview.innerHTML = '';
        selectedImageData = null;
        renderItems();
        updateStats();
        showToast('All items cleared!', 'success');
    }
});

searchInput.addEventListener('input', renderItems);
filterCategory.addEventListener('change', renderItems);

// Reward event listeners
mintNFTBtn.addEventListener('click', () => {
    const nft = rewardManager.claimNFT();
    if (nft) {
        updateRewardStats();
        updateLeaderboard();
        showToast(`🎉 NFT Minted! ${nft.name}`, 'success');
    } else {
        showToast('Need at least 10 points to claim NFT!', 'error');
    }
});

// Modal listeners
modalClose.addEventListener('click', closeModal);
imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) closeModal();
});

// ========== FUNCTIONS ==========

/**
 * Add new item to shopping list
 */
function addNewItem() {
    const name = itemNameInput.value.trim();
    const category = categorySelect.value;
    const price = priceInput.value;
    const quantity = quantityInput.value;

    if (!name || !category || !price ) {
        showToast('Please fill in all fields', 'error');
        return;
    }

    shoppingManager.addItem(name, category, price, quantity, selectedImageData);
    
    // Add reward points
    rewardManager.addPoints(1);
    
    // Reset form
    addItemForm.reset();
    quantityInput.value = '1';
    imagePreview.innerHTML = '';
    selectedImageData = null;
    
    // Update UI
    renderItems();
    updateStats();
    updateRewardStats();
    updateLeaderboard();
    showToast(`${name} added + 1 reward point! 🎉`, 'success');
}

/**
 * Render shopping list items
 */
function renderItems() {
    const searchTerm = searchInput.value;
    const category = filterCategory.value;
    const filteredItems = shoppingManager.filterItems(searchTerm, category);

    // Clear list
    itemsList.innerHTML = '';

    if (filteredItems.length === 0) {
        itemsList.innerHTML = `
            <div class="empty-state">
                <p>📝 No items match your search. Start adding items to your shopping list!</p>
            </div>
        `;
        return;
    }

    // Render items
    filteredItems.forEach(item => {
        const itemCard = createItemCard(item);
        itemsList.appendChild(itemCard);
    });
}

/**
 * Create item card element
 */
function createItemCard(item) {
    const card = document.createElement('div');
    card.className = `item-card ${item.purchased ? 'purchased' : ''}`;
    
    const categoryEmojis = {
        groceries: '🛒',
        gadgets: '📱',
        clothes: '👕',
        home: '🏠',
        health: '💊',
        entertainment: '🎬',
        other: '📦'
    };

    const categoryEmoji = categoryEmojis[item.category] || '📦';
    const totalPrice = (item.price * item.quantity).toFixed(2);

    // Build thumbnail HTML if image exists
    const thumbnailHTML = item.image ? `
        <img 
            class="item-thumbnail" 
            src="${item.image}" 
            alt="Receipt"
            onclick="openModal('${item.image.replace(/'/g, "\\'")}')"
            title="Click to view receipt"
        >
    ` : '';

    card.innerHTML = `
        <input 
            type="checkbox" 
            class="item-checkbox" 
            ${item.purchased ? 'checked' : ''}
            onchange="togglePurchased(${item.id})"
        >
        ${thumbnailHTML}
        <div class="item-content">
            <div class="item-name">${escapeHtml(item.name)}</div>
            <div class="item-meta">
                <span class="category-badge">${categoryEmoji} ${capitalizeFirst(item.category)}</span>
                <span>💰 $${item.price.toFixed(2)} × ${item.quantity}</span>
                <span>📅 ${item.timestamp}</span>
            </div>
        </div>
        <div class="item-price">$${totalPrice}</div>
        <div class="item-actions">
            <button class="icon-btn" onclick="deleteItem(${item.id})" title="Delete">🗑️</button>
        </div>
    `;

    return card;
}

/**
 * Toggle item purchased status
 */
function togglePurchased(id) {
    shoppingManager.togglePurchased(id);
    renderItems();
    updateStats();
}

/**
 * Delete item
 */
function deleteItem(id) {
    const item = shoppingManager.items.find(i => i.id === id);
    if (item && confirm(`Delete "${item.name}"?`)) {
        shoppingManager.deleteItem(id);
        renderItems();
        updateStats();
        showToast(`${item.name} removed!`, 'success');
    }
}

/**
 * Update statistics
 */
function updateStats() {
    totalItemsSpan.textContent = shoppingManager.items.length;
    totalSpendingSpan.textContent = `$${shoppingManager.getTotalSpending().toFixed(2)}`;
    purchasedCountSpan.textContent = shoppingManager.getPurchasedCount();
}

/**
 * Show toast notification
 */
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * Capitalize first letter
 */
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Handle image file selection
 */
function handleImageSelect(e) {
    const file = e.target.files[0];
    
    if (!file) return;
    
    // File size check (1MB limit)
    if (file.size > 1024 * 1024) {
        showToast('Image size must be less than 1MB', 'error');
        receiptImageInput.value = '';
        return;
    }
    
    // Read file as Base64
    const reader = new FileReader();
    reader.onload = function(event) {
        selectedImageData = event.target.result;
        
        // Show preview in form
        const preview = document.createElement('img');
        preview.src = selectedImageData;
        preview.className = 'preview-img';
        
        imagePreview.innerHTML = '';
        imagePreview.appendChild(preview);
        
        showToast('Image selected! ✅', 'success');
    };
    
    reader.onerror = () => {
        showToast('Error reading file', 'error');
    };
    
    reader.readAsDataURL(file);
}

/**
 * Open image in lightbox modal
 */
function openModal(imageSrc) {
    imageModal.classList.add('show');
    modalImage.src = imageSrc;
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

/**
 * Close lightbox modal
 */
function closeModal() {
    imageModal.classList.remove('show');
    document.body.style.overflow = 'auto'; // Enable scrolling
}

// ========== REWARD FUNCTIONS ==========

/**
 * Update reward stats
 */
function updateRewardStats() {
    rewardPointsSpan.textContent = rewardManager.userPoints;
    nftCountSpan.textContent = rewardManager.nfts.length;
    renderNFTGallery();
}

/**
 * Render NFT gallery
 */
function renderNFTGallery() {
    if (nftGalleryDiv) {
        nftGalleryDiv.innerHTML = '';
        
        if (rewardManager.nfts.length === 0) {
            nftGalleryDiv.innerHTML = '<p style="text-align: center; color: rgba(255,255,255,0.7); padding: 10px;">Earn 10 points to mint your first NFT!</p>';
            return;
        }
        
        rewardManager.nfts.forEach(nft => {
            const nftCard = document.createElement('div');
            nftCard.className = 'nft-card';
            nftCard.innerHTML = `
                <div class="nft-icon">💎</div>
                <div class="nft-label">#${nft.id}</div>
            `;
            nftGalleryDiv.appendChild(nftCard);
        });
    }
}

/**
 * Update leaderboard display
 */
function updateLeaderboard() {
    if (!leaderboardContent) return;
    
    let leaderboard;
    if (currentLeaderboardTab === 'points') {
        leaderboard = rewardManager.getLeaderboardByPoints();
    } else {
        leaderboard = rewardManager.getLeaderboardByNFTs();
    }
    
    if (leaderboard.length === 0) {
        leaderboardContent.innerHTML = `
            <div class="empty-state">
                <p>No data yet. Start shopping to appear on leaderboard!</p>
            </div>
        `;
        return;
    }
    
    leaderboardContent.innerHTML = '';
    
    leaderboard.forEach((user, index) => {
        const rank = index + 1;
        let badgeClass = '';
        
        if (rank === 1) badgeClass = 'gold';
        else if (rank === 2) badgeClass = 'silver';
        else if (rank === 3) badgeClass = 'bronze';
        
        const row = document.createElement('div');
        row.className = 'leaderboard-row';
        
        let valueText = '';
        if (currentLeaderboardTab === 'points') {
            valueText = `${user.points} pts`;
        } else {
            valueText = `${user.nftCount} NFTs`;
        }
        
        row.innerHTML = `
            <div class="rank-badge ${badgeClass}">#${rank}</div>
            <div class="rank-info">
                <div class="rank-name">${escapeHtml(user.name)}</div>
                <div class="rank-meta">${user.nftCount} NFTs • ${user.points} Points</div>
            </div>
            <div class="rank-value">${valueText}</div>
        `;
        
        leaderboardContent.appendChild(row);
    });
}

/**
 * Switch leaderboard tab
 */
function switchLeaderboardTab(tab) {
    currentLeaderboardTab = tab;
    
    // Update button states
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(t => t.classList.remove('active'));
    
    const activeBtn = document.querySelector(`.tab-btn[onclick="switchLeaderboardTab('${tab}')"]`);
    if (activeBtn) activeBtn.classList.add('active');
    
    updateLeaderboard();
}

// Add slideOutRight animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// ========== DEBUG UTILITIES (Use in Console) ==========

/**
 * Reset seed data and reload
 * Usage in console: resetSeedData()
 */
function resetSeedData() {
    localStorage.removeItem('receiptvault_initialized');
    localStorage.removeItem('receiptvault_items');
    localStorage.removeItem('receiptvault_points');
    localStorage.removeItem('receiptvault_nfts');
    localStorage.removeItem('receiptvault_leaderboard');
    console.log('✅ Seed data cleared! Reloading...');
    location.reload();
}

/**
 * View current app state
 * Usage in console: viewAppState()
 */
function viewAppState() {
    console.log('=== APP STATE ===');
    console.log('Items:', shoppingManager.items);
    console.log('Points:', rewardManager.userPoints);
    console.log('NFTs:', rewardManager.nfts);
    console.log('Leaderboard:', rewardManager.leaderboard);
    console.log('LocalStorage Size:', JSON.stringify(localStorage).length + ' bytes');
}

/**
 * Export data as JSON
 * Usage in console: exportData()
 */
function exportData() {
    const data = {
        items: shoppingManager.items,
        rewards: {
            userPoints: rewardManager.userPoints,
            nfts: rewardManager.nfts,
            leaderboard: rewardManager.leaderboard
        },
        timestamp: new Date().toISOString()
    };
    console.log(JSON.stringify(data, null, 2));
    return data;
}

/**
 * Manually add mock data
 * Usage in console: addMockData()
 */
function addMockData() {
    console.log('Adding mock data...');
    const mockItems = [
        { name: 'Test Apple', category: 'groceries', price: 1.99 },
        { name: 'Test Laptop', category: 'gadgets', price: 999.99 },
    ];
    mockItems.forEach(item => {
        shoppingManager.addItem(item.name, item.category, item.price, 1);
    });
    rewardManager.addPoints(5);
    renderItems();
    updateStats();
    updateRewardStats();
    console.log('✅ Mock data added!');
}

/**
 * Get storage usage
 * Usage in console: checkStorageUsage()
 */
function checkStorageUsage() {
    let total = 0;
    for (let key in localStorage) {
        if (key.startsWith('receiptvault')) {
            const size = localStorage[key].length;
            console.log(`${key}: ${(size/1024).toFixed(2)} KB`);
            total += size;
        }
    }
    console.log(`Total: ${(total/1024).toFixed(2)} KB / 5 MB (LocalStorage limit)`);
}

// Show debug hint on console open
console.log('%c🎁 Receipt Vault Shop Chain', 'color: #6366f1; font-size: 18px; font-weight: bold;');
console.log('%cDebug Commands:', 'color: #8b5cf6; font-weight: bold;');
console.log('resetSeedData()     - Clear & reload seed data');
console.log('viewAppState()      - View current state');
console.log('exportData()        - Export as JSON');
console.log('addMockData()       - Quick add mock items');
console.log('checkStorageUsage() - Check storage usage');
