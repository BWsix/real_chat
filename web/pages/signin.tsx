import type { GetServerSideProps, NextPage } from "next";
import { signIn } from "next-auth/client";

interface PageProps {
  roomId: string;
}

const SignIn: NextPage<PageProps> = ({ roomId }) => {
  return (
    <>
      <div>
        <button
          onClick={() =>
            signIn("github", { callbackUrl: `/room/${roomId}`, redirect: true })
          }
        >
          sign in with github
        </button>
        <button
          onClick={() =>
            signIn("discord", {
              callbackUrl: `/room/${roomId}`,
              redirect: true,
            })
          }
        >
          sign in with discord
        </button>
        <button
          onClick={() =>
            signIn("line", { callbackUrl: `/room/${roomId}`, redirect: true })
          }
        >
          sign in with line
        </button>
      </div>
    </>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps<PageProps> = async ({
  query,
}) => {
  const { roomId } = query;

  if (typeof roomId !== "string" || roomId?.length !== 10) {
    // redirect to an custom error page.
    return { notFound: true };
  }

  return { props: { roomId } };
};
