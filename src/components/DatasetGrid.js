import React from "react";
import DatasetCard from "./DatasetCard";

const DatasetGrid = ({ datasets, viewMode = "grid" }) => {
  if (datasets.length === 0) {
    return (
      <div className="hdc-dataset-grid-empty">
        <p>No datasets match the selected filters.</p>
      </div>
    );
  }

  return (
    <div className={`hdc-dataset-container ${viewMode}-view`}>
      {viewMode === "grid" && (
        <div className="hdc-dataset-grid">
          <div className="datasets-grid">
            {datasets.map((dataset) => (
              <DatasetCard key={dataset.id} {...dataset} />
            ))}
          </div>
        </div>
      )}

      {viewMode === "list" && (
        <div className="hdc-dataset-list">
          <ul className="datasets-list">
            {datasets.map((dataset) => (
              <li key={dataset.id} className="dataset-list-item">
                <DatasetCard {...dataset} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {viewMode === "detail" && (
        <div className="hdc-dataset-detail">
          <div className="datasets-detail">
            {datasets.map((dataset) => (
              <div key={dataset.id} className="dataset-detail-item">
                <DatasetCard {...dataset} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatasetGrid;
