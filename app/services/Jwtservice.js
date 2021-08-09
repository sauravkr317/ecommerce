import jwt from 'jsonwebtoken';
import { SECRET } from '../config';

class JwtService {
    static sign(payload, expiry='60s', secret=SECRET) {
        return jwt.sign(payload, secret, {expiresIn: expiry});
    }
    static verify(payload, secret=SECRET) {
        return jwt.verify(payload, secret);
    }
}

export default JwtService;