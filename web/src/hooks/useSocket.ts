import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface Props {
  roomId: string;
  jwt: string;
}

export const useSocket = ({ jwt, roomId }: Props) => {
  const [socket, setSocket] = useState<Socket>({} as Socket);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      query: { jwt, roomId },
    });

    socket.on("msg", (message) => {
      console.log(message);
    });

    socket.on("userJoin", (user) => {
      console.log("userJoin :", user);
    });

    socket.on("userLeft", (user) => {
      console.log("userLeft :", user);
    });

    setSocket(socket);
  }, []);

  return socket;
};
