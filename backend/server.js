import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://yogirajbhilare1107_db_user:u2p9wQVU8T1yFs73@skillconnect.2fgzmgy.mongodb.net/?appName=SkillConnect";

const client = new MongoClient(uri);

let usersCollection;
let hackathonsCollection;
async function connectDB() {
  try {
    await client.connect();
    const db = client.db("hackathonDB");
    usersCollection = db.collection("users");
    hackathonsCollection = db.collection("hackathons");
    console.log("✅ Connected to MongoDB Atlas");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

connectDB();

app.post("/api/login", async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required"
      });
    }

    const user = await usersCollection.findOne({
      email: email,
      password: password
    });

    if (user) {
      return res.status(200).json({
        success: true,
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid credentials"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

app.get("/api/hackathons", async (req, res) => {
  try {

    const hackathons = await hackathonsCollection.find().toArray();

    res.json({
      success: true,
      data: hackathons
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

app.get("/promotionalHackathons", async (req, res) => {

    const data = await hackathonsCollection.find({})
      .toArray();

    res.json(data);
  });


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});