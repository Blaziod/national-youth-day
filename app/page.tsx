'use client';

import Image from 'next/image';
import {useRouter} from 'next/navigation';

export default function InvitationPage() {
  const router = useRouter();

  // Phone number & Google Maps link (you can replace these later)
  // const phoneNumber = '+2347057877695';
  // const mapLink =
  //     'https://www.google.com/maps/place/Rainbow+Event+Marquee/@9.037928,7.4913692,17z/data=!3m1!4b1!4m6!3m5!1s0x104e0bfd6d9395b3:0x5b2240d4492ad44b!8m2!3d9.037928!4d7.4939441!16s%2Fg%2F11fjs91nh0?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D';

  // const handleRSVP = () => {
  //   window.location.href = `tel:${phoneNumber}`;
  // };
  //
  // const handleVenueDirection = () => {
  //   window.open(mapLink, '_blank');
  // };
  //
  // const handleSetReminder = () => {
  //   router.push('/reminder');
  // };

  const handleOrderService = () => {
    router.push('/order-service');
  };

  return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-8">
        <div className="flex flex-col items-center text-center bg-white shadow-md rounded-lg w-full max-w-sm md:max-w-md lg:max-w-lg p-6 md:p-10">
          {/* Logo */}
          <div className="mb-4">
            <Image
                src="/fmyd-logo.jpg"
                alt="Investonair Logo"
                width={120}
                height={120}
                className="mx-auto"
            />
          </div>

          {/* Text */}
          <h1 className="text-xl md:text-xl font-bold text-yellow-600 mb-3">
            VERIFIED INVITATION FOR AFRICAN NATIONAL YOUTH DAY 2025
          </h1>


          <h3 className="text-xl md:text-xl  text-gray-700 mb-4">
            Federal Ministry of Youth Development
          </h3>
          <p className="text-xs md:text-xl text-gray-900 mb-3">
            Welcomes you to the
          </p>
          <h3 className="text-2xl md:text-2xl font-bold text-gray-900 mb-4">
            AFRICAN NATIONAL YOUTH DAY 2025
          </h3>

          <h3 className="text-xl md:text-xl text-gray-900 mb-4">
            <span className='font-bold text-gray-900'>Theme: </span> From Aspiration to Action: Youth as Agents of Reparative Justice and Sustainable Development.
          </h3>

          {/* Event Details */}
          <div className="text-gray-700 text-sm md:text-base space-y-1 mb-6">
            <p><span className="font-semibold">Date:</span> 27th - 28th November 2025</p>
            <p><span className="font-semibold">Time:</span> 9.00am</p>
            <p><span className="font-semibold">Venue:</span> Main Auditorium, National Institute for Legislative and Democratic Studies, Abuja, Federal Capital Territory, Nigeria</p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col space-y-3 w-full">
            {/*<button*/}
            {/*    onClick={handleSetReminder}*/}
            {/*    className="w-full bg-black text-white font-semibold py-3 rounded-md border border-yellow-500 hover:bg-gray-900 active:bg-yellow-600 active:border-black transition"*/}
            {/*>*/}
            {/*  SET REMINDER*/}
            {/*</button>*/}
            {/*<button*/}
            {/*    onClick={handleVenueDirection}*/}
            {/*    className="w-full bg-black text-white font-semibold py-3 rounded-md border border-yellow-500 hover:bg-gray-900 active:bg-yellow-600 active:border-black transition"*/}
            {/*>*/}
            {/*  VENUE DIRECTION*/}
            {/*</button>*/}
            <button
                onClick={handleOrderService}
                className="w-full bg-black text-white font-semibold py-3 rounded-md border border-yellow-500 hover:bg-gray-900 active:bg-yellow-600 active:border-black transition"
            >
              PROGRAM SCHEDULE
            </button>
          </div>

          {/*<button*/}
          {/*    onClick={handleRSVP}*/}
          {/*    className="mt-5 w-full bg-black text-white font-semibold py-3 rounded-md border border-yellow-500 hover:bg-gray-900 active:bg-yellow-600 active:border-black transition"*/}
          {/*>*/}
          {/*  RSVP*/}
          {/*</button>*/}
          <p className={'text-sm text-black mt-4 place-self-end'}>Designed by <a href={'https://idcode.ng/'}>Idcode.ng</a></p>
        </div>
      </main>
  );
}
