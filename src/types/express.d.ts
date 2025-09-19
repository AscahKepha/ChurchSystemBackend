import { TUserSelect } from '../db/schema'; 

declare global {
  namespace Express {
    interface Request {
      user?: TUserSelect;
    }
  }
}