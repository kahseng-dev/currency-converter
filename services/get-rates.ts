const API_VERSION:string = 'v1';
const API_URL:string = `https://api.frankfurter.dev/${API_VERSION}`;

import { Rate } from '@/types/rate';

export const getRate = async (rate: Rate) => {
    let url:URL = new URL(`${API_URL}/latest`);
    let parameters:URLSearchParams = new URLSearchParams(url.search);

    parameters.append('base', rate.base);
    parameters.append('symbols', rate.to);

    const response = await fetch(`${url.toString()}?${parameters.toString()}`);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (!response.ok) throw console.error(`Failed to fetch data: ${response.status}`);

    const data = await response.json();

    rate.rate = data.rates[rate.to];

    return rate;
}

const getUniqueSymbolsByBase = (rates: Rate[]) => {
    const uniqueSymbolsByBase = <{base: string, symbols: string[]}[]>([]);
    
    rates.map(rate => {
        const base = uniqueSymbolsByBase.find(item => item.base === rate.base)
        
        if (!base) return uniqueSymbolsByBase.push({base: rate.base, symbols: [rate.to]})

        if (base.symbols.includes(rate.to)) return

        return base.symbols.push(rate.to)
    })
    
    return uniqueSymbolsByBase
}

export const getRates = async (rates: Rate[]) => {
    const uniqueSymbolsByBase = getUniqueSymbolsByBase(rates)

    const dataList = await Promise.all(uniqueSymbolsByBase.map(async (rate) => {

        let url:URL = new URL(`${API_URL}/latest`)
        let parameters:URLSearchParams = new URLSearchParams(url.search)

        parameters.append('base', rate.base)
        parameters.append('symbols', rate.symbols.join())

        const response = await fetch(`${url.toString()}?${parameters.toString()}`)

        await new Promise((resolve) => setTimeout(resolve, 2000))

        if (!response.ok) throw console.error(`Failed to fetch data: ${response.status}`)

        return await response.json()
    }))

    if (dataList) {
        dataList.map(data => {
            rates.map(rate => {
                if (data.base === rate.base) {
                    rate.rate = data.rates[rate.to]
                }
            })
        })

        return rates
    }
}

export const getAllRates = async (base?: string, symbols?: string[], date?: string) => {
    let url:URL = new URL(`${API_URL}/latest`)
    let parameters:URLSearchParams = new URLSearchParams(url.search)

    if (date) {
        date = new Date().toISOString().split('T')[0]
        url = new URL(`${API_URL}/${date}`)
    }

    if (base) parameters.append('base', base)
    
    if (symbols) parameters.append('symbols', symbols.join())

    const response = await fetch(`${url.toString()}?${parameters.toString()}`)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (!response.ok) throw console.error(`Failed to fetch data: ${response.status}`)

    return await response.json();
}
