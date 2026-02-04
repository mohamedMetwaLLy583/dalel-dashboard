import DashBoardLayoutProvider from "@/provider/dashboard.layout.provider";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const layout = async ({ children, params: { locale } }) => {
  const session = await getServerSession(authOptions);
  // console.log(session.roles[0].permissions);
  if (!session?.user?.email) {
    redirect(`/${locale}/auth/login`);
  }
  return (
    <DashBoardLayoutProvider
      locale={locale}
      token={session.accessToken}
      session={session}
    >
      {children}
    </DashBoardLayoutProvider>
  );
};

export default layout;
