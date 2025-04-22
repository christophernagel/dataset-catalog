import React from "react";

/**
 * ViewControls component for changing dataset display mode and sort order
 */
const ViewControls = ({ viewMode, onViewChange, sortBy, onSortChange }) => {
  return (
    <div className="hdc-view-controls" role="region" aria-label="View controls">
      <div className="hdc-sort-controls">
        <label htmlFor="sort-select" className="hdc-sort-label">
          Sort by:
        </label>
        <select
          id="sort-select"
          className="hdc-sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          aria-label="Sort datasets by"
        >
          <option value="relevance">Relevance</option>
          <option value="date">Date updated</option>
          <option value="name">Name</option>
        </select>
      </div>

      <div className="hdc-display-controls">
        <button
          className={`hdc-view-button ${viewMode === "grid" ? "active" : ""}`}
          onClick={() => onViewChange("grid")}
          aria-label="Grid view"
          aria-pressed={viewMode === "grid"}
          title="Grid view"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
        </button>
        <button
          className={`hdc-view-button ${viewMode === "detail" ? "active" : ""}`}
          onClick={() => onViewChange("detail")}
          aria-label="Detailed view"
          aria-pressed={viewMode === "detail"}
          title="Detailed view"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ViewControls;
