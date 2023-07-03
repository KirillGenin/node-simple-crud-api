import { IncomingMessage, ServerResponse } from 'http';
import db from '../db';
import {
  isApiPage,
  isApiPageWithId,
  isValidUser,
  getUserIdFromUrl,
  isValidUserToUpdate,
} from '../utils/utils';
import { IUserBody, HTTPMethods, ErrorMessage } from '../types';
import { validate } from 'uuid';

export async function handlerServer(req: IncomingMessage, res: ServerResponse) {
  try {
    const { url } = req;

    if (url && isApiPage(url)) {
      switch (req.method) {
        case HTTPMethods.GET:
          try {
            const users = await db.getUsers();
            res.writeHead(200, {
              'Content-Type': 'application/json',
            });
            res.end(JSON.stringify(users));
          } catch {
            res.statusCode = 500;
            res.end();
          }
          break;
        case HTTPMethods.POST: {
          let data = '';

          req.on('data', (chunk) => {
            data += chunk;
          });

          req.on('end', async () => {
            try {
              const user: IUserBody = JSON.parse(data);
              if (!isValidUser(user)) {
                res.writeHead(400, {
                  'Content-Type': 'application/json',
                });
                res.end(ErrorMessage.INVALID_REQUEST_BODY);
              } else {
                try {
                  const newUser = await db.addUser(user);
                  res.writeHead(201, {
                    'Content-Type': 'application/json',
                  });
                  res.end(JSON.stringify(newUser));
                } catch {
                  res.statusCode = 500;
                  res.end();
                }
              }
            } catch (error) {
              res.writeHead(400, {
                'Content-Type': 'application/json',
              });
              res.end(ErrorMessage.INVALID_JSON);
            }
          });
          break;
        }
        default:
          res.writeHead(400, {
            'Content-Type': 'application/json',
          });
          res.end(ErrorMessage.INVALID_METHOD);
          break;
      }
    } else if (url && isApiPageWithId(url)) {
      const userID = getUserIdFromUrl(url);

      if (!validate(userID)) {
        res.statusCode = 400;
        res.end(ErrorMessage.INVALID_USER_ID);
      }

      switch (req.method) {
        case HTTPMethods.GET:
          try {
            const user = await db.getUser(userID);

            if (!user) {
              res.statusCode = 404;
              res.end(ErrorMessage.USER_NOT_FOUND);
            } else {
              res.writeHead(200, {
                'Content-Type': 'application/json',
              });
              res.end(JSON.stringify(user));
            }
          } catch {
            res.statusCode = 500;
            res.end();
          }
          break;

        case HTTPMethods.PUT:
          let data = '';

          req.on('data', (chunk) => {
            data += chunk;
          });

          req.on('end', async () => {
            try {
              const user: Partial<IUserBody> = JSON.parse(data);

              if (!isValidUserToUpdate(user)) {
                res.statusCode = 400;
                res.end(ErrorMessage.INVALID_REQUEST_BODY);
              } else {
                try {
                  const userUpdate = await db.updateUser(userID, user);
                  if (userUpdate) {
                    res.writeHead(200, {
                      'Content-Type': 'application/json',
                    });
                    res.end(JSON.stringify(userUpdate));
                  } else {
                    res.statusCode = 404;
                    res.end(ErrorMessage.USER_NOT_FOUND);
                  }
                } catch {
                  res.statusCode = 500;
                  res.end();
                }
              }
            } catch {
              res.writeHead(400, {
                'Content-Type': 'application/json',
              });
              res.end(ErrorMessage.INVALID_JSON);
            }
          });
          break;

        default:
          res.statusCode = 400;
          res.end(ErrorMessage.INVALID_METHOD);
          break;
      }
    } else {
      res.statusCode = 404;
      res.end(ErrorMessage.PAGE_NOT_FOUND);
    }
  } catch (error) {
    res.statusCode = 500;
    res.end();
  }
}
