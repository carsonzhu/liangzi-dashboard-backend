"use strict";

import OrderModel from "../../models/orders";

export const getOrdersAsync = ({ isSuper, rentalCompanyId }) => {
  if (isSuper) {
    return OrderModel.find();
  } else {
    return OrderModel.find({ pickupLocationId: rentalCompanyId });
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
