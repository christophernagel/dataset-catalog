import React from "react";

// Color coding for Community Action Areas
const communityActionAreaColors = {
  "Promoting Healthy Child Development": "#FF6B6B", // Red
  "Youth Development and Civic Engagement": "#4ECDC4", // Teal
  "Creating Protective Environments": "#45B7D1", // Blue
  "Strengthening Economic Supports for Children and Families": "#98D85B", // Green
  "Access to Safe and Stable Housing": "#FFD166", // Yellow
  "Demographic Data": "#6A0572", // Purple
};

const DatasetCard = ({
  name,
  description,
  type,
  communityActionArea,
  dataTopic,
  dataFormat,
  source,
  dateUpdated,
  dateCreated,
  pageUrl,
}) => {
  // Get the color for community action area if available
  const areaColor = communityActionAreaColors[communityActionArea] || "#808080";

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
        {/* Community Action Area indicator */}
        <div className="hdc-community-action-area">
          <span
            className="hdc-area-dot"
            style={{ backgroundColor: areaColor }}
            aria-hidden="true"
          ></span>
          <span className="hdc-area-label">{communityActionArea}</span>
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
          {dataTopic && (
            <div className="hdc-attribute">
              <span className="hdc-attribute-label">Topic:</span>
              <span className="hdc-attribute-value">{dataTopic}</span>
            </div>
          )}

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
