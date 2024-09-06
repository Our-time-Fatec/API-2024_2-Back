import { UserPayload } from './path/to/your/userPayload'; // Importe o tipo que representa o payload do seu usuário, se você o tiver

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload; // Defina o tipo do usuário conforme seu payload
        }
    }
}
