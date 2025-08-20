// Enhanced University Search with Loading Animation and Modern Features

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Enhanced University Search Loaded!');
    
    // Remove loader after animations complete
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        if (loader) {
            loader.style.display = 'none';
        }
    }, 4000);

    // Create animated particles
    createParticles();
    
    // Initialize search functionality
    initializeSearch();
    
    // Add university count
    addUniversityStats();
    
    // Initialize smooth scroll for better UX
    initializeSmoothScroll();
});

// Create animated background particles
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning and sizing
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = (Math.random() * 4 + 2) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        
        particlesContainer.appendChild(particle);
    }
    
    document.body.appendChild(particlesContainer);
}

// Enhanced search functionality
function initializeSearch() {
    const searchBar = document.getElementById('search-bar');
    const searchWrapper = document.querySelector('.search-wrapper');
    
    if (!searchBar) return;
    
    let searchTimeout;
    let isSearching = false;
    
    searchBar.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        
        if (!isSearching) {
            isSearching = true;
            searchWrapper.classList.add('searching');
        }
        
        // Debounce search for better performance
        searchTimeout = setTimeout(() => {
            performSearch(this.value.toLowerCase().trim());
            isSearching = false;
            searchWrapper.classList.remove('searching');
        }, 300);
    });
    
    // Add search suggestions/autocomplete
    searchBar.addEventListener('focus', function() {
        this.classList.add('focused');
        showSearchSuggestions();
    });
    
    searchBar.addEventListener('blur', function() {
        this.classList.remove('focused');
        setTimeout(() => hideSearchSuggestions(), 200);
    });
}

// Perform search with enhanced filtering
function performSearch(searchTerm) {
    const listItems = document.querySelectorAll('#uniList li');
    let visibleCount = 0;
    const suggestionsBox = document.getElementById('suggestions');
    suggestionsBox.innerHTML = '';

    let matches = [];

    listItems.forEach((item) => {
        const universityName = item.textContent.toLowerCase();
        const isMatch = searchTerm !== '' && universityName.includes(searchTerm);

        if (isMatch) {
            matches.push({
                name: item.textContent,
                link: item.querySelector('a').href
            });
        }

        // For the full list below the search bar
        if (searchTerm === '' || universityName.includes(searchTerm)) {
            item.style.display = '';
            visibleCount++;
        } else {
            item.style.display = 'none';
        }
    });

    // Show suggestions if there are matches
    if (matches.length > 0) {
        suggestionsBox.style.display = 'block';
        matches.slice(0, 5).forEach(match => {
            const a = document.createElement('a');
            a.href = match.link;
            a.target = "_blank";
            a.textContent = match.name;
            suggestionsBox.appendChild(a);
        });
    } else {
        suggestionsBox.style.display = 'none';
    }

    updateSearchResults(visibleCount, searchTerm);
}
document.getElementById('search-bar').addEventListener('blur', () => {
    setTimeout(() => {
        document.getElementById('suggestions').style.display = 'none';
    }, 200);
});
// Update search results counter
function updateSearchResults(count, searchTerm) {
    let resultsInfo = document.querySelector('.search-results-info');
    
    if (!resultsInfo) {
        resultsInfo = document.createElement('div');
        resultsInfo.className = 'search-results-info';
        resultsInfo.style.cssText = `
            text-align: center;
            margin: 20px 0;
            color: var(--text-secondary);
            font-size: 1.1em;
            opacity: 0;
            transition: all 0.3s ease;
        `;
        document.querySelector('#university-list').insertBefore(resultsInfo, document.querySelector('#uniList'));
    }
    
    if (searchTerm) {
        resultsInfo.textContent = `Found ${count} universities matching "${searchTerm}"`;
        resultsInfo.style.opacity = '1';
        resultsInfo.style.transform = 'translateY(0)';
    } else {
        resultsInfo.style.opacity = '0';
        resultsInfo.style.transform = 'translateY(-10px)';
    }
}

// Highlight search terms in results
// Highlight search terms in results (UPDATED)
function highlightSearchTerms(searchTerm) {
    const links = document.querySelectorAll('#uniList li a');
    
    links.forEach(link => {
        // Find the specific element containing the text.
        // It's either the link itself (before icons are added)
        // or the .university-content div (after icons are added).
        const contentElement = link.querySelector('.university-content') || link;
        
        const text = contentElement.textContent;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        
        if (regex.test(text)) {
            const highlightedText = text.replace(regex, '<mark style="background: linear-gradient(135deg, #f093fb, #f5576c); color: white; padding: 2px 4px; border-radius: 4px; font-weight: bold;">$1</mark>');
            // Update the content of the correct element without destroying the icons.
            contentElement.innerHTML = highlightedText;
        }
    });
}

// Remove search term highlights
function removeHighlights() {
    const links = document.querySelectorAll('#uniList li a');
    links.forEach(link => {
        const marks = link.querySelectorAll('mark');
        marks.forEach(mark => {
            mark.outerHTML = mark.innerHTML;
        });
    });
}

// Add university statistics
// Add university statistics (UPDATED with safety check)
function addUniversityStats() {
    const totalUniversities = document.querySelectorAll('#uniList li').length;
    const searchContainer = document.querySelector('.search-container');

    // --- SAFETY CHECK ---
    // If the search container doesn't exist, just stop this function
    // instead of letting the whole script crash.
    if (!searchContainer) {
        console.error('Search container not found. Stat cards will not be added.');
        return; // Exit the function gracefully
    }
    // --- END OF CHECK ---
    
    const statsContainer = document.createElement('div');
    statsContainer.className = 'stats-container';
    statsContainer.innerHTML = `
        <div class="stat-card" style="animation: slideIn 1s ease-out 5s backwards;">
            <div class="stat-number">${totalUniversities}</div>
            <div class="stat-label">Universities</div>
        </div>
        <div class="stat-card" style="animation: slideIn 1s ease-out 5.2s backwards;">
            <div class="stat-number">36</div>
            <div class="stat-label">States</div>
        </div>
        <div class="stat-card" style="animation: slideIn 1s ease-out 5.4s backwards;">
            <div class="stat-number">100%</div>
            <div class="stat-label">Updated</div>
        </div>
    `;
    
    searchContainer.parentNode.insertBefore(statsContainer, searchContainer.nextSibling);
}
// Add CSS for stats container
const statsCSS = `
    .stats-container {
        display: flex;
        justify-content: center;
        gap: 30px;
        margin: 40px 0;
        flex-wrap: wrap;
    }
    
    .stat-card {
        background: var(--card-gradient);
        backdrop-filter: blur(20px);
        border: 1px solid var(--glass-border);
        padding: 25px 30px;
        border-radius: 20px;
        text-align: center;
        box-shadow: var(--shadow-secondary);
        min-width: 120px;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .stat-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
        background: var(--hover-bg);
    }
    
    .stat-number {
        font-size: 2.5em;
        font-weight: 900;
        background: var(--primary-gradient);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        display: block;
        line-height: 1;
    }
    
    .stat-label {
        color: var(--text-secondary);
        margin-top: 10px;
        font-weight: 600;
        font-size: 1.1em;
    }
    
    .search-results-info {
        animation: fadeIn 0.5s ease-out;
    }
    
    .slide-in {
        animation: slideInFromBottom 0.6s ease-out;
    }
    
    @keyframes slideInFromBottom {
        from {
            transform: translateY(30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .searching::after {
        content: '';
        position: absolute;
        right: 30px;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
        border: 2px solid transparent;
        border-top: 2px solid var(--accent-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @media (max-width: 768px) {
        .stats-container {
            gap: 15px;
        }
        
        .stat-card {
            min-width: 100px;
            padding: 20px 15px;
        }
        
        .stat-number {
            font-size: 2em;
        }
        
        .stat-label {
            font-size: 1em;
        }
    }
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = statsCSS;
document.head.appendChild(style);

// Initialize smooth scrolling
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add keyboard navigation
document.addEventListener('input', function(e) {
    const searchBar = document.getElementById('search-bar');
    
    // Focus search bar on Ctrl+K or Cmd+K
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchBar.focus();
        searchBar.select();
    }
    
    // Clear search on Escape
    if (e.key === 'Escape' && document.activeElement === searchBar) {
        searchBar.value = '';
        performSearch('');
        searchBar.blur();
    }
});

// Add university icons dynamically
function addUniversityIcons() {
    const universityItems = document.querySelectorAll('#uniList li a');
    
    universityItems.forEach(link => {
        const icon = document.createElement('div');
        icon.className = 'university-icon';
        icon.innerHTML = '🎓';
        
        const content = document.createElement('div');
        content.className = 'university-content';
        content.textContent = link.textContent;
        
        const arrow = document.createElement('div');
        arrow.className = 'arrow-icon';
        arrow.innerHTML = '↗';
        
        link.innerHTML = '';
        link.appendChild(icon);
        link.appendChild(content);
        link.appendChild(arrow);
    });
}

// Add scroll animations
function addScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('#uniList li').forEach(item => {
        observer.observe(item);
    });
}

// Initialize all enhanced features
setTimeout(() => {
    addUniversityIcons();
    addScrollAnimations();
}, 4500);

// Add performance optimizations
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Call performance optimizations
optimizePerformance();

// Add error handling
window.addEventListener('error', function(e) {
    console.error('University Search Error:', e.error);
});

console.log('✨ All enhanced features loaded successfully!');