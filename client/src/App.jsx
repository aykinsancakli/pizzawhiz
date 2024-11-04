import { useEffect, useState } from 'react';

function App() {
  const [fruits, setFruits] = useState([]);

  useEffect(function () {
    async function fetchFruits() {
      const res = await fetch(`http://localhost:8080/api`);
      const data = await res.json();
      setFruits(data.fruits);
    }
    fetchFruits();
  }, []);

  return (
    <div className='mx-auto w-96 bg-slate-200 text-xl text-red-500'>
      {fruits.map((fruit, i) => (
        <li className='list-none' key={i}>
          {fruit}
        </li>
      ))}
    </div>
  );
}

export default App;
