import type { NextPage } from "next";
import { signIn, signout, useSession } from "next-auth/client";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const [session, loading] = useSession();
  const router = useRouter();

  const goToNewRoom = async () => {
    const result = await fetch("/api/getRoomId");
    const id = await result.text();

    router.push(`room/${id}`);
  };

  if (loading) {
    return (
      <>
        <div>loading...</div>
      </>
    );
  }

  return (
    <>
      <div>{session?.user?.name || "not singed in."}</div>

      {session ? (
        <>
          <button onClick={() => goToNewRoom()}>create room</button>
          <button onClick={() => signout()}>sign out</button>
        </>
      ) : (
        <>
          <button onClick={() => signIn()}>sign in</button>
        </>
      )}
    </>
  );
};

export default Home;
