"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
const ease = [0.77, 0, 0.175, 1] as const;
const panelEase = [0.22, 1, 0.36, 1] as const;

type NavLink = {
  href: string;
  label: string;
  /** Active when pathname matches (defaults to href without hash). */
  activePath?: string;
};

const links: NavLink[] = [
  { href: "/", label: "Lab", activePath: "/" },
  { href: "/research", label: "Research" },
  { href: "/writing", label: "Writing" },
  { href: "/open-source", label: "Open source" },
  { href: "/profile", label: "Profile" },
];

const contactLink = { href: "/contact", label: "Contact" };
const labsLink = { href: "/join-labs", label: "Join Labs", activePath: "/join-labs" };

function isNavLinkActive(pathname: string, link: NavLink) {
  const match = link.activePath ?? (link.href.split("#")[0] || link.href);
  if (match === "/") {
    return pathname === "/";
  }
  return pathname === match || pathname.startsWith(`${match}/`);
}

type NavbarProps = {
  visible: boolean;
};

export function Navbar({ visible }: NavbarProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-40 bg-white"
        initial={{ y: "-100%" }}
        animate={{ y: visible ? 0 : "-100%" }}
        transition={{ duration: 0.95, ease, delay: visible ? 0.12 : 0 }}
      >
        <nav
          className="mx-auto flex h-[5.25rem] max-w-[1400px] items-center justify-between gap-4 px-5 md:px-8 lg:grid lg:grid-cols-[1fr_auto_1fr]"
          aria-label="Primary"
        >
          <Link href="/" className="flex w-fit items-center gap-1">
            <span className="relative block h-10 w-10 overflow-hidden">
              <Image
                src="/images/logo-hmza.png"
                alt="HMZA home"
                fill
                sizes="1080px"
                priority
                className="object-contain scale-[1.5]"
              />
            </span>
            <span className="text-[20px] font-semibold tracking-[-0.02em] text-ink">
              HMZA
            </span>
          </Link>

          <ul className="hidden items-center rounded-full bg-nav px-2 py-1.5 text-[13.5px] font-medium text-ink lg:flex lg:justify-self-center">
            {links.map((link, index) => {
              const active = isNavLinkActive(pathname, link);
              return (
                <li key={link.href} className="flex items-center">
                  {index > 0 && (
                    <span className="mx-1.5 text-[6px] text-neutral-300">●</span>
                  )}
                  <NavAnchor
                    href={link.href}
                    className={`rounded-full px-3 py-2 transition-colors hover:bg-white ${
                      active
                        ? "bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
                        : ""
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {link.label}
                  </NavAnchor>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center justify-end gap-2 lg:justify-self-end">
            <NavAnchor
              href={contactLink.href}
              className={`hidden h-11 items-center rounded-full px-5 text-[13.5px] font-medium text-ink transition-colors lg:inline-flex ${
                isNavLinkActive(pathname, contactLink)
                  ? "bg-[#ececec]"
                  : "bg-nav hover:bg-[#ececec]"
              }`}
              aria-current={
                isNavLinkActive(pathname, contactLink) ? "page" : undefined
              }
            >
              {contactLink.label}
            </NavAnchor>
            <NavAnchor
              href={labsLink.href}
              className="inline-flex h-11 items-center rounded-full bg-ink px-4 text-[13px] font-medium text-white transition-colors hover:bg-neutral-800 sm:px-5 sm:text-[13.5px]"
            >
              {labsLink.label}
            </NavAnchor>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/[0.06] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-colors hover:bg-nav lg:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <MenuIcon open={menuOpen} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-[6px] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: panelEase }}
              onClick={() => setMenuOpen(false)}
            />

            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Main menu"
              className="fixed inset-0 z-50 flex flex-col bg-white lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.55, ease: panelEase }}
            >
              <div className="flex h-[5.25rem] shrink-0 items-center justify-between border-b border-black/5 px-5">
                <span className="text-[13px] font-medium tracking-[0.2em] uppercase text-muted">
                  Menu
                </span>
                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-nav"
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                >
                  <CloseIcon />
                </button>
              </div>

              <nav className="flex flex-1 flex-col overflow-y-auto px-5 py-8">
                <ul className="flex flex-col gap-1">
                  {links.map((link, index) => {
                    const active = isNavLinkActive(pathname, link);
                    return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 28 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16 }}
                      transition={{
                        duration: 0.45,
                        delay: 0.08 + index * 0.06,
                        ease: panelEase,
                      }}
                    >
                      <NavAnchor
                        href={link.href}
                        className={`group flex items-center justify-between rounded-2xl py-4 font-display text-[clamp(1.75rem,6vw,2.25rem)] leading-none tracking-[0.03em] transition-colors ${
                          active ? "text-ink" : "text-ink/75"
                        }`}
                        onClick={() => setMenuOpen(false)}
                        aria-current={active ? "page" : undefined}
                      >
                        <span className="flex items-center gap-3">
                          {active && (
                            <span className="h-2 w-2 rounded-full bg-lime" aria-hidden />
                          )}
                          {link.label}
                        </span>
                        <span
                          className={`flex h-10 w-10 items-center justify-center rounded-full bg-nav transition-opacity ${
                            active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                          }`}
                        >
                          <ArrowIcon />
                        </span>
                      </NavAnchor>
                      {index < links.length - 1 && (
                        <span className="block h-px bg-black/6" />
                      )}
                    </motion.li>
                    );
                  })}
                </ul>

                <motion.div
                  className="mt-auto flex flex-col gap-4 border-t border-black/6 pt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.45, ease: panelEase }}
                >
                  <NavAnchor
                    href={contactLink.href}
                    className={`flex h-12 items-center justify-center rounded-full text-[15px] font-medium ${
                      isNavLinkActive(pathname, contactLink)
                        ? "bg-[#ececec] text-ink"
                        : "bg-nav text-ink"
                    }`}
                    onClick={() => setMenuOpen(false)}
                    aria-current={
                      isNavLinkActive(pathname, contactLink) ? "page" : undefined
                    }
                  >
                    {contactLink.label}
                  </NavAnchor>
                  <NavAnchor
                    href={labsLink.href}
                    className="flex h-12 items-center justify-center rounded-full bg-ink text-[15px] font-medium text-white"
                    onClick={() => setMenuOpen(false)}
                  >
                    {labsLink.label}
                  </NavAnchor>
                </motion.div>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function NavAnchor({
  href,
  className,
  children,
  onClick,
  "aria-current": ariaCurrent,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  "aria-current"?: "page";
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={onClick}
      aria-current={ariaCurrent}
    >
      {children}
    </Link>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className="text-ink"
    >
      <motion.rect
        width="14"
        height="1.75"
        rx="0.875"
        fill="currentColor"
        style={{ originX: "10px", originY: "10px" }}
        initial={false}
        animate={
          open
            ? { x: 3, y: 9.125, rotate: 45, width: 14 }
            : { x: 3, y: 5, rotate: 0, width: 14 }
        }
        transition={{ duration: 0.32, ease: panelEase }}
      />
      <motion.rect
        width="10"
        height="1.75"
        rx="0.875"
        fill="currentColor"
        initial={false}
        animate={
          open
            ? { x: 5, y: 9.125, opacity: 0, scaleX: 0.4 }
            : { x: 5, y: 9.125, opacity: 1, scaleX: 1 }
        }
        transition={{ duration: 0.22, ease: panelEase }}
      />
      <motion.rect
        width="14"
        height="1.75"
        rx="0.875"
        fill="currentColor"
        style={{ originX: "10px", originY: "10px" }}
        initial={false}
        animate={
          open
            ? { x: 3, y: 9.125, rotate: -45, width: 14 }
            : { x: 3, y: 13.25, rotate: 0, width: 14 }
        }
        transition={{ duration: 0.32, ease: panelEase }}
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M4 4l10 10M14 4 4 14"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M2.5 8h11M9.5 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
