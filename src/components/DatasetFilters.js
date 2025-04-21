import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

// Filter Structure Configuration
const filterStructure = {
  "Filter Group 1": {
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    order: 1,
    tooltip: "Description of filter group 1 options",
  },
  "Filter Group 2": {
    options: ["Option 1", "Option 2", "Option 3"],
    order: 2,
    tooltip: "Description of filter group 2 options",
  },
  "Filter Group 3": {
    options: ["Option 1"],
    order: 3,
    tooltip: "Description of filter group 3 options",
  },
  "Filter Group 4": {
    options: ["Option 1", "Option 2"],
    order: 4,
    tooltip: "Description of filter group 4 options",
  },
  "Filter Group 5": {
    options: ["Option 1", "Option 2", "Option 3"],
    order: 5,
    tooltip: "Description of filter group 5 options",
  },
  "Filter Group 6": {
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    order: 6,
    tooltip: "Description of filter group 6 options",
  },
  "Filter Group 7": {
    options: ["Option 1", "Option 2", "Option 3"],
    order: 7,
    tooltip: "Description of filter group 7 options",
  },
  "Filter Group 8": {
    options: ["Option 1", "Option 2"],
    order: 8,
    tooltip: "Description of filter group 8 options",
  },
  "Filter Group 9": {
    options: ["Option 1", "Option 2"],
    order: 9,
    tooltip: "Description of filter group 9 options",
  },
  "Filter Group 10": {
    options: [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4",
      "Option 5",
      "Option 6",
      "Option 7",
    ],
    order: 10,
    tooltip: "Description of filter group 10 options",
  },
  "Filter Group 11": {
    options: [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4",
      "Option 5",
      "Option 6",
      "Option 7",
    ],
    order: 11,
    tooltip: "Description of filter group 11 options",
  },
};

// Helper function to match filters with dataset specifications
export const matchesFilter = (dataset, category, value) => {
  switch (category) {
    case "Filter Group 1":
      return dataset.specifications["Dataset Type"] === value;

    case "Filter Group 2":
      return dataset.specifications["Data Format"] === value;

    case "Filter Group 3":
      return dataset.specifications["Source Type"] === value;

    case "Filter Group 4":
      // Map UI values to spec values
      const sourceTypeMap = {
        "Option 1": "Hospital Network",
        "Option 2": "Government Agency",
      };
      return dataset.specifications["Source Type"] === sourceTypeMap[value];

    case "Filter Group 5":
      return dataset.specifications["Record Count"] === value;

    case "Filter Group 6":
      if (value === "Option 1") {
        return dataset.specifications["Dataset Size"][0] === "1.5GB";
      }
      if (value === "Option 2") {
        return dataset.specifications["Dataset Size"][0] === "500MB";
      }
      if (value === "Option 3") {
        return dataset.specifications["Dataset Size"][0] === "750MB";
      }
      if (value === "Option 4") {
        return dataset.specifications["Dataset Size"][0] === "300MB";
      }
      return false;

    case "Filter Group 7":
      if (value === "Option 1") {
        return dataset.specifications["Time Period"][0] === "2018-2020";
      }
      if (value === "Option 2") {
        return dataset.specifications["Time Period"][0] === "2019-2021";
      }
      if (value === "Option 3") {
        return dataset.specifications["Time Period"][0] === "2020-2022";
      }
      return false;

    case "Filter Group 8":
      // Check either Dataset Characteristics or Pattern
      if (value === "Option 1") {
        return dataset.specifications["Dataset Type"] === "Clinical";
      }
      if (value === "Option 2") {
        return dataset.specifications["Dataset Type"] === "Survey";
      }
      return false;

    case "Filter Group 9":
    case "Filter Group 10":
    case "Filter Group 11":
      return dataset.specifications["Certification"]?.includes(value);

    default:
      return false;
  }
};

// Tooltip Popup Component
const TooltipPopup = ({ content, title, onClose, position }) => {
  return ReactDOM.createPortal(
    <div className="tooltip-overlay" onClick={onClose}>
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
          <h3>{title}</h3>
          <button className="tooltip-close" onClick={onClose}>
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

  return (
    <div className="filter-section">
      <div
        className="filter-section-header"
        onClick={() => setIsExpanded(!isExpanded)}
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
          />
          <h3>{title}</h3>
        </div>
        {tooltip && (
          <button
            ref={tooltipButtonRef}
            className="filter-tooltip"
            onClick={handleTooltipClick}
            aria-label="Show more information"
          >
            ?
          </button>
        )}
      </div>
      <div className={`filter-section-content ${isExpanded ? "expanded" : ""}`}>
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
                />
                <label htmlFor={`${category}-${option}`}>{option}</label>
              </div>
            ))}
          </div>
        </FilterSection>
      ));
  };

  return (
    <div className="hdc-filters">
      <div className="filter-header">
        <div className="filter-count">
          <span>Filter By</span>
          <span
            className={`filter-badge ${
              activeFilterCount === 0 ? "filter-badge-hidden" : ""
            }`}
          >
            {activeFilterCount || ""}
          </span>
        </div>
        <button
          onClick={clearFilters}
          className={`clear-filters ${
            activeFilterCount === 0 ? "clear-filters-hidden" : ""
          }`}
        >
          Clear
        </button>
      </div>
      <div className="filter-sections">{renderFilters()}</div>
    </div>
  );
};

export default DatasetFilters;
