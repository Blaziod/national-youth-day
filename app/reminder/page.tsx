'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';

export default function ReminderPage() {
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSetReminder = async () => {
        // Validate inputs
        if (!phone) {
            alert('Please enter your email address.');
            return;
        }

        if (!date || !time) {
            alert('Please select both date and time.');
            return;
        }

        // Email validation
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            alert('Please enter a valid phone number.');
            return;
        }

        setIsLoading(true);

        // Append country code 234 for SMS service
        const phoneWithCountryCode = `234${phone}`;

        try {
            // Send email reminder via API
            const response = await fetch('/api/send-reminder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneWithCountryCode, name, date, time }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setToastType('success');
                setToastMessage('Reminder set successfully! Check your phone for confirmation sms.');
            } else {
                setToastType('error');
                setToastMessage(data.message || 'Failed to set reminder. Please try again.');
            }

            // Show toast
            setToastVisible(true);
            setTimeout(() => setToastVisible(false), 3000);
        } catch (error) {
            console.error('Error sending reminder:', error);
            setToastType('error');
            setToastMessage('An error occurred. Please try again later.');
            setToastVisible(true);
            setTimeout(() => setToastVisible(false), 3000);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm text-center">
                <h1 className="text-xl font-bold text-gray-800 mb-4">Set Reminder</h1>

                <div className="space-y-4">
                    {/* Name Input */}
                    <div className="flex flex-col text-left">
                        <label className="text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Dr. John Doe"
                            className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
                            required
                        />
                    </div>

                    {/* Phone Input */}
                    <div className="flex flex-col text-left">
                        <label className="text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                        </label>
                        <div className={'flex flex-row w-full gap-4'}>
                            <div className={'py-2 px-3 rounded-md border text-black'}>
                                +234
                            </div>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="8012345678"
                                className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black w-full"
                                required
                            />
                        </div>
                    </div>

                    {/* Date Input */}
                    <div className="flex flex-col text-left">
                        <label className="text-sm font-medium text-gray-700 mb-1">
                            Date
                        </label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
                            required
                        />
                    </div>

                    {/* Time Input */}
                    <div className="flex flex-col text-left">
                        <label className="text-sm font-medium text-gray-700 mb-1">
                            Time
                        </label>
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
                            required
                        />
                    </div>

                    {/* Buttons */}
                    <button
                        onClick={handleSetReminder}
                        disabled={isLoading}
                        className={`w-full bg-black text-white font-semibold py-2 rounded-md border border-yellow-500 hover:bg-gray-900 active:bg-yellow-600 active:border-black transition ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? 'SENDING...' : 'SET REMINDER'}
                    </button>
                    <button
                        onClick={handleBack}
                        className="w-full bg-black text-white font-semibold py-2 rounded-md border border-yellow-500 hover:bg-gray-900 active:bg-yellow-600 active:border-black transition"
                    >
                        BACK TO INVITATION
                    </button>
                </div>

                {/* Toast */}
                {toastVisible && (
                    <div className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 ${toastType === 'success' ? 'bg-green-600' : 'bg-red-600'} text-white text-sm font-medium px-4 py-2 rounded-md shadow-lg transition-opacity duration-500 ease-in-out`}>
                        {toastMessage}
                    </div>
                )}
            </div>
        </main>
    );
}
