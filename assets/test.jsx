import React, { useState } from 'react';
export const Test = () => {

  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>没事计数器00</button>
    </div>
  )
}
