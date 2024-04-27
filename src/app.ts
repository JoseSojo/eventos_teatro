import express from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import authController from './controllers/auth.controller';
import userController from './controllers/user.controller';
import adminController from './controllers/admin.controller';
import eventController from './controllers/event.controller';
import Mongo from './config/connec';

const app = express();
const PORT = process.env.PORT || 3005;

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use(authController);
app.use(userController);
app.use(adminController);
app.use(eventController);

const pathStorage = path.join(process.cwd(), '/src/storage');
app.use('/public', express.static(pathStorage));

app.listen(PORT, () => {
    Mongo();
    console.log('Server on port', PORT);
})
