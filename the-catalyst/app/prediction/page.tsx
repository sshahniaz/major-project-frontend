'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Legend, Title } from 'chart.js';
import { ProductType, OutletSize, OutletType, LocationType, SalesData, Top10ProductTypesSalesInterface } from '@/types/types';// Assuming 'types' folder for interfaces
import { Line, Bar } from 'react-chartjs-2';
import { color } from 'chart.js/helpers';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Title
);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    labelColor?: string;
  }[];
}




const Prediciton = () => {
  const [formData, setFormData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [ baselineData, setBaselineData ] = useState<SalesData | null>(null); // Stores baseline data
  const [predictedResult, setPredictedResult] = useState<SalesData | null>(null); // Stores predicted result
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    const fetchBaselineData = async () => {
      try {
        const response = await axios.get('/data/baseline.json');
        
        setBaselineData(response.data);
      } catch (error: any) {
        setError(error);
      }

    }
    fetchBaselineData();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (event : any) => setIsDarkMode(event.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);

  }, []);
  
  // console.log(baselineData?.locationType.map((locationType) => locationType.OutletType.map((outletType) => outletType.OutletSize.map((outletSize) => outletSize.productTypes.map((productType) => productType.name)))));
  

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      //Prepare form data
      const formData = new FormData();
      formData.append('file', event.target.elements.file.files[ 0 ]);
      

      const response = await axios.post('https://sea-turtle-app-vktl8.ondigitalocean.app/predict', formData);
      console.log(response.data);

      
      // const fileName = event.target.elements.file.files[ 0 ]?.name ?? '';
      setPredictedResult(response.data);
      
      setFormData(formData); // Update formData with predicted result
      

    } catch (error: any) {
      console.error('Error making prediction:', error);
      setError(error);
    }
    setIsLoading(false);
  }

  const chartOptions = {
    scales: {
      x: {
        ticks: {
          color: isDarkMode ?  'white' : 'black',
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: isDarkMode ? 'white' : 'black',
          callback: function(value: any, index: number, values: any) {
                        return '£ ' + value.toFixed(2);
                    }
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ?  'white' : 'black',
          font: {
            size: 14,
          },
        },
      },
    },
  };

  // Generate chart data for a specific feature or group
  const generateChartData = ( baselineData: LocationType[] | ProductType[] | OutletType[] | Top10ProductTypesSalesInterface[], predictedData: LocationType[] | ProductType[] | OutletType[] | Top10ProductTypesSalesInterface[], label: string): ChartData => {
    if (!baselineData && !predictedData) return { labels: [], datasets: [] };

    const chartData: ChartData = { labels: [], datasets: [] };

    chartData.labels = baselineData.map((item) => {
      // Type Guard to ensure the item has the right property
      if ('productType' in item) {
        // check if item is of type Top10ProductTypesSalesInterface 
        return (item as Top10ProductTypesSalesInterface).productType;
      
      } else if ('productType' in item) {
        return (item as ProductType).name;
      } else if ('type' in item) {
        return (item as LocationType | OutletType).type; // Can be either locationType or outletType
      } else {
        return item.name; // Throw error for unsupported data type
      }
    }) || predictedData.map((item) => {
      // Type Guard to ensure the item has the right property
      if ('productType' in item) {
        // check if item is of type Top10ProductTypesSalesInterface 
        return (item as Top10ProductTypesSalesInterface).productType;
      
      } else if ('productType' in item) {
        return (item as ProductType).name;
      } else if ('type' in item) {
        return (item as LocationType | OutletType).type; // Can be either locationType or outletType
      } else {
        return item.name; // Throw error for unsupported data type
      }
    });
   
   
    const extractData = (data: LocationType[] | ProductType[] | OutletType[] | Top10ProductTypesSalesInterface[]) => {
      return data.map((item) => {
        // Similar type guard approach for sales data
        if ('sales' in item) {
          return (item as { sales: number }).sales;
        } else if ('averageTierSales' in item) {
          return (item as LocationType).averageTierSales;
        } else if ('averageTypeSales' in item) {
          return (item as OutletType).averageTypeSales;
        } else if ('averageSales' in item) {
          return (item as ProductType).averageSales;
        } else {
          return 0; // Default value for missing sales data
        }
      });
    }

    if (baselineData) {
      chartData.datasets.push({
        label: 'Baseline',
        data: extractData(baselineData),
        backgroundColor: `#4e7cfd`,
        borderColor: `rgb(255, 255, 255)`,
        
      });
    }

    if (predictedData) {
      chartData.datasets.push({
        label: 'Predicted',
        data: extractData(predictedData),
        backgroundColor: `#F65164`,
        borderColor: `rgb(255, 255, 255)`,
     
      });

    }

    

      return chartData;
    

  }


  // const chartFeatures = ['OutletSize', 'LocationType', 'OutletType']; 

  return (
    <div className='flex min-h-screen flex-col justify-center items-center'>
       <div className='w-full max-w-screen-2xl px-4'>
      
        <h2 className='text-gray-800 dark:text-white text-6xl pt-8'>Predictions</h2>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4">
          <div className="bg-white shadow-sm rounded-lg overflow-hidden dark:bg-gray-800">  {/* Form card with dark mode switch */}
            <div className="px-4 py-5 sm:p-6">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mb-3">
              <label htmlFor="file" className="text-lg font-medium text-gray-800 dark:text-white mb-1 w-full sm:w-1/2">
                Upload File
                  </label>
                  {/* File input */}
                 { /* Use "file:" prefix for styling the file inputs as does not work by default */}
              <input
                id="file"
                type="file"
                name="file"
                required
                className="block rounded-none relative w-full file:px-3 file:py-2 mt-3 file:border-0 file:rounded-md focus:file:outline-none focus:file:ring-indigo-500 focus:file:border-indigo-500 sm:text-sm file:text-sm file:font-semibold file:text-gray-200 file:bg-indigo-500 hover:file:bg-indigo-700"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 mt-4 bg-indigo-500 rounded-md font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Predict
            </button>
          </form>
        </div>
      </div>

      {isLoading && <p className="text-center text-gray-500 dark:text-gray-300 text-lg">Loading...</p>}
      {error && <p className="text-center text-red-500 text-lg">Error: {error.message}</p>}
    </div>
        
        {(baselineData) || (predictedResult) ? (
          <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white shadow-sm rounded-lg overflow-hidden dark:bg-gray-800">  {/* Top 10 Products Chart card */}
                <div className="px-4 py-5 sm:p-6">
                   <h3 className='"text-gray-700 dark:text-gray-200 text-xl md:text-2xl font-semibold'>Top 10 Products (Average Sales)</h3>
                   <Bar data={generateChartData(baselineData?.top10ProductTypesSales || [], predictedResult?.top10ProductTypesSales || [], 'Top 10 Sales')} options={chartOptions} />
                </div>
              </div>

              <div className="bg-white shadow-sm rounded-lg overflow-hidden dark:bg-gray-800">  {/* Location Types Chart card */}
                <div className="px-4 py-5 sm:p-6">
                  <h3 className='"text-gray-700 dark:text-gray-200 text-xl md:text-2xl font-semibold'>Location Types (Average Sales)</h3>
                  <Bar data={generateChartData(baselineData?.locationType || [], predictedResult?.top10ProductTypesSales || [], 'Location Tier Average Sales')} options={chartOptions} />
               </div>
              </div>

              
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 max-w-8xl">  {/* Per Tier Charts */}
              {baselineData?.locationType.map((locationType, index) => (
                  
                
                  <div className={`bg-white shadow-sm rounded-lg overflow-hidden dark:bg-gray-800 ${
         index === baselineData?.locationType.length - 1 && 'md:col-span-2' // Apply col-span-2 every other element (odd index) on medium screens and larger
      }`} key={locationType.type}>
                    <div className="px-4 py-8 sm:p-6">

                       <h3 className="text-gray-700 dark:text-gray-200 text-xl md:text-2xl  font-semibold ">{locationType.type} - Average Sales of Products Each Outlet by Location</h3>  {/* Text color based on dark mode */}
                       {locationType.OutletType?.map((outletType) => (
                         <div className="mt-8" key={outletType.type}>
                           {outletType.OutletSize?.map((outletSize) => (
                             
                             
                               <div className='flex flex-col mt-8' key={outletSize.size}>
                               <h4 className="text-gray-700 dark:text-gray-200 text-lg font-medium" key={outletSize.size}>{`${outletType.type} - ${outletSize.size}`}</h4>  
                                 
                               <Bar data={generateChartData(outletSize.productTypes,
                      predictedResult?.locationType?.find((location) => location.type === locationType.type)?.OutletType?.find((outlet) => outlet.type === outletType.type)?.OutletSize?.find((size) => size.size === outletSize.size)?.productTypes || []
                      , `${locationType.type} Sales`)} options={chartOptions} />
                               </div>
                    
                           
                             
                           ))}
                          </div> 
                    ))}
                    </div>
                  </div>

                  ))}
              </div>
          </div>
    ) : null}
        
            

     
    


      </div>
   </div>    
  )
}

export default Prediciton