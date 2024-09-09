import { useSession } from "next-auth/react";
export const useCurrentUser = () => {
  const { data: session, status } = useSession();
  console.log(session, status);

  if (status === "loading") {
    return null;
  }

  return session?.user;
};
