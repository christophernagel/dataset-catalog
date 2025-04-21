import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

// Updated Filter Structure based on new requirements
const filterStructure = {
  "Community Action Areas": {
    options: [
      "Medical Records",
      "Community",
      "Educational Records",
      "Clinical Trials",
      "Public Health",
    ],
    order: 1,
    tooltip: "Filter by community action areas",
  },
  "Data Type": {
    options: ["KML Collection", "CSV Collection"],
    order: 2,
    tooltip: "Filter by data format type",
  },
  Source: {
    options: [
      "tomdilts",
      "University of Tennessee",
      "US Census Bureau",
      "California Department of Forestry and Fire Protection",
      "NOAA",
      "UNESCO",
    ],
    order: 3,
    tooltip: "Filter by the source or provider of the dataset",
  },
  Tags: {
    options: [
      "forest",
      "tree",
      "mortality",
      "Lake Tahoe",
      "center",
      "population",
      "counties",
      "demographics",
      "wildfire",
      "boundaries",
      "precipitation",
      "heritage",
      "landmarks",
    ],
    order: 4,
    tooltip: "Filter by specific tags or keywords",
  },
};

// Mapping configuration for filter categories to dataset properties
const filterMappings = {
  "Community Action Areas": {
    field: "type",
    // Direct comparison
  },
  "Data Type": {
    field: "dataFormat",
    // Direct comparison
  },
  Source: {
    field: "source",
    // Direct comparison
  },
  Tags: {
    field: "tags",
    isArray: true,
  },
};

// Simplified matchesFilter function
export const matchesFilter = (dataset, category, value) => {
  // Get the mapping config for this category
  const mappingConfig = filterMappings[category];
  if (!mappingConfig) return false;

  // Get the field to check in the dataset
  const { field, isArray } = mappingConfig;

  // Handle missing fields
  if (dataset[field] === undefined) {
    return false;
  }

  // Handle array fields (tags)
  if (isArray) {
    const fieldArray = Array.isArray(dataset[field])
      ? dataset[field]
      : [dataset[field]];
    return fieldArray.some((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
  }

  // Standard field comparison
  return dataset[field] === value;
};

// Tooltip Popup Component
const TooltipPopup = ({ content, title, onClose, position }) => {
  return ReactDOM.createPortal(
    <div
      className="tooltip-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`tooltip-title-${title.replace(/\s+/g, "-")}`}
    >
      <div
        className="tooltip-popup"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "fixed",
          top: position.top,
          right: position.right,
          width: "300px",
          minHeight: "100px",
        }}
      >
        <div className="tooltip-header">
          <h3 id={`tooltip-title-${title.replace(/\s+/g, "-")}`}>{title}</h3>
          <button
            className="tooltip-close"
            onClick={onClose}
            aria-label="Close tooltip"
          >
            ×
          </button>
        </div>
        <div className="tooltip-content">
          <p>{content}</p>
        </div>
      </div>
    </div>,
    document.body
  );
};

// Filter Section Component
const FilterSection = ({
  title,
  children,
  tooltip,
  onFilterChange,
  activeFilters,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const tooltipButtonRef = useRef(null);
  const sectionId = `section-content-${title.replace(/\s+/g, "")}`;

  const allSelected = React.useMemo(() => {
    if (!activeFilters?.[title]) return false;
    const options =
      React.Children.toArray(children).find(
        (child) =>
          child.type === "div" && child.props.className === "filter-group"
      )?.props.children || [];

    const optionValues = options.map(
      (option) => option.props.children[1].props.children
    );
    return (
      optionValues.length > 0 &&
      optionValues.every((value) => activeFilters[title][value])
    );
  }, [activeFilters, title, children]);

  const handleHeaderCheckboxChange = (e) => {
    e.stopPropagation();
    const isChecked = e.target.checked;

    const options =
      React.Children.toArray(children).find(
        (child) =>
          child.type === "div" && child.props.className === "filter-group"
      )?.props.children || [];

    const newFilters = { ...activeFilters };
    newFilters[title] = {};

    options.forEach((option) => {
      const value = option.props.children[1].props.children;
      newFilters[title][value] = isChecked;
    });

    onFilterChange(newFilters);
  };

  const handleTooltipClick = (e) => {
    e.stopPropagation();
    if (tooltipButtonRef.current) {
      const buttonRect = tooltipButtonRef.current.getBoundingClientRect();
      setTooltipPosition({
        top: buttonRect.top - 9,
        right: window.innerWidth - buttonRect.right - 10,
      });
      setShowTooltip(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className="filter-section">
      <div
        className="filter-section-header"
        onClick={() => setIsExpanded(!isExpanded)}
        onKeyDown={handleKeyDown}
        tabIndex="0"
        role="button"
        aria-expanded={isExpanded}
        aria-controls={sectionId}
      >
        <div className="filter-section-title">
          <span className={`expand-icon ${isExpanded ? "expanded" : ""}`}>
            ▼
          </span>
          <input
            type="checkbox"
            checked={allSelected}
            onChange={handleHeaderCheckboxChange}
            onClick={(e) => e.stopPropagation()}
            aria-label={`Select all ${title} options`}
          />
          <h3>{title}</h3>
        </div>
        {tooltip && (
          <button
            ref={tooltipButtonRef}
            className="filter-tooltip"
            onClick={handleTooltipClick}
            aria-label={`Show more information about ${title}`}
          >
            ?
          </button>
        )}
      </div>
      <div
        className={`filter-section-content ${isExpanded ? "expanded" : ""}`}
        id={sectionId}
        aria-hidden={!isExpanded}
      >
        {children}
      </div>
      {showTooltip && tooltip && (
        <TooltipPopup
          content={tooltip}
          title={title}
          onClose={() => setShowTooltip(false)}
          position={tooltipPosition}
        />
      )}
    </div>
  );
};

// Main DatasetFilters Component
const DatasetFilters = ({ onFilterChange, activeFilters }) => {
  const [activeFilterCount, setActiveFilterCount] = useState(0);

  useEffect(() => {
    updateFilterCount();
  }, [activeFilters]);

  const updateFilterCount = () => {
    const count = Object.values(activeFilters || {}).reduce(
      (acc, group) => acc + Object.values(group).filter(Boolean).length,
      0
    );
    setActiveFilterCount(count);
  };

  const handleFilterChange = (category, value) => {
    const currentFilters = { ...activeFilters };
    currentFilters[category] = {
      ...currentFilters[category],
      [value]: !currentFilters[category]?.[value],
    };
    onFilterChange(currentFilters);
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  const renderFilters = () => {
    return Object.entries(filterStructure)
      .sort(([_, a], [__, b]) => a.order - b.order)
      .map(([category, config]) => (
        <FilterSection
          key={category}
          title={category}
          tooltip={config.tooltip}
          onFilterChange={onFilterChange}
          activeFilters={activeFilters}
        >
          <div className="filter-group">
            {config.options.map((option) => (
              <div key={option} className="filter-option">
                <input
                  type="checkbox"
                  id={`${category}-${option}`}
                  checked={activeFilters?.[category]?.[option] || false}
                  onChange={() => handleFilterChange(category, option)}
                  aria-label={`${category}: ${option}`}
                />
                <label htmlFor={`${category}-${option}`}>{option}</label>
              </div>
            ))}
          </div>
        </FilterSection>
      ));
  };

  return (
    <div className="hdc-filters" role="region" aria-label="Dataset filters">
      <div className="filter-header">
        <div className="filter-count">
          <span>Filter By</span>
          <span
            className={`filter-badge ${
              activeFilterCount === 0 ? "filter-badge-hidden" : ""
            }`}
            aria-live="polite"
            aria-atomic="true"
          >
            {activeFilterCount || ""}
          </span>
        </div>
        <button
          onClick={clearFilters}
          className={`clear-filters ${
            activeFilterCount === 0 ? "clear-filters-hidden" : ""
          }`}
          aria-label="Clear all filters"
          tabIndex={activeFilterCount === 0 ? "-1" : "0"}
        >
          Clear
        </button>
      </div>
      <div className="filter-sections">{renderFilters()}</div>
    </div>
  );
};

export default DatasetFilters;
