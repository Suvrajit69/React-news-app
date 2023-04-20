import "./App.css";

import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const pageSize = 10;
  const apiKey = process.env.REACT_APP_NEWS_API;
  
  const [progress, setProgress] = useState(0);

  return (
    <BrowserRouter>
      <Navbar />
      <LoadingBar
        color="#f11946"
        progress={progress}
        height={3}
        // onLoaderFinished={() => setProgress(0)}
      />
      <Routes>
        <Route
          path="/"
          element={
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              key="general"
              pageSize={pageSize}
              category="general"
              country="in"
            />
          }
        />
        <Route
          path="business"
          element={
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              key="business"
              pageSize={pageSize}
              category="business"
              country="in"
            />
          }
        />
        <Route
          path="entertainment"
          element={
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              key="entertainment"
              pageSize={pageSize}
              category="entertainment"
              country="in"
            />
          }
        />
        <Route
          path="general"
          element={
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              key="general"
              pageSize={pageSize}
              category="general"
              country="in"
            />
          }
        />
        <Route
          path="health"
          element={
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              key="health"
              pageSize={pageSize}
              category="health"
              country="in"
            />
          }
        />
        <Route
          path="science"
          element={
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              key="science"
              pageSize={pageSize}
              category="science"
              country="in"
            />
          }
        />
        <Route
          path="sports"
          element={
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              key="sports"
              pageSize={pageSize}
              category="sports"
              country="in"
            />
          }
        />
        <Route
          path="technology"
          element={
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              key=""
              pageSize={pageSize}
              category="technology"
              country="in"
            />
          }
        />
        <Route
          path="technology"
          element={
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              key="technology"
              pageSize={pageSize}
              category="technology"
              country="in"
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;