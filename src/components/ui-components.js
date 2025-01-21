import React from 'react';

export function Button({ children, ...props }) {
  return (
    <button className="ui-button" {...props}>
      {children}
    </button>
  );
}

export function Input({ ...props }) {
  return <input className="ui-input" {...props} />;
}

export function Tabs({ children, activeTab, onChange }) {
  return (
    <div className="ui-tabs">
      <div className="ui-tabs-list">
        {React.Children.map(children, (child) => (
          <button
            className={`ui-tab-button ${activeTab === child.props.label ? 'active' : ''}`}
            onClick={() => onChange(child.props.label)}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      <div className="ui-tab-content">
        {React.Children.toArray(children).find(child => child.props.label === activeTab)}
      </div>
    </div>
  );
}

export function Tab({ children }) {
  return <div className="ui-tab">{children}</div>;
}

