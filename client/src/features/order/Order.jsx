import { useLoaderData } from 'react-router-dom';
import { getOrder } from '../../services/apiRestaurant';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import OrderItem from './OrderItem';

function Order() {
  const order = useLoaderData();

  // Everyone can search for all orders, so for privacy exclude names or address, only for restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className='px-4 py-6 space-y-8'>
      {/* ORDER STATUS AND BADGES */}
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <h2 className='text-xl font-semibold'> Order #{id} status</h2>

        <div className='space-x-2'>
          {priority && (
            <span className='px-3 py-1 text-sm font-semibold tracking-wide uppercase bg-red-500 rounded-full text-red-50'>
              Priority
            </span>
          )}
          <span className='px-3 py-1 text-sm font-semibold tracking-wide uppercase bg-green-500 rounded-full text-green-50'>
            {status} order
          </span>
        </div>
      </div>

      {/* DELIVERY STATUS */}
      <div className='flex flex-wrap items-center justify-between gap-2 px-6 py-5 bg-stone-200'>
        <p className='font-medium'>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className='text-xs text-stone-500'>
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      {/* CART */}
      <ul className='border-t border-b divide-y divide-stone-200'>
        {cart.map((item) => (
          <OrderItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      {/* PRICING */}
      <div className='px-6 py-5 space-y-2 bg-stone-200'>
        <p className='text-sm font-medium text-stone-600'>
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className='text-sm font-medium text-stone-600'>
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className='font-bold'>
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  console.log(order);
  return order;
}

export default Order;