import app from "./app";

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("<h1>Welcome to the backend!</h1>")
})
app.listen(PORT, () => {
    console.log(`Server listening : http://localhost:${PORT}`);
});

