import React from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function Home() {
    return (
        <div>
            <Navbar />
            <main className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800">
                <section className="text-center py-20 px-4">
                    <h1 className="text-4xl font-bold mb-4">DITECH CREATIVE</h1>
                    <p className="max-w-2xl mx-auto text-lg">
                        Kami berkomitmen untuk menciptakan solusi digital dan edukasi yang berkualitas tinggi dalam setiap layanan kami, mulai dari pengembangan mobile apps, website, UI/UX design, implementasi IoT, penerbitan buku, hingga konsultasi minat bakat. Dengan menerapkan standar profesional dan terus mengikuti perkembangan teknologi serta metode pembelajaran, kami memastikan setiap solusi yang kami berikan dapat membantu efisiensi, pertumbuhan bisnis, dan pengembangan diri klien.
                    </p>
                </section>
            </main>
            <Footer />
        </div>
    );
}
