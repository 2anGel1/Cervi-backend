import { createServer } from 'http'
import { app } from './app'
import { PORT } from './config';
import swaggerDocs from "./utils/swagger";


const initServer = () => {

    const server = createServer(app);

    server.listen(PORT, () => {
        console.log('listening on port ', PORT);
        // swaggerDocs(app, PORT);
    });
}


initServer()