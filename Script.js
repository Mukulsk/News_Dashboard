
const API_KEY = '4ee242d808494578a1572e1b49f050c1'; 
const newsGrid = document.getElementById('newsGrid');
const toggleModeButton = document.querySelector('.toggle-mode');

// Toggle Dark/Light Mode
toggleModeButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Load theme preference
window.onload = () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
  }
  fetchNews();
};

// Fetch News
async function fetchNews(query = 'latest') {
  newsGrid.innerHTML = '<p>Loading news...</p>';
  try {
    const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`);
    const data = await response.json();
    displayNews(data.articles);
  } catch (error) {
    newsGrid.innerHTML = '<p>Failed to load news. Please try again later.</p>';
  }
}

// Display News
function displayNews(articles) {
  newsGrid.innerHTML = '';
  if (articles.length === 0) {
    newsGrid.innerHTML = '<p>No news found.</p>';
    return;
  }
  articles.forEach(article => {
    const newsCard = document.createElement('div');
    newsCard.className = 'news-card';
    newsCard.innerHTML = `
      <img src="${article.urlToImage || 'https://via.placeholder.com/300x200'}" alt="News Image">
      <div class="news-card-content">
        <h3>${article.title}</h3>
        <p>${article.description || 'No description available.'}</p>
        <a href="${article.url}" target="_blank">Read more</a>
      </div>
    `;
    newsGrid.appendChild(newsCard);
  });
}

// Search News
function searchNews() {
  const query = document.getElementById('searchInput').value.trim();
  if (query) {
    fetchNews(query);
  }
}
