import React, { useState, useEffect } from "react";
import DatasetGrid from "./DatasetGrid";
import DatasetFilters, { matchesFilter } from "./DatasetFilters";
import FilterDrawer from "./FilterDrawer";
import ActiveFiltersBar from "./ActiveFiltersBar";
import ViewControls from "./ViewControls";

// Updated sample datasets based on the example
// Updated sample datasets with dataTopic field
const sampleDatasets = [
  {
    id: "DS001",
    name: "CalFresh Enrollment Data",
    source: "California Department of Social Services",
    description:
      "Data on households that submitted applications for CalFresh and number of households participating in food stamp program.",
    type: "Public Health",
    communityActionArea: "Promoting Healthy Child Development",
    dataTopic: "Benefit program enrollment",
    dataFormat: "CSV Collection",
    dateUpdated: "3/15/2023",
    dateCreated: "1/10/2023",
    pageUrl: "/datasets/calfresh-enrollment",
  },
  {
    id: "DS002",
    name: "National Walkability Index",
    source: "PolicyMap",
    description:
      "Community walkability index data measuring how walkable neighborhoods are based on proximity to amenities and street connectivity.",
    type: "Community",
    communityActionArea: "Promoting Healthy Child Development",
    dataTopic: "Community walkability",
    dataFormat: "CSV Collection",
    dateUpdated: "11/20/2022",
    dateCreated: "6/15/2020",
    pageUrl: "/datasets/walkability-index",
  },
  {
    id: "DS003",
    name: "Library Locations",
    source: "PolicyMap",
    description:
      "Geospatial data of library locations throughout the region to identify community resources.",
    type: "Educational Records",
    communityActionArea: "Youth Development and Civic Engagement",
    dataTopic: "Libraries",
    dataFormat: "KML Collection",
    dateUpdated: "5/10/2023",
    dateCreated: "5/10/2023",
    pageUrl: "/datasets/library-locations",
  },
  {
    id: "DS004",
    name: "Disconnected Youth Statistics",
    source: "ACS and Census Data",
    description:
      "Data on disconnected youth (ages 16-24) who are neither working nor in school, by geographic region.",
    type: "Educational Records",
    communityActionArea: "Youth Development and Civic Engagement",
    dataTopic: "Disconnected Youth",
    dataFormat: "CSV Collection",
    dateUpdated: "9/30/2022",
    dateCreated: "9/30/2022",
    pageUrl: "/datasets/disconnected-youth",
  },
  {
    id: "DS005",
    name: "School District Educational Achievement",
    source: "CAASPP Research Files",
    description:
      "English language arts (ELA) and mathematics performance by school district.",
    type: "Educational Records",
    communityActionArea: "Creating Protective Environments",
    dataTopic: "Educational Achievement",
    dataFormat: "CSV Collection",
    dateUpdated: "8/12/2023",
    dateCreated: "8/12/2022",
    pageUrl: "/datasets/educational-achievement",
  },
  {
    id: "DS006",
    name: "Violent Crime Statistics",
    source: "CA Open Data",
    description:
      "Violent crimes per 1000 residents by county over a 5-year period.",
    type: "Public Health",
    communityActionArea: "Creating Protective Environments",
    dataTopic: "Crime",
    dataFormat: "CSV Collection",
    dateUpdated: "4/22/2023",
    dateCreated: "4/22/2020",
    pageUrl: "/datasets/violent-crime-statistics",
  },
  {
    id: "DS007",
    name: "Air Quality Indicators",
    source: "CalEnviroScreen 2.0",
    description:
      "Annual mean Particulate Matter 2.5 concentrations and percentiles across regions.",
    type: "Public Health",
    communityActionArea: "Creating Protective Environments",
    dataTopic: "Pollution Burden",
    dataFormat: "CSV Collection",
    dateUpdated: "2/28/2023",
    dateCreated: "2/28/2023",
    pageUrl: "/datasets/air-quality-indicators",
  },
  {
    id: "DS008",
    name: "Preschool Enrollment Data",
    source: "2023 Kids Count Data Book",
    description:
      "Percentage of 3-to-4-year-olds enrolled in preschool by geographic region.",
    type: "Educational Records",
    communityActionArea:
      "Strengthening Economic Supports for Children and Families",
    dataTopic: "Preschool enrollment",
    dataFormat: "CSV Collection",
    dateUpdated: "7/15/2023",
    dateCreated: "7/15/2023",
    pageUrl: "/datasets/preschool-enrollment",
  },
  {
    id: "DS009",
    name: "Employment Statistics",
    source: "California Current Employment Statistics",
    description:
      "Number of employment in each California county, reported monthly by industry type.",
    type: "Community",
    communityActionArea:
      "Strengthening Economic Supports for Children and Families",
    dataTopic: "Employment",
    dataFormat: "CSV Collection",
    dateUpdated: "1/15/2024",
    dateCreated: "1/15/2020",
    pageUrl: "/datasets/employment-statistics",
  },
  {
    id: "DS010",
    name: "Income Inequality Data",
    source: "PolicyMap",
    description:
      "Gini Index measurements showing income inequality across different regions.",
    type: "Community",
    communityActionArea:
      "Strengthening Economic Supports for Children and Families",
    dataTopic: "Income inequality",
    dataFormat: "CSV Collection",
    dateUpdated: "11/10/2023",
    dateCreated: "11/10/2023",
    pageUrl: "/datasets/income-inequality",
  },
  {
    id: "DS011",
    name: "Housing Cost Burden",
    source: "PolicyMap",
    description:
      "Data on cost-burdened renters by age group and income level, plus median renter's cost burden as percentage of income.",
    type: "Community",
    communityActionArea: "Access to Safe and Stable Housing",
    dataTopic: "Housing costs",
    dataFormat: "CSV Collection",
    dateUpdated: "10/5/2023",
    dateCreated: "10/5/2023",
    pageUrl: "/datasets/housing-cost-burden",
  },
  {
    id: "DS012",
    name: "Housing Characteristics",
    source: "ACS and Census Data",
    description:
      "Detailed housing data including year built, number of bedrooms, overcrowding, and housing density across regions.",
    type: "Community",
    communityActionArea: "Access to Safe and Stable Housing",
    dataTopic: "Housing characteristics",
    dataFormat: "CSV Collection",
    dateUpdated: "12/1/2023",
    dateCreated: "12/1/2023",
    pageUrl: "/datasets/housing-characteristics",
  },
  {
    id: "DS013",
    name: "Census Demographics",
    source: "ACS and Census Data",
    description:
      "Population data including age, race, ethnicity, education, and poverty status.",
    type: "Community",
    communityActionArea: "Demographic Data",
    dataTopic: "Demographics",
    dataFormat: "CSV Collection",
    dateUpdated: "9/15/2023",
    dateCreated: "9/15/2023",
    pageUrl: "/datasets/census-demographics",
  },
];

// Mappings for categories
const categoryMap = {
  "Community Action Areas": "communityActionArea",
  Categories: "type",
  "Data Type": "dataFormat",
  Source: "source",
  "Data Topic": "dataTopic",
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
