export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: 'coffee' | 'pastry' | 'merch';
  image?: string;
}

export interface OrderItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed';
  createdAt: Date;
  tShirtCustomization?: {
    name: string;
    color: string;
    size: string;
  };
}
