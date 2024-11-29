import { CONFIG } from '../config/index'
const config = CONFIG()
import jwt from 'jsonwebtoken'

function auth(req: any, res: any, next: any) {
    const token = req.header('Authorization')

    if (!token) return res.status(403).send({
        success: false,
        message: 'Access denied'
    })

    jwt.verify(token, `${process.env.JWT_SECRET}`, (err: any, user: any) => {
        if (err) {
            return res.status(403).send({
                success: false,
                message: "Invalid token supplied",
                error: err
            })
        }

        req.user = user;
        next();
    })


}
export default auth