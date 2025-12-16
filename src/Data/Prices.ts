export const Prices = {
  Prices: ['$29.99', '$9.99', '$15.99', '$49.99', '$7.99', '$15.99'],
};

const numbericPrices = Prices.Prices.map(i=> parseFloat(i.replace('$',""))); 

console.log(numbericPrices); 