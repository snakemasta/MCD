import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <div>
      <h1>Detective Dashboard - TODO</h1>
      <p>Quick overview of:</p>
      <ul>
        <li>Assigned investigations</li>
        <li>Active investigations</li>
        <li>New evidence</li>
        <li>New BOLOs</li>
        <li>Warrants needing service</li>
        <li>Overdue tasks</li>
        <li>Recent intelligence</li>
        <li>Supervisor messages</li>
      </ul>
    </div>
  );
};

export default DashboardPage;
