import { Outlet } from 'react-router-dom';
import Header from './Header';
import CartOverview from '../cart/CartOverview';

function AppLayout() {
  return (
    <div className='grid h-screen grid-rows-[auto_1fr_auto] bg-red-500'>
      <Header />

      <Outlet />

      <CartOverview />
    </div>
  );
}

export default AppLayout;
