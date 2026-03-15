# 🤖 AI Code Generator

A modern web application for generating code snippets using AI. This project provides an intuitive interface to request and generate code in multiple programming languages.

## Features

✨ **Multi-Language Support**
- JavaScript
- Python
- HTML
- CSS
- Java
- C++

🎨 **Beautiful UI**
- Modern gradient design
- Responsive layout
- Smooth animations
- Dark mode ready

💻 **Easy to Use**
- Simple prompt input
- Language selection dropdown
- One-click code generation
- Copy to clipboard functionality

⚡ **Fast Performance**
- Lightweight application
- No external dependencies
- Instant UI feedback

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor or IDE
- Basic knowledge of HTML, CSS, and JavaScript

### Installation

1. Clone the repository:
```bash
git clone https://github.com/bezkraenobich-ux/ai-code-generator.git
cd ai-code-generator
```

2. Open the application:
```bash
# Simply open index.html in your browser
open index.html
```

Or use a local server:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (with http-server)
npx http-server
```

Then navigate to `http://localhost:8000` in your browser.

## Project Structure

```
ai-code-generator/
├── index.html          # Main HTML file
├── styles.css          # Styling
├── script.js           # JavaScript functionality
└── README.md           # Documentation
```

## Usage

1. **Enter a code request** in the textarea
   - Example: "Create a function that reverses a string in JavaScript"

2. **Select the programming language** from the dropdown

3. **Click "Generate Code"** button

4. **View the generated code** in the output section

5. **Copy the code** using the copy button

6. **Clear** the form to start over

## Features Breakdown

### Code Generation
- Mock code generation for demonstration
- Ready to integrate with OpenAI API or other LLMs
- Language-specific code templates

### User Interface
- Clean, modern design
- Loading animation during code generation
- Error handling and validation
- Mobile-responsive layout

### Copy to Clipboard
- One-click copying
- Visual feedback
- Fallback error handling

## API Integration

To use with OpenAI API:

1. Get your API key from [OpenAI Platform](https://platform.openai.com)

2. Update `script.js`:
```javascript
const API_KEY = 'your-api-key-here';
```

3. Modify the `generateCode()` function to make actual API calls:
```javascript
const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 500
    })
});
```

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients and animations
- **JavaScript (ES6+)** - Async/await, DOM manipulation
- **Responsive Design** - Mobile-first approach

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome  | ✓ Full  |
| Firefox | ✓ Full  |
| Safari  | ✓ Full  |
| Edge    | ✓ Full  |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Roadmap

- [ ] Integration with OpenAI API
- [ ] Add more programming languages
- [ ] Code syntax highlighting
- [ ] History of generated codes
- [ ] User authentication
- [ ] Save/Share generated code
- [ ] Code explanation feature
- [ ] Dark/Light theme toggle

## License

This project is open source and available under the MIT License.

## Support

For support, please open an issue on the GitHub repository.

## Author

Created by [bezkraenobich-ux](https://github.com/bezkraenobich-ux)

---

**Happy Code Generating! 🚀**