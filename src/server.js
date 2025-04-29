import app from "./src/app.js";
import db from './src/config/db.config.js'

const PORT = process.env.PORT || 5000;

try {
    const connection = await db.getConnection();
    console.log("MySql connected");
    connection.release();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
} catch (error) {
    console.log("DB connection failed", error);
}