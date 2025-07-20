// Global variables and state management
let currentUser = null;
let clients = [];
let standardPalettes = [];

// Standard color palettes (16 different palettes)
const DEFAULT_PALETTES = [
    {
        id: 1,
        name: "Spring Bloom",
        colors: ["#FFB6C1", "#FF69B4", "#98FB98", "#F0FFF0", "#FFE4E1", "#FFF8DC"],
        description: "Fresh and vibrant spring colors"
    },
    {
        id: 2,
        name: "Ocean Breeze",
        colors: ["#87CEEB", "#4682B4", "#5F9EA0", "#B0E0E6", "#E0FFFF", "#F0F8FF"],
        description: "Calming blues and ocean tones"
    },
    {
        id: 3,
        name: "Autumn Warmth",
        colors: ["#D2691E", "#CD853F", "#A0522D", "#F4A460", "#DEB887", "#FFEFD5"],
        description: "Warm autumn and earth tones"
    },
    {
        id: 4,
        name: "Winter Elegance",
        colors: ["#708090", "#2F4F4F", "#696969", "#C0C0C0", "#F5F5F5", "#FFFFFF"],
        description: "Sophisticated grays and neutrals"
    },
    {
        id: 5,
        name: "Berry Delight",
        colors: ["#8B0000", "#DC143C", "#FF1493", "#FF69B4", "#FFB6C1", "#FFF0F5"],
        description: "Rich berry and wine tones"
    },
    {
        id: 6,
        name: "Forest Mystique",
        colors: ["#006400", "#228B22", "#32CD32", "#90EE90", "#F0FFF0", "#FFFFFF"],
        description: "Deep forest greens and naturals"
    },
    {
        id: 7,
        name: "Sunset Glow",
        colors: ["#FF4500", "#FF6347", "#FFD700", "#FFA500", "#FFFF00", "#FFFACD"],
        description: "Warm sunset oranges and yellows"
    },
    {
        id: 8,
        name: "Royal Purple",
        colors: ["#4B0082", "#663399", "#9370DB", "#BA55D3", "#DDA0DD", "#F8F0FF"],
        description: "Regal purples and lavenders"
    },
    {
        id: 9,
        name: "Coral Dreams",
        colors: ["#FF7F50", "#FA8072", "#E9967A", "#FFA07A", "#FFE4E1", "#FFF5EE"],
        description: "Soft coral and peach tones"
    },
    {
        id: 10,
        name: "Mint Fresh",
        colors: ["#00FA9A", "#98FB98", "#90EE90", "#F0FFF0", "#E0FFFF", "#F0FFFF"],
        description: "Cool mint and fresh greens"
    },
    {
        id: 11,
        name: "Desert Sand",
        colors: ["#D2B48C", "#F4A460", "#DEB887", "#F5DEB3", "#FFF8DC", "#FFFFF0"],
        description: "Warm desert and sand tones"
    },
    {
        id: 12,
        name: "Lavender Fields",
        colors: ["#E6E6FA", "#DDA0DD", "#D8BFD8", "#THISTLE", "#F8F0FF", "#FFFFFF"],
        description: "Soft lavender and light purples"
    },
    {
        id: 13,
        name: "Deep Sea",
        colors: ["#191970", "#000080", "#0000CD", "#4169E1", "#6495ED", "#B0E0E6"],
        description: "Deep ocean blues and navy"
    },
    {
        id: 14,
        name: "Rose Garden",
        colors: ["#8B4513", "#A0522D", "#CD853F", "#F4A460", "#FFDEAD", "#FFF8DC"],
        description: "Warm rose and brown tones"
    },
    {
        id: 15,
        name: "Citrus Burst",
        colors: ["#FF8C00", "#FFA500", "#FFD700", "#FFFF00", "#ADFF2F", "#F0FFF0"],
        description: "Vibrant citrus colors"
    },
    {
        id: 16,
        name: "Monochrome Chic",
        colors: ["#000000", "#2F2F2F", "#696969", "#A9A9A9", "#D3D3D3", "#FFFFFF"],
        description: "Classic black, white, and grays"
    }
];

// Shopping suggestions for each palette
const SHOPPING_SUGGESTIONS = {
    1: [
        { boutique: "Nordstrom", suggestions: ["Floral dresses", "Pastel scarves", "Spring jackets"], url: "https://nordstrom.com" },
        { boutique: "Anthropologie", suggestions: ["Romantic blouses", "Delicate jewelry", "Garden party dresses"], url: "https://anthropologie.com" },
        { boutique: "Free People", suggestions: ["Bohemian tops", "Flower crowns", "Flowing skirts"], url: "https://freepeople.com" }
    ],
    2: [
        { boutique: "J.Crew", suggestions: ["Navy blazers", "Chambray shirts", "Ocean-inspired accessories"], url: "https://jcrew.com" },
        { boutique: "Everlane", suggestions: ["Minimalist tops", "Denim pieces", "Classic totes"], url: "https://everlane.com" },
        { boutique: "COS", suggestions: ["Structured shirts", "Clean-line dresses", "Modern accessories"], url: "https://cosstores.com" }
    ],
    3: [
        { boutique: "Madewell", suggestions: ["Leather jackets", "Rust-colored sweaters", "Ankle boots"], url: "https://madewell.com" },
        { boutique: "Zara", suggestions: ["Camel coats", "Warm knits", "Earth-tone accessories"], url: "https://zara.com" },
        { boutique: "& Other Stories", suggestions: ["Textured fabrics", "Autumn scarves", "Statement earrings"], url: "https://stories.com" }
    ],
    4: [
        { boutique: "Theory", suggestions: ["Structured blazers", "Minimalist dresses", "Sleek accessories"], url: "https://theory.com" },
        { boutique: "Eileen Fisher", suggestions: ["Elegant basics", "Sophisticated knits", "Timeless pieces"], url: "https://eileenfisher.com" },
        { boutique: "COS", suggestions: ["Architectural pieces", "Modern silhouettes", "Clean accessories"], url: "https://cosstores.com" }
    ],
    5: [
        { boutique: "Kate Spade", suggestions: ["Statement handbags", "Bold jewelry", "Party dresses"], url: "https://katespade.com" },
        { boutique: "Ted Baker", suggestions: ["Floral prints", "Rich textures", "Elegant accessories"], url: "https://tedbaker.com" },
        { boutique: "Reformation", suggestions: ["Vintage-inspired pieces", "Bold prints", "Statement shoes"], url: "https://thereformation.com" }
    ],
    6: [
        { boutique: "Patagonia", suggestions: ["Outdoor jackets", "Natural fabrics", "Earth-friendly accessories"], url: "https://patagonia.com" },
        { boutique: "Eileen Fisher", suggestions: ["Organic cotton pieces", "Natural dyes", "Sustainable fashion"], url: "https://eileenfisher.com" },
        { boutique: "Reformation", suggestions: ["Eco-friendly dresses", "Green accessories", "Natural makeup"], url: "https://thereformation.com" }
    ],
    7: [
        { boutique: "Free People", suggestions: ["Sunset-inspired dresses", "Warm scarves", "Bohemian accessories"], url: "https://freepeople.com" },
        { boutique: "Anthropologie", suggestions: ["Golden jewelry", "Warm-toned tops", "Sunset prints"], url: "https://anthropologie.com" },
        { boutique: "Urban Outfitters", suggestions: ["Vintage band tees", "Retro accessories", "Warm-toned makeup"], url: "https://urbanoutfitters.com" }
    ],
    8: [
        { boutique: "Nordstrom", suggestions: ["Luxury accessories", "Purple statement pieces", "Elegant jewelry"], url: "https://nordstrom.com" },
        { boutique: "Saks Fifth Avenue", suggestions: ["Designer handbags", "Royal-inspired pieces", "Premium fabrics"], url: "https://saksfifthavenue.com" },
        { boutique: "Net-A-Porter", suggestions: ["High-end fashion", "Luxury accessories", "Designer shoes"], url: "https://net-a-porter.com" }
    ],
    9: [
        { boutique: "J.Crew", suggestions: ["Coral sweaters", "Peach accessories", "Soft textures"], url: "https://jcrew.com" },
        { boutique: "Anthropologie", suggestions: ["Romantic pieces", "Coral jewelry", "Soft fabrics"], url: "https://anthropologie.com" },
        { boutique: "Madewell", suggestions: ["Comfortable basics", "Coral-toned denim", "Casual accessories"], url: "https://madewell.com" }
    ],
    10: [
        { boutique: "Everlane", suggestions: ["Fresh basics", "Mint accessories", "Clean silhouettes"], url: "https://everlane.com" },
        { boutique: "COS", suggestions: ["Minimalist pieces", "Cool tones", "Modern cuts"], url: "https://cosstores.com" },
        { boutique: "Uniqlo", suggestions: ["Quality basics", "Fresh colors", "Comfortable fabrics"], url: "https://uniqlo.com" }
    ],
    11: [
        { boutique: "Madewell", suggestions: ["Desert boots", "Neutral tones", "Natural textures"], url: "https://madewell.com" },
        { boutique: "Everlane", suggestions: ["Sustainable basics", "Neutral accessories", "Classic pieces"], url: "https://everlane.com" },
        { boutique: "& Other Stories", suggestions: ["Textured fabrics", "Earth tones", "Natural materials"], url: "https://stories.com" }
    ],
    12: [
        { boutique: "Kate Spade", suggestions: ["Delicate accessories", "Soft handbags", "Feminine pieces"], url: "https://katespade.com" },
        { boutique: "Anthropologie", suggestions: ["Romantic blouses", "Floral patterns", "Soft textures"], url: "https://anthropologie.com" },
        { boutique: "Free People", suggestions: ["Bohemian dresses", "Lavender accessories", "Dreamy pieces"], url: "https://freepeople.com" }
    ],
    13: [
        { boutique: "J.Crew", suggestions: ["Navy classics", "Professional wear", "Timeless pieces"], url: "https://jcrew.com" },
        { boutique: "Theory", suggestions: ["Structured pieces", "Navy blazers", "Professional accessories"], url: "https://theory.com" },
        { boutique: "Brooks Brothers", suggestions: ["Classic suits", "Professional wear", "Timeless accessories"], url: "https://brooksbrothers.com" }
    ],
    14: [
        { boutique: "Nordstrom", suggestions: ["Warm accessories", "Rich textures", "Elegant pieces"], url: "https://nordstrom.com" },
        { boutique: "Anthropologie", suggestions: ["Vintage-inspired pieces", "Warm tones", "Rich fabrics"], url: "https://anthropologie.com" },
        { boutique: "Free People", suggestions: ["Bohemian accessories", "Warm scarves", "Rich textures"], url: "https://freepeople.com" }
    ],
    15: [
        { boutique: "Urban Outfitters", suggestions: ["Bold accessories", "Bright colors", "Fun pieces"], url: "https://urbanoutfitters.com" },
        { boutique: "ASOS", suggestions: ["Trendy pieces", "Bright accessories", "Statement items"], url: "https://asos.com" },
        { boutique: "Zara", suggestions: ["Modern pieces", "Bright colors", "Contemporary fashion"], url: "https://zara.com" }
    ],
    16: [
        { boutique: "COS", suggestions: ["Minimalist pieces", "Monochrome accessories", "Clean lines"], url: "https://cosstores.com" },
        { boutique: "Everlane", suggestions: ["Classic basics", "Timeless pieces", "Quality essentials"], url: "https://everlane.com" },
        { boutique: "Theory", suggestions: ["Professional wear", "Structured pieces", "Classic accessories"], url: "https://theory.com" }
    ]
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Load data from localStorage or use defaults
    loadStoredData();
    
    // Initialize standard palettes
    initializeStandardPalettes();
    
    // Load admin dashboard
    loadAdminDashboard();
    
    // Show home section by default
    showSection('home');
}

function loadStoredData() {
    // Load clients from localStorage
    const storedClients = localStorage.getItem('colorPaletteClients');
    if (storedClients) {
        clients = JSON.parse(storedClients);
    }
    
    // Load custom palettes if any
    const storedPalettes = localStorage.getItem('colorPalettePalettes');
    if (storedPalettes) {
        standardPalettes = JSON.parse(storedPalettes);
    } else {
        standardPalettes = [...DEFAULT_PALETTES];
    }
}

function saveToStorage() {
    localStorage.setItem('colorPaletteClients', JSON.stringify(clients));
    localStorage.setItem('colorPalettePalettes', JSON.stringify(standardPalettes));
}

function initializeStandardPalettes() {
    const palettesContainer = document.getElementById('standard-palettes');
    if (!palettesContainer) return;
    
    palettesContainer.innerHTML = '';
    
    standardPalettes.forEach(palette => {
        const paletteCard = createPaletteCard(palette);
        palettesContainer.appendChild(paletteCard);
    });
}

function createPaletteCard(palette) {
    const col = document.createElement('div');
    col.className = 'col-md-3 col-sm-6 mb-3';
    
    col.innerHTML = `
        <div class="palette-card">
            <div class="palette-header">
                <div class="palette-name">${palette.name}</div>
            </div>
            <div class="palette-colors">
                ${palette.colors.map(color => 
                    `<div class="color-swatch" style="background-color: ${color}" data-color="${color}"></div>`
                ).join('')}
            </div>
            <p class="text-muted small">${palette.description}</p>
        </div>
    `;
    
    return col;
}

// Section navigation
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show selected section
    const targetSection = document.getElementById(`${sectionName}-section`);
    if (targetSection) {
        targetSection.style.display = 'block';
        targetSection.classList.add('fade-in-up');
    }
    
    // Update navigation active state
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Load section-specific content
    if (sectionName === 'admin') {
        loadAdminDashboard();
    }
}

// Admin Dashboard Functions
function loadAdminDashboard() {
    loadClientsTable();
    populatePaletteSelects();
}

function loadClientsTable() {
    const tableBody = document.getElementById('clients-table');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (clients.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-muted">
                    <i class="fas fa-users fa-2x mb-2"></i><br>
                    No clients added yet. Click "Add New Client" to get started.
                </td>
            </tr>
        `;
        return;
    }
    
    clients.forEach(client => {
        const row = document.createElement('tr');
        const palette = standardPalettes.find(p => p.id === client.paletteId);
        
        row.innerHTML = `
            <td>${client.name}</td>
            <td>${client.email}</td>
            <td>${palette ? palette.name : 'No palette assigned'}</td>
            <td>
                <span class="status-badge ${client.active ? 'status-active' : 'status-inactive'}">
                    ${client.active ? 'Active' : 'Inactive'}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-2" onclick="editClient('${client.id}')">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteClient('${client.id}')">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

function populatePaletteSelects() {
    const selects = ['palette-select', 'edit-palette-select'];
    
    selects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (!select) return;
        
        // Clear existing options except the first one
        while (select.children.length > 1) {
            select.removeChild(select.lastChild);
        }
        
        standardPalettes.forEach(palette => {
            const option = document.createElement('option');
            option.value = palette.id;
            option.textContent = palette.name;
            select.appendChild(option);
        });
    });
}

// Client Management Functions
function showAddClientModal() {
    const modal = new bootstrap.Modal(document.getElementById('addClientModal'));
    
    // Clear form
    document.getElementById('add-client-form').reset();
    document.getElementById('color-customization').innerHTML = '';
    
    modal.show();
}

function addClient() {
    const name = document.getElementById('client-name-input').value.trim();
    const email = document.getElementById('client-email-input').value.trim();
    const paletteId = parseInt(document.getElementById('palette-select').value);
    
    if (!name || !email || !paletteId) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Check if email already exists
    if (clients.some(client => client.email === email)) {
        alert('A client with this email already exists.');
        return;
    }
    
    // Get custom colors if any
    const customColors = getCustomColors('color-customization');
    const selectedPalette = standardPalettes.find(p => p.id === paletteId);
    
    const newClient = {
        id: generateClientId(),
        name: name,
        email: email,
        paletteId: paletteId,
        customColors: customColors.length > 0 ? customColors : selectedPalette.colors,
        accessCode: generateAccessCode(),
        active: true,
        createdAt: new Date().toISOString()
    };
    
    clients.push(newClient);
    saveToStorage();
    loadClientsTable();
    
    // Close modal
    bootstrap.Modal.getInstance(document.getElementById('addClientModal')).hide();
    
    // Show success message
    showNotification('Client added successfully!', 'success');
}

function editClient(clientId) {
    const client = clients.find(c => c.id === clientId);
    if (!client) return;
    
    // Populate edit form
    document.getElementById('edit-client-id').value = client.id;
    document.getElementById('edit-client-name').value = client.name;
    document.getElementById('edit-client-email').value = client.email;
    document.getElementById('edit-palette-select').value = client.paletteId;
    
    // Populate custom colors
    populateCustomColors('edit-color-customization', client.customColors);
    
    const modal = new bootstrap.Modal(document.getElementById('editClientModal'));
    modal.show();
}

function updateClient() {
    const clientId = document.getElementById('edit-client-id').value;
    const name = document.getElementById('edit-client-name').value.trim();
    const email = document.getElementById('edit-client-email').value.trim();
    const paletteId = parseInt(document.getElementById('edit-palette-select').value);
    
    if (!name || !email || !paletteId) {
        alert('Please fill in all required fields.');
        return;
    }
    
    const clientIndex = clients.findIndex(c => c.id === clientId);
    if (clientIndex === -1) return;
    
    // Check if email already exists (excluding current client)
    if (clients.some(client => client.email === email && client.id !== clientId)) {
        alert('A client with this email already exists.');
        return;
    }
    
    // Get custom colors
    const customColors = getCustomColors('edit-color-customization');
    const selectedPalette = standardPalettes.find(p => p.id === paletteId);
    
    // Update client
    clients[clientIndex] = {
        ...clients[clientIndex],
        name: name,
        email: email,
        paletteId: paletteId,
        customColors: customColors.length > 0 ? customColors : selectedPalette.colors,
        updatedAt: new Date().toISOString()
    };
    
    saveToStorage();
    loadClientsTable();
    
    // Close modal
    bootstrap.Modal.getInstance(document.getElementById('editClientModal')).hide();
    
    showNotification('Client updated successfully!', 'success');
}

function deleteClient(clientId) {
    if (!confirm('Are you sure you want to delete this client?')) return;
    
    clients = clients.filter(c => c.id !== clientId);
    saveToStorage();
    loadClientsTable();
    
    showNotification('Client deleted successfully!', 'info');
}

// Color customization functions
function populateCustomColors(containerId, colors) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    colors.forEach((color, index) => {
        const colorGroup = document.createElement('div');
        colorGroup.className = 'color-input-group';
        
        colorGroup.innerHTML = `
            <input type="color" class="color-input" value="${color}" onchange="updateColorPreview(this)">
            <div class="color-label">Color ${index + 1}</div>
        `;
        
        container.appendChild(colorGroup);
    });
}

function getCustomColors(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return [];
    
    const colorInputs = container.querySelectorAll('.color-input');
    return Array.from(colorInputs).map(input => input.value);
}

function updateColorPreview(input) {
    // Add any real-time preview updates here
}

// Listen for palette selection to populate color customization
document.addEventListener('change', function(e) {
    if (e.target.id === 'palette-select') {
        const paletteId = parseInt(e.target.value);
        if (paletteId) {
            const palette = standardPalettes.find(p => p.id === paletteId);
            if (palette) {
                populateCustomColors('color-customization', palette.colors);
            }
        }
    }
    
    if (e.target.id === 'edit-palette-select') {
        const paletteId = parseInt(e.target.value);
        if (paletteId) {
            const palette = standardPalettes.find(p => p.id === paletteId);
            if (palette) {
                populateCustomColors('edit-color-customization', palette.colors);
            }
        }
    }
});

// Client Login Functions
function clientLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('client-email').value.trim();
    const accessCode = document.getElementById('client-code').value.trim();
    
    const client = clients.find(c => 
        c.email === email && 
        c.accessCode === accessCode && 
        c.active
    );
    
    if (client) {
        currentUser = client;
        showClientDashboard(client);
        document.getElementById('client-email').value = '';
        document.getElementById('client-code').value = '';
    } else {
        alert('Invalid email or access code. Please check your credentials.');
    }
}

function showClientDashboard(client) {
    // Update client name
    document.getElementById('client-name').textContent = client.name;
    
    // Display client's palette
    displayClientPalette(client);
    
    // Display shopping suggestions
    displayShoppingSuggestions(client.paletteId);
    
    // Show client dashboard section
    showSection('client-dashboard');
}

function displayClientPalette(client) {
    const paletteContainer = document.getElementById('client-palette');
    if (!paletteContainer) return;
    
    const palette = standardPalettes.find(p => p.id === client.paletteId);
    const colors = client.customColors || palette.colors;
    
    const colorNames = [
        'Primary', 'Secondary', 'Accent', 'Neutral', 'Light', 'Complement'
    ];
    
    paletteContainer.innerHTML = `
        <h4 class="mb-4">${palette.name}</h4>
        <div class="client-palette-colors">
            ${colors.map((color, index) => `
                <div class="client-color-swatch">
                    <div class="client-color-circle" style="background-color: ${color}"></div>
                    <div class="color-name">${colorNames[index] || `Color ${index + 1}`}</div>
                    <div class="color-hex">${color}</div>
                </div>
            `).join('')}
        </div>
        <div class="palette-description">
            <p class="text-muted">${palette.description}</p>
        </div>
    `;
}

function displayShoppingSuggestions(paletteId) {
    const suggestionsContainer = document.getElementById('shopping-suggestions');
    if (!suggestionsContainer) return;
    
    const suggestions = SHOPPING_SUGGESTIONS[paletteId] || [];
    
    if (suggestions.length === 0) {
        suggestionsContainer.innerHTML = `
            <div class="col-12">
                <p class="text-muted text-center">No shopping suggestions available for this palette.</p>
            </div>
        `;
        return;
    }
    
    suggestionsContainer.innerHTML = suggestions.map(suggestion => `
        <div class="col-md-4 mb-4">
            <div class="shopping-card">
                <div class="boutique-logo">
                    <i class="fas fa-store"></i>
                </div>
                <h5 class="boutique-name">${suggestion.boutique}</h5>
                <div class="suggestions-list">
                    ${suggestion.suggestions.map(item => 
                        `<div class="suggestion-item">${item}</div>`
                    ).join('')}
                </div>
                <a href="${suggestion.url}" target="_blank" class="btn btn-outline-primary btn-sm mt-3">
                    <i class="fas fa-external-link-alt me-1"></i>Visit Store
                </a>
            </div>
        </div>
    `).join('');
}

function clientLogout() {
    currentUser = null;
    showSection('home');
}

// Utility Functions
function generateClientId() {
    return 'client_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function generateAccessCode() {
    return Math.random().toString(36).substr(2, 8).toUpperCase();
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Demo data for testing
function addDemoData() {
    if (clients.length === 0) {
        const demoClients = [
            {
                id: generateClientId(),
                name: "Sarah Johnson",
                email: "sarah@example.com",
                paletteId: 1,
                customColors: ["#FFB6C1", "#FF69B4", "#98FB98", "#F0FFF0", "#FFE4E1", "#FFF8DC"],
                accessCode: "DEMO123",
                active: true,
                createdAt: new Date().toISOString()
            },
            {
                id: generateClientId(),
                name: "Emily Chen",
                email: "emily@example.com",
                paletteId: 2,
                customColors: ["#87CEEB", "#4682B4", "#5F9EA0", "#B0E0E6", "#E0FFFF", "#F0F8FF"],
                accessCode: "DEMO456",
                active: true,
                createdAt: new Date().toISOString()
            }
        ];
        
        clients.push(...demoClients);
        saveToStorage();
        loadClientsTable();
        
        showNotification('Demo data added! Try logging in with sarah@example.com / DEMO123', 'info');
    }
}

// Add demo data button to admin section (for testing)
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const adminSection = document.getElementById('admin-section');
        if (adminSection && clients.length === 0) {
            const demoButton = document.createElement('button');
            demoButton.className = 'btn btn-info btn-sm me-2';
            demoButton.innerHTML = '<i class="fas fa-database me-1"></i>Add Demo Data';
            demoButton.onclick = addDemoData;
            
            const addClientButton = adminSection.querySelector('.btn-success');
            if (addClientButton) {
                addClientButton.parentNode.insertBefore(demoButton, addClientButton);
            }
        }
    }, 100);
});