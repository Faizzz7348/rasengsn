# RasEngSN GitBook - Ocean Theme

## 🌊 Features

### 🎨 Ocean Deep Blue Dark Theme
- Beautiful gradient backgrounds
- Deep ocean color palette
- Smooth animations and transitions
- Custom scrollbar styling
- Professional dark mode design

### 🔍 Search Functionality
- Real-time menu search
- Keyboard shortcuts (ESC to clear)
- Filters menu items dynamically
- Search icon indicator

### ✏️ Edit Mode
- **Toggle Button**: Located in sidebar
- **Persistent State**: Stays active across pages
- **Add/Edit/Delete Menu Items**
- **Add Submenu Items**
- **Content Editor**: Rich text editing
- **Toolbar**: Bold, Italic, Lists, Headings, Images
- **Auto-save**: All changes saved to localStorage

### 📊 Route Management Tables
- **Interactive Tables**: KL 3 and KL 4 routes
- **Action Buttons**:
  - 🔄 **Drag**: Reorder rows with drag & drop
  - ℹ️ **Info**: View detailed station information
  - ⚡ **Power**: Toggle station online/offline status
- **Responsive Design**: Works on mobile and desktop
- **Hover Effects**: Visual feedback on interactions
- **Notifications**: Real-time feedback for actions

### 📱 Responsive Design
- Mobile-friendly layout
- Adaptive sidebar
- Touch-friendly controls
- Optimized for all screen sizes

## 🗂️ File Structure

```
rasengsn/
├── index.html              # Home page (Introduction)
├── kl3.html               # KL 3 Route page
├── kl4.html               # KL 4 Route page
├── style.css              # Original GitBook styles
├── custom-theme.css       # Ocean theme customization
├── edit-mode.css          # Edit mode styling
├── edit-mode.js           # Edit mode functionality
├── search.js              # Search functionality
├── table-actions.js       # Table interactions
├── gitbook.js             # GitBook core
├── theme.js               # Theme scripts
├── fonts/                 # Font Awesome icons
└── gitbook-plugin-lightbox/ # Lightbox plugin

```

## 🚀 Quick Start

1. **Open**: Open `index.html` in a modern web browser
2. **Navigate**: Use sidebar menu to browse pages
3. **Search**: Type in search box to filter menu items
4. **Edit Mode**: Click "Edit Mode" button in sidebar to start editing
5. **Tables**: View KL 3 or KL 4 pages to see interactive route tables

## 🎯 Usage Guide

### Edit Mode
1. Click **"Edit Mode"** button in sidebar
2. Buttons appear on menu items:
   - ✏️ Edit menu name
   - 🗑️ Delete menu item
   - ➕ Add submenu
3. Click **"Add New Menu"** to create new menu items
4. Edit page content directly
5. Use toolbar for text formatting
6. Click **"Save & Exit"** when done

### Route Tables
- **Drag rows**: Click and hold drag button, then move to reorder
- **View info**: Click info button to see station details
- **Toggle power**: Click power button to change station status
- **Responsive**: Table adapts to screen size

### Search
- Type in search box to filter menus
- Press ESC to clear search
- Results update in real-time

## 🎨 Color Palette

```css
--ocean-deep: #0a1929      /* Dark background */
--ocean-blue: #132f4c      /* Medium dark */
--ocean-medium: #1e4976    /* Medium */
--ocean-light: #2e5a8e     /* Light */
--ocean-accent: #4fc3f7    /* Bright cyan */
--ocean-bright: #81d4fa    /* Very bright */
--text-primary: #e3f2fd    /* Light text */
--text-secondary: #90caf9  /* Secondary text */
```

## 💾 Data Storage

All data is stored in browser's localStorage:
- **Menu structure**: `gitbook_menu`
- **Page content**: `gitbook_pages`
- **Edit mode state**: `editModeActive`

**Note**: Data persists only in the same browser. Export/backup features can be added if needed.

## 🔧 Customization

### Change Colors
Edit `custom-theme.css` `:root` variables to change color scheme.

### Add New Pages
1. Enable Edit Mode
2. Click "Add New Menu"
3. Enter menu name
4. Edit content as needed

### Modify Tables
Edit `kl3.html` or `kl4.html` table content directly in Edit Mode.

## 📱 Browser Support

- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Modern mobile browsers

## 🐛 Troubleshooting

### Edit Mode button not showing
- Refresh the page (Ctrl+R or Cmd+R)
- Check browser console for errors

### Changes not saving
- Ensure localStorage is enabled in browser
- Check browser privacy settings

### Table buttons not working
- Verify all JavaScript files are loaded
- Check browser console for errors

## 📝 Version

- **Version**: 1.0.0
- **Last Updated**: December 15, 2025
- **GitBook Version**: 3.2.3

## 🙏 Credits

- **Theme**: Ocean Deep Blue by Copilot
- **Icons**: Font Awesome 4.6.3
- **Platform**: GitBook 3.2.3
- **Lightbox**: gitbook-plugin-lightbox

---

**Enjoy your beautiful GitBook! 🌊✨**
