export default function formatCurrency(value) {
  const num = Number(value || 0);
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', currencyDisplay: 'code' }).format(num);
}
