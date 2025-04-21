import React, { useState, useEffect, useRef } from "react";

const FilterDrawer = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const drawerRef = useRef(null);
  const previousFocusRef = useRef(null);

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

  const handleKeyDown = (e) => {
    // Close on escape key
    if (e.key === "Escape") {
      setIsExpanded(false);
    }
  };

  // Handle focus trapping in the drawer
  const handleFocusTrap = () => {
    if (!isExpanded || !drawerRef.current) return;

    // Get all focusable elements
    const focusableElements = drawerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Set focus on first element when drawer opens
    if (
      !document.activeElement ||
      !drawerRef.current.contains(document.activeElement)
    ) {
      firstElement.focus();
    }

    // Add event listener for tab key to trap focus
    const handleTabKey = (e) => {
      if (e.key !== "Tab") return;

      // If shift+tab on first element, go to last element
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
      // If tab on last element, go to first element
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleTabKey);
    return () => document.removeEventListener("keydown", handleTabKey);
  };

  useEffect(() => {
    // Store the element that had focus before opening drawer
    if (isExpanded) {
      previousFocusRef.current = document.activeElement;

      // Set up focus trapping
      const cleanup = handleFocusTrap();

      // Prevent body scroll when drawer is open
      document.body.style.overflow = "hidden";

      return () => {
        if (cleanup) cleanup();
      };
    } else {
      document.body.style.overflow = "";

      // When drawer closes, restore focus to previous element
      if (previousFocusRef.current) {
        setTimeout(() => {
          previousFocusRef.current.focus();
        }, 0);
      }
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
        aria-hidden="true"
        tabIndex="-1"
      />

      {/* Drawer */}
      <div
        className={`filter-drawer ${isExpanded ? "expanded" : ""}`}
        ref={drawerRef}
        role="dialog"
        aria-modal={isExpanded ? "true" : "false"}
        aria-label="Filter options"
        aria-hidden={!isExpanded}
        onKeyDown={handleKeyDown}
      >
        {/* Handle for toggling */}
        <div
          className="filter-drawer-handle"
          onClick={toggleDrawer}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggleDrawer(e);
            }
          }}
          tabIndex="0"
          role="button"
          aria-expanded={isExpanded}
          aria-controls="filter-drawer-content"
          aria-label={isExpanded ? "Close filters" : "Open filters"}
        >
          <div className="handle-icon" aria-hidden="true">
            {isExpanded ? "▼" : "▲"}
          </div>
        </div>

        {/* Content (scrollable) */}
        <div className="filter-drawer-content" id="filter-drawer-content">
          {children}
        </div>
      </div>
    </>
  );
};

export default FilterDrawer;
