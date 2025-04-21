import React, { useState, useRef, useEffect, useCallback } from "react";

const ActiveFiltersBar = ({ filters, onRemoveFilter, onSearch }) => {
  const [showShadow, setShowShadow] = useState(false);
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

  if (activeFilters.length === 0) {
    return (
      <div className="hdc-active-filters-bar">
        <span className="hdc-active-filters-label">Active Filters:</span>
        <span className="hdc-no-filters">None</span>
        <div className="hdc-search-container">
          <input
            type="text"
            className="hdc-search-input"
            placeholder="Search datasets..."
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="hdc-active-filters-bar">
      <span className="hdc-active-filters-label">Active Filters:</span>
      <div
        className={`hdc-active-filters-scroll-container ${
          showShadow ? "show-shadow" : ""
        }`}
      >
        <div
          className="hdc-active-filters-list"
          ref={scrollContainerRef}
          onScroll={handleScroll}
        >
          {activeFilters.map(({ category, value }) => (
            <button
              key={`${category}-${value}`}
              className="hdc-active-filter-tag"
              onClick={() => onRemoveFilter(category, value)}
            >
              <span className="hdc-filter-tag-text">
                {category}: {value}
              </span>
              <span className="hdc-filter-tag-remove">×</span>
            </button>
          ))}
        </div>
      </div>
      <div className="hdc-search-container">
        <input
          type="text"
          className="hdc-search-input"
          placeholder="Search datasets..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ActiveFiltersBar;
