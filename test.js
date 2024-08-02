const mongoose = require("mongoose");
const Mess = require("./models/mess");

// Replace with your actual MongoDB connection string
const mongoDBUrl =
  "mongodb+srv://nilay:saymyname@thanathaya.gvkqicv.mongodb.net/?retryWrites=true&w=majority&appName=thanathaya";

mongoose
  .connect(mongoDBUrl)
  .then(() => {
    console.log("MongoDB connected!");
    run();
  })
  .catch((err) => console.log("Failed to connect to MongoDB", err));

const run = async () => {
  try {
    // Example: Create a new Mess document
    const newMess = new Mess({
      name: "Example Mess4",
      contact: "1234567890",
      location: "Example Location",
      mess_photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png",
      price: 500,
      menu_photo: [
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/restaurant-menu-poster-template-2859a5dbf631b5141f690a9d9736e99b_screen.jpg?ts=1689269431",
        "https://pbs.twimg.com/media/F9LxLcFaAAATmjB.jpg:large",
        "https://img.freepik.com/premium-psd/modern-restaurant-menu-social-media-header-photoshop-psd_604997-12.jpg",
      ], // Example JSON object
    });

    await newMess.save();
    console.log("New Mess created:", newMess);
  } catch (error) {
    console.error("Error creating new Mess:", error);
  } finally {
    mongoose.connection.close();
  }
};
run()