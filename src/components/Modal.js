const Modal = ({ hackathon, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      
      <div className="bg-white w-[90%] max-w-2xl rounded-xl overflow-hidden shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-xl font-bold text-black"
        >
          ✖
        </button>

        {/* Image */}
        <img
          src={hackathon.image}
          alt={hackathon.title}
          className="w-full h-[200px] object-cover"
        />

        {/* Content */}
        <div className="p-6 text-black">

          <h2 className="text-2xl font-bold mb-2">
            {hackathon.title}
          </h2>

          <p className="text-gray-700 mb-4">
            {hackathon.description}
          </p>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4 text-sm">

            <p><strong>Location:</strong> {hackathon.location}</p>

            <p><strong>Mode:</strong> {hackathon.mode}</p>

            <p>
              <strong>Dates:</strong>  
              {hackathon.startDate} → {hackathon.endDate}
            </p>

            <p>
              <strong>Team Size:</strong> Max {hackathon.maxTeamSize}
            </p>

            <p>
              <strong>Organizer:</strong> {hackathon.hostOrganization?.name}
            </p>

            <p>
              <strong>Status:</strong> {hackathon.status}
            </p>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Modal;