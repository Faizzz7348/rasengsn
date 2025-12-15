// Table Action Buttons Functionality
(function() {
    'use strict';
    
    // Initialize table actions
    function initTableActions() {
        // Power button toggle
        const powerButtons = document.querySelectorAll('.btn-power');
        powerButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                togglePower(this);
            });
        });
        
        // Info button
        const infoButtons = document.querySelectorAll('.btn-info');
        infoButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                showInfo(this);
            });
        });
        
        // Drag button (make rows draggable)
        const dragButtons = document.querySelectorAll('.btn-drag');
        dragButtons.forEach(btn => {
            const row = btn.closest('tr');
            if (row) {
                makeDraggable(row, btn);
            }
        });
    }
    
    // Toggle power on/off
    function togglePower(button) {
        const row = button.closest('tr');
        const code = row.querySelector('td:nth-child(2)').textContent;
        const location = row.querySelector('td:nth-child(3)').textContent;
        
        if (button.classList.contains('off')) {
            // Power on
            button.classList.remove('off');
            button.innerHTML = '<i class="fa fa-power-off"></i>';
            button.title = 'Power On/Off';
            showNotification(`✅ ${location} (${code}) is now ONLINE`, 'success');
            row.style.opacity = '1';
        } else {
            // Power off
            button.classList.add('off');
            button.innerHTML = '<i class="fa fa-power-off"></i>';
            button.title = 'Power On';
            showNotification(`⚠️ ${location} (${code}) is now OFFLINE`, 'warning');
            row.style.opacity = '0.6';
        }
    }
    
    // Show info modal
    function showInfo(button) {
        const row = button.closest('tr');
        const no = row.querySelector('td:nth-child(1)').textContent;
        const code = row.querySelector('td:nth-child(2)').textContent;
        const location = row.querySelector('td:nth-child(3)').textContent;
        const delivery = row.querySelector('td:nth-child(4)').textContent;
        const route = row.querySelector('td:nth-child(5)').textContent;
        
        const powerBtn = row.querySelector('.btn-power');
        const status = powerBtn.classList.contains('off') ? 'OFFLINE' : 'ONLINE';
        
        const modal = createModal(`
            <h2 style="color: var(--ocean-accent); margin-top: 0;">
                <i class="fa fa-info-circle"></i> Station Information
            </h2>
            <div style="background: rgba(30, 73, 118, 0.3); padding: 20px; border-radius: 8px; margin: 15px 0;">
                <p><strong>No:</strong> ${no}</p>
                <p><strong>Code:</strong> ${code}</p>
                <p><strong>Location:</strong> ${location}</p>
                <p><strong>Delivery Schedule:</strong> ${delivery}</p>
                <p><strong>Route:</strong> ${route}</p>
                <p><strong>Status:</strong> <span style="color: ${status === 'ONLINE' ? '#66bb6a' : '#ef5350'}; font-weight: 600;">${status}</span></p>
            </div>
            <div style="background: rgba(10, 25, 41, 0.5); padding: 15px; border-radius: 8px; border-left: 3px solid var(--ocean-accent);">
                <p style="margin: 0;"><i class="fa fa-clock-o"></i> Last Update: ${new Date().toLocaleString()}</p>
                <p style="margin: 10px 0 0 0;"><i class="fa fa-map-marker"></i> Coordinates: 3.${Math.floor(Math.random() * 9000 + 1000)}, 101.${Math.floor(Math.random() * 9000 + 1000)}</p>
            </div>
        `);
        
        document.body.appendChild(modal);
    }
    
    // Make row draggable
    function makeDraggable(row, dragBtn) {
        dragBtn.style.cursor = 'move';
        
        dragBtn.addEventListener('mousedown', function(e) {
            e.preventDefault();
            const tbody = row.parentElement;
            let draggedRow = row;
            
            draggedRow.style.opacity = '0.5';
            draggedRow.style.cursor = 'move';
            
            const rows = Array.from(tbody.querySelectorAll('tr'));
            
            rows.forEach(r => {
                r.addEventListener('dragover', function(e) {
                    e.preventDefault();
                });
                
                r.addEventListener('drop', function(e) {
                    e.preventDefault();
                    if (r !== draggedRow) {
                        const allRows = Array.from(tbody.querySelectorAll('tr'));
                        const draggedIndex = allRows.indexOf(draggedRow);
                        const targetIndex = allRows.indexOf(r);
                        
                        if (draggedIndex < targetIndex) {
                            r.after(draggedRow);
                        } else {
                            r.before(draggedRow);
                        }
                        
                        // Renumber rows
                        updateRowNumbers(tbody);
                        showNotification('✅ Row order updated', 'success');
                    }
                });
            });
            
            document.addEventListener('mouseup', function cleanup() {
                draggedRow.style.opacity = '1';
                draggedRow.style.cursor = 'default';
                document.removeEventListener('mouseup', cleanup);
            });
        });
        
        // HTML5 drag and drop
        row.draggable = true;
        
        row.addEventListener('dragstart', function(e) {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', this.innerHTML);
            this.style.opacity = '0.5';
        });
        
        row.addEventListener('dragend', function(e) {
            this.style.opacity = '1';
        });
        
        row.addEventListener('dragover', function(e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        });
        
        row.addEventListener('drop', function(e) {
            e.preventDefault();
            const draggedRow = document.querySelector('tr[style*="opacity: 0.5"]');
            if (draggedRow && draggedRow !== this) {
                const tbody = this.parentElement;
                const allRows = Array.from(tbody.querySelectorAll('tr'));
                const draggedIndex = allRows.indexOf(draggedRow);
                const targetIndex = allRows.indexOf(this);
                
                if (draggedIndex < targetIndex) {
                    this.after(draggedRow);
                } else {
                    this.before(draggedRow);
                }
                
                // Renumber rows
                updateRowNumbers(tbody);
                showNotification('✅ Row reordered successfully', 'success');
            }
        });
    }
    
    // Update row numbers after reordering
    function updateRowNumbers(tbody) {
        const rows = tbody.querySelectorAll('tr');
        rows.forEach((row, index) => {
            const firstCell = row.querySelector('td:first-child');
            if (firstCell) {
                firstCell.textContent = index + 1;
            }
        });
    }
    
    // Create modal
    function createModal(content) {
        const modal = document.createElement('div');
        modal.className = 'info-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close"><i class="fa fa-times"></i></button>
                <div class="modal-body">${content}</div>
            </div>
        `;
        
        // Close modal on click
        modal.querySelector('.modal-close').addEventListener('click', function() {
            modal.remove();
        });
        
        modal.querySelector('.modal-overlay').addEventListener('click', function() {
            modal.remove();
        });
        
        return modal;
    }
    
    // Show notification
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Initialize on page load
    document.addEventListener('DOMContentLoaded', function() {
        initTableActions();
    });
    
    // Reinitialize after edit mode changes
    if (window.MutationObserver) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes.length) {
                    initTableActions();
                }
            });
        });
        
        const config = { childList: true, subtree: true };
        observer.observe(document.body, config);
    }
    
})();
