# 🤖 AI Code Generator

A modern web application for generating code snippets using AI. This project provides an intuitive interface to request and generate code in multiple programming languages.

## Quick Start

1. Start the development server:
   ```bash
   cd /workspaces/ai-code-generator
   python3 -m http.server 8001
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:8001/src/index.html
   ```

## Features

✨ **Multi-Language Support**
- JavaScript
- Python
- HTML
- CSS
- Java
- C++

🚀 **Self-Training AI**
- **Train All Models**: Pre-train the neural network on all supported languages at once
- **Smart Training**: Uses sequence-based learning with 50-character context windows
- **Optimized Performance**: 5-layer LSTM with 512 neurons per layer

🎨 **Beautiful UI**
- Modern gradient design
- Responsive layout
- Smooth animations
- Dark mode ready
- File explorer sidebar
- Neural network visualization canvas

💻 **Easy to Use**
- **Self-Training**: Click "🚀 Train All Models" to pre-train on all languages
- Simple prompt input for code generation
- Language selection dropdown
- Neural Network Code Generation: Real AI-powered code generation using TensorFlow.js
- Neural Network Code Editing: Improve generated code with AI enhancements
- Copy to clipboard functionality
- Download generated code as files
- Save files to project workspace
- File explorer to manage saved files
- Real-time neural network visualization

⚡ **Fast Performance**
- Lightweight application
- TensorFlow.js for browser-based AI
- Optimized neural network architecture (5 layers, 512 neurons)
- Glorot normal initialization for faster model loading
- Real neural network training and inference
- Progress feedback during generation
- 30-second timeout protection
- Automatic fallback to mock generation

## Neural Network Architecture

### **Advanced AI Model**
- **LSTM-based Model**: Uses Long Short-Term Memory layers for sequence prediction
- **5 Hidden Layers**: Optimized deep neural network architecture for browser performance
- **512 Neurons per Layer**: Balanced capacity for complex code generation
- **Character-level Generation**: Trains on code examples to predict next characters
- **Multi-language Support**: Separate training data for each programming language
- **Browser-Optimized**: Efficient Glorot normal initialization and reduced batch sizes
- **Real-time Visualization**: Interactive canvas showing network structure and activity

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

2. Start the development server:
```bash
python3 -m http.server 8000
```

3. Open your browser and navigate to `http://localhost:8000/src/index.html`
```

Or use a local server:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (with http-server)
npx http-server
```

Then navigate to `http://localhost:8000/src/index.html` in your browser.

## Project Structure

```
ai-code-generator/
├── src/
│   ├── index.html          # Main HTML with 3-panel layout (sidebar + main + graphics)
│   ├── styles.css          # Styling with sidebar, main content, and canvas
│   └── script.js           # JavaScript with file management and canvas visualization
├── generated/              # Directory for storing generated file examples
└── README.md           # Documentation
```

## Usage

1. **Enter a code request** in the textarea
   - Example: "Create a function that reverses a string in JavaScript"

2. **Select the programming language** from the dropdown

3. **Click "Generate Code"** button

4. **View the generated code** in the output section

5. **Copy the code** using the copy button

6. **Download the code** as a file using the download button

7. **Save to project** to add the file to your workspace (visible in the left sidebar)

8. **Click on saved files** in the sidebar to load them back into the editor

9. **Edit with Neural Network** to improve the code

10. **Clear** the form to start over

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

### Download Generated Code
- Download code as a file with appropriate extension (.js, .py, .html, etc.)
- Automatic filename generation
- Browser-native download functionality
### Save to Project Workspace
- Save generated code to a virtual project workspace
- Files appear in the left sidebar file explorer
- Click on saved files to load them back into the editor
- Timestamped filenames for organization

### File Explorer
- Left sidebar showing all saved files
- Click to load any saved file
- Visual indication of active file
- Scrollable list for multiple files

### Neural Network Visualization
- Right sidebar with interactive canvas
- Real-time visualization of neural network structure
- Animated connections between neurons
- Start/Stop controls for visualization
- Visual representation of the 10-layer LSTM architecture
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