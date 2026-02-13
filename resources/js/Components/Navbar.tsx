import React, { useState, useEffect, useRef } from "react";
import { Link, usePage } from "@inertiajs/react";

const Navbar = () => {
    const { url } = usePage();

    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);

    const lastScrollY = useRef(0);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

    const toggleMenu = () => setIsOpen(!isOpen);
    const handleLinkClick = () => setIsOpen(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            const delta = currentY - lastScrollY.current;

            // background blur
            setIsScrolled(currentY > 30);

            // MOBILE ONLY
            if (window.innerWidth < 768) {
                // scroll ke bawah → hide
                if (delta > 10 && currentY > 80) {
                    setShowNavbar(false);
                    setIsOpen(false);
                }

                // scroll ke atas sedikit → langsung muncul (Apple snap)
                if (delta < -5) {
                    setShowNavbar(true);
                }

                // scroll berhenti → muncul
                if (scrollTimeout.current) {
                    clearTimeout(scrollTimeout.current);
                }

                scrollTimeout.current = setTimeout(() => {
                    setShowNavbar(true);
                }, 160);
            }

            lastScrollY.current = currentY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { href: "/", label: "Home", active: url === "/" },
        { href: "/portofolio", label: "Portofolio", active: url.startsWith("/portofolio") },
        { href: "/harga", label: "Harga", active: url.startsWith("/harga") },
        { href: "/artikel", label: "Artikel", active: url.startsWith("/artikel") },
        { href: "/books", label: "Buku Digital", active: url.startsWith("/books") },
        { href: "/sekolah-aku", label: "Sekolah Aku", active: url.startsWith("/sekolah-aku") },
        {
            href: "https://jurnal.ditechcreative.id",
            label: "Jurnal",
            external: true,
        },
    ];

    return (
        <nav
            className={`
                fixed top-0 z-40 w-full
                h-14 sm:h-16 md:h-20 lg:h-24
                transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                ${showNavbar ? "translate-y-0" : "-translate-y-full"}
                ${isScrolled ? "bg-black/80 backdrop-blur-sm shadow-lg" : "bg-transparent"}
                md:translate-y-0
            `}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex justify-between items-center h-full relative">

                    {/* Logo Desktop */}
                    <div className="hidden md:flex items-center">
                        <Link href="/" className="hover:opacity-90">
                            <img
                                src="/images/DITECHLOGONEW.png"
                                alt="Logo Ditech"
                                className="h-6 w-6 lg:h-8 lg:w-8 xl:h-24 xl:w-48 object-contain"
                            />
                        </Link>
                    </div>

                    {/* Logo Mobile */}
                    <div className="flex flex-1 justify-center md:hidden">
                        <Link href="/" className="py-2 hover:opacity-90">
                            <img
                                src="/images/DITECHLOGONEW.png"
                                alt="Logo Ditech"
                                className="h-6 w-auto sm:h-7 object-contain"
                            />
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                        {navLinks.map((link) =>
                            link.external ? (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white hover:text-emerald-400 border-b-2 border-transparent"
                                >
                                    {link.label}
                                </a>
                            ) : (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className={`
                                        h-full flex items-center pt-1
                                        text-sm lg:text-base font-medium transition-colors
                                        ${
                                            link.active
                                                ? "text-emerald-400 border-b-2 border-emerald-400"
                                                : "text-white hover:text-emerald-400 border-b-2 border-transparent"
                                        }
                                    `}
                                >
                                    {link.label}
                                </Link>
                            )
                        )}
                    </div>

                    {/* Mobile Button */}
                    <div className="md:hidden absolute right-4 sm:right-6">
                        <button
                            onClick={toggleMenu}
                            className="p-2 text-white hover:text-emerald-400 active:scale-95"
                        >
                            ☰
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-black/90 backdrop-blur-md border-t border-gray-800/50 shadow-lg">
                    <div className="px-3 pt-3 pb-4 space-y-1">
                        {navLinks.map((link) =>
                            link.external ? (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={handleLinkClick}
                                    className="block px-4 py-3 text-white hover:text-emerald-400"
                                >
                                    {link.label}
                                </a>
                            ) : (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    onClick={handleLinkClick}
                                    className="block px-4 py-3 text-white hover:text-emerald-400"
                                >
                                    {link.label}
                                </Link>
                            )
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
