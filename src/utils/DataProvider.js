const convertDateToSimpleFormat = (dateString) => {
  const date = new Date(dateString);

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const processOHLCData = (array) => {
  const ohlcData = array.map((d) => ({
    time: convertDateToSimpleFormat(d[0]),
    open: d[1],
    high: d[2],
    low: d[3],
    close: d[4],
  }));

  return ohlcData;
};

export const fetchOHLCData = async () => {
  const response = await fetch('https://api.coingecko.com/api/v3/coins/ethereum/ohlc?vs_currency=usd&days=365');
  const data = await response.json();
//   const data = [
//     [1688256000000, 1932.3, 1941.27, 1910.69, 1924.57],
//     [1688601600000, 1924.25, 1976.23, 1897.04, 1910.51],
//     [1688947200000, 1910.35, 1957.35, 1835.48, 1864.58],
//     [1689292800000, 1861.97, 2009.12, 1848.9, 2003.25],
//     [1689638400000, 2004.38, 2020.46, 1883.08, 1912.12],
//     [1689984000000, 1911.91, 1927.14, 1882.46, 1891.47],
//     [1690329600000, 1891.15, 1904.07, 1837.6, 1857.6],
//     [1690675200000, 1857.4, 1885.6, 1849.87, 1880.92],
//     [1691020800000, 1881.17, 1882.27, 1823.43, 1838.01],
//     [1691366400000, 1839.08, 1854.55, 1820.39, 1826.71],
//     [1691712000000, 1827.3, 1871.57, 1807.95, 1850.88],
//     [1692057600000, 1851.03, 1859.91, 1836.08, 1843.51],
//     [1692403200000, 1844.11, 1846.04, 1576.13, 1660.68],
//     [1692748800000, 1661.2, 1692.84, 1597.41, 1635.19],
//     [1693094400000, 1633.69, 1689.23, 1629.96, 1645.9],
//     [1693440000000, 1646.0, 1741.29, 1632.48, 1705.11],
//     [1693785600000, 1705.46, 1717.87, 1605.79, 1635.4],
//     [1694131200000, 1635.64, 1659.1, 1610.35, 1646.31],
//     [1694476800000, 1646.64, 1653.45, 1539.24, 1549.89],
//     [1694822400000, 1552.2, 1652.73, 1549.62, 1641.93],
//     [1695168000000, 1641.05, 1667.95, 1610.47, 1643.7],
//     [1695513600000, 1643.25, 1650.19, 1573.13, 1593.18],
//     [1695859200000, 1593.53, 1631.64, 1564.71, 1597.42],
//     [1696204800000, 1597.71, 1735.33, 1597.32, 1733.82],
//     [1696550400000, 1734.29, 1740.08, 1610.86, 1612.99],
//     [1696896000000, 1611.29, 1657.82, 1560.9, 1580.18],
//     [1697241600000, 1579.61, 1594.82, 1523.35, 1550.97],
//     [1697587200000, 1552.29, 1630.06, 1545.69, 1565.06],
//     [1697932800000, 1565.02, 1640.09, 1545.96, 1629.3],
//     [1698278400000, 1629.27, 1851.67, 1624.16, 1785.56],
//     [1698624000000, 1787.29, 1861.11, 1752.23, 1798.17],
//     [1698969600000, 1796.74, 1873.12, 1779.75, 1800.91],
//     [1699315200000, 1801.07, 1913.15, 1778.22, 1898.52],
//     [1699660800000, 1900.83, 2132.75, 1853.95, 2078.85],
//     [1700006400000, 2077.95, 2113.61, 1963.47, 1980.52],
//     [1700352000000, 1978.57, 2079.65, 1912.46, 1962.63],
//     [1700697600000, 1962.8, 2088.04, 1940.08, 2065.94],
//     [1701043200000, 2063.87, 2130.84, 2041.12, 2064.07],
//     [1701388800000, 2062.87, 2076.14, 1986.49, 2051.76],
//     [1701734400000, 2052.54, 2271.34, 2046.51, 2242.96],
//     [1702080000000, 2244.35, 2385.1, 2191.16, 2359.89],
//     [1702425600000, 2358.07, 2399.12, 2162.97, 2200.33],
//     [1702771200000, 2201.64, 2331.32, 2154.93, 2227.94],
//     [1703116800000, 2227.25, 2258.55, 2123.86, 2198.42],
//     [1703462400000, 2201.67, 2342.01, 2184.99, 2264.91],
//     [1703808000000, 2265.37, 2442.31, 2189.94, 2345.26],
//     [1704153600000, 2345.04, 2382.04, 2267.55, 2350.03],
//     [1704499200000, 2350.09, 2434.45, 2148.36, 2267.09],
//     [1704844800000, 2266.78, 2362.86, 2170.31, 2341.16],
//     [1705190400000, 2344.84, 2698.43, 2344.84, 2575.92],
//     [1705536000000, 2577.53, 2609.51, 2472.13, 2528.33],
//     [1705881600000, 2529.59, 2546.28, 2418.57, 2454.91],
//     [1706227200000, 2453.85, 2462.26, 2168.8, 2219.61],
//     [1706572800000, 2217.35, 2318.14, 2197.62, 2314.59],
//     [1706918400000, 2316.96, 2385.34, 2246.98, 2307.43],
//     [1707264000000, 2307.46, 2386.18, 2273.36, 2372.76],
//     [1707609600000, 2372.07, 2522.34, 2352.2, 2499.49],
//     [1707955200000, 2501.19, 2785.55, 2472.23, 2780.37],
//     [1708300800000, 2780.18, 2894.2, 2725.37, 2874.95],
//     [1708646400000, 2875.49, 3028.6, 2859.98, 2974.13],
//     [1708992000000, 2972.36, 3204.18, 2906.7, 3173.63],
//     [1709337600000, 3179.54, 3514.33, 3167.51, 3431.75],
//     [1709683200000, 3433.11, 3817.25, 3360.08, 3581.53],
//     [1710028800000, 3553.68, 3998.19, 3508.16, 3916.04],
//     [1710374400000, 3914.68, 4085.78, 3800.05, 4007.91],
//     [1710720000000, 4005.85, 4009.15, 3431.16, 3643.28],
//     [1711065600000, 3643.77, 3643.77, 3070.9, 3493.43],
//     [1711411200000, 3492.15, 3645.49, 3257.83, 3588.49],
//     [1711756800000, 3589.3, 3682.96, 3468.97, 3516.1],
//     [1712102400000, 3514.21, 3657.66, 3228.5, 3274.9],
//     [1712448000000, 3276.03, 3436.89, 3224.18, 3362.84],
//     [1712793600000, 3355.71, 3722.31, 3347.39, 3539.76],
//     [1713139200000, 3543.6, 3611.83, 2878.22, 3157.68],
//     [1713484800000, 3154.16, 3266.62, 2936.48, 3064.91],
//     [1713830400000, 3066.62, 3232.07, 2876.08, 3199.77],
//     [1714176000000, 3200.82, 3289.86, 3082.0, 3131.42],
//     [1714521600000, 3130.37, 3345.29, 2916.38, 3018.55],
//     [1714867200000, 3010.01, 3164.81, 2826.93, 3115.02],
//     [1715212800000, 3117.96, 3221.25, 2942.79, 2975.73],
//     [1715558400000, 2973.59, 3058.61, 2888.37, 2931.31],
//     [1715904000000, 2928.75, 3040.59, 2866.02, 2943.59],
//     [1716249600000, 2944.04, 3698.97, 2936.23, 3656.39],
//     [1716595200000, 3661.56, 3937.9, 3635.43, 3727.07],
//     [1716940800000, 3726.53, 3968.15, 3712.37, 3840.69],
//     [1717286400000, 3840.99, 3875.64, 3702.32, 3813.45],
//     [1717632000000, 3814.26, 3884.76, 3743.68, 3871.08],
//     [1717977600000, 3863.41, 3876.45, 3642.09, 3705.9],
//     [1718323200000, 3705.99, 3706.86, 3434.52, 3465.32],
//     [1718668800000, 3470.33, 3645.9, 3366.75, 3510.36],
//     [1719014400000, 3509.86, 3620.96, 3377.4, 3516.88],
//     [1719360000000, 3517.54, 3518.22, 3245.7, 3395.3],
//     [1719705600000, 3395.88, 3483.6, 3326.62, 3371.28],
//   ];

  const ohlcData = await processOHLCData(data);
  return ohlcData;
};

export const organizeNumber = (param) => {
  return parseFloat(param).toLocaleString(undefined, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
};

export const fetchETHPrice = async () => {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
  );
  const data = await response.json();
  return data.ethereum.usd;
};
