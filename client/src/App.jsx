import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_SERVER_DEVELOPMENT_URL;

function App() {
  const [menu, setMenu] = useState([]);

  useEffect(function () {
    async function fetchFruits() {
      const res = await fetch(`${API_URL}/menu`);
      const data = await res.json();
      console.log(data);
      setMenu(data);
    }
    fetchFruits();
  }, []);

  return (
    <div className='mx-auto w-96 bg-slate-200 text-xl text-red-500'>
      {menu.map((item) => (
        <p key={item.id}>
          {item.name}, {item.id}
        </p>
      ))}
    </div>
  );
}

export default App;
