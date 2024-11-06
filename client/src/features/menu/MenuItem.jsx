import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { addItem, getCurrentQuantityById } from '../cart/cartSlice';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';
import DeleteItem from '../cart/DeleteItem';
import { useState } from 'react';

function MenuItem({ pizza }) {
  const [isImgOpen, setIsImgOpen] = useState(false);
  const dispatch = useDispatch();

  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      ingredients,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  return (
    <li className='flex gap-4 py-2'>
      <div className='overflow-hidden'>
        <img
          onClick={() => setIsImgOpen(true)}
          src={imageUrl}
          alt={name}
          className={`h-24 w-24 cursor-zoom-in transition-all duration-200 hover:scale-110 ${soldOut ? 'opacity-70 grayscale' : ''}`}
        />
      </div>

      {/* IMAGE OVERLAY FOR EACH MENU ITEM */}
      {isImgOpen && (
        <div
          className='fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-zinc-950 bg-opacity-40'
          onClick={() => setIsImgOpen(false)}
        >
          <div className='absolute'>
            <span
              className='absolute right-2 top-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-zinc-900 bg-opacity-70 text-4xl text-white transition-all duration-150 hover:bg-zinc-950'
              onClick={() => setIsImgOpen(false)}
            >
              &times;
            </span>
            <img src={imageUrl} className='mx-auto h-screen py-8'></img>
          </div>
        </div>
      )}

      <div className='flex grow flex-col pt-0.5'>
        <p className='font-medium'>{name}</p>
        <p className='text-xs capitalize italic text-stone-500 sm:text-sm'>
          {ingredients.join(', ')}
        </p>
        <div className='mt-auto flex items-center justify-between'>
          {!soldOut ? (
            <p className='text-sm'>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className='text-sm font-medium uppercase text-stone-500'>
              Sold out
            </p>
          )}

          {isInCart && (
            <div className='flex items-center gap-3 sm:gap-8'>
              <UpdateItemQuantity
                pizzaId={id}
                currentQuantity={currentQuantity}
              />
              <DeleteItem pizzaId={id} />
            </div>
          )}

          {!soldOut && !isInCart && (
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
