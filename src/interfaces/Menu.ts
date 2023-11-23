interface Ingredients {
  topping_id: number;
  topping_name: string;
  price: number;
  topping_type: "sampyla" | "makkara" | "täyte" | "kastike";
}

interface Beverages {
  beverage_id: number;
  order_id: number;
  beverage_name: string;
  beverage_price: number;
}

interface ChefChoice {
  custom_id: number;
  order_id: number;
  hotdog_name: string;
  toppings: string;
  base_price: number;
}
export type { Ingredients, Beverages, ChefChoice };
