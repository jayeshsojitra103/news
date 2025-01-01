export interface Article {
    id: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    source: string;
    author: string;
}

export interface GuardianArticle {
    id: string;
    webTitle: string;
    fields?: {
        trailText?: string;
        thumbnail?: string;
        byline?: string;
    };
    webUrl: string;
    webPublicationDate: string;
}

export interface UserPreferences {
    sources: string[];
    categories: string[];
    authors: string[];
}

export interface SearchFilters {
    date?: string;
    category?: string;
    source?: string;
}

