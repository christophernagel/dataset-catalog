import React, { useState, useEffect } from "react";

const FilterDrawer = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle the drawer state
  const toggleDrawer = (e) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  // Close drawer when clicking overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    // Prevent body scroll when drawer is open
    if (isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isExpanded]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`filter-drawer-overlay ${isExpanded ? "visible" : ""}`}
        onClick={handleOverlayClick}
      />

      {/* Drawer */}
      <div className={`filter-drawer ${isExpanded ? "expanded" : ""}`}>
        {/* Handle for toggling */}
        <div className="filter-drawer-handle" onClick={toggleDrawer}>
          <div className="handle-icon">{isExpanded ? "▼" : "▲"}</div>
        </div>

        {/* Content (scrollable) */}
        <div className="filter-drawer-content">{children}</div>
      </div>
    </>
  );
};

export default FilterDrawer;
