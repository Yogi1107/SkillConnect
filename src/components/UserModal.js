const UserModal = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      
      <div className="bg-[#111] text-white w-[90%] max-w-xl rounded-2xl p-6 relative shadow-2xl">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white text-xl"
        >
          ✖
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-5">
          <img
            src={user.avatar}
            alt="avatar"
            className="w-16 h-16 rounded-full border-2 border-primary"
          />

          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-4">
          <p className="text-primary font-semibold mb-2">Skills</p>

          <div className="flex flex-wrap gap-2">
            {[
              ...(user.skills?.languages || []),
              ...(user.skills?.frameworks || [])
            ].map((skill, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs rounded-full bg-[#222] border border-[#333]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Domains */}
        <div className="mb-4">
          <p className="text-primary font-semibold mb-2">Domains</p>

          <div className="flex flex-wrap gap-2">
            {user.skills?.domains?.map((d, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs rounded-full bg-primary text-black font-semibold"
              >
                {d}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-sm text-gray-400">
          🚀 Ready for hackathons & team collaboration
        </div>

      </div>
    </div>
  );
};

export default UserModal;