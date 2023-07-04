import * as dotenv from 'dotenv';
import { createServer as createHttpServer } from 'node:http';
import { handlerServer } from './handler/handlerServer';

dotenv.config();

const PORT = Number(process.env.PORT) || 4000;

const server = createHttpServer(handlerServer);

server.listen(PORT, () => {
  console.log(`Server running to ${PORT}`);
});
