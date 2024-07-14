'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Legend, Title } from 'chart.js';
import Papa from 'papaparse';
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




const Prediciton = () => {
const [formData, setFormData] = useState<{ predictedResult: any } | null>(null);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<any>(null);
  const [ baselineData, setBaselineData ] = useState<any[]>([]); // Stores baseline data
  
  const encodingMaps = {
    OutletSize: { 0: 'Small', 1: 'Medium', 2: 'High' },
    OutletType: {
      0: 'Grocery Store',
      1: 'Supermarket Type1',
      2: 'Supermarket Type2',
      3: 'Supermarket Type3',
    },
    LocationType: { 2: 'Tier 3', 1: 'Tier 2', 0: 'Tier 1' },
  };


  useEffect(() => {
    const fetchBaselineData = async () => {
      try {
        const response = await fetch('/data/baseline.csv');
        const csvData = await response.text();

        const results: any = Papa.parse(csvData, { header: true, dynamicTyping: true });
        setBaselineData(results.data);
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

    // Generate chart data for a specific feature
  const generateChartData = (feature: string) => {
    const baselineDataWithFeature = baselineData.length > 0 ? baselineData : [];
    const predictedDataWithFeature = formData?.predictedResult?.map((item: any) => ({ ...item, [feature]: item[feature] }));

    return {
      labels: baselineDataWithFeature.length > 0 ? baselineDataWithFeature.map((item) => item[feature]) : [], // Use feature values as labels
      datasets: [
        {
          label: 'Baseline Sales',
          data: baselineDataWithFeature.length > 0 ? baselineDataWithFeature.map((item) => item.OutletSales) : [0], // Handle empty baseline
          backgroundColor: baselineDataWithFeature.length > 0 ? ['#ccc'] : ['transparent'], // Use transparent color if no baseline
          borderColor: baselineDataWithFeature.length > 0 ? ['#ccc'] : ['transparent'],
        },
        {
          label: 'Predicted Sales',
          data: formData?.predictedResult?.map((item: any) => item.OutletSales),
          backgroundColor: formData?.predictedResult ? ['#007bff'] : ['transparent'], // Use transparent color if no prediction
          borderColor: formData?.predictedResult ? ['#007bff'] : ['transparent'],
        },
      ],
    };
  };

  const chartFeatures = ['OutletSize', 'LocationType', 'OutletType']; 

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
      {formData?.predictedResult || baselineData.length > 0 ? (
        <div className="charts-container">
          {/* Render charts for each feature */}
          {chartFeatures.map((feature) => (
            <div className="chart-wrapper" key={feature}>
              <h3>{feature} vs. Sales</h3>
              <Line data={generateChartData(feature)} options={{}} />
            </div>
          ))}
        </div>
      ) : null}
    </div>


    </div>
    
  )
}

export default Prediciton