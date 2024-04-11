import React from 'react';
import { getUsers } from '@/services/user/queries';
import ReactQueryClientExample from '@/components/example-connect-backend/ReactQueryClientExample';

const fetchUsers = async () => {
  try {
    const data = await getUsers();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

async function ReactQuery() {
  const data = await fetchUsers();
  return (
    <>
      <h2 className="font-bold text-2xl">Data in Server:</h2>
      {JSON.stringify(data)}
      <ReactQueryClientExample users={data} />
    </>
  );
}

export default ReactQuery;
