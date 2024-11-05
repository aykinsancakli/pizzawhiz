import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  function handleAddToCart() {}

  return (
    <li className='flex gap-4 py-2'>
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 w-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className='flex grow flex-col pt-0.5'>
        <p className='font-medium'>{name}</p>
        <p className='text-sm italic capitalize text-stone-500'>
          {ingredients.join(', ')}
        </p>
        <div className='flex items-center justify-between mt-auto'>
          {!soldOut ? (
            <p className='text-sm'>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className='text-sm font-medium uppercase text-stone-500'>
              Sold out
            </p>
          )}

          {!soldOut && (
            <Button type='small' onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;