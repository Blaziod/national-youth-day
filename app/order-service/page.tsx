'use client';

import Link from 'next/link';

export default function OrderServicePage() {
    // Program items for the order of service
    const programItems = [
        { time: '8:30 AM', item: 'Pre-event Experience' },
        { time: '9:45 AM', item: 'Opening Session' },
        { time: '10:00 AM', item: 'Introductory Session' },
        { time: '10:30 AM', item: 'High Level Panel Discussion' },
        { time: '10:55 AM', item: 'Musical Interlude/ Wealth Quiz by MC' },
        { time: '11:00 AM', item: 'Launch Ceremony' },
        { time: '11:05 AM', item: 'National Anthem' },
        { time: '11:10 AM', item: 'Welcome Address by Permanent Secretary, FMYD' },
        { time: '11:20 AM', item: 'Mission and Vision of Investonaire Academy' },
        { time: '11:30 PM', item: 'Goodwill message' },
        { time: '11:55 PM', item: 'Remarks by Guest of Honour, Honourable Minister of Women Affairs' },
        { time: '12:05 PM', item: 'Live Performance - Guest Artist' },
        { time: '12:20 PM', item: 'Video Presentation - Showcasing' },
        { time: '12:30 PM', item: 'Youth Testimonial and Presentation of Funded Trading Accounts and Gifts' },
        { time: '12:45 PM', item: 'Keynote Address by Honourable Minister of Youths' },
        { time: '1:00 PM', item: 'Launch of Learning Management System (LMS)' },
        { time: '1:15 PM', item: 'Group Photo' },
        { time: '1:20 PM', item: 'Closing Remarks' },
        { time: '2:25 PM', item: 'Lunch is served' },
        { time: '2:25 PM', item: 'Meet, Greet and Networking' },
    ];

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-8">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm md:max-w-md lg:max-w-lg">
                <h1 className="text-xl md:text-2xl font-bold text-yellow-600 mb-4 text-center">
                    PROGRAM SCHEDULE
                </h1>

                <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 text-center">
                    Launch of Financial literacy and wealth creation programme
                </h2>

                <p className="text-gray-600 text-sm md:text-base mb-6 text-center">
                    25th November 2025 • 9:00 AM
                </p>

                <div className="space-y-3 mb-6">
                    {programItems.map((program, index) => (
                        <div
                            key={index}
                            className="border-b border-gray-100 pb-2 flex items-start gap-3"
                        >
                            <span className="text-sm font-bold text-black whitespace-nowrap">{program.time}</span>
                            <span className="text-sm text-gray-800">{program.item}</span>
                        </div>
                    ))}
                </div>

                <Link href="/">
                    <button className="w-full bg-black text-white font-semibold py-3 rounded-md border border-yellow-500 hover:bg-gray-900 active:bg-yellow-600 active:border-black transition">
                        BACK TO INVITATION
                    </button>
                </Link>
            </div>
        </main>
    );
}
