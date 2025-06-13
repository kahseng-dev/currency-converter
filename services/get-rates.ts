const API_VERSION:string = 'v1';
const API_URL:string = `https://api.frankfurter.dev/${API_VERSION}`;

export type RateAPI = {
    base?: string;
    date?: string;
    rates?: Record<string, number>;
};

export async function getRates(base?: string, symbols?: string[], date?: string) {
    let url:URL = new URL(`${API_URL}/latest`);
    let parameters:URLSearchParams = new URLSearchParams(url.search);

    if (date) {
        date = new Date().toISOString().split('T')[0];
        url = new URL(`${API_URL}/${date}`);
    }

    if (base) {
        parameters.append('base', base);
    }

    if (symbols) {
        parameters.append('symbols', symbols.join());
    }

    const response = await fetch(`${url.toString()}?${parameters.toString()}`);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (!response.ok) {
        throw console.error(`Failed to fetch data: ${response.status}`);
    }

    const data = (await response.json()) as RateAPI;
    return data;
}
