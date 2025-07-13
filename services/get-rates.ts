const API_VERSION:string = 'v1';
const API_URL:string = `https://api.frankfurter.dev/${API_VERSION}`;

import { Rate } from '@/types/rate';

interface RateData {
  [currencyCode: string]: number;
}

interface RatesByDate {
  [date: string]: RateData;
}

interface APIResponse {
  amount: number;
  base: string;
  start_date: string;
  end_date: string;
  rates: RatesByDate;
}

export const getRate = async (rate: Rate): Promise<Rate> => {
    let url:URL = new URL(`${API_URL}/latest`);
    let parameters:URLSearchParams = new URLSearchParams(url.search);

    parameters.append('base', rate.from);
    parameters.append('symbols', rate.into);

    const controller = new AbortController()

    const response = await fetch(`${url.toString()}?${parameters.toString()}`, {
        signal: controller.signal
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (!response.ok) throw console.error(`Failed to fetch data: ${response.status}`);

    const data = await response.json();

    rate.rate = data.rates[rate.into];

    controller.abort()

    return rate;
}

const getUniqueSymbolsByBase = (rates: Rate[]) => {
    const uniqueSymbolsByBase = <{base: string, symbols: string[]}[]>([]);
    
    rates.map(rate => {
        const base = uniqueSymbolsByBase.find(item => item.base === rate.from)
        
        if (!base) return uniqueSymbolsByBase.push({ base: rate.from, symbols: [rate.into] })

        if (base.symbols.includes(rate.into)) return

        return base.symbols.push(rate.into)
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

        const controller = new AbortController()

        const response = await fetch(`${url.toString()}?${parameters.toString()}`, {
            signal: controller.signal
        })

        await new Promise((resolve) => setTimeout(resolve, 2000))

        if (!response.ok) throw console.error(`Failed to fetch data: ${response.status}`)

        const data = await response.json()

        controller.abort()

        return data
    }))

    if (dataList) {
        dataList.map(data => {
            rates.map(rate => {
                if (data.base === rate.from) {
                    rate.rate = data.rates[rate.into]
                }
            })
        })
        
        return rates
    }
}

export const getAllRates = async (base?: string, symbols?: string[], date?: string):Promise<APIResponse> => {
    let url:URL = new URL(`${API_URL}/latest`)
    let parameters:URLSearchParams = new URLSearchParams(url.search)

    if (date) url = new URL(`${API_URL}/${date}`)

    if (base) parameters.append('base', base)
    
    if (symbols) parameters.append('symbols', symbols.join())

    const controller = new AbortController()

    const response = await fetch(`${url.toString()}?${parameters.toString()}`, {
        signal: controller.signal
    })

    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (!response.ok) throw console.error(`Failed to fetch data: ${response.status}`)

    const data = await response.json()

    controller.abort()

    return data
}
