app.post("/users/update", secure_jwt, async (req, res) => {
  try {
    const updateData = req.body;
    await People.updateOne({ Male: 50 }, updateData);

    res.json({ message: "User data updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
