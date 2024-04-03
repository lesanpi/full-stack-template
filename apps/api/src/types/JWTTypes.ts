import { Types } from 'mongoose';
// Interface for type of jjwt payload
export interface JwtUserIdPayload {
  _id: Types.ObjectId;
}
