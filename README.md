# 💕 Date Night Decider - Deployment Guide

## How to Deploy Your Romantic Movie Selector App on GitHub Pages

Follow these step-by-step instructions to host your Date Night Decider web application on GitHub Pages for free - perfect for couples who can't decide what to watch together!

### Prerequisites
- A GitHub account (create one at [github.com](https://github.com) if you don't have one)
- A partner who loves movie nights as much as you do! 💕

### Step 1: Create a New GitHub Repository

1. **Sign in to GitHub**
   - Go to [github.com](https://github.com) and sign in to your account

2. **Create a new repository**
   - Click the green "New" button or the "+" icon in the top-right corner
   - Select "New repository"

3. **Configure your repository**
   - Repository name: `movie-decider` (or any romantic name you prefer)
   - Description: "A romantic web app for couples to decide what to watch together 💕"
   - Make sure it's set to **Public** (required for free GitHub Pages)
   - ✅ Check "Add a README file"
   - Click "Create repository"

### Step 2: Upload Your Files

#### Option A: Using GitHub's Web Interface (Recommended for beginners)

1. **Upload the HTML file**
   - In your new repository, click "uploading an existing file"
   - Drag and drop the `index.html` file or click "choose your files" to select it
   - Add a commit message like "Add Movie Selector app"
   - Click "Commit changes"

#### Option B: Using Git Commands (For advanced users)

```bash
# Clone your repository
git clone https://github.com/YOUR_USERNAME/movie-selector.git
cd movie-selector

# Copy your index.html file to this directory
cp /path/to/your/index.html .

# Add, commit, and push
git add index.html
git commit -m "Add Movie Selector app"
git push origin main
```

### Step 3: Enable GitHub Pages

1. **Access Repository Settings**
   - Go to your repository on GitHub
   - Click the "Settings" tab (far right in the repository menu)

2. **Navigate to Pages Settings**
   - Scroll down in the left sidebar and click "Pages"

3. **Configure GitHub Pages**
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch
   - Select "/ (root)" as the folder
   - Click "Save"

4. **Wait for Deployment**
   - GitHub will show a message: "Your site is being built from the main branch"
   - This process takes 1-2 minutes

### Step 4: Access Your Live Website

1. **Get Your Website URL**
   - After a few minutes, refresh the Pages settings page
   - You'll see: "Your site is published at https://YOUR_USERNAME.github.io/movie-selector/"
   - Click on this URL or copy it to visit your live website

2. **Bookmark Your Site**
   - Save the URL: `https://YOUR_USERNAME.github.io/movie-selector/`
   - Share this link with friends and family!

### Step 5: Making Updates (Optional)

Whenever you want to update your app:

1. Edit the `index.html` file in your repository (click the pencil icon)
2. Make your changes
3. Commit the changes with a descriptive message
4. GitHub Pages will automatically rebuild and deploy your updated site within a few minutes

## 💕 Your Date Night Decider App is Now Live!

### What You Can Do Now:
- ✅ Share your website URL with your partner
- ✅ Add romantic movies to your shared watchlist
- ✅ Use the "Let Love Decide!" feature to randomly pick your perfect date night movie
- ✅ Your movie list persists between browser sessions
- ✅ Works on mobile and desktop devices for cozy movie nights

### Features of Your Couples App:
- **Add Movies**: Type in movie names and click "Add to Watchlist ❤️"
- **Romantic Suggestions**: Quick-add buttons for classic romantic movies
- **Random Selection**: Click "💕 Let Love Decide! 💕" to randomly pick and remove a movie
- **Partner Identification**: See who added each movie (💕Partner1, 💖Partner2, etc.)
- **Persistent Storage**: Movies are saved and shared between both partners
- **Responsive Design**: Perfect for phones, tablets, and laptops - wherever love is!
- **Romantic Theme**: Beautiful pink gradient design perfect for couples

### Troubleshooting:

**Q: My site isn't loading**
- Wait 5-10 minutes after enabling Pages, then try again
- Make sure your repository is public
- Check that the file is named exactly `index.html`

**Q: I want to change the design**
- Edit the CSS section in your `index.html` file
- Commit your changes, and they'll be live within minutes

**Q: How do I share my movie list with others?**
- Each user's browser stores their own movie list
- To share a common list, users would need to manually add the same movies

**Q: Can I add more features?**
- Yes! Edit the HTML, CSS, or JavaScript sections and commit your changes
- Popular additions: categories, ratings, watched/unwatched status

### Success! 🚀
Your Date Night Decider app is now hosted on GitHub Pages and accessible worldwide. Share the link with your partner so you can both add movies and let fate decide your perfect romantic evening together!

Perfect for:
- 💕 Couples who can't decide what to watch
- 🏠 Long-distance relationships (shared watchlist!)  
- 💑 Date night planning
- 🎭 Discovering new romantic movies together
- 🍿 Cozy nights in with your significant other

---

*Need help? Check GitHub's [Pages documentation](https://docs.github.com/en/pages) or create an issue in your repository. Happy movie nights, lovebirds! 💕*