import { Clock, CheckCircle2, Coffee, Shirt } from 'lucide-react';
import { Order } from '../types';

interface OrderQueueProps {
  orders: Order[];
  onStatusChange: (orderId: string, status: Order['status']) => void;
}

export function OrderQueue({ orders, onStatusChange }: OrderQueueProps) {
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'preparing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'ready':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="flex h-full flex-col rounded-xl bg-white shadow-sm ring-1 ring-pink-200">
      <div className="border-b border-pink-100 p-6">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-pink-600">
          <Clock className="h-5 w-5 text-pink-500" />
          Current Orders
        </h2>
        <p className="mt-1 text-sm text-pink-400">First come, first served queue</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {orders.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-gray-400">
            <Coffee className="mb-4 h-12 w-12 opacity-20" />
            <p>No active orders</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="relative overflow-hidden rounded-lg border border-pink-200 bg-white p-4 shadow-sm transition-all hover:shadow-md"
              >
                {order.tShirtCustomization && (
                  <div className="absolute right-0 top-0 rounded-bl-lg bg-pink-500 px-2 py-1 text-xs font-medium text-white">
                    <span className="flex items-center gap-1">
                      <Shirt className="h-3 w-3" />
                      Free Tee
                    </span>
                  </div>
                )}
                
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{order.customerName}</h3>
                    <p className="text-xs text-gray-500">
                      ID: #{order.id.slice(0, 8)}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium border ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>

                <div className="mb-4 space-y-1">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm text-gray-600">
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  {order.tShirtCustomization && (
                    <div className="mt-2 flex items-center gap-2 rounded bg-pink-50 p-2 text-sm text-pink-600">
                      <Shirt className="h-4 w-4" />
                      <span>
                        Custom Tee: <strong>{order.tShirtCustomization.name}</strong> ({order.tShirtCustomization.size})
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                  <span className="font-bold text-gray-900">
                    Total: ${order.total.toFixed(2)}
                  </span>
                  
                  {order.status !== 'completed' && (
                    <button
                      onClick={() => {
                        const nextStatus = 
                          order.status === 'pending' ? 'preparing' :
                          order.status === 'preparing' ? 'ready' : 'completed';
                        onStatusChange(order.id, nextStatus);
                      }}
                      className="flex items-center gap-1 rounded-md bg-pink-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-pink-600"
                    >
                      Advance Status
                      <CheckCircle2 className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
