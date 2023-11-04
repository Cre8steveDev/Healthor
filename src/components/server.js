// ENDED UP NOT USING THIS; BUT GOOD TO SEE HOW TO SET UP A SIMPLE EXPRESS SERVER
// // server.js
// import express from "express";
// import axios from "axios";

// const app = express();
// const port = 3001;

// app.use(express.json());

// app.get("/api/places", async (req, res) => {
//   const { location, radius, type, apiKey } = req.query;

//   try {
//     const response = await axios.get(
//       "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
//       {
//         params: {
//           location,
//           radius,
//           type,
//           key: apiKey,
//         },
//       }
//     );
//     res.json(response.data);
//   } catch (error) {
//     console.error("Error fetching places:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
