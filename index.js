import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import varshikTakanRoutes from "./routes/varshikTakanRoutes.js";
import gautamJayantiRoutes from "./routes/gautamJayantiRoutes.js";
import photoGalleryRoutes from "./routes/photoGalleryRoutes.js";
import vivahRouter from "./routes/vivahRoutes.js";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'https://your-frontend.onrender.com' }));;
app.use("/uploads", express.static(path.resolve("uploads")));
app.use("/api/admin", adminRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/varshik-takan", varshikTakanRoutes);
app.use("/api/gautam-jayanti", gautamJayantiRoutes);
app.use("/api/photo-gallery", photoGalleryRoutes);

app.use("/api/vivah", vivahRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
