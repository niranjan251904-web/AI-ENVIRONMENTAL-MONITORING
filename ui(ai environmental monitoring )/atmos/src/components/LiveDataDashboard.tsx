import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { impactData, pollutionSources } from '../data/impactData';

const COLORS = ['#1A7EC8', '#5BB8F5', '#A8DFFF', '#EAF4FB'];

const LiveDataDashboard = () => {
  const [activeTab, setActiveTab] = useState('Air');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsRefreshing(true);
      setTimeout(() => setIsRefreshing(false), 800);
    }, 8000); // refresh simulation every 8s

    return () => clearInterval(interval);
  }, []);

  const tabs = ['Air', 'Water', 'Soil', 'Carbon'];

  return (
    <section className="py-24 bg-atmos-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-display font-bold text-atmos-navy">Planetary Matrix Hub</h2>
            <p className="text-atmos-muted font-sans mt-2 max-w-xl">Live aggregation from global edge nodes. Data processing latency &lt;50ms.</p>
          </div>

          <div className="flex bg-white/50 p-1 rounded-full border border-white backdrop-blur-sm self-start">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 ${activeTab === tab ? 'bg-gradient-to-r from-atmos-deep to-atmos-blue text-white shadow-md' : 'text-atmos-navy hover:bg-white/40'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Line Chart */}
          <div className="lg:col-span-2 glass p-6 h-[400px] flex flex-col relative overflow-hidden">
            <div className={`absolute top-4 right-4 flex items-center gap-2 text-xs font-mono font-bold transition-opacity duration-300 ${isRefreshing ? 'opacity-100 text-atmos-blue' : 'opacity-0'}`}>
               <span className="w-2 h-2 rounded-full bg-atmos-blue animate-pulse"></span> SYNCING...
            </div>
            <h3 className="font-display font-bold text-atmos-navy text-xl mb-6">{activeTab} Quality Index (7 Days)</h3>
            <div className="flex-grow">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={impactData} margin={{ top: 5, right: 20, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.4)" vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#4A6882', fontSize: 12, fontWeight: 700 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#4A6882', fontSize: 12, fontWeight: 700 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                    itemStyle={{ color: '#1A7EC8', fontWeight: 'bold' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey={activeTab === 'Air' ? 'aqi' : activeTab === 'Water' ? 'waterQuality' : activeTab === 'Soil' ? 'soilHealth' : 'carbon'} 
                    stroke="#5BB8F5" 
                    strokeWidth={4} 
                    dot={{ r: 6, fill: '#FFFFFF', stroke: '#5BB8F5', strokeWidth: 2 }} 
                    activeDot={{ r: 8, fill: '#1A7EC8' }}
                    animationDuration={isRefreshing ? 0 : 1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {/* Donut Chart */}
            <div className="glass p-6 h-[220px] flex flex-col items-center justify-center">
               <h3 className="font-display font-bold text-atmos-navy w-full text-left mb-2 text-sm uppercase tracking-wider">Pollution Breakdown</h3>
               <div className="w-full flex-grow relative">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pollutionSources}
                        innerRadius={40}
                        outerRadius={65}
                        paddingAngle={5}
                        dataKey="value"
                        animationDuration={isRefreshing ? 0 : 1000}
                      >
                        {pollutionSources.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="font-mono font-bold text-atmos-deep text-lg">AI</span>
                 </div>
               </div>
            </div>

            {/* Map heat thumbnail mock */}
            <div className="glass p-4 flex-grow relative overflow-hidden flex flex-col group">
               <div className="absolute inset-0 z-0">
                  <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 mix-blend-multiply group-hover:scale-110 transition-transform duration-1000" alt="Map" />
               </div>
               <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent z-10" />
               <h3 className="relative z-20 font-display font-bold text-atmos-navy text-sm uppercase tracking-wider mt-auto">Global Heat Overlay</h3>
               <p className="relative z-20 font-mono text-atmos-blue text-xs mt-1">Satellite CV Active</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LiveDataDashboard;
