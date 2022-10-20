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


app.get('/api/notifications/unread', async (req, res, next) => {
  try {
    const notifications = await Notification.find({ read: false });
  
    if (notifications) {
      res.status(200).json(notifications);
    } else {
      res.status(404).send({ errorMessage: `Notifications Not found`});
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

app.put('/api/notifications/read/all',  async (req, res, next) => {
  try {
    const notifications = await Notification.updateMany({ read: true },{ $set: { read: false } });
    if (notifications) {
      res.status(204).send({message: 'Updated Successfully'});
    } else {
      res.status(404).send({ errorMessage: `No Notifications  found to update`});
    }
  } catch (error) {
    res.status(500).send({ errorMessage: 'Error while finding the Notifications' });
  }
});

app.put('/api/notifications/read/:id', async (req, res, next) => {
  try {
    const notificationId = req.params.id;
    const notification = await Notification.updateOne({ _id: notificationId },{ $set: { read: true } });
    if (notification) {
      res.status(204).send({message: 'Updated Successfully'});
    } else {
      res.status(404).send({ errorMessage: `Notification Not found with ID ${notificationId}` });
    }
  } catch (error) {
    res.status(500).send({ errorMessage: 'Error while finding the Notification' });
  }
});

app.get('/api/notifications/unread/count', async (req, res, next) => {
  try {
    const notifications = await Notification.find({ read: false });
  
    if (notifications) {
      res.status(200).json({ count: notifications.length });
    } else {
      res.status(404).send({ errorMessage: `Notifications Not found`});
    }
  } catch (error) {
    res.status(500).send({ errorMessage: 'Error while finding the Notifications' });
  }
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
