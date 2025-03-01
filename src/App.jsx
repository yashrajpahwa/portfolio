import React from "react";
import { Helmet } from "react-helmet";
import {
  FiMail,
  FiLinkedin,
  FiGithub,
  FiCalendar,
  FiMapPin,
} from "react-icons/fi";

function App() {
  return (
    <>
      <Helmet>
        <title>Yashraj Pahwa | Software Engineer</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Portfolio of Yashraj Pahwa - Software Engineer specializing in full-stack development and cloud architecture"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50 text-gray-900 font-inter antialiased">
        <header className="max-w-5xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-black">
                Yashraj Singh Pahwa
              </h1>
              {/* <p className="text-xl text-gray-600 font-medium">
                Software Engineer
              </p> */}
            </div>
            <div className="mt-4 md:mt-0 space-y-1">
              <div className="flex items-center space-x-2">
                <FiMail className="text-gray-500" />
                <a
                  href="mailto:ypahwa_be24@thapar.edu"
                  className="hover:text-blue-600 transition-colors"
                >
                  ypahwa_be24@thapar.edu
                </a>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <a
                  href="https://linkedin.com/in/yashrajpahwa"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center hover:text-blue-600 transition-colors"
                >
                  <FiLinkedin className="mr-1" /> LinkedIn
                </a>
                <a
                  href="https://github.com/yashrajpahwa"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center hover:text-blue-600 transition-colors"
                >
                  <FiGithub className="mr-1" /> GitHub
                </a>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-6">
          {/* About Section */}
          <section className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <h2 className="text-2xl font-semibold mb-4">About Me</h2>
            <p className="text-gray-600 leading-relaxed">
              I am a detail-oriented Software Engineer skilled in full-stack
              development, cloud architecture, and DevOps. My passion is to
              design robust systems and deliver innovative, product-focused
              solutions.
            </p>
          </section>

          {/* Experience Section */}
          <section className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <h2 className="text-2xl font-semibold mb-6">Experience</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-600 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">Project Intern</h3>
                    <p className="text-gray-600">
                      Thapar Institute of Engineering &amp; Technology
                    </p>
                  </div>
                  <div className="text-gray-500 text-sm flex items-center mt-1">
                    <FiCalendar className="mr-1" /> Jan 2025 – Present
                  </div>
                </div>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li className="flex">
                    <span className="text-blue-600 mr-2">•</span>
                    Streamlined the placement process and centralized data
                    access for the placement cell, recruiters, and students.
                  </li>
                  <li className="flex">
                    <span className="text-blue-600 mr-2">•</span>
                    Migrated to one-click Google sign in integrating Firebase
                    and MySQL, achieving ~10% faster authorization and enhanced
                    security.
                  </li>
                  <li className="flex">
                    <span className="text-blue-600 mr-2">•</span>
                    Optimized the frontend for a mobile-first experience with
                    improved data readability.
                  </li>
                  <li className="flex">
                    <span className="text-blue-600 mr-2">•</span>
                    Designed a partially serverless cloud architecture with
                    active monitoring and near real-time adjustments.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Education Section */}
          <section className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <h2 className="text-2xl font-semibold mb-6">Education</h2>
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">
                    Thapar Institute of Engineering &amp; Technology
                  </h3>
                  <p className="text-gray-600">
                    BE Computer &amp; Electronics Engineering
                  </p>
                </div>
                <div className="text-gray-500 text-sm">
                  <div className="flex items-center">
                    <FiCalendar className="mr-1" /> 2024 – 2028
                  </div>
                  <div className="flex items-center mt-1">
                    <FiMapPin className="mr-1" /> Patiala, IN
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold">
                  Bluebells School International, New Delhi
                </h3>
                <div className="mt-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Class XII (CBSE)</span>
                    <span>85.2% | 2024</span>
                  </div>
                  <div className="flex justify-between text-gray-600 mt-1">
                    <span>Class X (CBSE)</span>
                    <span>97.2% | 2022</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Projects and Contributions Section */}
          <section className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <h2 className="text-2xl font-semibold mb-6">
              Projects and Contributions
            </h2>
            <div className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-xl hover:shadow-sm transition-shadow">
                <h3 className="text-lg font-semibold mb-2">
                  Plexus – Placement Portal for TIET{" "}
                  <span className="text-base text-gray-500">
                    | Oct’24 – Present
                  </span>
                </h3>
                <p className="text-gray-600">
                  This project streamlines placements for 10,000+ Thapar
                  Institute students by centralizing student profiles with
                  role-based data access combined with on-campus job
                  applications in a single platform.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl hover:shadow-sm transition-shadow">
                <h3 className="text-lg font-semibold mb-2">
                  Open-Source Contribution, Thapar Timetable{" "}
                  <span className="text-base text-gray-500">
                    | Aug’24 – Dec’24
                  </span>
                </h3>
                <p className="text-gray-600">
                  Improved user experience by enabling local saving of course
                  names, eliminating the need to repeatedly reference subject
                  codes by applying DOM manipulation techniques.
                </p>
              </div>
            </div>
          </section>

          {/* Technical Skills Section */}
          <section className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <h2 className="text-2xl font-semibold mb-6">Technical Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg text-center hover:bg-blue-50 transition-colors">
                <span className="font-medium">C</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg text-center hover:bg-blue-50 transition-colors">
                <span className="font-medium">JavaScript</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg text-center hover:bg-blue-50 transition-colors">
                <span className="font-medium">Go (Beginner)</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg text-center hover:bg-blue-50 transition-colors">
                <span className="font-medium">Node.js</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg text-center hover:bg-blue-50 transition-colors">
                <span className="font-medium">Express.js</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg text-center hover:bg-blue-50 transition-colors">
                <span className="font-medium">React.js</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg text-center hover:bg-blue-50 transition-colors">
                <span className="font-medium">SQL</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg text-center hover:bg-blue-50 transition-colors">
                <span className="font-medium">Docker</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg text-center hover:bg-blue-50 transition-colors">
                <span className="font-medium">AWS</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg text-center hover:bg-blue-50 transition-colors">
                <span className="font-medium">Digital Ocean</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg text-center hover:bg-blue-50 transition-colors">
                <span className="font-medium">Cloudflare</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg text-center hover:bg-blue-50 transition-colors">
                <span className="font-medium">Netlify</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg text-center hover:bg-blue-50 transition-colors">
                <span className="font-medium">Vercel</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg text-center hover:bg-blue-50 transition-colors">
                <span className="font-medium">Git</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg text-center hover:bg-blue-50 transition-colors">
                <span className="font-medium">MySQL</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg text-center hover:bg-blue-50 transition-colors">
                <span className="font-medium">MongoDB</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg text-center hover:bg-blue-50 transition-colors">
                <span className="font-medium">Firebase</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg text-center hover:bg-blue-50 transition-colors">
                <span className="font-medium">PostgreSQL</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg text-center hover:bg-blue-50 transition-colors">
                <span className="font-medium">Redis</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg text-center hover:bg-blue-50 transition-colors">
                <span className="font-medium">Prisma</span>
              </div>
            </div>
          </section>

          {/* Position of Responsibility Section */}
          <section className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <h2 className="text-2xl font-semibold mb-6">
              Position of Responsibility
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold">
                  Lead – Software Products, PLEX
                </h3>
                <p className="text-gray-600">
                  Leading the product and development teams for multiple
                  software projects.
                </p>
                <ul className="mt-2 list-disc list-inside text-gray-600">
                  <li>
                    Keynote Speaker, ELEVATE – Spoke at the ELEVATE Keynote,
                    engaging 80+ students.
                  </li>
                  <li>
                    Workshop Organizer, Product Pulse – Organized the Product
                    Pulse workshop with Saturnalia, attracting 250+
                    participants.
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Member, CCS</h3>
                <p className="text-gray-600">
                  Engaging in various projects and gaining knowledge along with
                  the core team.
                </p>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-gray-100 mt-12 py-8">
          <div className="max-w-5xl mx-auto px-6 text-center text-gray-500">
            <p>© 2025 Yashraj Singh Pahwa. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
