interface Order {
  orderID: number;
  status: number;
  orderDate: string;
  info: string;
  products: Custom[];
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
export type { Order };
