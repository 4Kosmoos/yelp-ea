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
  Chinois,
  libanais,
  Thai,
  Vegan,
  Grec,
  Kebab,
  Fast_food,
  japonais,
  italien,
}


export interface User {
  id: number;
  login: string;
  password: string;
  userRole: UserRole;
  notes: Map<number, number>;
  resto: Restaurant[];
}

export enum UserRole {
  customer,
  owner,
  admin
}
