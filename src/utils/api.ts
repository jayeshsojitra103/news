import axios from 'axios';
import { Article, UserPreferences, SearchFilters, GuardianArticle } from '../types';

const API_KEYS = {
    newsapi: import.meta.env.VITE_NEWSAPI_KEY,
    guardian: import.meta.env.VITE_GUARDIAN_API_KEY,
};

export const fetchArticles = async (
    params: UserPreferences & { searchTerm?: string } & SearchFilters
): Promise<Article[]> => {
    const articles: Article[] = [];

    const fetchPromises = params.sources.map(source => {
        switch (source) {
            case 'NewsAPI':
                return fetchNewsApiArticles(params);
            case 'The Guardian':
                return fetchGuardianArticles(params);
            case 'BBC News':
                return fetchBBCArticles(params);
            default:
                return fetchGuardianArticles(params);
        }
    });

    const results = await Promise.all(fetchPromises);
    results.forEach((result) => articles.push(...result));

    return articles;
};

const buildDateQuery = (date: string | undefined) => {
    const currentDate = new Date();
    switch (date) {
        case 'today':
            return currentDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD
        case 'this_week':
            currentDate.setDate(currentDate.getDate() - 7); // Subtract 7 days
            return currentDate.toISOString().split('T')[0];
        case 'this_month':
            currentDate.setMonth(currentDate.getMonth() - 1); // Subtract 1 month
            return currentDate.toISOString().split('T')[0];
        default:
            return ''; // Return empty string if no date filtering is needed
    }
};


const fetchNewsApiArticles = async (
    params: UserPreferences & { searchTerm?: string } & SearchFilters
): Promise<Article[]> => {

    const queryParams = {
        apiKey: API_KEYS.newsapi,
        q: params.searchTerm || 'news',
        sources: params.category || '',
        from: buildDateQuery(params.date || ''),
        pageSize: 10
    } as { [key: string]: string | number }


    // Check for category or categories and add the section property if needed
    const category = params.category || (params.categories?.length ? params.categories.toString().toLowerCase() : '');
    if (category) {
        queryParams.sources = category;
    } else {
        delete queryParams.sources;
    }


    try {
        const response = await axios.get(import.meta.env.VITE_NEWS_API_URL, { params: queryParams });
        if (response.status !== 200) {
            throw new Error(`NewsAPI request failed with status ${response.status}`);
        }
        const { articles } = response.data;

        return articles.map((article: Article) => ({
            id: article.url,
            title: article.title,
            description: article.description,
            url: article.url,
            urlToImage: article.urlToImage,
            publishedAt: article.publishedAt,
            source: 'NewsAPI',
            author: article.author,
        }));
    } catch (error) {
        console.error('Error fetching from NewsAPI:', error);
        return [];
    }
};


const fetchGuardianArticles = async (
    params: UserPreferences & { searchTerm?: string } & SearchFilters
): Promise<Article[]> => {
    console.log("params", params)
    const queryParams = {
        'api-key': API_KEYS.guardian,
        'from-date': buildDateQuery(params.date || 'this_month'),
        'show-fields': 'thumbnail,trailText,byline',
        q: params.searchTerm,

    } as { [key: string]: string };

    // Check for category or categories and add the section property if needed
    const category = params.category || (params.categories?.length ? params.categories.toString().toLowerCase() : '');
    if (category) {
        queryParams.section = category;
    } else {
        delete queryParams.section;
    }

    try {
        const response = await axios.get(import.meta.env.VITE_GUARDIAN_API_URL, { params: queryParams });
        if (response.status !== 200) {
            throw new Error(`Guardian API request failed with status ${response.status}`);
        }
        const { results } = response.data.response;

        return results.map((article: GuardianArticle) => ({
            id: article.id,
            title: article.webTitle,
            description: article.fields?.trailText || '',
            url: article.webUrl,
            urlToImage: article.fields?.thumbnail || '',
            publishedAt: article.webPublicationDate,
            source: 'The Guardian',
            author: article.fields?.byline || '',
        }));
    } catch (error) {
        console.error('Error fetching from The Guardian:', error);
        return [];
    }
};


const fetchBBCArticles = async (
    params: UserPreferences & { searchTerm?: string } & SearchFilters
): Promise<Article[]> => {
    // Note: BBC News API is not publicly available, so this is a mock implementation
    // You would need to replace this with the actual BBC News API endpoint and authentication
    const mockBBCArticles: Article[] = [
        {
            id: 'bbc-1',
            title: 'Mock BBC Article 1',
            description: 'This is a mock BBC article description.',
            url: 'https://www.bbc.com/news/mock-article-1',
            urlToImage: 'https://via.placeholder.com/300x200.png?text=BBC+News',
            publishedAt: new Date().toISOString(),
            source: 'BBC News',
            author: 'BBC News',
        },
        {
            id: 'bbc-2',
            title: 'Mock BBC Article 2',
            description: 'This is another mock BBC article description.',
            url: 'https://www.bbc.com/news/mock-article-2',
            urlToImage: 'https://via.placeholder.com/300x200.png?text=BBC+News',
            publishedAt: new Date().toISOString(),
            source: 'BBC News',
            author: 'BBC News',
        },
        {
            id: 'bbc-3',
            title: 'Mock BBC Article 3',
            description: 'This is yet another mock BBC article description.',
            url: 'https://www.bbc.com/news/mock-article-3',
            urlToImage: 'https://via.placeholder.com/300x200.png?text=BBC+News',
            publishedAt: new Date().toISOString(),
            source: 'BBC News',
            author: 'BBC News',
        },
        {
            id: 'bbc-4',
            title: 'Mock BBC Article 4',
            description: 'This mock BBC article talks about important news.',
            url: 'https://www.bbc.com/news/mock-article-4',
            urlToImage: 'https://via.placeholder.com/300x200.png?text=BBC+News',
            publishedAt: new Date().toISOString(),
            source: 'BBC News',
            author: 'BBC News',
        },
        {
            id: 'bbc-5',
            title: 'Mock BBC Article 5',
            description: 'Breaking news from BBC about world events.',
            url: 'https://www.bbc.com/news/mock-article-5',
            urlToImage: 'https://via.placeholder.com/300x200.png?text=BBC+News',
            publishedAt: new Date().toISOString(),
            source: 'BBC News',
            author: 'BBC News',
        },
        {
            id: 'bbc-6',
            title: 'Mock BBC Article 6',
            description: 'Mock article about technology trends from BBC.',
            url: 'https://www.bbc.com/news/mock-article-6',
            urlToImage: 'https://via.placeholder.com/300x200.png?text=BBC+News',
            publishedAt: new Date().toISOString(),
            source: 'BBC News',
            author: 'BBC News',
        },
        {
            id: 'bbc-7',
            title: 'Mock BBC Article 7',
            description: 'Latest updates on politics in this mock BBC article.',
            url: 'https://www.bbc.com/news/mock-article-7',
            urlToImage: 'https://via.placeholder.com/300x200.png?text=BBC+News',
            publishedAt: new Date().toISOString(),
            source: 'BBC News',
            author: 'BBC News',
        },
        {
            id: 'bbc-8',
            title: 'Mock BBC Article 8',
            description: 'Mock coverage of health news from BBC.',
            url: 'https://www.bbc.com/news/mock-article-8',
            urlToImage: 'https://via.placeholder.com/300x200.png?text=BBC+News',
            publishedAt: new Date().toISOString(),
            source: 'BBC News',
            author: 'BBC News',
        },
        {
            id: 'bbc-9',
            title: 'Mock BBC Article 9',
            description: 'BBC mock article covering the latest sports events.',
            url: 'https://www.bbc.com/news/mock-article-9',
            urlToImage: 'https://via.placeholder.com/300x200.png?text=BBC+News',
            publishedAt: new Date().toISOString(),
            source: 'BBC News',
            author: 'BBC News',
        },
        {
            id: 'bbc-10',
            title: 'Mock BBC Article 10',
            description: 'A mock article discussing the economy from BBC.',
            url: 'https://www.bbc.com/news/mock-article-10',
            urlToImage: 'https://via.placeholder.com/300x200.png?text=BBC+News',
            publishedAt: new Date().toISOString(),
            source: 'BBC News',
            author: 'BBC News',
        },
    ];


    // Simulate filtering based on search term
    if (params.searchTerm) {
        return mockBBCArticles.filter(article =>
            article.title.toLowerCase().includes(params.searchTerm!.toLowerCase()) ||
            article.description.toLowerCase().includes(params.searchTerm!.toLowerCase())
        );
    }

    return mockBBCArticles;
};

