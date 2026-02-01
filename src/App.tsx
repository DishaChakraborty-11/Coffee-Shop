import { useState } from 'react';
import { CoffeeMenu } from './components/CoffeeMenu';
import { OrderQueue } from './components/OrderQueue';
import { TShirtCustomizer } from './components/TShirtCustomizer';
import { Logo } from './components/Logo';
import { MenuItem, Order, OrderItem } from './types';

export function App() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrderItems, setCurrentOrderItems] = useState<OrderItem[]>([]);
  const [showTShirtModal, setShowTShirtModal] = useState(false);
  const [pendingOrderName, setPendingOrderName] = useState<string>('');

  const currentTotal = currentOrderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleAddToOrder = (item: MenuItem) => {
    setCurrentOrderItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleRemoveFromOrder = (itemId: string) => {
    setCurrentOrderItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const initiateOrder = (customerName: string) => {
    if (currentTotal > 30) {
      setPendingOrderName(customerName);
      setShowTShirtModal(true);
    } else {
      finalizeOrder(customerName);
    }
  };

  const finalizeOrder = (customerName: string, tShirtCustomization?: Order['tShirtCustomization']) => {
    const newOrder: Order = {
      id: crypto.randomUUID(),
      customerName,
      items: [...currentOrderItems],
      total: currentTotal,
      status: 'pending',
      createdAt: new Date(),
      tShirtCustomization,
    };

    setOrders((prev) => [...prev, newOrder]);
    setCurrentOrderItems([]);
    setPendingOrderName('');
    setShowTShirtModal(false);
  };

  const handleStatusChange = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  return (
    <div className="min-h-screen bg-pink-50 p-4 font-sans text-gray-900 md:p-8">
      {showTShirtModal && (
        <TShirtCustomizer
          onConfirm={(customization) => finalizeOrder(pendingOrderName, customization)}
          onSkip={() => finalizeOrder(pendingOrderName)}
        />
      )}

      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg shadow-pink-200">
            <Logo className="h-14 w-14" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-pink-600">Brew & Wear</h1>
            <p className="text-sm text-pink-400">Coffee Shop Dashboard • Order Management</p>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7 xl:col-span-8">
            <CoffeeMenu
              currentOrder={currentOrderItems}
              onAddToOrder={handleAddToOrder}
              onRemoveFromOrder={handleRemoveFromOrder}
              onSubmitOrder={initiateOrder}
              orderTotal={currentTotal}
            />
          </div>
          
          <div className="lg:col-span-5 xl:col-span-4 h-[calc(100vh-12rem)] sticky top-8">
            <OrderQueue orders={orders} onStatusChange={handleStatusChange} />
          </div>
        </div>
      </div>
    </div>
  );
}
