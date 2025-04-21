import React, { useState, useEffect } from "react";
import DatasetGrid from "./DatasetGrid";
import DatasetFilters, { matchesFilter } from "./DatasetFilters";
import FilterDrawer from "./FilterDrawer";
import ActiveFiltersBar from "./ActiveFiltersBar";
import ViewControls from "./ViewControls";

// Updated sample datasets based on the example
const sampleDatasets = [
  {
    id: "DS001",
    name: "LakeTahoeBasinDigitizedTreeMortality",
    source: "tomdilts",
    description:
      "Locations of all trees that died between 2011 and 2016 in select area of the Lake Tahoe Basin.",
    type: "Medical Records",
    dataFormat: "KML Collection",
    tags: ["forest mortality", "tree mortality", "forest", "Lake Tahoe"],
    dateUpdated: "9/1/2017",
    dateCreated: "9/1/2017",
    pageUrl: "/datasets/lake-tahoe-tree-mortality",
  },
  {
    id: "DS002",
    name: "PopCenterCounty_US_CSV",
    source: "University of Tennessee",
    description:
      "The mean center of population for each county in the United States in 2000, 2010 and 2020 is included in this layer.",
    type: "Community",
    dataFormat: "CSV Collection",
    tags: ["center", "population", "counties", "2020", "2010"],
    dateUpdated: "1/24/2022",
    pageUrl: "/datasets/pop-center-county",
  },
  {
    id: "DS003",
    name: "US Census County Demographics",
    source: "US Census Bureau",
    description:
      "Demographic data for all US counties including population, age distribution, income, and education levels.",
    type: "Public Health",
    dataFormat: "CSV Collection",
    tags: ["census", "demographics", "counties", "population"],
    dateUpdated: "3/15/2023",
    dateCreated: "1/10/2023",
    pageUrl: "/datasets/us-census-county-demographics",
  },
  {
    id: "DS004",
    name: "California Wildfire Boundaries",
    source: "California Department of Forestry and Fire Protection",
    description:
      "Boundaries and information for significant wildfires in California from 2010 to 2022.",
    type: "Public Health",
    dataFormat: "KML Collection",
    tags: ["wildfire", "forest", "boundaries", "California"],
    dateUpdated: "11/5/2022",
    dateCreated: "2/28/2020",
    pageUrl: "/datasets/california-wildfire-boundaries",
  },
  {
    id: "DS005",
    name: "Global Precipitation Measurements",
    source: "NOAA",
    description:
      "Monthly precipitation measurements collected from weather stations worldwide from 2015-2023.",
    type: "Public Health",
    dataFormat: "CSV Collection",
    tags: ["precipitation", "climate", "weather", "global"],
    dateUpdated: "2/12/2023",
    dateCreated: "6/30/2015",
    pageUrl: "/datasets/global-precipitation-measurements",
  },
  {
    id: "DS006",
    name: "World Heritage Sites",
    source: "UNESCO",
    description:
      "Location and metadata for all UNESCO World Heritage Sites including cultural, natural, and mixed sites.",
    type: "Educational Records",
    dataFormat: "KML Collection",
    tags: ["heritage", "cultural", "landmarks", "historical"],
    dateUpdated: "7/19/2022",
    dateCreated: "3/4/2018",
    pageUrl: "/datasets/world-heritage-sites",
  },
];

// Mappings for categories
const categoryMap = {
  "Community Action Areas": "type",
  "Data Type": "dataFormat",
  Source: "source",
  Tags: "tags",
};

// Reverse maps for decoding URL params back to full names
const categoryMapReverse = Object.fromEntries(
  Object.entries(categoryMap).map(([full, shorty]) => [shorty, full])
);

const DatasetCatalog = () => {
  // Initialize filters from URL
  const initializeFiltersFromURL = () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const filterParams = {};

      params.forEach((v, c) => {
        const fullCategory = categoryMapReverse[c] || c;
        filterParams[fullCategory] = {
          ...(filterParams[fullCategory] || {}),
          [v]: true,
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
  const [viewMode, setViewMode] = useState("grid"); // grid, list, etc.
  const [sortBy, setSortBy] = useState("relevance"); // relevance, date, etc.

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(activeFilters).forEach(([category, values]) => {
      const catKey = categoryMap[category] || category.toLowerCase();
      Object.entries(values).forEach(([value, isActive]) => {
        if (isActive) {
          params.append(catKey, value);
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

  const handleViewChange = (mode) => {
    setViewMode(mode);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
  };

  const filterDatasets = () => {
    let filtered = [...sampleDatasets];

    // Apply search filter if query exists
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((dataset) => {
        const nameMatch = dataset.name.toLowerCase().includes(query);
        const typeMatch = dataset.type
          ? dataset.type.toLowerCase().includes(query)
          : false;
        const descriptionMatch = dataset.description
          ? dataset.description.toLowerCase().includes(query)
          : false;
        const sourceMatch = dataset.source
          ? dataset.source.toLowerCase().includes(query)
          : false;
        const tagsMatch = dataset.tags
          ? dataset.tags.some((tag) => tag.toLowerCase().includes(query))
          : false;

        return (
          nameMatch || typeMatch || descriptionMatch || sourceMatch || tagsMatch
        );
      });
    }

    // Apply category filters
    const hasActiveFilters = Object.values(activeFilters).some((category) =>
      Object.values(category).some(Boolean)
    );

    if (hasActiveFilters) {
      filtered = filtered.filter((dataset) =>
        Object.entries(activeFilters).every(([category, values]) => {
          const activeValues = Object.entries(values)
            .filter(([_, isActive]) => isActive)
            .map(([value]) => value);

          // Skip if no active values for this category
          if (activeValues.length === 0) return true;

          // If at least one value matches, include the dataset (OR logic within categories)
          return activeValues.some((value) =>
            matchesFilter(dataset, category, value)
          );
        })
      );
    }

    // Apply sorting
    if (sortBy === "date") {
      filtered.sort((a, b) => {
        const dateA = a.dateUpdated ? new Date(a.dateUpdated) : new Date(0);
        const dateB = b.dateUpdated ? new Date(b.dateUpdated) : new Date(0);
        return dateB - dateA; // Most recent first
      });
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    // Default is relevance, no sorting needed

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
          <div className="hdc-catalog-header">
            <div className="hdc-results-info">
              {filterDatasets().length} of {sampleDatasets.length} datasets
            </div>

            <ViewControls
              viewMode={viewMode}
              onViewChange={handleViewChange}
              sortBy={sortBy}
              onSortChange={handleSortChange}
            />
          </div>

          <ActiveFiltersBar
            filters={activeFilters}
            onRemoveFilter={handleRemoveFilter}
            onSearch={handleSearch}
            searchQuery={searchQuery}
          />

          <DatasetGrid
            datasets={filterDatasets()}
            filters={activeFilters}
            viewMode={viewMode}
          />
        </div>
      </div>
    </div>
  );
};

export default DatasetCatalog;
