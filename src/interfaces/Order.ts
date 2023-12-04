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
interface FetchDataResponse {
  order_id?: number;
  hotdog_id?: number;
}
interface OrderCreationOptions {
  user_id: number;
  totalPrice: number;
}

interface HotdogCreationOptions {
  hotdog_name: string;
  base_price: number;
}

interface OrdersHotdogsCreationOptions {
  order_id: number;
  hotdog_id: number;
  amount: number;
}

interface CreateOrderResponse {
  order_id?: number;
  hotdog_id?: number;
  orderHotdogsId?: number;
  error?: string;
}
interface Hotdog {
  hotdog_id: number | null;
  ordersHotdogsAmount: number;
  base_price?: number;
  toppings?: number[];
}
export type {
  Order,
  FetchDataResponse,
  CreateOrderResponse,
  OrdersHotdogsCreationOptions,
  HotdogCreationOptions,
  OrderCreationOptions,
  Hotdog,
};
