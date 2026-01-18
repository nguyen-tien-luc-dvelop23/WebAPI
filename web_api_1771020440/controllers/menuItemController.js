const pool = require('../config/database');

// GET ALL MENU ITEMS (WITH FILTER + PAGINATION)
const getAllMenuItems = async (req, res, next) => {
  try {
    const connection = await pool.getConnection();

    // ÉP KIỂU CHUẨN
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { search, category, vegetarian_only, spicy_only, available_only } = req.query;

    let baseQuery = 'FROM menu_items WHERE 1=1';
    const params = [];

    if (search) {
      baseQuery += ' AND (name LIKE ? OR description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    if (category) {
      baseQuery += ' AND category = ?';
      params.push(category);
    }

    if (vegetarian_only === 'true') {
      baseQuery += ' AND is_vegetarian = true';
    }

    if (spicy_only === 'true') {
      baseQuery += ' AND is_spicy = true';
    }

    if (available_only === 'true') {
      baseQuery += ' AND is_available = true';
    }

    // COUNT
    const [countRows] = await connection.execute(
      `SELECT COUNT(*) as total ${baseQuery}`,
      params
    );
    const total = countRows[0].total;

    // ❗ FIX QUAN TRỌNG: NỐI LIMIT TRỰC TIẾP
    const dataQuery = `SELECT * ${baseQuery} LIMIT ${offset}, ${limit}`;

    const [items] = await connection.execute(dataQuery, params);

    connection.release();

    res.status(200).json({
      success: true,
      data: items,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};


// GET MENU ITEM BY ID
const getMenuItemById = async (req, res, next) => {
  try {
    const connection = await pool.getConnection();
    const { id } = req.params;

    const [items] = await connection.execute(
      'SELECT * FROM menu_items WHERE id = ?',
      [id]
    );

    connection.release();

    if (items.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }

    res.status(200).json({
      success: true,
      data: items[0]
    });
  } catch (error) {
    next(error);
  }
};

// CREATE MENU ITEM (ADMIN)
const createMenuItem = async (req, res, next) => {
  try {
    const connection = await pool.getConnection();
    const {
      name,
      description,
      category,
      price,
      image_url,
      preparation_time,
      is_vegetarian,
      is_spicy
    } = req.body;

    const [result] = await connection.execute(
      `INSERT INTO menu_items
      (name, description, category, price, image_url, preparation_time, is_vegetarian, is_spicy)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        description,
        category,
        price,
        image_url,
        preparation_time,
        is_vegetarian || false,
        is_spicy || false
      ]
    );

    connection.release();

    res.status(201).json({
      success: true,
      message: 'Menu item created successfully',
      data: {
        id: result.insertId
      }
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE MENU ITEM (ADMIN)
const updateMenuItem = async (req, res, next) => {
  try {
    const connection = await pool.getConnection();
    const { id } = req.params;
    const {
      name,
      description,
      category,
      price,
      image_url,
      preparation_time,
      is_vegetarian,
      is_spicy,
      is_available
    } = req.body;

    await connection.execute(
      `UPDATE menu_items SET
        name = COALESCE(?, name),
        description = COALESCE(?, description),
        category = COALESCE(?, category),
        price = COALESCE(?, price),
        image_url = COALESCE(?, image_url),
        preparation_time = COALESCE(?, preparation_time),
        is_vegetarian = COALESCE(?, is_vegetarian),
        is_spicy = COALESCE(?, is_spicy),
        is_available = COALESCE(?, is_available)
      WHERE id = ?`,
      [
        name,
        description,
        category,
        price,
        image_url,
        preparation_time,
        is_vegetarian,
        is_spicy,
        is_available,
        id
      ]
    );

    const [updated] = await connection.execute(
      'SELECT * FROM menu_items WHERE id = ?',
      [id]
    );

    connection.release();

    res.status(200).json({
      success: true,
      message: 'Menu item updated successfully',
      data: updated[0]
    });
  } catch (error) {
    next(error);
  }
};

// DELETE MENU ITEM (ADMIN)
const deleteMenuItem = async (req, res, next) => {
  try {
    const connection = await pool.getConnection();
    const { id } = req.params;

    const [used] = await connection.execute(
      `SELECT ri.id FROM reservation_items ri
       JOIN reservations r ON ri.reservation_id = r.id
       WHERE ri.menu_item_id = ? AND r.status NOT IN ('completed','cancelled')`,
      [id]
    );

    if (used.length > 0) {
      connection.release();
      return res.status(400).json({
        success: false,
        message: 'Cannot delete item - it is in active reservations'
      });
    }

    await connection.execute('DELETE FROM menu_items WHERE id = ?', [id]);
    connection.release();

    res.status(200).json({
      success: true,
      message: 'Menu item deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// SEARCH MENU ITEMS
const searchMenuItems = async (req, res, next) => {
  try {
    const connection = await pool.getConnection();
    const { q } = req.query;

    const [items] = await connection.execute(
      `SELECT * FROM menu_items
       WHERE name LIKE ? OR description LIKE ? OR category LIKE ?`,
      [`%${q}%`, `%${q}%`, `%${q}%`]
    );

    connection.release();

    res.status(200).json({
      success: true,
      data: items
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  searchMenuItems
};
