'use client';

import Link from 'next/link';

export default function OrderServicePage() {
    // Program items for the order of service
    const programItems = [
        // Wednesday, 26 November 2025
        { time: '8:00 AM - 9:00 PM', item: 'Accreditation & Registration', day: 'Wednesday, 26 November 2025' },
        
        // Thursday, 27 November 2025
        { time: '7:00 AM - 9:00 AM', item: 'Accreditation & Registration Continues', day: 'Thursday, 27 November 2025' },
        { time: '9:00 AM', item: 'Participants Seated' },
        { time: '9:00 AM - 9:10 AM', item: 'Arrival of Guests' },
        { time: '9:10 AM - 9:15 AM', item: 'African Union Anthem/National Anthem' },
        { time: '9:15 AM - 9:20 AM', item: 'National Prayer' },
        { time: '9:20 AM - 9:25 AM', item: 'Introduction of Guests' },
        { time: '9:25 AM - 9:30 AM', item: 'Welcome address by Prof. Abubakar O. Sulaiman, Director General, NILDS' },
        { time: '9:30 AM - 9:50 AM', item: 'Inspection of Exhibition Stands by Honourable Ministers' },
        { time: '9:50 AM - 10:00 AM', item: 'Monologue by Favour' },
        { time: '10:00 AM - 10:10 AM', item: 'Videos of the Ministry\'s Initiative and Testimonials from Beneficiaries' },
        { time: '10:10 AM - 10:20 AM', item: 'Spoken Words by Alim Bakare Zara' },
        { time: '10:20 AM - 10:50 AM', item: 'Paper Presentation on Gender Equity and Social Inclusion by Secretary General-WRAPA' },
        { time: '10:50 AM - 11:30 AM', item: 'Goodwill messages' },
        { time: '11:30 AM - 11:40 AM', item: 'Group Photograph' },
        { time: '11:40 AM - 11:55 AM', item: 'Tea Break' },
        { time: '11:55 AM - 1:00 PM', item: 'Youth Parley: Africa Youth Voices for Justice and Inclusion (PYU)' },
        { time: '1:00 PM - 1:15 PM', item: 'Paper Presentation: From Social Impact to System Change by Barr. Prada Uzodinma' },
        { time: '1:15 PM - 2:15 PM', item: 'Cultural Performance by States and the FCT' },
        { time: '', item: 'Closing' },
        
        // Friday, 28 November 2025
        { time: '9:00 AM', item: 'Participants Seated', day: 'Friday, 28 November 2025' },
        { time: '9:00 AM - 9:10 AM', item: 'Arrival of Guests' },
        { time: '9:10 AM - 9:15 AM', item: 'African Union Anthem/National Anthem' },
        { time: '9:15 AM - 9:20 AM', item: 'National Prayer' },
        { time: '9:20 AM - 9:25 AM', item: 'Introduction of Guest' },
        { time: '9:25 AM - 9:30 AM', item: 'Opening Remarks by Permanent Secretary, FMYD, Dr. Maryam Ismaila Keshinro' },
        { time: '9:30 AM - 9:50 AM', item: 'Performance by NYSC Band' },
        { time: '9:50 AM - 10:00 AM', item: 'Presentation of Communiqué from Youth Parley' },
        { time: '10:00 AM - 10:20 AM', item: 'Keynote Address by Honourable Minister, FMYD - Comrade Ayodele Olawande' },
        { time: '10:20 AM - 10:50 AM', item: 'Paper Presentation: The Role of young women in enterprise development by Deputy Speaker, Nigerian Youth Parliament' },
        { time: '10:50 AM - 11:50 AM', item: 'Launch of New Initiatives' },
        { time: '11:50 AM - 12:15 PM', item: 'Tea Break & Entertainment' },
        { time: '12:15 PM - 12:45 PM', item: 'Paper Presentation on Governance, Justice and Peace-Building by BB 4 Peace Foundation' },
        { time: '12:45 PM - 1:55 PM', item: 'Presentation of Youth Innovations and Pitch Session' },
        { time: '1:55 PM - 2:35 PM', item: 'Master-class: Business Plan in a Minute Tool by Eniola Adetunji-Mustapha' },
        { time: '2:35 PM - 3:35 PM', item: 'National Development Youth Awards' },
        { time: '3:35 PM - 4:45 PM', item: 'Honourable Minister\'s Interactive Session with Youth' },
        { time: '4:45 PM - 5:00 PM', item: 'National Anthem' },
        { time: '5:00 PM', item: 'Group Photograph' },
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
                    26-28 November 2025
                </p>

                <div className="space-y-3 mb-6">
                    {programItems.map((program, index) => (
                        <div key={index}>
                            {program.day && (
                                <div className="mt-4 mb-2 pt-3 border-t-2 border-yellow-500">
                                    <h3 className="text-md font-bold text-yellow-600">
                                        {program.day}
                                    </h3>
                                </div>
                            )}
                            <div className="border-b border-gray-100 pb-2 flex items-start gap-5">
                                <span className="text-sm font-bold text-black whitespace-nowrap min-w-[120px]">
                                    {program.time}
                                </span>
                                <span className="text-sm text-gray-800">{program.item}</span>
                            </div>
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
