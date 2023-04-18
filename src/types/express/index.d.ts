import { AuthInfo } from '../auth-info';

declare global {
    namespace Express {
      interface Request {
          auth: AuthInfo;
      }
    }
  }