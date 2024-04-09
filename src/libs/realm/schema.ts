export const ProductsSchema = {
  name: 'Products',
  
  properties: {
    uuid: 'string',
    sequence: 'int',
    description: 'string',
    price: 'double',
    barCode: 'string',
    quantity: 'int',
    id: 'int'
  },

  primaryKey: 'uuid'
}