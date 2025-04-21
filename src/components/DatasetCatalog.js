import React, { useState, useEffect } from "react";
import DatasetGrid from "./DatasetGrid";
import DatasetFilters, { matchesFilter } from "./DatasetFilters";
import FilterDrawer from "./FilterDrawer";
import ActiveFiltersBar from "./ActiveFiltersBar";
import sampleDatasets from "./sampleDatasets";

// Mappings for categories
const categoryMap = {
  "Filter Group 1": "fg1",
  "Filter Group 2": "fg2",
  "Filter Group 3": "fg3",
  "Filter Group 4": "fg4",
  "Filter Group 5": "fg5",
  "Filter Group 6": "fg6",
  "Filter Group 7": "fg7",
  "Filter Group 8": "fg8",
  "Filter Group 9": "fg9",
  "Filter Group 10": "fg10",
  "Filter Group 11": "fg11",
};

// Optional value mappings for further abbreviation
const valueMap = {
  "Option 1": "opt1",
  "Option 2": "opt2",
  "Option 3": "opt3",
  "Option 4": "opt4",
  "Option 5": "opt5",
  "Option 6": "opt6",
  "Option 7": "opt7",
};

// Reverse maps for decoding URL params back to full names
const categoryMapReverse = Object.fromEntries(
  Object.entries(categoryMap).map(([full, shorty]) => [shorty, full])
);

const valueMapReverse = Object.fromEntries(
  Object.entries(valueMap).map(([full, shorty]) => [shorty, full])
);

const encodeCategory = (category) => categoryMap[category] || category;
const decodeCategory = (short) => categoryMapReverse[short] || short;

const encodeValue = (value) => valueMap[value] || value;
const decodeValue = (short) => valueMapReverse[short] || short;

const DatasetCatalog = () => {
  // Initialize filters from URL (with decoding)
  const initializeFiltersFromURL = () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const filterParams = {};

      params.forEach((v, c) => {
        const fullCategory = decodeCategory(c);
        const fullValue = decodeValue(v);
        filterParams[fullCategory] = {
          ...(filterParams[fullCategory] || {}),
          [fullValue]: true,
        };
      });

      return filterParams;
    } catch (error) {
      console.warn("Error parsing URL parameters:", error);
      return {};
    }
  };

  const [activeFilters, setActiveFilters] = useState(
    initializeFiltersFromURL()
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Update URL when filters change, now encoding values
  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(activeFilters).forEach(([category, values]) => {
      const catKey = encodeCategory(category);
      Object.entries(values).forEach(([value, isActive]) => {
        if (isActive) {
          const valKey = encodeValue(value);
          params.append(catKey, valKey);
        }
      });
    });

    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}${
        params.toString() ? "?" + params.toString() : ""
      }`
    );
  }, [activeFilters]);

  const handleFilterChange = (newFilters) => {
    setActiveFilters(newFilters);
  };

  const handleRemoveFilter = (category, value) => {
    const newFilters = { ...activeFilters };
    if (newFilters[category]) {
      delete newFilters[category][value];
      if (Object.keys(newFilters[category]).length === 0) {
        delete newFilters[category];
      }
    }
    setActiveFilters(newFilters);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filterDatasets = () => {
    let filtered = [...sampleDatasets];

    // Apply search filter if query exists
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((dataset) => {
        const nameMatch = dataset.name.toLowerCase().includes(query);
        const categoryMatch = dataset.category
          ? dataset.category.toLowerCase().includes(query)
          : false;
        const descriptionMatch = dataset.description
          ? dataset.description.toLowerCase().includes(query)
          : false;
        const sourceMatch = dataset.sourceAttribution
          ? dataset.sourceAttribution.toLowerCase().includes(query)
          : false;

        return nameMatch || categoryMatch || descriptionMatch || sourceMatch;
      });
    }

    // Apply category filters using OR logic
    const hasActiveFilters = Object.values(activeFilters).some((category) =>
      Object.values(category).some(Boolean)
    );

    if (hasActiveFilters) {
      filtered = filtered.filter((dataset) =>
        Object.entries(activeFilters).some(([category, values]) => {
          const activeValues = Object.entries(values)
            .filter(([_, isActive]) => isActive)
            .map(([value]) => value);

          // Instead of automatically returning true on empty,
          // we only include if the dataset matches at least one activeValue:
          return (
            activeValues.length > 0 &&
            activeValues.some((value) =>
              matchesFilter(dataset, category, value)
            )
          );
        })
      );
    }

    return filtered;
  };

  return (
    <div className="hdc-dataset-catalog">
      <div className="hdc-catalog-layout">
        {/* Mobile Filters */}
        <div className="mobile-filters">
          <FilterDrawer>
            <DatasetFilters
              onFilterChange={handleFilterChange}
              activeFilters={activeFilters}
            />
          </FilterDrawer>
        </div>

        {/* Desktop Filters */}
        <div className="desktop-filters">
          <DatasetFilters
            onFilterChange={handleFilterChange}
            activeFilters={activeFilters}
          />
        </div>

        <div className="hdc-catalog-content">
          <ActiveFiltersBar
            filters={activeFilters}
            onRemoveFilter={handleRemoveFilter}
            onSearch={handleSearch}
            searchQuery={searchQuery}
          />
          <DatasetGrid datasets={filterDatasets()} filters={activeFilters} />
        </div>
      </div>
    </div>
  );
};

export default DatasetCatalog;
