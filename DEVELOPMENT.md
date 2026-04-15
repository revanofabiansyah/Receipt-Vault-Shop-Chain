# Receipt Vault Shop Chain - Development Guide

## Quick Start

### 1. Frontend Development
```bash
cd frontend
# Open index.html dengan browser atau live server
```

### 2. Smart Contract Development
```bash
# Build contract
cd contracts/shopping
cargo build --release --lib --target wasm32-unknown-unknown

# Run tests
cargo test
```

## Project Goals

### MVP (1 Day)
✅ Beautiful frontend UI/UX
✅ Smart contract structure
✅ Basic CRUD operations
✅ LocalStorage persistence

### Phase 2 (1-2 Weeks)
- Gamification system
- More advanced statistics
- Budget tracking

### Phase 3 (2-4 Weeks)
- Real blockchain integration
- Wallet connection
- NFT receipts

## Frontend Architecture

### State Management
- Using simple JavaScript class: `ShoppingListManager`
- Data stored in LocalStorage
- Real-time UI updates

### Component Structure
- Add Item Form
- Shopping List View
- Statistics Dashboard
- Item Cards

### Styling Approach
- Modern CSS3
- Mobile-first responsive design
- Gradient accents
- Smooth animations

## Smart Contract Architecture

### Data Flow
1. User input → Frontend
2. Frontend sends to smart contract
3. Smart contract validates & stores in blockchain
4. Blockchain returns confirmation
5. Frontend updates UI

### Storage Model
- Instance storage (instance-level data)
- Key-value pairs
- Persistent across transactions

## Key Files

### Frontend
- `index.html` - Main HTML structure
- `style.css` - All styling (600+ lines of modern CSS)
- `script.js` - Business logic & DOM manipulation

### Backend
- `lib.rs` - Main smart contract implementation
- `test.rs` - Unit tests

## Common Tasks

### Add a new category
1. Add to `categorySelect` in `index.html`
2. Add emoji mapping in `script.js`
3. Update smart contract if needed

### Change color scheme
- Update CSS variables in `style.css` (line 1-20)
- All colors centralized for easy theming

### Add new statistics
1. Add calculation in `ShoppingListManager` class
2. Add DOM element in `index.html`
3. Update `updateStats()` function

## Performance Tips

- LocalStorage limit: ~5-10MB per domain
- Keep items under 1000 for smooth UI
- Lazy load if needed in future

## Browser DevTools Tips

```javascript
// In console - access shopping manager
shoppingManager.items // View all items
shoppingManager.getTotalSpending() // Get total
localStorage.getItem('receiptvault_items') // View raw data
```

## Deployment Checklist

- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Validate all form inputs
- [ ] Check accessibility (a11y)
- [ ] Optimize images
- [ ] Minify CSS/JS (optional)
- [ ] Test smart contract
- [ ] Set up blockchain connection

## Troubleshooting

### Items not saving
- Check LocalStorage enabled
- Check console for errors
- Clear cache and reload

### Styling issues
- Check CSS file is loaded
- Verify no CSS conflicts
- Test in different browser

### Smart contract errors
- Check Rust syntax
- Run `cargo test`
- Check Soroban SDK version

## Resources

- [Stellar Docs](https://stellar.org/docs)
- [Soroban SDK](https://soroban.stellar.org/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Rust Book](https://doc.rust-lang.org/book/)

