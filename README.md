# Manay Website

A modern, responsive website for Manay featuring an elegant design with interactive elements, smooth animations, and a professional presentation.

## Project Overview

This is a static website built with HTML, CSS, and JavaScript. It's designed to be deployed on GitHub Pages for easy hosting and automatic deployment.

### Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface with smooth animations
- **Interactive Elements**: Engaging user interactions and hover effects
- **Performance Optimized**: Fast loading times and efficient code

## Project Structure

```
manay-website/
├── index.html          # Main HTML file
├── styles.css          # Styling and responsive design
├── script.js           # JavaScript functionality (to be added)
├── README.md           # This file
├── TESTING.md          # Testing instructions
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Actions deployment workflow
```

## Local Development

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A code editor (VS Code, Sublime Text, etc.)
- Git (for version control)

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd manay-website
   ```

2. **Open the website locally**:
   - Option 1: Open `index.html` directly in your browser
   - Option 2: Use a local server for better development experience:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js (if you have http-server installed)
     npx http-server -p 8000
     ```
   - Then visit `http://localhost:8000` in your browser

3. **Make changes**:
   - Edit `index.html` for structure and content
   - Modify `styles.css` for styling and layout
   - Add `script.js` for interactive functionality

### Development Tips

- Use browser developer tools (F12) to inspect elements and debug
- Test responsiveness by resizing your browser window
- Check the browser console for any JavaScript errors
- Use Live Server extension in VS Code for automatic reloading

## Deployment

### GitHub Pages Setup

This project uses GitHub Actions for automatic deployment to GitHub Pages. The deployment workflow is already configured in `.github/workflows/deploy.yml`.

#### Initial Setup (One-time)

1. **Create a GitHub repository**:
   - Go to GitHub and create a new repository
   - Name it appropriately (e.g., `manay-website`)
   - Don't initialize with README (we already have one)

2. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Manay website with GitHub Pages setup"
   git branch -M main
   git remote add origin <your-repository-url>
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Navigate to **Settings** > **Pages**
   - Under "Build and deployment", select:
     - **Source**: "GitHub Actions"
   - The workflow will automatically start and deploy your site

4. **Configure repository permissions** (Important!):
   - Go to **Settings** > **Actions** > **General**
   - Under "Workflow permissions", select:
     - **Read and write permissions** (required for deployment)
   - Click **Save**

#### Automatic Deployment

Once set up, every push to the `main` branch will automatically:

1. Trigger the GitHub Actions workflow
2. Build and deploy your site to GitHub Pages
3. Update your live website within 1-2 minutes

#### Deployment Status

- Check deployment status in the **Actions** tab of your repository
- View deployment logs if there are any issues
- Your site will be available at: `https://<username>.github.io/<repository-name>/`

### Manual Deployment (Alternative)

If you prefer manual deployment:

1. Go to **Settings** > **Pages**
2. Under "Build and deployment", select:
   - **Source**: "Deploy from a branch"
   - **Branch**: `main` and `/ (root)`
3. Click **Save**

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to the root directory with your domain name
2. Configure DNS settings with your domain provider
3. Update repository settings in **Settings** > **Pages** > "Custom domain"

## Troubleshooting

### Deployment Issues

- **Workflow not running**: Check that GitHub Pages is set to "GitHub Actions" source
- **Permission errors**: Ensure workflow permissions are set to "Read and write"
- **Build failures**: Check the Actions tab for detailed error logs

### Website Issues

- **CSS not loading**: Verify file paths and ensure CSS file is in the correct location
- **404 errors**: Check that all files are committed and pushed to GitHub
- **Slow loading**: Optimize images and minimize CSS/JavaScript files

### Local Development Issues

- **Changes not reflecting**: Clear browser cache or use hard refresh (Ctrl+Shift+R)
- **CORS errors**: Use a local server instead of opening files directly
- **JavaScript errors**: Check browser console for detailed error messages

## Contributing

1. Create a feature branch: `git checkout -b feature-name`
2. Make your changes and test locally
3. Commit changes: `git commit -m "Description of changes"`
4. Push to GitHub: `git push origin feature-name`
5. Create a pull request

## Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [MDN Web Docs](https://developer.mozilla.org/) - For HTML, CSS, and JavaScript reference

## License

This project is open source and available under the [MIT License](LICENSE).