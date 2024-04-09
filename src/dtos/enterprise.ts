export interface Enterprise {
  name: string;
  identification: string;
  phoneCollection: PhoneCollection[];
  addressCollection: AddressCollection[];
}

interface PhoneCollection {
  areaCode: number
  number: string
}

interface AddressCollection {
  street: string
  neighbourhood: string
  number: string
  zipCode: ZipCode
}

export interface ZipCode {
  zipCode: string
  city: City
}

export interface City {
  name: string
  state: State
}

export interface State {
  acronym: string
}