interface Order {
  order_id: number;
  status: number;
  order_date: string;
  total_price: number;
  user_id: number;
  message?: string;
}
interface Hotdog {
  hotdog_id: number | null;
  ordersHotdogsAmount: number;
  base_price?: number;
  toppings?: number[];
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
interface orderHotdogs {
  order_id: number;
  hotdog_id: number;
  amount: number;
  hotdog_name: string;
  base_price: string;
  order_date: string;
  status: number;
  total_price: string;
  user_id: number;
}
interface HotdogsAndToppings {
  hotdog_id: number;
  hotdog_name: string;
  amount: number;
  toppings: string;
}
interface HotdogPrices {
  order_id: number;
  hotdog_name: string;
  hotdog_base_price: string;
  total_topping_price: string;
  hotdog_amount: number;
  total_price: string;
}
export type {
  Order,
  FetchDataResponse,
  CreateOrderResponse,
  OrdersHotdogsCreationOptions,
  HotdogCreationOptions,
  OrderCreationOptions,
  Hotdog,
  orderHotdogs,
  HotdogsAndToppings,
  HotdogPrices,
};
