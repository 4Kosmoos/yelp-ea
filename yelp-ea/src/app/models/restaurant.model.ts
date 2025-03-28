export interface Restaurant {
    id: number;
    name: string;
    address: string;
    phone: string;
    description: string;
    category: RestaurantCategories[];
    rating: number;
  }

export enum RestaurantCategories {
  Chinois = 'Chinois',
  Libanais = 'Libanais',
  Thai = 'Thai',
  Vegan = 'Vegan',
  Grec = 'Grec',
  Kebab = 'Kebab',
  Fast_food = 'Fast food',
  Japonais = 'Japonais',
  Italien = 'Italien'
}

export interface User {
  id: number;
  login: string;
  password: string;
  role: UserRole;
  notes: Map<number, number>;
  resto: Restaurant[];
}

export enum UserRole {
  customer = 'client',
  owner = 'proprietaire',
  admin = 'admin'
}
