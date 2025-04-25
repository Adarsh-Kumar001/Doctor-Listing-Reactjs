import React from 'react';
import { specialtiesList } from '../utils/helper';

const Filters = ({ filters, setFilters }) => {
  const toggleSpecialty = (specialty) => {
    const updated = filters.specialties.includes(specialty)
      ? filters.specialties.filter(s => s !== specialty)
      : [...filters.specialties, specialty];
    setFilters(prev => ({ ...prev, specialties: updated }));
  };

  return (
    <div className="w-full lg:w-1/3 p-4 bg-white shadow rounded">
      <h3 className="font-semibold mb-2" data-testid="filter-header-moc">Consultation Mode</h3>
      <div className="space-y-2 mb-4">
        <label className="block">
          <input
            type="radio"
            name="moc"
            data-testid="filter-video-consult"
            checked={filters.moc === 'Video Consult'}
            onChange={() => setFilters(prev => ({ ...prev, moc: 'Video Consult' }))}
          /> Video Consult
        </label>
        <label className="block">
          <input
            type="radio"
            name="moc"
            data-testid="filter-in-clinic"
            checked={filters.moc === 'In Clinic'}
            onChange={() => setFilters(prev => ({ ...prev, moc: 'In Clinic' }))}
          /> In Clinic
        </label>
      </div>

      <h3 className="font-semibold mb-2" data-testid="filter-header-speciality">Speciality</h3>
      <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-scroll">
        {specialtiesList.map(s => (
          <label key={s}>
            <input
              type="checkbox"
              data-testid={`filter-specialty-${s.replace(/\s|\//g, '-')}`}
              checked={filters.specialties.includes(s)}
              onChange={() => toggleSpecialty(s)}
            /> {s}
          </label>
        ))}
      </div>

      <h3 className="font-semibold mt-4 mb-2" data-testid="filter-header-sort">Sort</h3>
      <label className="block">
        <input
          type="radio"
          name="sort"
          data-testid="sort-fees"
          checked={filters.sort === 'fees'}
          onChange={() => setFilters(prev => ({ ...prev, sort: 'fees' }))}
        /> Fees (Low to High)
      </label>
      <label className="block">
        <input
          type="radio"
          name="sort"
          data-testid="sort-experience"
          checked={filters.sort === 'experience'}
          onChange={() => setFilters(prev => ({ ...prev, sort: 'experience' }))}
        /> Experience (High to Low)
      </label>
    </div>
  );
};

export default Filters;
