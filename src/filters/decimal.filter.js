export default function currencyFilter(value) {
  return (
    new Intl.NumberFormat('ru-RU', {
      style: 'decimal',
    }).format(value) + ' кг.'
  )
}
