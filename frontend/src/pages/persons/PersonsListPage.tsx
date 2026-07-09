import React from 'react';

const PersonsListPage: React.FC = () => {
  return (
    <div>
      <h1>Master Person Database - TODO</h1>
      <p>Features:</p>
      <ul>
        <li>Search persons by name, alias, DOB</li>
        <li>Create/update person profiles</li>
        <li>Merge duplicate records</li>
        <li>View related investigations</li>
        <li>Gang affiliations</li>
      </ul>
    </div>
  );
};

export default PersonsListPage;
