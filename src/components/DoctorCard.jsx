const DoctorCard = ({ doctor }) => {

    const specialties = doctor.specialities?.map(spec => spec.name).join(", ") || "NA";
  
    return (
      <div className="border rounded-lg p-4 bg-white shadow-lg w-[25rem]">
        <img src={doctor.photo || 'default-image-url'} alt={doctor.name} className="w-full h-48 object-cover rounded-lg"/>
        <h2 className="text-xl font-semibold mt-4">{doctor.name}</h2>
        <p className="text-gray-500">{doctor.experience}</p>
        <p className="mt-2">Specialties: {specialties}</p>
        <p className="mt-2">Fees: {doctor.fees}</p>
        <div className="flex mt-2 gap-2">
        <p>Consultation Mode: {doctor.in_clinic ? "In Clinic" : ""}</p> <p>{doctor.video_consult?"Video Consult": ""}</p>
       </div>
      </div>
    );
  };

  export default DoctorCard;