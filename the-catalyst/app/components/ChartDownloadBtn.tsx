import React from 'react'

interface DownloadButtonProps {
  chartClassName: string
  onDownload: (chartClassName: string) => void;
}

const ChartDownloadBtn = ({chartClassName, onDownload}: DownloadButtonProps) => {
  
  return (
    <button
                  id="download-chart-button"
                  onClick={() => onDownload (chartClassName)}
                  className={`inline-flex w-full md:w-fit md:ml-auto items-center px-4 py-2 mt-4 bg-indigo-500 hover:bg-indigo-700 rounded-md font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  
                >
                  Download Chart
                </button>
              
  )
}

export default ChartDownloadBtn