import React from 'react';
import './EmptyState.css';

interface EmptyStateProps {
  icon?: string;
  title?: string;
  message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = '📊',
  title = 'No data available',
  message = 'There is no data to display for the selected filters. Try adjusting your filter criteria or clearing filters to see all data.'
}) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-message">{message}</p>
    </div>
  );
};

export default EmptyState;
