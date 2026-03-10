// ==================== AUTHENTICATION ====================

// Check auth state
auth.onAuthStateChanged(user => {
    const authButton = document.getElementById('auth-button');
    if (authButton) {
        if (user) {
            authButton.textContent = 'Dashboard';
            authButton.onclick = () => window.location.href = 'dashboard.html';
        } else {
            authButton.textContent = 'Login';
            authButton.onclick = showLoginModal;
        }
    }
    updateCartCount();
});

// Show login modal
function showLoginModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) {
        modal.style.display = 'block';
    } else {
        createAuthModal();
    }
}

// Create auth modal
function createAuthModal() {
    const modal = document.createElement('div');
    modal.id = 'auth-modal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Login / Register</h2>
            <form id="auth-form">
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" required>
                </div>
                <button type="button" class="btn-primary" id="login-btn">Login</button>
                <button type="button" class="btn-primary" id="register-btn">Register</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal
    modal.querySelector('.close').onclick = () => {
        modal.style.display = 'none';
    };
    
    // Login handler
    document.getElementById('login-btn').onclick = () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                modal.style.display = 'none';
                window.location.href = 'dashboard.html';
            })
            .catch(error => alert('Login failed: ' + error.message));
    };
    
    // Register handler
    document.getElementById('register-btn').onclick = () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        auth.createUserWithEmailAndPassword(email, password)
            .then(userCredential => {
                // Create user profile
                db.collection('users').doc(userCredential.user.uid).set({
                    email: email,
                    createdAt: new Date(),
                    role: 'buyer'
                });
                modal.style.display = 'none';
                window.location.href = 'dashboard.html';
            })
            .catch(error => alert('Registration failed: ' + error.message));
    };
    
    modal.style.display = 'block';
}

// ==================== PROJECTS ====================

// Load projects
function loadProjects() {
    const projectList = document.getElementById('project-list');
    if (!projectList) return;
    
    db.collection('projects').limit(6).get()
        .then(querySnapshot => {
            projectList.innerHTML = '';
            if (querySnapshot.empty) {
                projectList.innerHTML = '<p class="loading">No projects available yet. Be the first to sell!</p>';
                return;
            }
            
            querySnapshot.forEach(doc => {
                const project = doc.data();
                const card = document.createElement('div');
                card.className = 'project-card';
                card.innerHTML = `
                    <img src="${project.imageUrl || 'https://via.placeholder.com/300x200'}" alt="${project.title}">
                    <h4>${project.title}</h4>
                    <p>${project.description ? project.description.substring(0, 100) + '...' : 'No description'}</p>
                    <p class="price">$${project.price || '0.00'}</p>
                    <p class="seller">By: ${project.sellerName || 'Unknown'}</p>
                    <button onclick="viewProject('${doc.id}')">View Details</button>
                    <button onclick="addToCart('${doc.id}')">Add to Cart</button>
                `;
                projectList.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            projectList.innerHTML = '<p class="loading">Error loading projects. Please refresh.</p>';
        });
}

// View project
function viewProject(projectId) {
    window.location.href = `project-detail.html?id=${projectId}`;
}

// ==================== CART ====================

let cart = [];

// Load cart
function loadCart() {
    const saved = localStorage.getItem('cart');
    cart = saved ? JSON.parse(saved) : [];
    updateCartCount();
}

// Save cart
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Add to cart
function addToCart(projectId) {
    if (!auth.currentUser) {
        alert('Please login to add items to cart');
        showLoginModal();
        return;
    }
    
    db.collection('projects').doc(projectId).get()
        .then(doc => {
            if (doc.exists) {
                const project = { 
                    id: doc.id, 
                    title: doc.data().title,
                    price: doc.data().price,
                    sellerName: doc.data().sellerName
                };
                
                if (cart.find(item => item.id === projectId)) {
                    alert('Item already in cart!');
                    return;
                }
                
                cart.push(project);
                saveCart();
                alert('Added to cart!');
            }
        });
}

// Remove from cart
function removeFromCart(projectId) {
    cart = cart.filter(item => item.id !== projectId);
    saveCart();
    if (typeof displayCart === 'function') displayCart();
}

// Update cart count
function updateCartCount() {
    document.querySelectorAll('#cart-count').forEach(el => {
        el.textContent = cart.length;
    });
}

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    loadProjects();
});
