import React from 'react';
import DoctorCard from './DoctorCard';

const DoctorList = ({ doctors }) => (
  <div className="w-full lg:w-2/3 flex flex-wrap space-y-4 gap-2">
    {doctors.map((doc, index) => (
      <DoctorCard key={index} doctor={doc} />
    ))}
  </div>
);

export default DoctorList;
