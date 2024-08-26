const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sequelize = require("../connection/dbConnection");
const User = require("../models/userSchema/userCollection");

module.exports = {
  
   userCreate : async (req, res) => {
    const { name, email, password } = req.body;
    console.log("inside create")

    try {
      const existingUser = await User.findOne({ where: { email } });
  
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'User already exists',
        });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });
  
      res.status(201).json({
        success: true,
        message: 'User created successfully',
        user: newUser,
      });
    } catch (err) {
      console.error('Error in userCreate:', err);
      res.status(500).json({
        success: false,
        message: 'An error occurred while creating the user',
      });
    }
  },


  userLogin: async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ where: { email } });
  
      if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
  
        if (isPasswordValid) {
          const tokenData = {
            id: user.id,
          };
          const token = jwt.sign(tokenData, "hdgfsdg", {
            expiresIn: "1h",
          });
  
          res.status(200).json({
            success: true,
            message: "User login successful",
            token: token,
          });
        } else {
          res.status(401).json({
            success: false,
            message: "Invalid password",
          });
        }
      } else {
        res.status(403).json({
          success: false,
          message: "User not registered with this email",
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
};
