interface Order {
  orderID: number;
  status: number;
  orderDate: string;
  info: string;
  products: Custom[];
}
interface Hotdog {
  hotdog_id: number | null;
  ordersHotdogsAmount: number;
  base_price?: number;
  toppings?: number[];
}

interface Custom {
  hotdogID: number;
  toppings: Toppings[];
  basePrice: number;
}

interface Toppings {
  toppingID: number;
  toppingName: string;
  toppingType: number;
  price: number;
}
export type { Order, Hotdog, Toppings, Custom };
