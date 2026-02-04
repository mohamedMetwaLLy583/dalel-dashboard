"use client";
import React, { useEffect } from "react";
import Header from "@/components/partials/header";
import Sidebar from "@/components/partials/sidebar";
import { cn } from "@/lib/utils";
import { useSidebar, useThemeStore } from "@/store";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import Footer from "@/components/partials/footer";
import { useMediaQuery } from "@/hooks/use-media-query";
import MobileSidebar from "@/components/partials/sidebar/mobile-sidebar";
import HeaderSearch from "@/components/header-search";
import { useMounted } from "@/hooks/use-mounted";
import LayoutLoader from "@/components/layout-loader";

const DashBoardLayoutProvider = ({ children, locale, token, session }) => {
  const { collapsed, sidebarType, setCollapsed, subMenu } = useSidebar();
  const [open, setOpen] = React.useState(false);
  const { layout } = useThemeStore();
  const location = usePathname();

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  const isMobile = useMediaQuery("(min-width: 768px)");
  const mounted = useMounted();
  if (!mounted) {
    return <LayoutLoader />;
  }
  if (layout === "semibox") {
    return (
      <>
        <Header handleOpenSearch={() => setOpen(true)} trans={locale} />
        <Sidebar trans={locale} session={session} />

        <div
          className={cn("content-wrapper transition-all duration-150 ", {
            "ltr:xl:ml-[72px] rtl:xl:mr-[72px]": collapsed,
            "ltr:xl:ml-[272px] rtl:xl:mr-[272px]": !collapsed,
          })}
        >
          <div
            className={cn(
              "md:pt-6 pb-[37px] pt-[15px] md:px-6 px-4  page-min-height-semibox ",
              {}
            )}
          >
            <div className="semibox-content-wrapper ">
              <LayoutWrapper
                isMobile={isMobile}
                setOpen={setOpen}
                open={open}
                location={location}
                token={token}
              >
                {children}
              </LayoutWrapper>
            </div>
          </div>
        </div>
        <Footer trans={locale} />
      </>
    );
  }
  if (layout === "horizontal") {
    return (
      <>
        <Header handleOpenSearch={() => setOpen(true)} trans={locale} />

        <div className={cn("content-wrapper transition-all duration-150 ")}>
          <div
            className={cn(
              "  md:pt-6 pb-[37px] pt-[15px] md:px-6 px-4  page-min-height-horizontal ",
              {}
            )}
          >
            <LayoutWrapper
              isMobile={isMobile}
              setOpen={setOpen}
              open={open}
              location={location}
              token={token}
            >
              {children}
            </LayoutWrapper>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (sidebarType !== "module") {
    return (
      <>
        <Header handleOpenSearch={() => setOpen(true)} trans={locale} />
        <Sidebar trans={locale} session={session} />

        <div
          className={cn("content-wrapper transition-all duration-150 ", {
            "ltr:xl:ml-[248px] rtl:xl:mr-[248px] ": !collapsed,
            "ltr:xl:ml-[72px] rtl:xl:mr-[72px]": collapsed,
          })}
        >
          <div
            className={cn(
              "  md:pt-6 pb-[37px] pt-[15px] md:px-6 px-4  page-min-height ",
              {}
            )}
          >
            <LayoutWrapper
              isMobile={isMobile}
              setOpen={setOpen}
              open={open}
              location={location}
              token={token}
            >
              {children}
            </LayoutWrapper>
          </div>
        </div>
        <Footer trans={locale} />
      </>
    );
  }
  return (
    <>
      <Header handleOpenSearch={() => setOpen(true)} trans={locale} />
      <Sidebar trans={locale} session={session} />

      <div
        className={cn("content-wrapper transition-all duration-150 ", {
          "ltr:xl:ml-[300px] rtl:xl:mr-[300px]": !collapsed,
          "ltr:xl:ml-[72px] rtl:xl:mr-[72px]": collapsed,
        })}
      >
        <div
          className={cn(
            "  md:pt-6 layout-padding pt-[15px] md:px-6 px-4  page-min-height ",
            {}
          )}
        >
          <LayoutWrapper
            isMobile={isMobile}
            setOpen={setOpen}
            open={open}
            location={location}
            token={token}
          >
            {children}
          </LayoutWrapper>
        </div>
      </div>
      <Footer handleOpenSearch={() => setOpen(true)} trans={locale} />
    </>
  );
};

export default DashBoardLayoutProvider;

const LayoutWrapper = ({
  children,
  isMobile,
  setOpen,
  open,
  location,
  token,
}) => {
  return (
    <>
      <motion.div
        key={location}
        initial="pageInitial"
        animate="pageAnimate"
        exit="pageExit"
        variants={{
          pageInitial: {
            opacity: 0,
            y: 50,
          },
          pageAnimate: {
            opacity: 1,
            y: 0,
          },
          pageExit: {
            opacity: 0,
            y: -50,
          },
        }}
        transition={{
          type: "tween",
          ease: "easeInOut",
          duration: 0.5,
        }}
      >
        <main>{children}</main>
      </motion.div>

      <MobileSidebar className="left-[300px]" />
      <HeaderSearch open={open} setOpen={setOpen} />
    </>
  );
};
