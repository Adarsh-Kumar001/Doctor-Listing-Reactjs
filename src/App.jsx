import React, { useEffect, useState } from 'react';
import Autocomplete from './components/Autocomplete';
import Filters from './components/Filters';
import DoctorList from './components/DoctorList';
import { useSearchParams } from 'react-router-dom';

const App = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [filters, setFilters] = useState({ name: '', moc: '', specialties: [], sort: '' });
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json')
      .then(res => res.json())
      .then(data => setDoctors(data));
  }, []);

  console.log(doctors)

  useEffect(() => {
    const name = searchParams.get('name') || '';
    const moc = searchParams.get('moc') || '';
    const specialties = searchParams.get('specialties') ? searchParams.get('specialties').split(',') : [];
    const sort = searchParams.get('sort') || '';
    setFilters({ name, moc, specialties, sort });
  }, [searchParams]);

  useEffect(() => {
    
    let temp = [...doctors];

    if (filters.name) {
      temp = temp.filter(doc => doc.name.toLowerCase().includes(filters.name.toLowerCase()));
    }

    // Filtering Mode of Consultation 
    if (filters.moc === 'In Clinic') {
      temp = temp.filter(doc => Boolean(doc.in_clinic)); 
    } else if (filters.moc === 'Video Consult') {
      temp = temp.filter(doc => Boolean(doc.video_consult));  
    }

    if (filters.specialties.length) {
      temp = temp.filter(doc =>
        Array.isArray(doc.specialities) &&
        filters.specialties.every(s => doc.specialities.some(spec => spec.name === s))
      );
    }


    if (filters.sort === 'fees') {
      temp.sort((a, b) => {
        const feeA = parseInt(a.fees.replace(/[^0-9]/g, ''), 10);
        const feeB = parseInt(b.fees.replace(/[^0-9]/g, ''), 10);
        return feeA - feeB;
      });
    } else if (filters.sort === 'experience') {
      temp.sort((a, b) => {
        const expA = parseInt(a.experience.replace(/\D/g, ''), 10);
        const expB = parseInt(b.experience.replace(/\D/g, ''), 10);
        return expB - expA;
      });
    }

    setFilteredDoctors(temp);

    const params = new URLSearchParams();
    if (filters.name) params.set('name', filters.name);
    if (filters.moc) params.set('moc', filters.moc);
    if (filters.specialties.length) params.set('specialties', filters.specialties.join(','));
    if (filters.sort) params.set('sort', filters.sort);
    setSearchParams(params);
  }, [filters, doctors]);

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <Autocomplete doctors={doctors} filters={filters} setFilters={setFilters} />
      <div className="flex flex-col lg:flex-row gap-4">
        <Filters filters={filters} setFilters={setFilters} />
        <DoctorList doctors={filteredDoctors} />
      </div>
    </div>
  );
};

export default App;
