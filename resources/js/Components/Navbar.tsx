import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import LoadingImage from "@/Components/LoadingImage";

const Navbar = () => {
    const { url } = usePage();
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    // Scroll listener
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
        { href: "/produk", label: "Produk", active: url.startsWith("/produk") },
        { href: "/artikel", label: "Artikel", active: url.startsWith("/artikel") },
        {
            href: "/buku-digital",
            label: "Buku Digital",
            active: url.startsWith("/buku-digital"),
        },
        {
            href: "/dosenpreneur",
            label: "Dosenpreneur",
            active: url.startsWith("/dosenpreneur"),
        },
        { href: "/jurnal", label: "Jurnal", active: url.startsWith("/jurnal") },
    ];

    return (
        <nav
            className={`fixed w-full top-0 z-40 transition-colors duration-300 ${
                isScrolled ? "bg-white shadow-lg" : "bg-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo & Brand */}
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="flex items-center space-x-3 hover:opacity-90 transition-opacity"
                        >
                            <LoadingImage
                                src="https://firebasestorage.googleapis.com/v0/b/seputipy.appspot.com/o/covers%2FDITECHLOGONEW.png?alt=media"
                                alt="Logo Ditech"
                                className="h-20 w-20 object-contain"
                            />
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className={`
                                    h-full flex items-center pt-1
                                    text-base font-medium transition-colors duration-300
                                    ${
                                        link.active
                                            ? isScrolled
                                                ? "text-blue-600 border-b-2 border-blue-600"
                                                : "text-emerald-400 border-b-2 border-emerald-400"
                                            : isScrolled
                                            ? "text-gray-700 hover:text-blue-600 border-b-2 border-transparent"
                                            : "text-white hover:text-emerald-400 border-b-2 border-transparent"
                                    }
                                `}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={toggleMenu}
                            className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset ${
                                isScrolled
                                    ? "text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:ring-blue-500"
                                    : "text-white hover:text-emerald-400 hover:bg-white/10 focus:ring-emerald-400"
                            }`}
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden">
                    <div
                        className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t ${
                            isScrolled
                                ? "bg-white border-gray-100"
                                : "bg-black/80 border-gray-800"
                        }`}
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className={`
                                    block px-3 py-2 rounded-md text-base font-medium transition-colors
                                    ${
                                        link.active
                                            ? isScrolled
                                                ? "bg-blue-50 text-blue-600"
                                                : "bg-emerald-400/20 text-emerald-400"
                                            : isScrolled
                                            ? "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                                            : "text-white hover:text-emerald-400 hover:bg-white/10"
                                    }
                                `}
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
