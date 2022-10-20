'use strict';

const config = require('config');
const mongoose = require('mongoose');

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const Notification = require('./schemas/NotificationSchema').Notification;

const app = express();

const MONGO_HOST = config.get('MONGO_HOST');

app.get('/api/notifications', async (req, res, next) => {
  try {
    const notifications = await Notification.find({});
    if (notifications) {
      res.json(notifications);
    }
  } catch (error) {
    res.status(500).send({ errorMessage: 'Error while finding the Notifications' });
  }
});

app.get('/api/notifications/:id', async (req, res, next) => {
  try {
    const notificationId = req.params.id;
    const notification = await Notification.findOne({ _id: notificationId });
    if (notification) {
      res.json(notification);
    } else {
      res.status(404).send({ errorMessage: `Notification Not found with ID ${notificationId}` });
    }
  } catch (error) {
    res.status(500).send({ errorMessage: 'Error while finding the Notification' });
  }
});

app.put('/api/notifications/read/:id', function (req, res, next) {
  console.log('id is ', req.params.id);
  Notification.update({ _id: req.params.id }, { $set: { read: true } }).exec(function (error, notification) {
    if (error) {
      console.log('Internal Error: ', error);
      res.sendStatus(500);
    }

    res.json(notification);
  });
});

app.get('/api/notifications/unread', function (req, res, next) {
  Notification.find({ read: false }).exec(function (error, notifications) {
    if (error) {
      console.log('Internal Error: ', error);
      res.sendStatus(500);
    }
    res.json(notifications);
  });
});
app.get('/api/notifications/unread/count', function (req, res, next) {
  Notification.find({ read: false }).exec(function (error, notifications) {
    if (error) {
      console.log('Internal Error: ', error);
      res.sendStatus(500);
    }
    res.json({ count: notifications.length });
  });
});
app.put('/api/notifications/read/all', function (req, res, next) {
  Notification.updateMany({ read: false }, { $set: { read: true } }).exec(
    function (error, updateResult) {
      if (error) {
        console.log('Internal Error: ', error);
        res.sendStatus(500);
      }
      res.json({ count: updateResult.modifiedCount });
    }
  );
});
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, async () => {
  try {
    await mongoose.connect(MONGO_HOST, { dbName: 'interview' });
    console.log(`Example app listening on port ${3000}`);
  } catch (error) {
    console.log('There was an error connecting to MongoDB', error);
    process.exit(1);
  }
});
