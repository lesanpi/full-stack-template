import { api } from '@/lib/api';
import { z } from 'zod';

export async function getUsers(options?: RequestInit) {
  const schemaExample = z.object({});
  // remember use zod definition
  const { data, response } = await api.get({
    url: '/users',
    options,
  });

  return data;
}
