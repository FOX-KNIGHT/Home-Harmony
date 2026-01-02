import React from 'react';

import { useNavigate } from 'react-router-dom';

// Since the Header component already implements the Team section fully (as seen in analysis),
// We can either wrap it or just route to it. 
// However, the user wants a dedicated "Team" page. 
// The current Header.jsx IS a full page app basically. 
// So the Team route should probably just render the Header component but scroll to the Team section?
// Or better, let's extract the Team section?
// Actually, the most robust way is to just use the existing header structure but ensure it opens "Team" view.

const Team = () => {
    const navigate = useNavigate();

    // Reusing the styles and structure from Header.jsx but focused on Team
    // For now, simpler approach: Just reuse Header but auto-scroll or just act as a wrapper if needed.
    // Wait, Header.jsx has the full landing page content including Team.
    // So the /team route in App.jsx currently uses:
    // <PageLayout className="team-page-modal" backLabel="Back to Home"><Header /></PageLayout>
    // This is already set up in App.jsx! 

    // I will verify if I need to do anything here or just confirm usage.
    // The previous plan said: "[NEW] src/Component/Team.jsx"
    // Let's create a simplified wrapper or a dedicated page if the current one is too cluttered.

    // Let's create a dedicated, clean Team page that imports the data.

    const teamMembers = [
        {
            id: 'siddhant',
            name: 'Siddhant Satyajeet Jena',
            role: 'Team Leader & Project Architect',
            // photo: Siddhantpic, // We lack the imports here, so use placeholders or similar
            photo: 'https://placehold.co/150',
            skills: ['Leadership', 'Strategy', 'UI/UX Design'],
            isLeader: true,
            bio: 'Visionary leader driving innovation in household technology solutions.'
        },
        {
            id: 'asmit',
            name: 'Asmit Gupta',
            role: 'Frontend Developer & Designer',
            photo: 'https://placehold.co/150',
            skills: ['React', 'Design Systems', 'JavaScript'],
            isLeader: false,
            bio: 'Creating beautiful and intuitive user experiences.'
        },
        {
            id: 'shlok',
            name: 'Shlok Katiyar',
            role: 'Backend Developer & Systems',
            photo: 'https://placehold.co/150',
            skills: ['Node.js', 'Database', 'API Design'],
            isLeader: false,
            bio: 'Building robust and scalable backend architectures.'
        },
        {
            id: 'muskan',
            name: 'Muskan Gupta',
            role: 'Data Scientist & Analytics',
            photo: 'https://placehold.co/150',
            skills: ['Python', 'ML/AI', 'Analytics'],
            isLeader: false,
            bio: 'Transforming data into actionable household insights.'
        },
        {
            id: 'mithilesh',
            name: 'Mithilesh Das',
            role: 'DevOps & Quality Engineer',
            photo: 'https://placehold.co/150',
            skills: ['DevOps', 'Cloud', 'Testing'],
            isLeader: false,
            bio: 'Ensuring seamless deployment and quality assurance.'
        }
    ];

    return (
        <div className="min-h-screen bg-[#0f172a] text-white p-8 font-sans">
            <header className="flex justify-between items-center mb-12 container mx-auto">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Meet The Team</h1>
                    <p className="text-slate-400 text-lg">Five innovative minds, one harmonious vision.</p>
                </div>
                <button
                    onClick={() => navigate('/')}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                >
                    Back to Home
                </button>
            </header>

            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((member) => (
                    <div
                        key={member.id}
                        className={`bg-[#1e293b] border border-slate-700 rounded-xl p-6 transition-transform hover:-translate-y-2 hover:shadow-xl ${member.isLeader ? 'ring-2 ring-yellow-500/50' : ''}`}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="relative">
                                <img
                                    src={member.photo}
                                    alt={member.name}
                                    className="w-16 h-16 rounded-full object-cover border-2 border-slate-600"
                                />
                                {member.isLeader && <span className="absolute -top-2 -right-2 text-xl">👑</span>}
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-white">{member.name}</h3>
                                <p className="text-sm text-cyan-400">{member.role}</p>
                            </div>
                        </div>

                        <p className="text-slate-300 mb-4 leading-relaxed text-sm">
                            {member.bio}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {member.skills.map(skill => (
                                <span key={skill} className="text-xs px-2 py-1 bg-slate-700 rounded-md text-slate-300">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Team;
