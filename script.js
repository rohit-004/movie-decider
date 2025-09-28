// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDocs, 
    deleteDoc, 
    doc, 
    onSnapshot,
    serverTimestamp 
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

// Firebase Configuration - REPLACE WITH YOUR CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyDgIzJRp_yHqymUG-Q76BbThiKVEfBAtPc",
  authDomain: "movie-decider-27d41.firebaseapp.com",
  projectId: "movie-decider-27d41",
  storageBucket: "movie-decider-27d41.firebasestorage.app",
  messagingSenderId: "664515766705",
  appId: "1:664515766705:web:85f8ea7ecf8d5231cd7590",
  measurementId: "G-P03HCEM9R1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM elements
const movieInput = document.getElementById('movieInput');
const addBtn = document.getElementById('addBtn');
const chooseBtn = document.getElementById('chooseBtn');
const moviesList = document.getElementById('moviesList');
const selectedMovie = document.getElementById('selectedMovie');
const movieCounter = document.getElementById('movieCounter');
const statusBar = document.getElementById('statusBar');
const statusText = document.getElementById('statusText');

// Global variables
let movies = [];
let isConnected = false;

/**
 * Update connection status display
 */
function updateStatus(message, isError = false) {
    statusText.textContent = message;
    statusBar.className = `status-bar ${isError ? 'error' : 'connected'}`;
}

/**
 * Initialize Firebase connection and set up real-time listener
 */
async function initializeFirebase() {
    try {
        // Set up real-time listener for movies collection
        const moviesRef = collection(db, 'movies');
        
        onSnapshot(moviesRef, (snapshot) => {
            movies = [];
            snapshot.forEach((doc) => {
                movies.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            
            // Sort movies by timestamp (newest first)
            movies.sort((a, b) => {
                if (!a.timestamp || !b.timestamp) return 0;
                return b.timestamp.seconds - a.timestamp.seconds;
            });
            
            updateMoviesDisplay();
            
            if (!isConnected) {
                isConnected = true;
                updateStatus('💕 Connected! Your shared date night list is ready for both of you! 💕');
                addBtn.disabled = false;
            }
        }, (error) => {
            console.error('Firebase connection error:', error);
            updateStatus('💔 Connection failed - Check your internet so you can plan your date night!', true);
            isConnected = false;
            addBtn.disabled = true;
            chooseBtn.disabled = true;
        });

    } catch (error) {
        console.error('Firebase initialization error:', error);
        updateStatus('💔 Database setup needed - Follow the Firebase guide to connect your hearts!', true);
    }
}

/**
 * Update the visual display of the movies list
 */
function updateMoviesDisplay() {
    // Clear existing content
    moviesList.innerHTML = '';
    
    if (movies.length === 0) {
        // Show empty state message
        moviesList.innerHTML = '<div class="empty-message">Your date night watchlist is empty! Start adding movies you both want to watch 💕</div>';
        chooseBtn.disabled = true;
    } else {
        // Display each movie as a list item
        movies.forEach((movie) => {
            const movieItem = document.createElement('div');
            movieItem.className = 'movie-item';
            
            movieItem.innerHTML = `
                <span class="movie-name">${movie.name}</span>
                <span class="added-by">Added by ${movie.addedBy || 'Someone'}</span>
            `;
            
            moviesList.appendChild(movieItem);
        });
        
        // Enable the choose button only if connected
        chooseBtn.disabled = !isConnected;
    }
    
    // Update counter
    const count = movies.length;
    movieCounter.textContent = `${count} movie${count !== 1 ? 's' : ''} in your date night watchlist 💖`;
}

/**
 * Add a new movie to the shared database
 */
async function addMovie() {
    const movieName = movieInput.value.trim();
    
    // Validate input
    if (movieName === '') {
        alert('💕 Please enter a movie for your date night!');
        movieInput.focus();
        return;
    }
    
    // Check for duplicates (case-insensitive)
    if (movies.some(movie => movie.name.toLowerCase() === movieName.toLowerCase())) {
        alert('💖 This movie is already on your watchlist! Great minds think alike!');
        movieInput.focus();
        return;
    }
    
    // Generate a simple user identifier (you could make this more sophisticated)
    const userId = localStorage.getItem('movieUserId') || generateUserId();
    localStorage.setItem('movieUserId', userId);
    
    try {
        // Add movie to Firebase
        await addDoc(collection(db, 'movies'), {
            name: movieName,
            addedBy: userId,
            timestamp: serverTimestamp()
        });
        
        // Clear input field
        movieInput.value = '';
        movieInput.focus();
        
        // Hide any previous selection
        selectedMovie.style.display = 'none';
        
        console.log('Added movie:', movieName);
        
    } catch (error) {
        console.error('Error adding movie:', error);
        alert('💔 Oops! Failed to add movie to your date night list. Try again!');
    }
}

/**
 * Generate a simple user identifier
 */
function generateUserId() {
    const partners = ['💕Partner1', '💖Partner2', '👫Sweetie', '💑Honey', '💏Babe', '❤️Love', '😍Darling', '🥰Angel'];
    const nums = Math.floor(Math.random() * 100);
    
    return partners[Math.floor(Math.random() * partners.length)] + nums;
}

/**
 * Randomly select and remove a movie from the shared database
 */
async function chooseRandomMovie() {
    if (movies.length === 0) {
        return; // Should not happen due to button being disabled
    }
    
    // Generate random index
    const randomIndex = Math.floor(Math.random() * movies.length);
    const chosenMovie = movies[randomIndex];
    
    try {
        // Remove the chosen movie from Firebase
        await deleteDoc(doc(db, 'movies', chosenMovie.id));
        
        // Show the selected movie
        displaySelectedMovie(chosenMovie.name, chosenMovie.addedBy);
        
        console.log('Chose movie:', chosenMovie.name);
        
    } catch (error) {
        console.error('Error removing movie:', error);
        alert('💔 Failed to choose your date night movie. Try again, lovebirds!');
    }
}

/**
 * Display the selected movie with animation
 */
function displaySelectedMovie(movieName, addedBy) {
    selectedMovie.innerHTML = `
        <div class="selected-movie">
            <h3>💕 Your Perfect Date Night Movie 💕</h3>
            <p>${movieName}</p>
            <small>Originally suggested by ${addedBy} 💖</small>
            <br><small>🍿 Grab some snacks and enjoy your romantic evening! 🥰</small>
        </div>
    `;
    selectedMovie.style.display = 'block';
    
    // Scroll to selected movie for better UX
    selectedMovie.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Handle Enter key press in input field
 */
function handleKeyPress(event) {
    if (event.key === 'Enter' && !addBtn.disabled) {
        addMovie();
    }
}

/**
 * Initialize the application UI and event handlers
 */
function initializeAppUI() {
    // Add event listeners
    addBtn.addEventListener('click', addMovie);
    chooseBtn.addEventListener('click', chooseRandomMovie);
    movieInput.addEventListener('keypress', handleKeyPress);
    
    // Add suggestion button listeners
    setupSuggestionButtons();
    
    // Initialize Firebase connection
    initializeFirebase();
    
    // Focus on input field
    movieInput.focus();
    
    console.log('💕 Date Night Decider App initialized for couples! 💕');
}

/**
 * Set up event listeners for suggestion buttons
 */
function setupSuggestionButtons() {
    const suggestionButtons = document.querySelectorAll('.suggestion-btn');
    suggestionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const movieName = button.getAttribute('data-movie');
            movieInput.value = movieName;
            movieInput.focus();
            
            // Add a little romantic touch
            button.style.background = 'rgba(240, 98, 146, 0.3)';
            setTimeout(() => {
                button.style.background = 'rgba(240, 98, 146, 0.1)';
            }, 200);
        });
    });
}

// Start the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeAppUI);