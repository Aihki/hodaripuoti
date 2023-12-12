interface Ingredients {
  topping_id: number;
  topping_name: string;
  topping_price: number;
  topping_type: 'sampyla' | 'makkara' | 'täyte' | 'kastike';
}
/* 
interface Beverages {
  beverage_id: number;
  order_id: number;
  beverage_name: string;
  beverage_price: number;
} */
interface CustomIngredient {
  topping_name?: string;
  topping_price: number;
  topping_id: number;
}

interface ChefChoice {
  hotdog_id: number;
  order_id: number;
  hotdog_name: string;
  toppings: string;
  base_price: number;
}

interface Ingredient {
  topping_id: number;
  topping_name: string;
  topping_price: number;
}
export type { Ingredients, CustomIngredient, ChefChoice, Ingredient };
