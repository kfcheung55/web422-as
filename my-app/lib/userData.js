const { getToken } = require('./authenticate');

const fetcher = (url) => fetch(url, { headers: { Authorization: `JWT ${getToken()}` }}).then((res) => res.json());

export default async function makeRequest(method, url, data) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
        const response = await fetcher(`${apiUrl}${url}`, method, data);
        return response;
    } catch (error) {
        console.error(`Error making ${method} request to ${url}:`, error);
        throw error;
    }
}

export async function addToFavourites(id) {
    return makeRequest('PUT', `/favourites/${id}`);
}

export async function removeFromFavourites(id) {
    return makeRequest('DELETE', `/favourites/${id}`);
}

export async function getFavourites() {
    return makeRequest('GET', '/favourites');
}

export async function addToHistory(id) {
    return makeRequest('PUT', `/history/${id}`);
}

export async function removeFromHistory(id) {
    return makeRequest('DELETE', `/history/${id}`);
}

export async function getHistory() {
    return makeRequest('GET', '/history');
}
