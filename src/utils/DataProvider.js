const convertDateToSimpleFormat = (dateString) => {
    const date = new Date(dateString);

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');;
    const day = String(date.getUTCDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

const processOHLCData = (array) => {
    const ohlcData = array.map(d => ({
        time: convertDateToSimpleFormat(d[0]),
        open: d[1],
        high: d[2],
        low: d[3],
        close: d[4],
    }));
    
    return ohlcData;
}

export const fetchOHLCData = async () => {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/ethereum/ohlc?vs_currency=usd&days=365');
    const data = await response.json();

    const ohlcData = await processOHLCData(data);
    return ohlcData;
}