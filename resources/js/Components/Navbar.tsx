import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";

const Navbar = () => {
    const { url } = usePage();
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleLinkClick = () => setIsOpen(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { href: "/", label: "Home", active: url === "/" },
        { href: "/portofolio", label: "Portofolio", active: url.startsWith("/portofolio") },
        { href: "/harga", label: "Harga", active: url.startsWith("/harga") },
        { href: "/artikel", label: "Artikel", active: url.startsWith("/artikel") },
        { href: "/books", label: "Buku Digital", active: url.startsWith("/books") },
        // PERUBAHAN DI SINI: Dosenpreneur diganti Sekolah Aku
        { href: "/sekolah-aku", label: "Sekolah Aku", active: url.startsWith("/sekolah-aku") },
        { href: "/jurnal", label: "Jurnal", active: url.startsWith("/jurnal") },
    ];

    return (
        <nav
            className={`fixed w-full top-0 z-40 transition-all duration-300 h-14 sm:h-16 md:h-20 lg:h-24 ${
                isScrolled ? "bg-black/80 backdrop-blur-sm shadow-lg" : "bg-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex justify-between items-center h-full">
                    {/* Logo Desktop */}
                    <div className="hidden md:flex items-center">
                        <Link
                            href="/"
                            className="flex items-center space-x-3 hover:opacity-90 transition-opacity"
                        >
                            <img
                                src="/images/DITECHLOGONEW.png"
                                alt="Logo Ditech"
                                className="h-6 w-6 lg:h-8 lg:w-8 xl:h-24 xl:w-48 object-contain"
                            />
                        </Link>
                    </div>

                    {/* Logo Mobile - Optimized */}
                    <div className="flex flex-1 justify-center md:hidden">
                        <Link
                            href="/"
                            className="flex items-center hover:opacity-90 transition-opacity py-2"
                        >
                            <img
                                src="/images/DITECHLOGONEW.png"
                                alt="Logo Ditech"
                                className="h-6 w-auto sm:h-7 object-contain"
                            />
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className={`
                                    h-full flex items-center pt-1
                                    text-sm lg:text-base font-medium transition-colors duration-300
                                    ${
                                        link.active
                                            ? "text-emerald-400 border-b-2 border-emerald-400"
                                            : "text-white hover:text-emerald-400 border-b-2 border-transparent"
                                    }
                                `}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button - Enhanced */}
                    <div className="flex items-center md:hidden absolute right-4 sm:right-6">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset transition-all duration-300 text-white hover:text-emerald-400 hover:bg-white/10 focus:ring-emerald-400 active:scale-95"
                            aria-label="Toggle navigation menu"
                        >
                            <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
                            <div className="relative w-6 h-6">
                                {!isOpen ? (
                                    <svg
                                        className="absolute inset-0 w-6 h-6 transition-opacity duration-200"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="absolute inset-0 w-6 h-6 transition-opacity duration-200"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                )}
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu - Enhanced */}
            {isOpen && (
                <div className="md:hidden animate-in slide-in-from-top duration-200">
                    <div className="px-3 sm:px-4 pt-3 pb-4 space-y-1 border-t border-gray-800/50 bg-black/90 backdrop-blur-md shadow-lg">
                        {navLinks.map((link, index) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                onClick={handleLinkClick}
                                className={`
                                    block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 
                                    transform hover:scale-105 active:scale-95 min-h-[44px] items-center
                                    ${
                                        link.active
                                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                            : "text-white hover:text-emerald-400 hover:bg-white/10 border border-transparent"
                                    }
                                `}
                                style={{ 
                                    animationDelay: `${index * 50}ms`,
                                    animation: 'slideInFromLeft 0.3s ease-out forwards'
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;