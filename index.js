const customExpress = require("./config/express/customExpress");
const app = customExpress();

app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor rodando: http://localhost:3000/");
});