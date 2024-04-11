import { z } from 'zod';
import { api } from '@/lib/api';

export async function getUsers(options?: RequestInit) {
  // const schemaExample = z.object({});
  // remember use zod definition to validate the response
  try {
    const { data, response } = await api.get({
      url: '/users',
      options,
      // schema: schemaExample,
    });

    return data;
  } catch (error) {
    console.error(error);
  }
}
