export function price(price: number) {
  if (isNaN(price)) return '';

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(price);
}

export function cnpj(cnpj: string | undefined) {
  if (!cnpj) return '';

  if (typeof cnpj !== 'string') return '';
  
  return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
}

export function phone(phone: string | undefined) {
  if (!phone) return '';

  if (typeof phone !== 'string') return '';

  return phone.replace(/^(\d{4})(\d{4})$/, '$1-$2');
}
