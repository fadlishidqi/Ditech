<?php

namespace App\Http\Middleware;

use App\Models\Visit;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Symfony\Component\HttpFoundation\Response;
use Carbon\Carbon;

class TrackVisitors
{
    public function handle(Request $request, Closure $next): Response
    {
        // 1. Filter dasar
        if (!$request->is('admin*') && !$request->is('api*') && !$request->is('livewire*')) {
            
            // 2. Hanya catat Method GET
            if ($request->isMethod('get')) {
                
                $ip = $request->ip();
                
                // --- HANDLING LOCALHOST ---
                if ($ip == '127.0.0.1' || $ip == '::1') {
                    $ip = '103.19.111.xxx';
                }
                
                $today = Carbon::today();

                // 3. Cek apakah IP ini sudah berkunjung HARI INI?
                $hasVisitedToday = Visit::where('ip_address', $request->ip())
                    ->whereDate('created_at', $today)
                    ->exists();

                if (!$hasVisitedToday) {
                    
                    // 4. Deteksi Lokasi via API Gratis (ip-api.com)
                    $locationData = [];
                    try {
                        // Jika localhost, API mungkin gagal, jadi kita try-catch
                        $response = Http::timeout(2)->get("http://ip-api.com/json/{$ip}");
                        if ($response->successful()) {
                            $locationData = $response->json();
                        }
                    } catch (\Exception $e) {
                    }

                    $country = $locationData['country'] ?? 'Unknown';
                    $city = $locationData['city'] ?? 'Unknown';

                    // 5. Simpan ke Database
                    Visit::create([
                        'ip_address' => $request->ip(),
                        'url' => $request->fullUrl(),
                        'user_agent' => $request->header('User-Agent'),
                        'country' => $country,
                        'city' => $city,
                    ]);
                }
            }
        }

        return $next($request);
    }
}