export const formatPrice = (price: number | string): string => {
  const value = Number(price);
  return value === 0 ? 'Бесплатно' : `от ${value.toLocaleString('ru-RU')} сом`;
};