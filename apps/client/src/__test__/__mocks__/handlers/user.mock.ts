import { http, HttpResponse } from 'msw';
import { mockUser } from '../entities';

export const userHandlers = [
  http.get('https://jsonplaceholder.typicode.com/users', () => {
    return HttpResponse.json({
      users: [
        {
          ...mockUser(),
        },
      ],
    });
  }),
];
