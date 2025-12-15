// Search functionality
(function() {
    'use strict';
    
    var searchBox = document.getElementById('search-box');
    var menuItems = document.querySelectorAll('.book-summary .summary li');
    
    if (searchBox) {
        searchBox.addEventListener('keyup', function(e) {
            var searchTerm = e.target.value.toLowerCase().trim();
            
            menuItems.forEach(function(item) {
                // Skip divider and gitbook-link
                if (item.classList.contains('divider') || 
                    item.querySelector('.gitbook-link')) {
                    return;
                }
                
                var text = item.textContent.toLowerCase();
                var link = item.querySelector('a');
                var span = item.querySelector('span');
                
                if (searchTerm === '') {
                    // Show all items when search is empty
                    item.style.display = '';
                    if (link) link.style.display = '';
                    if (span) span.style.display = '';
                } else if (text.includes(searchTerm)) {
                    // Show matching items
                    item.style.display = '';
                    if (link) {
                        link.style.display = '';
                        highlightText(link, searchTerm);
                    }
                    if (span) {
                        span.style.display = '';
                        highlightText(span, searchTerm);
                    }
                } else {
                    // Hide non-matching items
                    item.style.display = 'none';
                }
            });
        });
        
        // Clear search on Escape key
        searchBox.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                e.target.value = '';
                e.target.dispatchEvent(new Event('keyup'));
                e.target.blur();
            }
        });
    }
    
    function highlightText(element, searchTerm) {
        // Simple highlight effect by adding emphasis to matching text
        var text = element.textContent;
        // This is a simple implementation - doesn't actually highlight
        // but the matching items will be visible while others are hidden
    }
    
    // Add search icon
    var searchInput = document.querySelector('#book-search-input');
    if (searchInput && !document.querySelector('.search-icon')) {
        var icon = document.createElement('i');
        icon.className = 'fa fa-search search-icon';
        searchInput.appendChild(icon);
    }
})();
