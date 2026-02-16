# Todo Check up App 📝

A simple, beautiful, and feature-rich Todo Check up application with notification support. Stay organized and never forget your tasks with smart reminders!

## Features

✨ **Core Features:**
- ✅ Add, complete, and delete todos
- 🔔 Browser notification support for todo updates
- ⏰ Periodic check-up reminders (every 30 minutes)
- 💾 Local storage persistence (todos saved between sessions)
- 🎨 Beautiful, responsive UI with gradient design
- 📊 Real-time statistics of active/completed tasks

🎯 **Smart Notifications:**
- Get notified when you add a new todo
- Celebrate when you complete a task
- Receive periodic reminders about pending todos
- Desktop notifications that don't interrupt your workflow

🔍 **Filter Options:**
- View all todos
- Filter by active (incomplete) todos
- Filter by completed todos

## How to Use

### Getting Started

1. **Open the App**
   - Simply open `todo-app.html` in your web browser
   - No installation or server required!

2. **Enable Notifications**
   - Click the "🔔 Enable Notifications" button at the top
   - Grant permission when prompted by your browser
   - You'll start receiving helpful reminders

3. **Add Your First Todo**
   - Type your task in the input field
   - Press Enter or click "Add Todo"
   - Watch it appear in your list!

### Managing Todos

**Add a Todo:**
- Type your task and press Enter or click "Add Todo"

**Complete a Todo:**
- Click the checkbox next to any todo item
- Completed items will be styled differently

**Delete a Todo:**
- Click the "Delete" button next to any todo item

**Filter Todos:**
- Click "All" to see everything
- Click "Active" to see only incomplete tasks
- Click "Completed" to see only finished tasks

**Clear Completed:**
- Click "Clear Completed" to remove all finished tasks at once

## Technical Details

### Technologies Used
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients and animations
- **Vanilla JavaScript** - No frameworks, pure JS
- **Web Notifications API** - Desktop notifications
- **LocalStorage API** - Data persistence

### File Structure
```
todo-app.html       # Main HTML structure
todo-app.css        # Styling and responsive design
todo-app.js         # Application logic and functionality
TODO_APP_README.md  # This documentation
```

### Browser Compatibility
- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Opera: ✅ Full support

**Note:** Notification features require user permission and may behave differently based on browser settings.

### Local Storage
All todos are automatically saved to your browser's local storage. This means:
- Your todos persist between sessions
- No account or login required
- Data stays on your device
- Private and secure

## Notification Features

### When You'll Get Notified:
1. **New Todo Added** - Confirmation when you create a task
2. **Todo Completed** - Celebration when you finish a task
3. **Todos Cleared** - Confirmation when you clear completed items
4. **Periodic Check-up** - Reminder every 30 minutes if you have pending tasks

### Notification Settings
- Notifications appear as desktop alerts
- They auto-dismiss after 5 seconds
- You can disable them in your browser settings anytime
- Permission can be granted or revoked at any time

## Tips for Best Experience

💡 **Pro Tips:**
- Keep your browser tab open to receive periodic reminders
- Use filters to focus on what matters most
- Enable notifications for better task management
- Clear completed tasks regularly to keep your list clean

🎨 **Responsive Design:**
- Works great on desktop, tablet, and mobile devices
- Automatically adapts to your screen size
- Touch-friendly interface for mobile users

## Privacy & Security

🔒 **Your Data is Safe:**
- All data stored locally in your browser
- No external servers or databases
- No tracking or analytics
- No account creation required
- XSS protection with HTML escaping

## Troubleshooting

**Notifications not working?**
- Check if you granted permission
- Ensure notifications aren't disabled in browser settings
- Some browsers block notifications in incognito/private mode

**Todos disappeared?**
- Check if you're in the same browser
- Local storage is browser-specific
- Don't clear browser data if you want to keep todos

**Styling looks broken?**
- Ensure all three files (HTML, CSS, JS) are in the same directory
- Check browser console for any loading errors

## Future Enhancements

Ideas for future versions:
- 🗓️ Due dates and priorities
- 🏷️ Tags and categories
- 🌙 Dark mode toggle
- ☁️ Cloud sync option
- 📱 Progressive Web App (PWA) support
- 🔄 Recurring tasks
- 📈 Statistics and insights

## Contributing

This is an open-source project. Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## License

This project is part of the GitHub Skills "Introduction to GitHub" exercise.

&copy; 2025 GitHub • [MIT License](https://gh.io/mit)

---

**Made with ❤️ for productivity enthusiasts**

Enjoy staying organized! 🎉
