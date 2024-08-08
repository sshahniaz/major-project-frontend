import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-around p-24">

      <div className="flex flex-col gap-y-2 items-center md:flex-row md:gap-y-0">

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
      
      <p className="text-gray-700 dark:text-gray-200 text-xl md:text-2xl font-semibold mt-5">Unlock the power of data-driven sales forecasting.</p>

      
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="bg-white shadow-sm rounded-lg overflow-hidden dark:bg-gray-800">  
                <div className="px-4 py-5 sm:p-6">
            <h3 className='text-gray-700 dark:text-gray-200 text-xl md:text-2xl font-semibold'>Key Features</h3>
            <ul className="list-disc ml-8 mt-5">
              <li className="text-gray-700 dark:text-gray-200 text-lg md:text-xl">Upload the sales data</li>
              <li className="text-gray-700 dark:text-gray-200 text-lg md:text-xl">Receive accurate sales predictions</li>
              <li className="text-gray-700 dark:text-gray-200 text-lg md:text-xl">Improve business decision-making</li>
              <li className="text-gray-700 dark:text-gray-200 text-lg md:text-xl">Downloadable predicted CSV file</li>
              <li className="text-gray-700 dark:text-gray-200 text-lg md:text-xl">Theme switcher on the top right</li>
              <li className="text-gray-700 dark:text-gray-200 text-lg md:text-xl">Downloadable charts as images in PNG</li>

            </ul>
            <h3 className='text-gray-700 dark:text-gray-200 text-xl md:text-2xl font-semibold mt-5'>Data Privacy</h3>
            <p className="text-gray-700 dark:text-gray-200 text-lg md:text-xl mt-5">Your data is safe with us. When you upload the file and predict. As of now we do not keep any predictions saved so please promptly download the CSV when its done predicting.</p>

                </div>
              </div>

              <div className="bg-white shadow-sm rounded-lg overflow-hidden dark:bg-gray-800"> 
                <div className="px-4 py-5 sm:p-6">
                  <h3 className='text-gray-700 dark:text-gray-200 text-xl md:text-2xl font-semibold'>Get Predicting!</h3>
                  <p className="text-gray-700 dark:text-gray-200 text-lg md:text-xl mt-5">Please use the data provided below for testing. When on the prediction page please upload the file you have downloaded to see results. &#10098;Note: Please do not change the filenames&#10099;</p>
            <ul className="list-disc ml-8 mt-5 mb-5 flex flex-col gap-5">
              {/* Download links */}
              <li className="text-gray-700 dark:text-gray-200 text-md md:text-md">
                <a href="/data/CleanedSynth1_Test_Set.csv" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-5" download>Test Data 1</a>
                    </li>
                    <li className="text-gray-700 dark:text-gray-200 text-md md:text-md"><a href="/data/CleanedSynth2_Test_Set.csv" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-5" download>Test Data 2</a></li>
            </ul>

            <div className="">
              <h3 className='text-gray-700 dark:text-gray-200 text-xl md:text-2xl font-semibold'>How to use?</h3>
              <p className="text-gray-700 dark:text-gray-200 text-lg md:text-xl mt-5">Click on the link above to download the test data. Upload the file on the prediction page and click predict. Once the prediction is done you can download the CSV file with the predictions.</p>
            </div>

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
      

    </div>
  );
}
