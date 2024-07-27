const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = require("../models/userSchema/userCollection");

module.exports = {
  userCreate: async (req, res) => {
    const userData = new userSchema(req.body);
    try {
      let isUserExist = await userSchema.findOne({ email: req.body.email });
      if (isUserExist) {
        res.status(402).json({
          success: false,
          message: "User already exist",
        });
      } else {
        await userData.save();
        res.status(201).json({
          success: true,
          message: "User created successfully",
          user: userData,
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },

  userLogin: async (req, res) => {
    try {
      const userData = await userSchema.findOne({
        email: req.body.email,
      });
      if (userData) {
        const tokenData = {
          id: userData._id,
        };
        const token = jwt.sign(tokenData, "hdgfsdg", {
          expiresIn: "1h",
        });
        res.status(200).json({
          success: true,
          message: "User login successfully",
          token: token,
        });
      } else {
        res.status(403).json({
          success: false,
          message: "User not registerd with this email",
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },
};
