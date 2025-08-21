import React from 'react';

export default function Navbar() {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <a href="/" className="font-bold text-xl">DITECH CREATIVE</a>
                <div className="space-x-4">
                    <a href="#services" className="hover:underline">Services</a>
                    <a href="#about" className="hover:underline">About</a>
                    <a href="#contact" className="hover:underline">Contact</a>
                </div>
            </div>
        </nav>
    );
}
