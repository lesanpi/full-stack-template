import { productHandlers } from './handlers/product.mock';
import { userHandlers } from './handlers/user.mock';

export const handlers = [...productHandlers, ...userHandlers];
