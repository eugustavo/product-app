import { price, phone, cnpj } from './format';

describe('Utils/Format', () => {
  it('should format price in BRL currency', () => {
    const priceUnformatted = 100;
    const priceFormatted = price(priceUnformatted);
    
    
    expect(priceFormatted).toEqual(new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(priceUnformatted));
  });

  it('should not format price if it is not a number', () => {
    const priceUnformatted = 'abc';
    const priceFormatted = price(priceUnformatted);
    
    expect(priceFormatted).toEqual('');
  });

  it('should format phone number', () => {
    const phoneUnformatted = '33445566';
    const phoneFormatted = phone(phoneUnformatted);
    
    expect(phoneFormatted).toEqual('3344-5566');
  });

  it('should not format phone number if it is not a string', () => {
    const phoneUnformatted = 33445566;
    const phoneFormatted = phone(phoneUnformatted);
    
    expect(phoneFormatted).toEqual('');
  })

  it('should format cnpj number', () => {
    const cnpjUnformatted = '12345678901234';
    const cnpjFormatted = cnpj(cnpjUnformatted);

    expect(cnpjFormatted).toEqual('12.345.678/9012-34');
  });

  it('should not format cnpj number if it is not a string', () => {
    const cnpjUnformatted = 12345678901234;
    const cnpjFormatted = cnpj(cnpjUnformatted);

    expect(cnpjFormatted).toEqual('');
  })
})