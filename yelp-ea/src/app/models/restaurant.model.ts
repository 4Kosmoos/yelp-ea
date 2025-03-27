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
  userRole: UserRole;
  notes: Map<number, number>;  // Remarquer que c'est une map clé-valeur
  resto: Restaurant[];
}

export enum UserRole {
  customer,
  owner,
  admin
}
