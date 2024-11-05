import { Form } from 'react-router-dom';
import Button from '../../ui/Button';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  return (
    <div className='px-4 py-6'>
      <h2 className='mb-8 text-xl font-semibold'>
        Ready to order? Let&apos;s go!
      </h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method='POST'>
        <div className='flex flex-col gap-2 mb-5 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>First Name</label>
          <div className='grow'>
            <input
              className='w-full input'
              type='text'
              name='customer'
              required
            />
          </div>
        </div>

        <div className='flex flex-col gap-2 mb-5 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Phone number</label>
          <div className='grow'>
            <input className='w-full input' type='tel' name='phone' required />
          </div>
        </div>

        <div className='relative flex flex-col gap-2 mb-5 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Address</label>
          <div className='grow'>
            <input
              className='w-full input'
              type='text'
              name='address'
              required
            />
          </div>
        </div>

        <div className='flex items-center gap-5 mb-12'>
          <input
            className='w-6 h-6 accent-orange-400 focus:outline-none focus:ring focus:ring-orange-400 focus:ring-offset-2'
            type='checkbox'
            name='priority'
            id='priority'
          />
          <label htmlFor='priority' className='font-medium'>
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type='hidden' name='cart' />

          <Button type='primary'>Order now</Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {}

export default CreateOrder;
