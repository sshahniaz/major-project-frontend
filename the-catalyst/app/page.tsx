import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">

      <div className="flex flex-row items-center">

      <h1 className="text-6xl font-bold text-center">
        Welcome to 
      </h1>
      <Image
        src="/Logocatalyst.svg"
        alt="The Catalyst"
        width={500}
        height={500}
        className="ml-4"
        />
        
      </div>
      
      <p className="text-gray-700 dark:text-gray-200 text-xl md:text-2xl font-semibold">Unlock the power of data-driven sales forecasting.</p>

      
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white shadow-sm rounded-lg overflow-hidden dark:bg-gray-800">  
                <div className="px-4 py-5 sm:p-6">
            <h3 className='text-gray-700 dark:text-gray-200 text-xl md:text-2xl font-semibold'>Key Features</h3>
            <ul className="list-disc ml-8 mt-5">
              <li className="text-gray-700 dark:text-gray-200 text-lg md:text-xl">Upload the sales data</li>
              <li className="text-gray-700 dark:text-gray-200 text-lg md:text-xl">Receive accurate sales predictions</li>
              <li className="text-gray-700 dark:text-gray-200 text-lg md:text-xl">Improve business decision-making</li>
            </ul>
            <h3 className='text-gray-700 dark:text-gray-200 text-xl md:text-2xl font-semibold mt-5'>Data Privacy</h3>
            <p className="text-gray-700 dark:text-gray-200 text-lg md:text-xl mt-5">Your data is safe with us.</p>

                </div>
              </div>

              <div className="bg-white shadow-sm rounded-lg overflow-hidden dark:bg-gray-800"> 
                <div className="px-4 py-5 sm:p-6">
                  <h3 className='text-gray-700 dark:text-gray-200 text-xl md:text-2xl font-semibold'>Get Predicting!</h3>
                  <p className="text-gray-700 dark:text-gray-200 text-lg md:text-xl mt-5">Please use the data provided below &#10098;Note: Please do not change the filenames&#10099;</p>
            <ul className="list-disc ml-8 mt-5 mb-5 flex flex-col gap-5">
              {/* Download links */}
              <li className="text-gray-700 dark:text-gray-200 text-md md:text-md">
                <a href="/data/CleanedSynth1_Test_Set.csv" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-5" download>Test Data 1</a>
                    </li>
                    <li className="text-gray-700 dark:text-gray-200 text-md md:text-md"><a href="/data/CleanedSynth2_Test_Set.csv" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-5" download>Test Data 2</a></li>
            </ul>
            <div className="flex flec-row w-full justify-center">
              <a
        href="/prediction"
        className="bg-indigo-500 hover:bg-indigo-700 text-white text-lg font-bold py-2 px-4 rounded mt-5"  
      >
        Start Predicting Now &#62;
      </a>
            </div>
            
               </div>
              </div>

              
            </div>
      

    </main>
  );
}
