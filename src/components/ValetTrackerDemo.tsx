import React, { useState } from 'react';
import { 
  Bell, 
  Camera, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Smartphone, 
  Calendar, 
  PauseCircle, 
  PlayCircle,
  Package, 
  ChevronRight,
  Sparkles,
  Lock
} from 'lucide-react';

export const ValetTrackerDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'status' | 'messages' | 'controls'>('status');
  const [isPaused, setIsPaused] = useState(false);
  const [extraBoxRequested, setExtraBoxRequested] = useState(false);
  const [smsFeed, setSmsFeed] = useState<Array<{
    id: string;
    time: string;
    text: string;
    hasPhoto?: boolean;
    photoLabel?: string;
  }>>([
    {
      id: '1',
      time: 'Wed 7:14 PM',
      text: 'Trash Valet: Hi Margaret! Your 2 cans have been rolled to the curb for tomorrow morning collection. Spaced 3 ft apart per city rules.',
      hasPhoto: true,
      photoLabel: 'Curbside Cans Placed & Spaced',
    },
    {
      id: '2',
      time: 'Thu 1:45 PM',
      text: 'Trash Valet: All done! Both cans have been returned behind your side fence. Gate latch verified secured for Buster 🐾. Have a great weekend!',
      hasPhoto: true,
      photoLabel: 'Returned Behind Gate & Latched',
    },
  ]);

  const [simulating, setSimulating] = useState(false);

  const simulateNewAction = (type: 'rollout' | 'rollback') => {
    setSimulating(true);
    setTimeout(() => {
      if (type === 'rollout') {
        setSmsFeed(prev => [
          {
            id: Date.now().toString(),
            time: 'Just Now',
            text: 'Trash Valet Alert: Roll-out complete! 2 cans positioned at the end of the driveway ready for sanitation.',
            hasPhoto: true,
            photoLabel: 'Curbside Verification Photo',
          },
          ...prev,
        ]);
      } else {
        setSmsFeed(prev => [
          {
            id: Date.now().toString(),
            time: 'Just Now',
            text: 'Trash Valet Alert: Empty cans returned to side storage and gate is latched shut. Enjoy your evening!',
            hasPhoto: true,
            photoLabel: 'Safe Storage Return Photo',
          },
          ...prev,
        ]);
      }
      setActiveTab('messages');
      setSimulating(false);
    }, 600);
  };

  return (
    <section id="valet-tracker" className="py-20 bg-stone-900 text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Interactive Homeowner Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Real-Time Notifications & Control
          </h2>
          <p className="mt-3 text-lg text-stone-400">
            You don't need another app to download. Everything works seamlessly via SMS text messages and your personal valet dashboard.
          </p>
        </div>

        {/* Interactive Phone Simulator & Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          
          {/* Left Column: Interactive Phone Mockup (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[340px] bg-stone-950 rounded-[40px] p-3 border-4 border-stone-700 shadow-2xl shadow-black/80">
              
              {/* Speaker / Camera Notch */}
              <div className="w-24 h-4 bg-stone-800 rounded-full mx-auto mb-3" />

              {/* Phone Screen */}
              <div className="bg-stone-900 rounded-[30px] p-4 text-stone-100 min-h-[460px] flex flex-col justify-between border border-stone-800">
                
                {/* Phone Header */}
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                        TV
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white leading-tight">Trash Valet Concierge</div>
                        <div className="text-[10px] text-emerald-400 font-medium">● Route #12 Online</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-stone-400">SMS Alerts</span>
                  </div>

                  {/* Tabs inside phone mockup */}
                  <div className="grid grid-cols-3 gap-1 my-3 p-1 bg-stone-800/80 rounded-lg text-[10px] font-bold">
                    <button
                      onClick={() => setActiveTab('status')}
                      className={`py-1 rounded cursor-pointer ${
                        activeTab === 'status' ? 'bg-emerald-600 text-white' : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      Status
                    </button>
                    <button
                      onClick={() => setActiveTab('messages')}
                      className={`py-1 rounded cursor-pointer ${
                        activeTab === 'messages' ? 'bg-emerald-600 text-white' : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      Texts ({smsFeed.length})
                    </button>
                    <button
                      onClick={() => setActiveTab('controls')}
                      className={`py-1 rounded cursor-pointer ${
                        activeTab === 'controls' ? 'bg-emerald-600 text-white' : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      Actions
                    </button>
                  </div>

                  {/* Tab 1: Live Status */}
                  {activeTab === 'status' && (
                    <div className="space-y-3 animate-in fade-in duration-150 text-left">
                      <div className={`p-3 rounded-xl border ${
                        isPaused ? 'bg-amber-950/40 border-amber-500/40' : 'bg-stone-800/80 border-stone-700'
                      }`}>
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-stone-200">Current Service:</span>
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold ${
                            isPaused ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                          }`}>
                            {isPaused ? 'PAUSED' : 'ACTIVE'}
                          </span>
                        </div>
                        <div className="text-sm font-bold text-white mt-1">
                          {isPaused ? 'Service On Hold (Away)' : 'Next: Tuesday Roll-Out'}
                        </div>
                        <div className="text-[11px] text-stone-400 mt-0.5">
                          {isPaused ? 'Resumes automatically when you unpause' : 'Between 6:00 PM – 8:30 PM'}
                        </div>
                      </div>

                      <div className="bg-stone-800/50 p-3 rounded-xl border border-stone-700/60 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-stone-400">Assigned Valet:</span>
                          <span className="font-semibold text-stone-200">Derek K. (ID #48)</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-stone-400">Bins Registered:</span>
                          <span className="font-semibold text-stone-200">2 Cans (Black + Blue)</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-stone-400">Storage Location:</span>
                          <span className="font-semibold text-stone-200">Side gate (Left)</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-stone-400">Gate Latch:</span>
                          <span className="text-emerald-400 font-bold flex items-center gap-1">
                            <Lock className="w-3 h-3" />
                            Confirmed Secure
                          </span>
                        </div>
                      </div>

                      {extraBoxRequested && (
                        <div className="bg-blue-950/50 border border-blue-500/40 p-2.5 rounded-lg text-xs text-blue-300 flex items-center gap-2">
                          <Package className="w-4 h-4 text-blue-400 shrink-0" />
                          <span>Extra Amazon boxes noted for valet breakdown.</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tab 2: Text Messages */}
                  {activeTab === 'messages' && (
                    <div className="space-y-2.5 text-left max-h-[300px] overflow-y-auto pr-1">
                      {smsFeed.map((msg) => (
                        <div key={msg.id} className="bg-stone-800 p-2.5 rounded-xl border border-stone-700 text-xs">
                          <div className="flex items-center justify-between text-[10px] text-stone-400 mb-1">
                            <span className="font-bold text-emerald-400">Trash Valet Verified</span>
                            <span>{msg.time}</span>
                          </div>
                          <p className="text-stone-200 text-xs leading-relaxed">{msg.text}</p>
                          {msg.hasPhoto && (
                            <div className="mt-2 bg-stone-900 p-2 rounded-lg border border-stone-700 flex items-center justify-between">
                              <div className="flex items-center gap-1.5 text-stone-300 text-[10px]">
                                <Camera className="w-3.5 h-3.5 text-emerald-400" />
                                <span>{msg.photoLabel}</span>
                              </div>
                              <span className="text-[9px] bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded font-bold">
                                Photo Attached
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tab 3: Actions */}
                  {activeTab === 'controls' && (
                    <div className="space-y-2 text-left text-xs">
                      <button
                        onClick={() => setIsPaused(!isPaused)}
                        className="w-full bg-stone-800 hover:bg-stone-700 text-stone-200 p-3 rounded-xl border border-stone-700 flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <span className="flex items-center gap-2 font-semibold">
                          {isPaused ? <PlayCircle className="w-4 h-4 text-emerald-400" /> : <PauseCircle className="w-4 h-4 text-amber-400" />}
                          <span>{isPaused ? 'Resume Service' : 'Pause Service (Going Away)'}</span>
                        </span>
                        <ChevronRight className="w-4 h-4 text-stone-500" />
                      </button>

                      <button
                        onClick={() => setExtraBoxRequested(!extraBoxRequested)}
                        className="w-full bg-stone-800 hover:bg-stone-700 text-stone-200 p-3 rounded-xl border border-stone-700 flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <span className="flex items-center gap-2 font-semibold">
                          <Package className="w-4 h-4 text-blue-400" />
                          <span>{extraBoxRequested ? 'Remove Extra Box Request' : 'Notify Valet: Extra Cardboard'}</span>
                        </span>
                        <ChevronRight className="w-4 h-4 text-stone-500" />
                      </button>

                      <div className="p-3 bg-stone-800/40 rounded-xl border border-stone-800 text-[11px] text-stone-400">
                        Need immediate assistance? Simply reply to any text from our valet number and a route manager responds within minutes.
                      </div>
                    </div>
                  )}

                </div>

                {/* Bottom home indicator */}
                <div className="pt-2 border-t border-stone-800 text-center text-[10px] text-stone-500">
                  Trash Valet Automated SMS Network
                </div>

              </div>

            </div>
          </div>

          {/* Right Column: Explanations & Simulator Triggers (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div>
              <div className="inline-flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Guesswork Guarantee</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                You Always Know When Your Cans Are Out & Returned
              </h3>
              <p className="text-stone-300 text-sm sm:text-base mt-3 leading-relaxed">
                Ever laid in bed wondering, <em>"Did someone roll the trash out?"</em> or sat at the office worrying if the cans are still on the street past the HOA deadline? 
                Trash Valet sends automatic timestamped photos to your phone so you have 100% peace of mind.
              </p>
            </div>

            {/* Feature Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="bg-stone-800/60 p-4 rounded-xl border border-stone-700/80">
                <div className="font-bold text-white flex items-center gap-2 mb-1">
                  <Camera className="w-4 h-4 text-emerald-400" />
                  <span>Photo Text Verification</span>
                </div>
                <p className="text-stone-400 text-xs">
                  Every return includes a photo confirming your cans are back in their designated spot and your gate latch is shut.
                </p>
              </div>

              <div className="bg-stone-800/60 p-4 rounded-xl border border-stone-700/80">
                <div className="font-bold text-white flex items-center gap-2 mb-1">
                  <Lock className="w-4 h-4 text-emerald-400" />
                  <span>Pet & Child Safe Latching</span>
                </div>
                <p className="text-stone-400 text-xs">
                  Valets are trained to double-check gate latches so curious dogs or toddlers never find an open fence.
                </p>
              </div>

              <div className="bg-stone-800/60 p-4 rounded-xl border border-stone-700/80">
                <div className="font-bold text-white flex items-center gap-2 mb-1">
                  <PauseCircle className="w-4 h-4 text-amber-400" />
                  <span>1-Click Vacation Pause</span>
                </div>
                <p className="text-stone-400 text-xs">
                  Heading out for two weeks? Text "PAUSE" to suspend service without paying while you're away.
                </p>
              </div>

              <div className="bg-stone-800/60 p-4 rounded-xl border border-stone-700/80">
                <div className="font-bold text-white flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>Automated Holiday Tracking</span>
                </div>
                <p className="text-stone-400 text-xs">
                  When city collection shifts 1 day for federal holidays or ice storms, our route adapts automatically.
                </p>
              </div>
            </div>

            {/* Interactive Simulation Buttons */}
            <div className="bg-stone-800/40 p-4 rounded-xl border border-stone-700">
              <div className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                Try It Yourself (Simulate Real Valet Notifications):
              </div>
              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  id="sim-rollout-btn"
                  onClick={() => simulateNewAction('rollout')}
                  disabled={simulating}
                  className="bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 text-white text-xs font-bold px-3.5 py-2 rounded-lg cursor-pointer transition-colors shadow-xs"
                >
                  {simulating ? 'Simulating...' : 'Test: Simulate Roll-Out SMS'}
                </button>
                <button
                  type="button"
                  id="sim-rollback-btn"
                  onClick={() => simulateNewAction('rollback')}
                  disabled={simulating}
                  className="bg-stone-700 hover:bg-stone-600 active:bg-stone-800 text-white text-xs font-bold px-3.5 py-2 rounded-lg cursor-pointer transition-colors"
                >
                  {simulating ? 'Simulating...' : 'Test: Simulate Return & Latch SMS'}
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
