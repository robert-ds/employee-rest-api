import express from "express"; // Import express
import employeesRoutes from "./routes/employees.routes.js"; // Import routes
import indexRoutes from "./routes/index.routes.js"; // Import test connection to database

/**
 * Create a new express app
 */
const app = express();

/**
 * Serialize data with json format
 */
app.use(express.json());

/**
 * Use index routes to test database connection
 */
app.use("/api", indexRoutes);

/**
 * Use employees routes
 */
app.use("/api", employeesRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: "Endpoint Not Found",
  });
});

export default app;
