export interface Restaurant {
    id: number;
    name: string;
    address: string;
    phone: string;
    description: string;
    categories: RestaurantCategories[];
    rating: number;
    noteFromCustomer: number;
  }

export enum RestaurantCategories {
  Chinois = 'Chinois',
  libanais = 'libanais',
  Thai = 'Thai',
  Vegan = 'Vegan',
  Grec = 'Grec',
  Kebab = 'Kebab',
  Fast_food = 'Fast_food',
  japonais = 'japonais',
  italien = 'italien'
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
