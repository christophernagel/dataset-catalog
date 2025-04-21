import React, { useState, useRef, useEffect, useCallback } from "react";

const ActiveFiltersBar = ({ filters, onRemoveFilter, onSearch }) => {
  const [showShadow, setShowShadow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const scrollContainerRef = useRef(null);

  const checkForOverflow = useCallback(() => {
    const element = scrollContainerRef.current;
    if (element) {
      const hasOverflow = element.scrollWidth > element.clientWidth;
      const hasScroll =
        element.scrollLeft > 0 ||
        element.scrollLeft < element.scrollWidth - element.clientWidth;
      setShowShadow(hasOverflow && hasScroll);
    }
  }, []);

  useEffect(() => {
    checkForOverflow();

    const observer = new ResizeObserver(() => {
      requestAnimationFrame(checkForOverflow);
    });

    if (scrollContainerRef.current) {
      observer.observe(scrollContainerRef.current);
    }

    return () => observer.disconnect();
  }, [filters, checkForOverflow]);

  const handleScroll = useCallback(
    (e) => {
      requestAnimationFrame(checkForOverflow);
    },
    [checkForOverflow]
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const getActiveFilters = () => {
    const active = [];
    Object.entries(filters).forEach(([category, values]) => {
      Object.entries(values).forEach(([value, isActive]) => {
        if (isActive) {
          active.push({ category, value });
        }
      });
    });
    return active;
  };

  const activeFilters = getActiveFilters();

  // Handle tab/arrow key navigation in filter tags
  const handleFilterKeyDown = (e, index, category, value) => {
    const filterTags = document.querySelectorAll(".hdc-active-filter-tag");
    const lastIndex = filterTags.length - 1;

    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        onRemoveFilter(category, value);
        break;
      case "ArrowRight":
        e.preventDefault();
        if (index < lastIndex) {
          filterTags[index + 1].focus();
        }
        break;
      case "ArrowLeft":
        e.preventDefault();
        if (index > 0) {
          filterTags[index - 1].focus();
        }
        break;
      default:
        break;
    }
  };

  if (activeFilters.length === 0) {
    return (
      <div
        className="hdc-active-filters-bar"
        role="region"
        aria-label="Search and active filters"
      >
        <span className="hdc-active-filters-label" id="active-filters-label">
          Active Filters:
        </span>
        <span className="hdc-no-filters" aria-live="polite">
          None
        </span>
        <div className="hdc-search-container">
          <input
            type="text"
            className="hdc-search-input"
            placeholder="Search datasets..."
            onChange={handleSearchChange}
            value={searchValue}
            aria-label="Search datasets"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="hdc-active-filters-bar"
      role="region"
      aria-label="Search and active filters"
    >
      <span className="hdc-active-filters-label" id="active-filters-label">
        Active Filters:
      </span>
      <div
        className={`hdc-active-filters-scroll-container ${
          showShadow ? "show-shadow" : ""
        }`}
        role="group"
        aria-labelledby="active-filters-label"
      >
        <div
          className="hdc-active-filters-list"
          ref={scrollContainerRef}
          onScroll={handleScroll}
        >
          {activeFilters.map(({ category, value }, index) => (
            <button
              key={`${category}-${value}`}
              className="hdc-active-filter-tag"
              onClick={() => onRemoveFilter(category, value)}
              onKeyDown={(e) => handleFilterKeyDown(e, index, category, value)}
              aria-label={`Remove filter ${category}: ${value}`}
              tabIndex="0"
            >
              <span className="hdc-filter-tag-text">
                {category}: {value}
              </span>
              <span className="hdc-filter-tag-remove" aria-hidden="true">
                ×
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="hdc-search-container">
        <input
          type="text"
          className="hdc-search-input"
          placeholder="Search datasets..."
          onChange={handleSearchChange}
          value={searchValue}
          aria-label="Search datasets"
        />
      </div>
    </div>
  );
};

export default ActiveFiltersBar;
