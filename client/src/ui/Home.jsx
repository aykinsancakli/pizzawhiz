import { useSelector } from 'react-redux';
import CreateUser from '../features/user/CreateUser';
import Button from './Button';

function Home() {
  const username = useSelector((state) => state.user.username);

  return (
    <div className='my-10 px-4 text-center sm:my-16'>
      <h1 className='mb-8 text-xl font-semibold md:text-3xl'>
        The best pizza.
        <br />
        <p className='mb-1 mt-1 text-orange-400'>
          <span className='text-orange-400'>Fresh.</span>{' '}
          <span className='text-orange-500'>Fast.</span>{' '}
          <span className='text-orange-600'>Delicious.</span>
        </p>
        <p>
          <span className='text-orange-600'>From our</span>{' '}
          <span className='text-orange-500'>oven to</span>{' '}
          <span className='text-orange-400'>your door.</span>
        </p>
      </h1>

      {username === '' ? (
        <CreateUser />
      ) : (
        <Button to='/menu' type='primary'>
          Continue ordering, {username}
        </Button>
      )}
    </div>
  );
}

export default Home;
