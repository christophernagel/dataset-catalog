import React from "react";
import DatasetCatalog from "./components/DatasetCatalog";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Healthcare Dataset Catalog</h1>
        <p className="app-description">
          Browse and filter medical and community health datasets from various
          sources
        </p>
      </header>

      <main id="main-content" className="app-main">
        <DatasetCatalog />
      </main>

      <footer className="app-footer">
        <p>
          © 2025 Healthcare Data Repository. All data is for research purposes
          only.
        </p>
      </footer>
    </div>
  );
}

export default App;
