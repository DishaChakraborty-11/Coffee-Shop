import { Plus, ShoppingBag, Shirt } from 'lucide-react';
import { MenuItem, OrderItem } from '../types';
import { MENU_ITEMS } from '../data/menu';

interface CoffeeMenuProps {
  currentOrder: OrderItem[];
  onAddToOrder: (item: MenuItem) => void;
  onRemoveFromOrder: (itemId: string) => void;
  onSubmitOrder: (customerName: string) => void;
  orderTotal: number;
}

export function CoffeeMenu({ 
  currentOrder, 
  onAddToOrder, 
  onRemoveFromOrder, 
  onSubmitOrder,
  orderTotal 
}: CoffeeMenuProps) {
  const categories = Array.from(new Set(MENU_ITEMS.map((item) => item.category)));

  return (
    <div className="flex h-full flex-col gap-6">
      {/* Menu Selection */}
      <div className="flex-1 overflow-y-auto rounded-xl bg-white p-6 shadow-sm ring-1 ring-pink-200">
        <h2 className="mb-4 text-xl font-semibold text-pink-600">Menu</h2>
        
        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-pink-400">
                {category}
              </h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {MENU_ITEMS.filter((item) => item.category === category).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onAddToOrder(item)}
                    className="flex items-center justify-between rounded-lg border border-pink-100 bg-pink-50 p-3 text-left transition-colors hover:border-pink-300 hover:bg-pink-100"
                  >
                    <div>
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-pink-400">${item.price.toFixed(2)}</div>
                    </div>
                    <div className="rounded-full bg-white p-1.5 shadow-sm text-pink-500">
                      <Plus className="h-4 w-4" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Order Summary */}
      <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-pink-200">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-pink-600">
          <ShoppingBag className="h-5 w-5 text-pink-500" />
          Current Order
        </h2>

        {currentOrder.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            Select items from the menu
          </div>
        ) : (
          <>
            <div className="mb-4 max-h-48 space-y-2 overflow-y-auto">
              {currentOrder.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-xs font-medium">
                      {item.quantity}
                    </span>
                    <span className="text-gray-700">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => onRemoveFromOrder(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-gray-600">Total</span>
                <span className="text-2xl font-bold text-gray-900">
                  ${orderTotal.toFixed(2)}
                </span>
              </div>

              {orderTotal > 30 && (
                <div className="mb-4 flex items-center gap-2 rounded-lg bg-pink-50 p-3 text-sm text-pink-600">
                  <Shirt className="h-5 w-5" />
                  <span className="font-medium">Free custom T-Shirt unlocked!</span>
                </div>
              )}

              {orderTotal <= 30 && orderTotal > 0 && (
                <div className="mb-4 text-center text-xs text-pink-400">
                  Spend ${(30.01 - orderTotal).toFixed(2)} more for a free custom T-Shirt!
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const input = form.elements.namedItem('customerName') as HTMLInputElement;
                  if (input.value.trim()) {
                    onSubmitOrder(input.value);
                    input.value = '';
                  }
                }}
                className="flex gap-2"
              >
                <input
                  name="customerName"
                  type="text"
                  placeholder="Customer Name"
                  required
                  className="flex-1 rounded-lg border border-pink-300 px-3 py-2 text-sm focus:border-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-400"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-pink-500 px-4 py-2 text-sm font-medium text-white hover:bg-pink-600"
                >
                  Place Order
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
