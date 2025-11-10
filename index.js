const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const stockRoutes = require("./routes/stockRouter");

//middleware
app.use(express.json());

// Routes
app.use('/', stockRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Stocky-api server running at http://localhost:${PORT}`);
});
