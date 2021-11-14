import type { GetServerSideProps, NextPage } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/client";
import { useSocket } from "src/hooks/useSocket";

interface PageProps {
  roomId: string;
  jwt: string;
  session: Session;
}

const Room: NextPage<PageProps> = ({ roomId, session, jwt }) => {
  const socket = useSocket({ roomId, jwt });

  if (!socket) {
    return (
      <>
        <div>loading...</div>
      </>
    );
  }

  return (
    <>
      <div>welcome back, {session.user?.name}</div>
      <button
        onClick={() => {
          socket.emit("msg", "hey");
        }}
      >
        send hey
      </button>
    </>
  );
};

export default Room;

export const getServerSideProps: GetServerSideProps<PageProps> = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });
  const { roomId } = query;
  const jwt =
    req.cookies["__Secure-next-auth.session-token"] ||
    req.cookies["next-auth.session-token"];

  if (session && typeof jwt === "string")
    return { props: { session, jwt, roomId: roomId as string } };

  return {
    redirect: { destination: `/signin?roomId=${roomId}`, permanent: false },
  };
};
