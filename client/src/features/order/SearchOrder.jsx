import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchOrder() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder='Search order #'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='w-[150px] rounded-full bg-orange-100 px-4 py-2 text-sm text-stone-700 outline-none transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-orange-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72 lg:w-96'
      ></input>
    </form>
  );
}

export default SearchOrder;
