import "../assets/scss/globals.scss";
import "../assets/scss/theme.scss";
import { Inter } from "next/font/google";
import { siteConfig } from "@/config/site";
import Providers from "@/provider/providers";
import "simplebar-react/dist/simplebar.min.css";
import TanstackProvider from "@/provider/providers.client";
import AuthProvider from "@/provider/auth.provider";
import "flatpickr/dist/themes/light.css";
import DirectionProvider from "@/provider/direction.provider";
const inter = Inter({ subsets: ["latin"] });
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { SessionProvider } from "@/provider/sessions.provider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default async function RootLayout({ children, params: { locale } }) {
  const messages = await getMessages();
  const session = await getServerSession(authOptions);

  return (
    <html lang={locale}>
      <AuthProvider>
        <TanstackProvider>
          <Providers>
            <NextIntlClientProvider messages={messages}>
              <DirectionProvider lang={locale}>
                <SessionProvider session={session}>{children}</SessionProvider>
              </DirectionProvider>
            </NextIntlClientProvider>
          </Providers>
        </TanstackProvider>
      </AuthProvider>
    </html>
  );
}
