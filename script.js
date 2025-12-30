// ===================================
// Menu Data
// ===================================

const menuData = {
    seasonal: [
        {
            name: "Gingerbread Cookies",
            price: "$3.00",
            description: "Spiced gingerbread cookies with festive icing"
        },
        {
            name: "Peppermint Brownies",
            price: "$4.00",
            description: "Rich chocolate brownies topped with crushed peppermint"
        },
        {
            name: "Hot Chocolate Cupcakes",
            price: "$4.50",
            description: "Chocolate cupcakes with marshmallow frosting"
        },
        {
            name: "Cranberry Orange Scones",
            price: "$3.75",
            description: "Buttery scones with tart cranberries and orange zest"
        },
        {
            name: "Eggnog Cheesecake Slice",
            price: "$6.50",
            description: "Creamy eggnog-flavored cheesecake with nutmeg"
        },
        {
            name: "Cinnamon Star Cookies",
            price: "$2.75",
            description: "Traditional star-shaped cinnamon cookies"
        }
    ]
};

// ===================================
// Mobile Navigation Toggle
// ===================================

function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Update aria-expanded for accessibility
            const isExpanded = navMenu.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// ===================================
// Render Seasonal Menu Items
// ===================================

function renderSeasonalMenu() {
    const seasonalContainer = document.getElementById('seasonalMenuItems');
    
    if (!seasonalContainer) return;
    
    // Clear existing content
    seasonalContainer.innerHTML = '';
    
    // Render each seasonal item
    menuData.seasonal.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        
        menuItem.innerHTML = `
            <div class="menu-item-header">
                <h3 class="menu-item-name">${item.name}</h3>
                <span class="menu-item-price">${item.price}</span>
            </div>
            <p class="menu-item-description">${item.description}</p>
        `;
        
        seasonalContainer.appendChild(menuItem);
    });
}

// ===================================
// Form Validation
// ===================================

// Validation helper functions
const validators = {
    isEmpty: (value) => value.trim() === '',
    
    isValidEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    isValidPhone: (phone) => {
        // Accept various phone formats
        const phoneRegex = /^[\d\s\-\(\)]+$/;
        const digitsOnly = phone.replace(/\D/g, '');
        return phoneRegex.test(phone) && digitsOnly.length >= 10;
    },
    
    isPositiveNumber: (value) => {
        const num = parseInt(value, 10);
        return !isNaN(num) && num > 0;
    },
    
    isFutureDate: (dateString) => {
        if (!dateString) return false;
        const selectedDate = new Date(dateString);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
    }
};

// Show error message
function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}Error`);
    const inputElement = document.getElementById(fieldId);
    
    if (errorElement) {
        errorElement.textContent = message;
    }
    
    if (inputElement) {
        inputElement.classList.add('error');
        inputElement.setAttribute('aria-invalid', 'true');
    }
}

// Clear error message
function clearError(fieldId) {
    const errorElement = document.getElementById(`${fieldId}Error`);
    const inputElement = document.getElementById(fieldId);
    
    if (errorElement) {
        errorElement.textContent = '';
    }
    
    if (inputElement) {
        inputElement.classList.remove('error');
        inputElement.setAttribute('aria-invalid', 'false');
    }
}

// Validate individual field
function validateField(fieldId, value) {
    clearError(fieldId);
    
    switch (fieldId) {
        case 'name':
            if (validators.isEmpty(value)) {
                showError(fieldId, 'Name is required');
                return false;
            }
            break;
            
        case 'email':
            if (validators.isEmpty(value)) {
                showError(fieldId, 'Email is required');
                return false;
            }
            if (!validators.isValidEmail(value)) {
                showError(fieldId, 'Please enter a valid email address');
                return false;
            }
            break;
            
        case 'phone':
            if (validators.isEmpty(value)) {
                showError(fieldId, 'Phone number is required');
                return false;
            }
            if (!validators.isValidPhone(value)) {
                showError(fieldId, 'Please enter a valid phone number');
                return false;
            }
            break;
            
        case 'items':
            if (validators.isEmpty(value)) {
                showError(fieldId, 'Please list the items you want to order');
                return false;
            }
            break;
            
        case 'quantity':
            if (validators.isEmpty(value)) {
                showError(fieldId, 'Quantity is required');
                return false;
            }
            if (!validators.isPositiveNumber(value)) {
                showError(fieldId, 'Quantity must be greater than 0');
                return false;
            }
            break;
            
        case 'pickupDate':
            if (validators.isEmpty(value)) {
                showError(fieldId, 'Pickup date is required');
                return false;
            }
            if (!validators.isFutureDate(value)) {
                showError(fieldId, 'Pickup date cannot be in the past');
                return false;
            }
            break;
    }
    
    return true;
}

// Validate entire form
function validateForm(formData) {
    let isValid = true;
    
    // Validate all required fields
    const fieldsToValidate = ['name', 'email', 'phone', 'items', 'quantity', 'pickupDate'];
    
    fieldsToValidate.forEach(fieldId => {
        const value = formData.get(fieldId) || '';
        if (!validateField(fieldId, value)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Show form message
function showFormMessage(message, type = 'success') {
    const messageElement = document.getElementById('formMessage');
    
    if (messageElement) {
        messageElement.textContent = message;
        messageElement.className = `form-message ${type}`;
        messageElement.style.display = 'block';
        
        // Scroll to message
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                messageElement.style.display = 'none';
            }, 5000);
        }
    }
}

// ===================================
// Order Form Submission
// ===================================

let isSubmitting = false;

function initOrderForm() {
    const orderForm = document.getElementById('orderForm');
    
    if (!orderForm) return;
    
    // Set minimum date to today
    const pickupDateInput = document.getElementById('pickupDate');
    if (pickupDateInput) {
        const today = new Date().toISOString().split('T')[0];
        pickupDateInput.setAttribute('min', today);
    }
    
    // Real-time validation on blur
    const requiredFields = ['name', 'email', 'phone', 'items', 'quantity', 'pickupDate'];
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('blur', () => {
                validateField(fieldId, field.value);
            });
            
            // Clear error on input
            field.addEventListener('input', () => {
                clearError(fieldId);
            });
        }
    });
    
    // Form submission
    orderForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Prevent double submission
        if (isSubmitting) return;
        
        const formData = new FormData(orderForm);
        const submitBtn = document.getElementById('submitBtn');
        
        // Validate form
        if (!validateForm(formData)) {
            showFormMessage('Please fix the errors above and try again.', 'error');
            return;
        }
        
        // Disable submit button and show loading state
        isSubmitting = true;
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';
        }
        
        try {
            // Simulate API call (replace with actual API endpoint)
            await simulateOrderSubmission(formData);
            
            // Success
            showFormMessage(
                '✓ Order submitted successfully! We\'ll contact you shortly to confirm your order and provide pickup details.',
                'success'
            );
            
            // Reset form
            orderForm.reset();
            
            // Clear all errors
            requiredFields.forEach(fieldId => clearError(fieldId));
            
        } catch (error) {
            // Error
            showFormMessage(
                'Sorry, there was an error submitting your order. Please try again or call us at (555) 123-4567.',
                'error'
            );
            console.error('Order submission error:', error);
        } finally {
            // Re-enable submit button
            isSubmitting = false;
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Place Order';
            }
        }
    });
}

// Simulate order submission (replace with actual API call)
function simulateOrderSubmission(formData) {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            // In production, this would be an actual fetch/axios call
            // For demo purposes, we'll just log the data and resolve
            console.log('Order submitted:', Object.fromEntries(formData));
            
            // Simulate 95% success rate
            if (Math.random() > 0.05) {
                resolve({ success: true });
            } else {
                reject(new Error('Simulated error'));
            }
        }, 1000);
    });
}

// ===================================
// Smooth Scroll for Anchor Links
// ===================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Only handle actual anchors, not just "#"
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ===================================
// Initialize Everything
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation
    initNavigation();
    
    // Render seasonal menu items (only on menu page)
    renderSeasonalMenu();
    
    // Initialize order form (only on order page)
    initOrderForm();
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    console.log('Sunrise Bakery website initialized successfully! 🥖');
});
