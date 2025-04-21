import React from "react";
import DatasetCard from "./DatasetCard";

const DatasetGrid = ({ datasets }) => {
  if (datasets.length === 0) {
    return (
      <div className="hdc-dataset-grid-empty">
        <p>No datasets match the selected filters.</p>
      </div>
    );
  }

  return (
    <div className="hdc-dataset-grid">
      <div className="datasets-grid">
        {datasets.map((dataset) => (
          <DatasetCard key={dataset.id} {...dataset} />
        ))}
      </div>
    </div>
  );
};

export default DatasetGrid;
