import CreateUser from '../features/user/CreateUser';

function Home() {
  return (
    <div className='px-4 my-10 text-center sm:my-16'>
      <h1 className='mb-8 text-xl font-semibold md:text-3xl'>
        The best pizza.
        <br />
        <p className='mt-1 mb-1 text-orange-400'>
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

      <CreateUser />
    </div>
  );
}

export default Home;
