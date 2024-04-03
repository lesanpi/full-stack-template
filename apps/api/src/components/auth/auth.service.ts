import jwt from 'jsonwebtoken';
import { TSignInInput } from './auth.dto';
import { JwtUserIdPayload } from '@/types/JWTTypes';
import { userService } from '../users/user.service';

/**
 * @async
 * @function
 * @description This function mocks user authentication using a JWT
 * @implements TSignInInput
 * @listens auth.controller:signIn
 * @param data {TSignInInput}
 * @requires jsonwebtoken
 * @returns {object} Object with user object and its token as a string
 * @see user.model
 * @since 1.0.0
 * @summary Sign In
 * @todo Get user from database
 * @version 1
 */

async function signIn(data: TSignInInput) {
  const user = {
    _id: '6553f84c18a72845d4ce631f',
    name: 'Jose',
    email: data.email,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const token = jwt.sign(user, process.env.JWT_SECRET!);
  return {
    user,
    token,
  };
}

/**
 * @async
 * @function
 * @description This function returns the user from the jwt token provided
 * @param data {string} jwt token from the user's login
 * @requires jsonwebtoken
 * @returns {IUser} user object
 * @see user.model
 * @since 1.0.0
 * @summary Get Current User
 * @version 1
 */

export async function currentUser(token: string) {
  // Clean the token
  const cleanToken = token.replace('Bearer ', '');

  // We get the userId from the token

  const payload = jwt.verify(
    cleanToken,
    process.env.SECRET!
  ) as JwtUserIdPayload;

  const user = await userService.findOne(payload._id);
  return user;
}
export const authService = Object.freeze({
  signIn,
  currentUser,
});
