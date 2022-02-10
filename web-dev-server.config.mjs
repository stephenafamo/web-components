import cors from '@koa/cors';

export default {
    nodeResolve: true,
    middleware: [cors({origin: "*"})]
};
