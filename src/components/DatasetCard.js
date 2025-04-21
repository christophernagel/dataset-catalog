import React from "react";

// Color coding for Community Action Areas
const areaColors = {
  "Medical Records": "#4682B4", // Steel Blue
  Community: "#228B22", // Forest Green
  "Educational Records": "#9370DB", // Medium Purple
  "Clinical Trials": "#A52A2A", // Brown
  "Public Health": "#FF8C00", // Dark Orange
};

const DatasetCard = ({
  name,
  description,
  type,
  dataFormat,
  source,
  dateUpdated,
  dateCreated,
  pageUrl,
}) => {
  // Determine the appropriate color for the type
  const color = areaColors[type] || "#808080";

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (pageUrl) {
        window.open(pageUrl, "_self");
      }
    }
  };

  return (
    <div
      className="hdc-dataset-card"
      tabIndex={pageUrl ? "0" : "-1"}
      role={pageUrl ? "button" : "article"}
      aria-label={pageUrl ? `View details for ${name}` : undefined}
      onKeyDown={handleKeyDown}
    >
      <div className="hdc-dataset-content">
        {/* Type indicator with color coding */}
        <div className="hdc-type-indicator">
          <span
            className="hdc-type-dot"
            style={{ backgroundColor: color }}
            aria-hidden="true"
          ></span>
          <span className="hdc-type-label">{type}</span>
        </div>

        {/* Title as a hyperlink */}
        <h3 className="hdc-dataset-title">
          <a
            href={pageUrl || "#"}
            className="hdc-dataset-title-link"
            onClick={(e) => {
              if (!pageUrl) e.preventDefault();
            }}
          >
            {name}
          </a>
        </h3>

        {/* Description */}
        <p className="hdc-dataset-description">{description}</p>

        {/* Dataset attributes */}
        <div className="hdc-dataset-attributes">
          {source && (
            <div className="hdc-attribute">
              <span className="hdc-attribute-label">Source:</span>
              <span className="hdc-attribute-value">{source}</span>
            </div>
          )}

          {dataFormat && (
            <div className="hdc-attribute">
              <span className="hdc-attribute-label">Data Format:</span>
              <span className="hdc-attribute-value">{dataFormat}</span>
            </div>
          )}

          {dateUpdated && (
            <div className="hdc-attribute">
              <span className="hdc-attribute-label">Date Updated:</span>
              <span className="hdc-attribute-value">{dateUpdated}</span>
            </div>
          )}

          {dateCreated && (
            <div className="hdc-attribute">
              <span className="hdc-attribute-label">Date Created:</span>
              <span className="hdc-attribute-value">{dateCreated}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatasetCard;
