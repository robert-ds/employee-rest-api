import { pool } from "../db.js"; // Import connection to database

/**
 *  Get alls employees method
 */
export const getEmployees = async (req, res) => {
  // If something goes wrong then catch error
  try {
    const [allUsers] = await pool.query("SELECT * FROM employees");
    res.json(allUsers);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

/**
 *  Get employee method
 */
export const getEmployee = async (req, res) => {
  // If something goes wrong then catch error
  try {
    const id = req.params.id; // Get id from param request

    // Select a user per id from database
    const [user] = await pool.query("SELECT * FROM employees WHERE id = ?", [
      id,
    ]);

    // Verified that user exist
    if (user.length <= 0) {
      return res.status(404).json({
        message: "Employee not found or not exists",
      });
    } else {
      res.json(user[0]);
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

/**
 * Create a new employee method
 */
export const addEmployee = async (req, res) => {
  // If something goes wrong then catch error
  try {
    const { name, salary } = req.body; // Get name and salary from body of req
    const [newUser] = await pool.query(
      "INSERT INTO employees (name, salary) VALUES (?, ?)",
      [name, salary]
    );
    res.send({
      id: newUser.insertId,
      name,
      salary,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

/**
 * Update a employee method
 */
export const updateEmployee = async (req, res) => {
  // If something goes wrong then catch error
  try {
    const { id } = req.params; // Get id from param of request
    const { name, salary } = req.body; // Get name and salary from body of request

    // find and update query
    const [user] = await pool.query(
      "UPDATE employees SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?",
      [name, salary, id]
    );

    // Validate that user id exist
    if (user.affectedRows === 0) {
      return res.status(404).json({
        message: "Employee not found or not exists",
      });
    }

    // Show user updated
    const [result] = await pool.query("SELECT * FROM employees WHERE id = ?", [
      id,
    ]);

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

/**
 * Delete a employee method
 */
export const delEmployee = async (req, res) => {
  // If something goes wrong then catch error
  try {
    const id = req.params.id; // Get id from param request

    // Find user by id of request
    const [user] = await pool.query("DELETE FROM employees WHERE id = ?", [id]);

    // Validate that user id exist
    if (user.affectedRows <= 0) {
      return res.status(404).json({
        message: "Employee not found or not exists",
      });
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};
