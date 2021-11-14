import { assert } from "console";
import jwt from "jsonwebtoken";
import { Server } from "socket.io";

if (!process.env.PRODUCTION) require("dotenv").config();
assert(process.env.WEB_URL, "no web url");
assert(process.env.JWT_PRIVATE_KEY, "no jwt secret key");
assert(process.env.PORT, "no port");

const io = new Server({
  cors: { origin: process.env.WEB_URL, methods: ["GET", "POST"] },
});

io.use((socket, next) => {
  try {
    const { jwt: token, roomId } = socket.handshake.query;

    if (typeof token !== "string") throw "jwt error";
    if (!token) throw "no jwt";
    if (typeof roomId !== "string") throw "roomId error";
    if (!roomId) throw "no roomId";

    jwt.verify(
      token,
      Buffer.from(process.env.JWT_PRIVATE_KEY, "base64"),
      (err, decoded) => {
        if (err) throw "invalid jwt";

        socket.data = decoded;
        socket.join(roomId);
        next();
      }
    );
  } catch (e) {
    console.log(e);
    next(new Error(`Authentication error : ${e as string}`));
  }
}).on("connection", (socket) => {
  const user = {
    name: socket.data.name as string,
    avatar: socket.data.picture as string,
  };

  socket.emit("userJoin", user);
  console.log("userJoin: ", user.name, socket.id);

  socket.on("msg", (message) => {
    socket.emit("msg", `${user.name}: ${message}`);
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("userLeft", user);
  });
});

io.listen(parseInt(process.env.PORT) || 6969);
