const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");

// middlewares
app.use(cors());
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config();

// const uri =
//   "mongodb+srv://table_booking:i9Gp7lKzGCIXPaDC@table-booking.qj3inpm.mongodb.net/?retryWrites=true&w=majority&appName=table-booking";

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@table-booking.qj3inpm.mongodb.net/?retryWrites=true&w=majority&appName=table-booking?directConnection=true`;
console.log(process.env.DB_USER);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const slots = client.db("table-booking-server").collection("slots");
    const bookings = client.db("table-booking-server").collection("bookings");

    app.get("/slots", async (req, res) => {
      const query = {};
      const options = await slots.find(query).toArray();
      res.send(options);
    });

    app.post("/bookings", async (req, res) => {
      const booking = req.body;
      console.log(booking);
      const result = await bookings.insertOne(booking);
      res.send(result);
    });

    app.get("/bookings", async (req, res) => {
      const query = {};
      const options = await bookings.find(query).toArray();
      res.send(options);
    });
  } finally {
  }
}
run().catch(console.log);

app.get("/", (req, res) => {
  res.send("BOOKING SERVER IS RUNNING");
});

app.listen(port, () => {
  console.log(`booking server is running on port ${port}`);
});

// table_booking
//
