const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const STUDENT_ID = '1771020440'; // ⚠️ BẮT BUỘC THEO ĐỀ

// REGISTER
const register = async (req, res, next) => {
  try {
    const { email, password, full_name, phone_number, address } = req.body;
    const connection = await pool.getConnection();

    const [users] = await connection.execute(
      'SELECT id FROM customers WHERE email = ?',
      [email]
    );

    if (users.length > 0) {
      connection.release();
      return res.status(409).json({
        success: false,
        message: 'Email already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await connection.execute(
      'INSERT INTO customers (email, password, full_name, phone_number, address) VALUES (?, ?, ?, ?, ?)',
      [email, hashedPassword, full_name, phone_number, address]
    );

    connection.release();

    res.status(201).json({
      success: true,
      message: 'Customer registered successfully',
      data: {
        id: result.insertId,
        email,
        full_name
      }
    });
  } catch (error) {
    next(error);
  }
};

// LOGIN
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const connection = await pool.getConnection();

    const [users] = await connection.execute(
      'SELECT * FROM customers WHERE email = ? AND is_active = true',
      [email]
    );

    if (users.length === 0) {
      connection.release();
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const user = users[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      connection.release();
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // 👇 Phân quyền admin bằng email (HỢP LỆ)
    const role = user.email === 'admin@example.com' ? 'admin' : 'customer';

    const token = jwt.sign(
      { id: user.id, email: user.email, role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '1d' }
    );

    connection.release();

    res.status(200).json({
      success: true,
      message: 'Login successful',
      student_id: STUDENT_ID, // ❗ BẮT BUỘC
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          full_name: user.full_name,
          role
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// GET CURRENT USER
const getCurrentUser = async (req, res, next) => {
  try {
    const connection = await pool.getConnection();

    const [users] = await connection.execute(
      'SELECT id, email, full_name, phone_number, address, loyalty_points FROM customers WHERE id = ?',
      [req.user.id]
    );

    connection.release();

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: users[0]
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getCurrentUser
};
