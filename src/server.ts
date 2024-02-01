import { createServer } from 'http'
import { app } from './app'
import { PORT } from './config';

const initServer = () => {
    const server = createServer(app);

    server.listen(PORT, () => {
        console.log('listening on port ', PORT);
    })
}


initServer()