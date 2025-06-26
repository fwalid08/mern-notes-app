import rateLimit from '../config/upstash.js';

const rateLimiter = async (req, res, next) => {
    try {
        const { success } = await rateLimit.limit("my-rate-limit");
        if (!success) {
            return res.status(429).json({
                message: 'Too many requests, please try again later.',
            });
        }
        next();
    } catch (error) {
        console.error('Rate limiter error:', error.message);
        next({
            status: 500,
            message: 'Internal server error',
        });
    }
};

export default rateLimiter;