import app from "./app.js";
import { startConnection } from "./database/conect.bd.js";

const bootstrap = async () => {
  const PORT = process.env.PORT || 3000;
  await startConnection();
  await app.listen(PORT, () => {
    console.log(`
    🔗 Server on port: >>> ${PORT} <<< 🔗`);
  });
};

bootstrap();
