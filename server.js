import app from "./app.js";

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
app.get("/", (req, res) => {
  res.send(`
    <h1>API Backend funcionando </h1>
    <p>Endpoints disponibles:</p>
    <ul>
      <li>/api/products</li>
      <li>/api/carts</li>
    </ul>
  `);
});
