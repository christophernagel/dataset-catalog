import React from "react";

const typeColors = {
  "Medical Records": "#4682B4", // Steel Blue
  Community: "#228B22", // Forest Green
  "Educational Records": "#9370DB", // Medium Purple
  "Clinical Trials": "#A52A2A", // Brown
  "Public Health": "#FF8C00", // Dark Orange
};

const DatasetCard = ({
  name,
  specifications,
  pageUrl,
  category,
  description,
  downloadUrl,
  sourceAttribution,
}) => {
  const getDatasetType = () => {
    // Map dataset categories to display types
    const categoryToType = {
      "Medical Records": "Medical Records",
      Community: "Community",
      "Educational Records": "Educational Records",
      "Clinical Trials": "Clinical Trials",
      "Public Health": "Public Health",
    };

    if (category && categoryToType[category]) {
      return categoryToType[category];
    }

    // Fallback checks based on specifications
    if (specifications?.["Dataset Type"] === "Clinical")
      return "Medical Records";
    if (specifications?.["Dataset Type"] === "Survey") return "Community";
    if (specifications?.["Dataset Type"] === "Educational")
      return "Educational Records";
    if (specifications?.["Dataset Type"] === "Research")
      return "Clinical Trials";
    if (specifications?.["Dataset Type"] === "Epidemiological")
      return "Public Health";

    return "Other";
  };

  const getDatasetDescription = () => description || "";

  const type = getDatasetType();
  const color = typeColors[type] || "#808080";

  return (
    <div
      className="hdc-dataset-card"
      onClick={() => pageUrl && window.open(pageUrl, "_self")}
      style={{ cursor: pageUrl ? "pointer" : "default" }}
    >
      <div className="hdc-dataset-content">
        <div className="hdc-type-indicator">
          <span
            className="hdc-type-dot"
            style={{ backgroundColor: color }}
          ></span>
          <span className="hdc-type-label">{type}</span>
        </div>
        <h3 className="hdc-dataset-title">{name}</h3>
        <div className="hdc-dataset-details">
          <p className="hdc-dataset-description">{getDatasetDescription()}</p>
          <p className="hdc-dataset-source">Source: {sourceAttribution}</p>
        </div>
      </div>
      <div className="hdc-dataset-actions">
        <button
          className="hdc-view-button"
          title="View Dataset"
          onClick={(e) => {
            e.stopPropagation();
            if (pageUrl) {
              window.open(pageUrl, "_self");
            }
          }}
        >
          View Details
        </button>
        {downloadUrl && (
          <button
            className="hdc-download-button"
            title="Download Dataset Summary"
            onClick={(e) => {
              e.stopPropagation();
              if (downloadUrl) {
                // Force browser to prompt download
                const link = document.createElement("a");
                link.href = downloadUrl;
                link.download =
                  downloadUrl.split("/").pop() || "dataset-summary.pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }
            }}
          >
            Download Summary
          </button>
        )}
      </div>
    </div>
  );
};

export default DatasetCard;
