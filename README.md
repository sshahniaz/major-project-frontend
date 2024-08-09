# **The Catalyst** 
----------------
<!-- Add Logo -->
![Logo](/the-catalyst/public/Logocatalyst.svg)

The Catalyst is a sales prediction tool designed to help businesses unlock the potential of their data.

By harnessing the power of machine learning, our application provides accurate and actionable insights to optimize sales strategies.

Simply upload your sales data and let the app do the rest. Our intuitive interface guides you through the process, generating detailed predictions and visualizations. Gain a deeper understanding of your sales patterns, identify growth opportunities, and make data-driven decisions with confidence.

Experience the future of sales forecasting with The Catalyst.


## Getting Started

To get started with The Catalyst, follow these steps:

1. Clone the repository:

  ```
  git clone https://github.com/sshahniaz/major-project-frontend.git
  ```

2. Navigate to the project directory:

  ```
  cd major-project-frontend/the-catalyst
  ```

3. Install the dependencies:

  ```
  npm install
  ```

4. Start the development server:

  ```
  npm start
  ```

5. Open your browser and visit [http://localhost:3000](http://localhost:3000) to access the application.


## Home Component

The Home component serves as the application's landing page. It contains:

*   **Visual elements:** A hero section with a logo and a brief introduction to the application.
  
*   **Key features:** A list highlighting the application's capabilities.
  
*   **Data privacy:** A section emphasizing data privacy and security.
  
*   **Downloadable test data:** Links to CSV files for testing purposes.
  
*   **Call-to-action:** A button directing users to the prediction page.
  

## **Prediction Component**

The Prediction component handles user interactions and data processing:

*   **State management:** Utilises React's useState hook to manage form data, loading state, errors, baseline data, predicted results, dark mode preference, and download status.
  
*   **Form handling:** Processes file uploads and triggers the prediction API call.
  
*   **API interactions:** Uses axios to make API calls for prediction and downloading predicted data.
  
*   **Error handling:** Implements error handling for API calls and file operations.
  
*   **Chart generation:** Creates charts using Chart.js based on baseline and predicted data.
  
*   **Download functionality:** Provides options to download predicted data as a CSV and charts as PNG images.
  
*   **Dark mode support:** Detects user's preferred colour scheme and adjusts chart colours accordingly.
  

## **Key Functionalities**

*   **File upload and prediction:** Users upload a CSV file containing sales data. The application sends the data to the backend API, which processes it and returns predicted sales figures.
  
*   **Data visualisation:** The application displays charts comparing baseline and predicted sales data for various categories (product types, location types, outlet types, and outlet sizes).
  
*   **Data download:** Users can download the predicted sales data as a CSV file and charts as PNG images.
  
*   **Error handling**: The application handles potential errors during file uploads, API calls, and data processing.
  
*   **User experience:** The application provides a user-friendly interface with clear instructions and visual feedback.
  

**Github Link:** [https://github.com/sshahniaz/major-project-frontend](https://github.com/sshahniaz/major-project-frontend)

**Web App Link:** [https://the-catalyst.vercel.app/](https://the-catalyst.vercel.app/)

