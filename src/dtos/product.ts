export interface Product {
  uuid: string
  sequence: number
  description: string
  price: number
  barCode: string
  quantity: number
  id: number
  unitOfMeasure: {
    name: string,
  }
}