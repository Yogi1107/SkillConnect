import React from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <section className="py-12 px-6 text-white">
      
      <div className="max-w-7xl mx-auto">
        
        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Card 1 */}
          <div className="bg-base p-6 rounded-2xl shadow-lg border border-gray-700 hover:scale-105 transition">
            <h3 className="text-lg font-semibold mb-4">
              Questions for a specific hackathon
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href='#'
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-black px-4 py-2 rounded-lg text-center"
              >
                Contact hackathon manager
              </a>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-base p-6 rounded-2xl shadow-lg border border-gray-700 hover:scale-105 transition">
            <h3 className="text-lg font-semibold mb-4">
              General customer support
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-black px-4 py-2 rounded-lg text-center"
              >
                Visit support portal
              </a>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-base p-6 rounded-2xl shadow-lg border border-gray-700 hover:scale-105 transition">
            <h3 className="text-lg font-semibold mb-4">
              Hosting a public hackathon
            </h3>
            <div className="flex flex-col gap-3">
              <Link
                to="/host-hackathon"
                className="bg-primary text-black px-4 py-2 rounded-lg text-center"
              >
                Host a hackathon
              </Link>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-base p-6 rounded-2xl shadow-lg border border-gray-700 hover:scale-105 transition">
            <h3 className="text-lg font-semibold mb-4">
              Host internal company hackathons
            </h3>
            <div>
              <a
                href="/product/request-devpost-for-teams-demo"
                className="bg-primary text-black px-4 py-2 rounded-lg text-center block"
              >
                Request demo
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;