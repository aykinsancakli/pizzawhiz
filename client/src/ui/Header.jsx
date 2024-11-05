import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import Username from '../features/user/Username';

function Header() {
  return (
    <header className='flex items-center justify-between px-4 py-3 text-orange-100 uppercase bg-orange-400 border-b border-stone-200 sm:px-6'>
      <Link to='/' className='tracking-widest'>
        PizzaWhiz Co.
      </Link>

      <SearchOrder />

      <Username />
    </header>
  );
}

export default Header;