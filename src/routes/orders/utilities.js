"use strict";

import OrderModel from "../../models/orders";
import DriverModel from "../../models/driver";
import UserModel from "../../models/user";

export const getOrdersAsync = async ({ isSuper, rentalCompanyId }) => {
  try {
    const orders = await (isSuper
      ? OrderModel.find()
      : OrderModel.find({ pickupLocationId: rentalCompanyId }));

    const driverPromises = orders.map(order =>
      DriverModel.findOne({ _id: order.driverId })
    );

    const userPromises = orders.map(order =>
      UserModel.findOne({ _id: order.userId }, { email: 1, phoneNumber: 1 })
    );

    const drivers = await Promise.all(driverPromises);
    const users = await Promise.all(userPromises);

    const resultedOrder = orders.reduce((accum, curr, ind) => {
      const order = {};
      order._id = curr._id;
      order.driverId = curr.driverId;
      order.vehicleId = curr.vehicleId;
      order.insuranceId = curr.insuranceId;
      order.amount = curr.amount;
      order.currency = curr.currency;
      order.pickTime = curr.pickTime;
      order.returnTime = curr.returnTime;
      order.paymentMethod = curr.paymentMethod;
      order.amountPaid = curr.amountPaid;
      order.Driver = drivers[ind];
      order.User = users[ind];

      accum.push(order);

      return accum;
    }, []);

    return Promise.resolve(resultedOrder);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const createOrderAsync = ({}) => {
  const newOrder = new OrderModel({});

  return newOrder.save();
};

export const editOrderAsync = ({ isSuper, orderId, fieldToUpdate }) => {
  if (isSuper) {
    return OrderModel.updateOne({ _id: orderId }, fieldToUpdate);
  }

  return OrderModel.find({ _id: orderId });
};

export const deleteOrderAsync = ({ orderId }) => {
  return OrderModel.deleteOne({ _id: orderId });
};
