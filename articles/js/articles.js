// Articles data - Update this with your actual articles
const articlesData = [
    {
        id: 1,
        title: "Understanding Multi-Religion Election Systems :MES",
        excerpt: "A comprehensive framework for designing electoral systems that acknowledge religious diversity while preventing sectarian dominance in political institutions.",
        category: "electoral",
        date: "2024-03-15",
        readTime: 8,
        views: 1247,
        url: "https://multireligionvalsystem.eu.org/articles/understanding-multi-religion-elections.html",
        tags: ["electoral", "democracy", "systems"]
    },
    {
        id: 2,
        title: "Democratic Religious Reform as Peacebuilding",
        excerpt: "How internal democratic elections within religious communities can contribute to larger peace processes in conflict-affected regions.",
        category: "conflict",
        date: "2024-03-10",
        readTime: 6,
        views: 892,
        url: "https://multireligionvalsystem.eu.org/articles/democratic-religious-reform.html",
        tags: ["conflict", "peacebuilding", "reform"]
    },
    {
        id: 3,
        title: "Beyond Separation: New Models of State-Religion Relations",
        excerpt: "Examining alternatives to strict secularism that maintain democratic principles while acknowledging religious identities in public life.",
        category: "democracy",
        date: "2024-03-05",
        readTime: 10,
        views: 1105,
        url: "https://multireligionvalsystem.eu.org/articles/separation-state-religion.html",
        tags: ["democracy", "secularism", "state"]
    },
    {
        id: 4,
        title: "Nordic Church Elections: Lessons for Multi-Religious Societies",
        excerpt: "Analyzing the Swedish and Norwegian church election models and their potential adaptation for religiously diverse contexts.",
        category: "case-study",
        date: "2024-02-28",
        readTime: 7,
        views: 765,
        url: "https://multireligionvalsystem.eu.org/articles/nordic-church-elections.html",
        tags: ["case-study", "nordic", "models"]
    },
    {
        id: 5,
        title: "Quotas and Reserved Seats: Balancing Representation in Divided Societies",
        excerpt: "Evaluating different mechanisms for ensuring minority representation without entrenching sectarian divisions.",
        category: "electoral",
        date: "2024-02-20",
        readTime: 9,
        views: 943,
        url: "https://multireligionvalsystem.eu.org/articles/quotas-reserved-seats.html",
        tags: ["electoral", "quotas", "representation"]
    },
    {
        id: 6,
        title: "Religion, Electoral Systems, and the Sustainable Development Goals",
        excerpt: "Connecting democratic religious governance with broader development objectives and peacebuilding initiatives.",
        category: "conflict",
        date: "2024-02-15",
        readTime: 11,
        views: 687,
        url: "https://multireligionvalsystem.eu.org/articles/religion-sdgs.html",
        tags: ["conflict", "sdgs", "development"]
    }
];

// Initialize search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('articleSearch');
    const searchButton = document.getElementById('searchButton');
    const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
    const sortSelect = document.getElementById('sortBy');
    const searchResults = document.getElementById('searchResults');
    const searchStats = document.getElementById('searchStats');
    const articlesGrid = document.querySelector('.articles-grid');
    const allArticles = document.querySelectorAll('.article-card');

    // Store original articles display
    const originalDisplay = Array.from(allArticles).map(article => article.style.display);

    // Function to highlight search terms
    function highlightText(text, searchTerm) {
        if (!searchTerm) return text;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    }

    // Function to perform search
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const selectedCategories = Array.from(categoryCheckboxes)
            .filter(cb => cb.checked && cb.value !== 'all')
            .map(cb => cb.value);
        const sortBy = sortSelect.value;

        let results = articlesData.filter(article => {
            // Search in title and excerpt
            const matchesSearch = !searchTerm || 
                article.title.toLowerCase().includes(searchTerm) ||
                article.excerpt.toLowerCase().includes(searchTerm) ||
                article.tags.some(tag => tag.toLowerCase().includes(searchTerm));
            
            // Filter by category
            const matchesCategory = selectedCategories.length === 0 || 
                selectedCategories.includes(article.category);
            
            return matchesSearch && matchesCategory;
        });

        // Sort results
        switch(sortBy) {
            case 'newest':
                results.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'oldest':
                results.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
            case 'title':
                results.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'popular':
                results.sort((a, b) => b.views - a.views);
                break;
            case 'read-time':
                results.sort((a, b) => a.readTime - b.readTime);
                break;
        }

        // Display results
        if (searchTerm || selectedCategories.length > 0) {
            // Hide all articles first
            allArticles.forEach(article => {
                article.style.display = 'none';
            });

            // Show search results
            if (results.length > 0) {
                searchResults.innerHTML = '';
                
                results.forEach(article => {
                    const articleElement = document.createElement('div');
                    articleElement.className = 'search-result-item';
                    articleElement.innerHTML = `
                        <div class="search-result-card">
                            <h3><a href="${article.url}">${highlightText(article.title, searchTerm)}</a></h3>
                            <p>${highlightText(article.excerpt, searchTerm)}</p>
                            <div class="search-result-meta">
                                <span class="category">${article.category}</span>
                                <span class="date">${new Date(article.date).toLocaleDateString()}</span>
                                <span class="read-time">${article.readTime} min read</span>
                                <span class="views">${article.views} views</span>
                            </div>
                        </div>
                    `;
                    searchResults.appendChild(articleElement);
                });

                searchStats.innerHTML = `Found ${results.length} article${results.length !== 1 ? 's' : ''}`;
            } else {
                searchResults.innerHTML = `
                    <div class="no-results">
                        <h3>No articles found</h3>
                        <p>Try different keywords or categories</p>
                    </div>
                `;
                searchStats.innerHTML = 'No results';
            }
        } else {
            // Show all articles
            allArticles.forEach((article, index) => {
                article.style.display = originalDisplay[index] || 'flex';
            });
            searchResults.innerHTML = '';
            searchStats.innerHTML = `Showing all ${articlesData.length} articles`;
        }
    }

    // Event listeners
    searchInput.addEventListener('input', performSearch);
    searchButton.addEventListener('click', performSearch);
    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.value === 'all' && this.checked) {
                categoryCheckboxes.forEach(cb => {
                    if (cb.value !== 'all') cb.checked = false;
                });
            } else if (this.value !== 'all' && this.checked) {
                document.querySelector('input[name="category"][value="all"]').checked = false;
            }
            performSearch();
        });
    });
    sortSelect.addEventListener('change', performSearch);

    // Initial display
    searchStats.innerHTML = `Showing all ${articlesData.length} articles`;

    // Add search result styles
    const style = document.createElement('style');
    style.textContent = `
        .search-result-item {
            margin-bottom: 1.5rem;
        }
        .search-result-card {
            background: white;
            padding: 1.5rem;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            border-left: 4px solid #3498db;
        }
        .search-result-card h3 {
            margin: 0 0 0.75rem 0;
        }
        .search-result-card h3 a {
            color: #2c3e50;
            text-decoration: none;
        }
        .search-result-card h3 a:hover {
            color: #3498db;
        }
        .search-result-card p {
            color: #555;
            margin-bottom: 1rem;
            line-height: 1.6;
        }
        .search-result-meta {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
            font-size: 0.85rem;
            color: #7f8c8d;
        }
        .search-result-meta .category {
            background: #e8f4fc;
            color: #3498db;
            padding: 0.25rem 0.75rem;
            border-radius: 15px;
        }
        .no-results {
            text-align: center;
            padding: 3rem;
            color: #7f8c8d;
        }
    `;
    document.head.appendChild(style);
});
