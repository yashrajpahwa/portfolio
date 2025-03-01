import React from "react";
import { Helmet } from "react-helmet";

function App() {
  return (
    <>
      <Helmet>
        <title>Yashraj Pahwa</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <div className="min-h-screen bg-white text-gray-800 p-6 font-roboto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Yashraj Singh Pahwa</h1>
          {/* <p className="text-xl text-gray-600 mb-2">Software Engineer</p> */}
          <p className="text-gray-600">
            <a
              className="text-blue-600 hover:underline"
              href="mailto:ypahwa_be24@thapar.edu"
            >
              ypahwa_be24@thapar.edu
            </a>
          </p>
          <p>
            <a
              className="text-blue-600 hover:underline"
              href="https://linkedin.com/in/yashrajpahwa"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>{" "}
            |{" "}
            <a
              className="text-blue-600 hover:underline"
              href="https://github.com/yashrajpahwa"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </p>
        </header>

        <main className="max-w-4xl mx-auto">
          {/* About Section */}
          <section id="about" className="mb-10">
            <h2 className="text-2xl font-semibold border-b-2 border-gray-800 pb-1 mb-4">
              About Me
            </h2>
            <p>
              I am a detail-oriented Software Engineer skilled in full-stack
              development, cloud architecture, and DevOps. My passion is to
              design robust systems and deliver innovative, product-focused
              solutions.
            </p>
          </section>
          {/* Experience Section */}
          <section id="experience" className="mb-10">
            <h2 className="text-2xl font-semibold border-b-2 border-gray-800 pb-1 mb-4">
              Experience
            </h2>
            <div className="mb-6">
              <h3 className="text-xl font-semibold">
                Project Intern{" "}
                <span className="text-base text-gray-500">
                  | Thapar Institute of Engineering &amp; Technology
                </span>
              </h3>
              <p className="italic text-gray-600">
                Software Engineering | January 2025 – Present
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>
                  Streamlined the placement process and centralized data access
                  for the placement cell, recruiters, and students.
                </li>
                <li>
                  Migrated to one-click Google sign in integrating Firebase and
                  MySQL, achieving ~10% faster authorization and enhanced
                  security.
                </li>
                <li>
                  Optimized the frontend for a mobile-first experience with
                  improved data readability.
                </li>
                <li>
                  Designed a partially serverless cloud architecture with active
                  monitoring and near real-time adjustments.
                </li>
              </ul>
            </div>
          </section>
          {/* Education Section */}
          <section id="education" className="mb-10">
            <h2 className="text-2xl font-semibold border-b-2 border-gray-800 pb-1 mb-4">
              Education
            </h2>
            <div className="mb-4">
              <h3 className="text-xl font-semibold">
                Thapar Institute of Engineering &amp; Technology
              </h3>
              <p>
                Bachelor of Engineering in Computer &amp; Electronics
                Engineering | 2024 - 2028
              </p>
            </div>
            {/* Additional Education Details */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold">
                Bluebells School International, New Delhi
              </h3>
              <div className="flex justify-between">
                <p>Class XII</p>
                <p>85.2% (CBSE) | 2024</p>
              </div>
              <div className="flex justify-between">
                <p>Class X</p>
                <p>97.2% (CBSE) | 2022</p>
              </div>
            </div>
          </section>
          {/* Projects Section */}
          <section id="projects" className="mb-10">
            <h2 className="text-2xl font-semibold border-b-2 border-gray-800 pb-1 mb-4">
              Projects and Contributions
            </h2>
            <div className="mb-6">
              <h3 className="text-xl font-semibold">
                Plexus – Placement Portal for TIET{" "}
                <span className="text-base text-gray-500">
                  | Oct’24 – Present
                </span>
              </h3>
              <p>
                This project streamlines placements for 10,000+ Thapar Institute
                students by centralizing student profiles with role-based data
                access combined with on-campus job applications in a single
                platform.
              </p>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold">
                Open-Source Contribution, Thapar Timetable{" "}
                <span className="text-base text-gray-500">
                  | Aug’24 – Dec’24
                </span>
              </h3>
              <p>
                Improved user experience by enabling local saving of course
                names, eliminating the need to repeatedly reference subject
                codes by applying DOM manipulation techniques.
              </p>
            </div>
          </section>
          {/* Skills Section */}
          <section id="skills" className="mb-10">
            <h2 className="text-2xl font-semibold border-b-2 border-gray-800 pb-1 mb-4">
              Skills
            </h2>
            <ul className="flex flex-wrap gap-2">
              <li className="bg-gray-100 px-3 py-1 rounded">C</li>
              <li className="bg-gray-100 px-3 py-1 rounded">JavaScript</li>
              <li className="bg-gray-100 px-3 py-1 rounded">Go (Beginner)</li>
              <li className="bg-gray-100 px-3 py-1 rounded">Node.js</li>
              <li className="bg-gray-100 px-3 py-1 rounded">Express.js</li>
              <li className="bg-gray-100 px-3 py-1 rounded">React.js</li>
              <li className="bg-gray-100 px-3 py-1 rounded">SQL</li>
              <li className="bg-gray-100 px-3 py-1 rounded">Docker</li>
              <li className="bg-gray-100 px-3 py-1 rounded">AWS</li>
              <li className="bg-gray-100 px-3 py-1 rounded">Digital Ocean</li>
              <li className="bg-gray-100 px-3 py-1 rounded">Cloudflare</li>
              <li className="bg-gray-100 px-3 py-1 rounded">Netlify</li>
              <li className="bg-gray-100 px-3 py-1 rounded">Vercel</li>
              <li className="bg-gray-100 px-3 py-1 rounded">Git</li>
              <li className="bg-gray-100 px-3 py-1 rounded">MySQL</li>
              <li className="bg-gray-100 px-3 py-1 rounded">MongoDB</li>
              <li className="bg-gray-100 px-3 py-1 rounded">Firebase</li>
              <li className="bg-gray-100 px-3 py-1 rounded">PostgreSQL</li>
              <li className="bg-gray-100 px-3 py-1 rounded">Redis</li>
              <li className="bg-gray-100 px-3 py-1 rounded">Prisma</li>
            </ul>
          </section>
          {/* Position of Responsibility Section */}
          <section id="clubs" className="mb-10">
            <h2 className="text-2xl font-semibold border-b-2 border-gray-800 pb-1 mb-4">
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
                <ul className="list-item list-inside ml-4 mt-2 space-y-1">
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

        <footer className="text-center text-gray-500 text-sm">
          <p>© 2025 Yashraj Singh Pahwa. All Rights Reserved.</p>
        </footer>
      </div>
    </>
  );
}

export default App;
