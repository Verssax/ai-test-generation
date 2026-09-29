const testData = {
  searchQuery: 'кросівки',
  womensShoesPath: '/c/zhinky/vzuttya/vzuttya',
  searchResultsUrl: /\/s\/.*[?&]q=/,
  searchResultsHeading: /Результати для:\s*кросівки/,
  brandFilterUrl: /virobnik_1:/,
  cart: {
    categoryPath: '/c/zhinky/odyah',
    maxProductsToTry: 5,
    productUrl: /\/p\//,
    selectedSizeUrl: /[?&]size=/,
    cartUrl: /\/checkout\/cart/,
    singleItemCountText: 'Кількість товарів: 1',
    sizeLabel: 'Розмір:',
    singleQuantityText: 'Кількість: 1',
  },
};

module.exports = { testData };
