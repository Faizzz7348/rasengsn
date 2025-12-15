// Edit Mode Functionality
(function() {
    'use strict';
    
    let editMode = false;
    let menuData = loadMenuData();
    
    // Initialize edit mode
    function initEditMode() {
        const editBtn = document.getElementById('edit-mode-btn');
        if (editBtn) {
            editBtn.onclick = toggleEditMode;
            
            // Restore edit mode state from localStorage
            const savedEditMode = localStorage.getItem('editModeActive');
            if (savedEditMode === 'true') {
                editMode = true;
                editBtn.classList.add('active');
                editBtn.innerHTML = '<i class="fa fa-save"></i> Save & Exit';
                enableEditMode();
            }
        }
        loadSavedMenu();
    }
    
    // Toggle edit mode
    function toggleEditMode() {
        editMode = !editMode;
        const btn = document.getElementById('edit-mode-btn');
        
        if (editMode) {
            btn.classList.add('active');
            btn.innerHTML = '<i class="fa fa-save"></i> Save & Exit';
            enableEditMode();
            localStorage.setItem('editModeActive', 'true');
        } else {
            btn.classList.remove('active');
            btn.innerHTML = '<i class="fa fa-edit"></i> Edit Mode';
            disableEditMode();
            saveMenuData();
            localStorage.setItem('editModeActive', 'false');
        }
    }
    
    // Enable edit mode
    function enableEditMode() {
        // Add edit controls to menu
        addMenuEditControls();
        
        // Make content editable
        makeContentEditable();
        
        // Show add menu button
        showAddMenuButton();
    }
    
    // Disable edit mode
    function disableEditMode() {
        // Remove edit controls
        removeMenuEditControls();
        
        // Make content non-editable
        makeContentNonEditable();
        
        // Hide add menu button
        hideAddMenuButton();
        
        // Save content
        saveCurrentPageContent();
    }
    
    // Add edit controls to menu items
    function addMenuEditControls() {
        const menuItems = document.querySelectorAll('.book-summary .summary > li.chapter');
        
        menuItems.forEach(item => {
            if (item.classList.contains('divider') || item.querySelector('.gitbook-link')) {
                return;
            }
            
            // Add edit and delete buttons
            const controls = document.createElement('div');
            controls.className = 'menu-edit-controls';
            controls.innerHTML = `
                <button class="menu-edit-btn" title="Edit"><i class="fa fa-pencil"></i></button>
                <button class="menu-delete-btn" title="Delete"><i class="fa fa-trash"></i></button>
                <button class="menu-add-sub-btn" title="Add Submenu"><i class="fa fa-plus"></i></button>
            `;
            
            const link = item.querySelector('a, span');
            if (link && !item.querySelector('.menu-edit-controls')) {
                link.style.position = 'relative';
                link.appendChild(controls);
                
                // Add event listeners
                controls.querySelector('.menu-edit-btn').onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    editMenuItem(item);
                };
                
                controls.querySelector('.menu-delete-btn').onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    deleteMenuItem(item);
                };
                
                controls.querySelector('.menu-add-sub-btn').onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addSubmenuItem(item);
                };
            }
        });
        
        // Add controls to submenu items
        const submenuItems = document.querySelectorAll('.book-summary .summary ul.articles li');
        submenuItems.forEach(item => {
            const controls = document.createElement('div');
            controls.className = 'menu-edit-controls';
            controls.innerHTML = `
                <button class="menu-edit-btn" title="Edit"><i class="fa fa-pencil"></i></button>
                <button class="menu-delete-btn" title="Delete"><i class="fa fa-trash"></i></button>
            `;
            
            const link = item.querySelector('a');
            if (link && !item.querySelector('.menu-edit-controls')) {
                link.style.position = 'relative';
                link.appendChild(controls);
                
                controls.querySelector('.menu-edit-btn').onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    editMenuItem(item);
                };
                
                controls.querySelector('.menu-delete-btn').onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    deleteMenuItem(item);
                };
            }
        });
    }
    
    // Remove edit controls
    function removeMenuEditControls() {
        document.querySelectorAll('.menu-edit-controls').forEach(el => el.remove());
    }
    
    // Show add menu button
    function showAddMenuButton() {
        if (document.getElementById('add-menu-btn')) return;
        
        const addBtn = document.createElement('button');
        addBtn.id = 'add-menu-btn';
        addBtn.className = 'add-menu-button';
        addBtn.innerHTML = '<i class="fa fa-plus-circle"></i> Add New Menu';
        addBtn.onclick = addNewMenu;
        
        const summary = document.querySelector('.book-summary .summary');
        const divider = summary.querySelector('.divider');
        summary.insertBefore(addBtn, divider);
    }
    
    // Hide add menu button
    function hideAddMenuButton() {
        const btn = document.getElementById('add-menu-btn');
        if (btn) btn.remove();
    }
    
    // Add new menu
    function addNewMenu() {
        const menuName = prompt('Enter menu name:');
        if (!menuName) return;
        
        const hasSubmenu = confirm('Add as parent menu (with submenu capability)?');
        
        const li = document.createElement('li');
        li.className = 'chapter';
        
        if (hasSubmenu) {
            li.innerHTML = `
                <span>${menuName}</span>
                <ul class="articles"></ul>
            `;
        } else {
            const slug = menuName.toLowerCase().replace(/\s+/g, '-');
            li.innerHTML = `
                <a href="${slug}.html">${menuName}</a>
            `;
            
            // Create page content
            createNewPage(slug, menuName);
        }
        
        const summary = document.querySelector('.book-summary .summary');
        const divider = summary.querySelector('.divider');
        summary.insertBefore(li, divider);
        
        // Re-add edit controls
        if (editMode) {
            removeMenuEditControls();
            addMenuEditControls();
        }
    }
    
    // Add submenu item
    function addSubmenuItem(parentItem) {
        const menuName = prompt('Enter submenu name:');
        if (!menuName) return;
        
        let articlesUl = parentItem.querySelector('ul.articles');
        if (!articlesUl) {
            articlesUl = document.createElement('ul');
            articlesUl.className = 'articles';
            parentItem.appendChild(articlesUl);
        }
        
        const slug = menuName.toLowerCase().replace(/\s+/g, '-');
        const li = document.createElement('li');
        li.className = 'chapter';
        li.innerHTML = `<a href="${slug}.html">${menuName}</a>`;
        
        articlesUl.appendChild(li);
        
        // Create page content
        createNewPage(slug, menuName);
        
        // Re-add edit controls
        if (editMode) {
            removeMenuEditControls();
            addMenuEditControls();
        }
    }
    
    // Edit menu item
    function editMenuItem(item) {
        const link = item.querySelector('a, span');
        const currentName = link.textContent.trim();
        const newName = prompt('Edit menu name:', currentName);
        
        if (newName && newName !== currentName) {
            if (link.tagName === 'A') {
                link.childNodes[0].textContent = newName;
            } else {
                link.childNodes[0].textContent = newName;
            }
        }
    }
    
    // Delete menu item
    function deleteMenuItem(item) {
        if (confirm('Are you sure you want to delete this menu item?')) {
            item.remove();
        }
    }
    
    // Create new page
    function createNewPage(slug, title) {
        const pageContent = {
            slug: slug,
            title: title,
            content: `<h1>${title}</h1><p>Add your content here...</p>`,
            userModified: true
        };
        
        savePageContent(slug, pageContent);
    }
    
    // Make content editable
    function makeContentEditable() {
        // Skip for calendar pages - they have dynamic content
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const slug = currentPath.replace('.html', '');
        
        if (slug === 'rooster' || slug === 'expired') {
            return;
        }
        
        const contentSection = document.querySelector('.markdown-section');
        if (contentSection) {
            contentSection.contentEditable = true;
            contentSection.style.border = '2px dashed var(--ocean-accent)';
            contentSection.style.padding = '20px';
            contentSection.style.minHeight = '300px';
            
            // Add editing toolbar
            addEditingToolbar();
        }
    }
    
    // Make content non-editable
    function makeContentNonEditable() {
        const contentSection = document.querySelector('.markdown-section');
        if (contentSection) {
            contentSection.contentEditable = false;
            contentSection.style.border = 'none';
            
            // Remove editing toolbar
            removeEditingToolbar();
        }
    }
    
    // Add editing toolbar
    function addEditingToolbar() {
        if (document.getElementById('editing-toolbar')) return;
        
        const toolbar = document.createElement('div');
        toolbar.id = 'editing-toolbar';
        toolbar.className = 'editing-toolbar';
        toolbar.innerHTML = `
            <button onclick="document.execCommand('bold', false, null)" title="Bold"><i class="fa fa-bold"></i></button>
            <button onclick="document.execCommand('italic', false, null)" title="Italic"><i class="fa fa-italic"></i></button>
            <button onclick="document.execCommand('underline', false, null)" title="Underline"><i class="fa fa-underline"></i></button>
            <button onclick="document.execCommand('insertUnorderedList', false, null)" title="Bullet List"><i class="fa fa-list-ul"></i></button>
            <button onclick="document.execCommand('insertOrderedList', false, null)" title="Numbered List"><i class="fa fa-list-ol"></i></button>
            <button onclick="document.execCommand('formatBlock', false, 'h2')" title="Heading 2">H2</button>
            <button onclick="document.execCommand('formatBlock', false, 'h3')" title="Heading 3">H3</button>
            <button onclick="insertImage()" title="Insert Image"><i class="fa fa-image"></i></button>
        `;
        
        const pageWrapper = document.querySelector('.page-wrapper');
        if (pageWrapper) {
            pageWrapper.insertBefore(toolbar, pageWrapper.firstChild);
        }
    }
    
    // Remove editing toolbar
    function removeEditingToolbar() {
        const toolbar = document.getElementById('editing-toolbar');
        if (toolbar) toolbar.remove();
    }
    
    // Insert image
    window.insertImage = function() {
        const url = prompt('Enter image URL:');
        if (url) {
            document.execCommand('insertImage', false, url);
        }
    };
    
    // Save current page content
    function saveCurrentPageContent() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const slug = currentPath.replace('.html', '');
        
        // Don't save calendar pages
        if (slug === 'rooster' || slug === 'expired') {
            return;
        }
        
        const contentSection = document.querySelector('.markdown-section');
        if (contentSection) {
            const pageContent = {
                slug: slug,
                title: document.querySelector('.book-header h1 a')?.textContent || 'Page',
                content: contentSection.innerHTML,
                userModified: true  // Flag to indicate user has modified this
            };
            
            savePageContent(slug, pageContent);
        }
    }
    
    // Save page content to localStorage
    function savePageContent(slug, content) {
        const pages = JSON.parse(localStorage.getItem('gitbook_pages') || '{}');
        pages[slug] = content;
        localStorage.setItem('gitbook_pages', JSON.stringify(pages));
    }
    
    // Load page content from localStorage
    function loadPageContent() {
        // Skip loading for calendar pages - they have dynamic content
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const slug = currentPath.replace('.html', '');
        
        // Don't load content for calendar pages
        if (slug === 'rooster' || slug === 'expired') {
            return;
        }
        
        const pages = JSON.parse(localStorage.getItem('gitbook_pages') || '{}');
        const savedContent = pages[slug];
        
        // Only restore if there's saved content AND user was in edit mode before
        // This prevents overwriting original HTML content
        if (savedContent && savedContent.userModified) {
            const contentSection = document.querySelector('.markdown-section');
            if (contentSection) {
                contentSection.innerHTML = savedContent.content;
            }
        }
    }
    
    // Save menu data
    function saveMenuData() {
        const summary = document.querySelector('.book-summary .summary');
        if (summary) {
            localStorage.setItem('gitbook_menu', summary.innerHTML);
        }
    }
    
    // Load menu data
    function loadMenuData() {
        return localStorage.getItem('gitbook_menu');
    }
    
    // Load saved menu
    function loadSavedMenu() {
        const savedMenu = loadMenuData();
        if (savedMenu) {
            const summary = document.querySelector('.book-summary .summary');
            if (summary) {
                // Keep the menu structure but restore saved version if available
                // This prevents overwriting on every page load
            }
        }
        
        // Load page content only if there's user-modified content
        loadPageContent();
    }
    
    // Clear saved content for a page (useful for reset)
    window.clearPageContent = function(slug) {
        if (!slug) {
            const currentPath = window.location.pathname.split('/').pop() || 'index.html';
            slug = currentPath.replace('.html', '');
        }
        const pages = JSON.parse(localStorage.getItem('gitbook_pages') || '{}');
        delete pages[slug];
        localStorage.setItem('gitbook_pages', JSON.stringify(pages));
        location.reload();
    };
    
    // Clear all saved content
    window.clearAllContent = function() {
        if (confirm('Clear all saved content and restore original? This cannot be undone.')) {
            localStorage.removeItem('gitbook_pages');
            localStorage.removeItem('gitbook_menu');
            localStorage.removeItem('editModeActive');
            location.reload();
        }
    };
    
    // Initialize on page load
    document.addEventListener('DOMContentLoaded', function() {
        initEditMode();
    });
    
    // Export save function for manual saves
    window.saveGitbookData = function() {
        saveMenuData();
        saveCurrentPageContent();
        alert('Changes saved successfully!');
    };
    
})();
