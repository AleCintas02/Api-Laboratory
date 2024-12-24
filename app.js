import express, { json } from 'express';

const app = express();
app.use(json())
dbconnect();


app.get()

app.listen(3001, () => {
    console.log("Servidor en el puerto 3001");
});
