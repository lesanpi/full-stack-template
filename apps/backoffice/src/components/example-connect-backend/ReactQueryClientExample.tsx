'use client';

import React from 'react';
import { useUsers } from '@/services/user/hooks';

interface ReactQueryClientProps {
  users: any; // FIXME: Replace with the correct type
}

function ReactQueryClientExample({ users }: ReactQueryClientProps) {
  // if you need the same query in client and server, you can use initialData
  const { data, isLoading, error } = useUsers({});

  const [products, setProducts] = React.useState<any>([]);

  React.useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((resp) => resp.json())
      .then(({ products }) => setProducts(products));
  }, []);

  return (
    <div>
      <h2 className="font-bold text-2xl">Data in Client:</h2>
      {// Show the user data
      data?.users?.map((user: any) => {
        return <p key={user.id}>{user.name}</p>;
      })}
      {products.map((prod: any) => {
        return (
          <li className="product" key={prod.id}>
            <div className="card-header">
              <h1>{prod.title}</h1>
            </div>
            <div className="card-content">
              <p>{prod.description}</p>
            </div>
          </li>
        );
      })}
    </div>
  );
}

export default ReactQueryClientExample;
