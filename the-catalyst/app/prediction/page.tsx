'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Legend, Title } from 'chart.js';
import { ProductType, OutletSize, OutletType, LocationType, SalesData } from '@/types/types';// Assuming 'types' folder for interfaces
import { Line } from 'react-chartjs-2';

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
  }[];
}




const Prediciton = () => {
  const [formData, setFormData] = useState<{ predictedResult: any } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [ baselineData, setBaselineData ] = useState<SalesData | null>(null); // Stores baseline data
 



  
  // const encodingMaps = {
  //   OutletSize: { 0: 'Small', 1: 'Medium', 2: 'High' },
  //   OutletType: {
  //     0: 'Grocery Store',
  //     1: 'Supermarket Type1',
  //     2: 'Supermarket Type2',
  //     3: 'Supermarket Type3',
  //   },
  //   LocationType: { 2: 'Tier 3', 1: 'Tier 2', 0: 'Tier 1' },
  // };


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
  }, []);
  

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

      
      const fileName = event.target.elements.file.files[ 0 ]?.name ?? '';
      
      const decodedPrediction = response.data.prediction.map((value: any, index: number) => ({
        ...fileName.split('.')[0], // Extract filename for labeling
        [Object.keys(fileName.split('.')[0])[0]]: index + 1, // Add index as "X" value
        ...Object.fromEntries(
          Object.entries(fileName.split('.')[0]).slice(1).map(([key, value]) => [key, response.data.prediction[index]]) // Combine filename features with predicted sales
        ),
      }));
      
      setFormData({ ...formData, predictedResult: decodedPrediction }); // Update formData with predicted result
      setBaselineData(decodedPrediction); // Update baseline data with predicted result

    } catch (error: any) {
      console.error('Error making prediction:', error);
      setError(error);
    }
    setIsLoading(false);
  }

  // Generate chart data for a specific feature or group
  const generateChartData = (data: LocationType[] | ProductType[] | OutletType[] | OutletSize[], label: string) => {
    if (!data) return { labels: [], datasets: [] };
  
    const chartData: ChartData = { labels: [], datasets: [] };

    console.log(data);
    chartData.labels = data.map((item) => {
      if ('productType' in item) {
        return item.productType;
      } else if ('type' in item) {
        return item.type;
      } else if ('size' in item) {
        return item.size;
      } else {
        return '';
      }
    });
  
    chartData.datasets.push({
      label,
      data: data.map((item) => {
        if (('sales') in item) {
          return item.sales;
        } else if ('averageTierSales' in item) {
          return item.averageTierSales;
        } else if ('averageTypeSales' in item) {
          return item.averageTypeSales;
        } else if ('averageSalesforSize' in item) {
          return item.averageSalesforSize;
        } else {
          return 0;
        }
      }),
      backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`,
      borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`,
    });
  
    return chartData;
  };




  // const chartFeatures = ['OutletSize', 'LocationType', 'OutletType']; 

  return (
    <div>
      
      <h2>Predictions</h2>

       <div>
      {/* Form for uploading CSV */}
      <form onSubmit={handleSubmit}>
          <input type="file" name="file" required />
           <button type="submit">Predict</button>
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
        {formData?.predictedResult || (baselineData) ? (
        <div className="charts-container">
          {/* Top 10 Products Chart */}
          {/* <div className="chart-wrapper">
            <h3>Top 10 Products</h3>
            <Line data={generateChartData(baselineData?.top10ProductTypesSales || [], 'Top 10 Sales')} options={{}} />
          </div> */}

          {/* Location Types Chart */}
          {/* <div className="chart-wrapper">
            <h3>Location Types</h3>
            <Line data={generateChartData(baselineData?.locationType || [], 'Location Tier Average Sales')} options={{}} />
          </div> */}

          {/* Per Tier Charts */}
          {baselineData?.locationType?.map((locationType) => (
            <div className="chart-wrapper" key={locationType.type}>
              <h3>{locationType.type} - Products vs. Outlet Size</h3>
              {locationType.outletTypes?.map((outletType) => ( 
                
                outletType.outletSizes.map((outletSize) => (
                  <div key={outletSize.size}>
                    <h4>{ `${outletType.type} - ${outletSize.size}`}</h4>
                    <Line data={generateChartData(outletSize.productTypes, `${locationType.type} Sales`)} options={{}} />
                  </div>
                ))))}
            </div>
          ))}
        </div>
      ) : null}
    </div>


    </div>
    
  )
}

export default Prediciton