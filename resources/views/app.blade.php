<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title inertia>DITECH CREATIVE</title>

    {{-- KONFIGURASI WARNA STATUS BAR (MOBILE) --}}
    {{-- Chrome, Firefox OS and Opera --}}
    <meta name="theme-color" content="#000000">
    {{-- Windows Phone --}}
    <meta name="msapplication-navbutton-color" content="#000000">
    {{-- iOS Safari --}}
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

    {{-- WAJIB untuk React HMR (preamble) --}}
    @viteReactRefresh

    {{-- Entry Vite kamu --}}
    @vite(['resources/js/app.tsx'])

    @inertiaHead
</head>
<body class="font-sans antialiased bg-black text-white">
    @inertia
</body>
</html>