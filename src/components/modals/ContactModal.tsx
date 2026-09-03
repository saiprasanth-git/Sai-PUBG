import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SocialLink, ProfileInfo } from '../../types';
import { X, Send, Mail, MessageSquare, Copy, Check, ShieldCheck, Terminal, MapPin, Radio } from 'lucide-react';
import { sound } from '../../utils/audio';

interface ContactModalProps {
  profile: ProfileInfo;
  socials: SocialLink[];
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ profile, socials, onClose }) => {
  const [formData, setFormData] = useState({
    sender: '',
    email: '',
    directiveType: 'AAA Contract & Full-Time',
    message: '',
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedDiscord, setCopiedDiscord] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleCopy = (text: string, type: 'email' | 'discord') => {
    navigator.clipboard.writeText(text);
    sound.playClick();
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedDiscord(true);
      setTimeout(() => setCopiedDiscord(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playMatchStart();
    setIsSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="pubg-modal-card relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#0F1317] border-2 border-[#FFB900] shadow-[0_0_50px_rgba(0,0,0,0.95)] overflow-hidden"
      >
        {/* Header */}
        <div className="pubg-modal-header flex items-center justify-between px-6 py-4 bg-[#151A20] border-b border-[#3A3F45]">
          <div className="flex items-center space-x-3">
            <div className="p-1.5 bg-[#FFB900] text-[#080B0D]">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <div className="font-mono-tech text-[10px] text-[#FFB900] tracking-widest uppercase font-bold">
                COMM FREQUENCY // 256-BIT ENCRYPTED
              </div>
              <h2 className="pubg-modal-title font-display font-black text-xl md:text-2xl text-[#F5F5F0] tracking-wide uppercase">
                COMM CHANNEL & DIRECT DISPATCH
              </h2>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 text-[#A6A6A0] hover:text-[#FFB900] hover:bg-white/5 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="pubg-modal-body flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Channel Stats */}
            <div className="space-y-4 bg-[#151A20] p-5 border border-white/10">
              <span className="font-mono-tech text-xs text-[#FFB900] font-bold uppercase tracking-wider block">
                DIRECT RELAY FREQUENCIES
              </span>

              {/* Direct Email Card */}
              <div className="bg-[#0F1317] p-3.5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono-tech text-[#A6A6A0] uppercase">PRIMARY EMAIL</span>
                  <Mail className="w-3.5 h-3.5 text-[#FFB900]" />
                </div>
                <div className="font-mono-tech text-xs text-white font-bold truncate">
                  prasanthgrandhisiri@gmail.com
                </div>
                <button
                  onClick={() => handleCopy('prasanthgrandhisiri@gmail.com', 'email')}
                  className="w-full flex items-center justify-center space-x-1 bg-[#1E252E] hover:bg-[#2A3440] text-[11px] font-mono-tech text-[#FFB900] py-1 border border-white/10 transition-colors"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-[#34D399]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'COPIED TO CLIPBOARD' : 'COPY EMAIL'}</span>
                </button>
              </div>

              {/* GitHub Relay Card */}
              <div className="bg-[#0F1317] p-3 border border-white/10 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono-tech text-[#A6A6A0] uppercase">GITHUB PROFILE</span>
                  <MessageSquare className="w-3.5 h-3.5 text-[#FFB900]" />
                </div>
                <div className="font-mono-tech text-xs text-white font-bold">
                  github/saiprasanth-git
                </div>
                <a
                  href="https://github.com/saiprasanth-git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-1 bg-[#1E252E] hover:bg-[#2A3440] text-[10px] font-mono-tech text-[#FFB900] py-1 border border-white/10 transition-colors"
                >
                  <span>OPEN GITHUB PROFILE ↗</span>
                </a>
              </div>

              {/* X (Twitter) Relay Card */}
              <div className="bg-[#0F1317] p-3 border border-white/10 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono-tech text-[#A6A6A0] uppercase">X / TWITTER ACCOUNT</span>
                  <span className="font-bold text-xs text-[#FFB900]">𝕏</span>
                </div>
                <div className="font-mono-tech text-xs text-white font-bold">
                  @saiprasanth
                </div>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-1 bg-[#1E252E] hover:bg-[#2A3440] text-[10px] font-mono-tech text-[#FFB900] py-1 border border-white/10 transition-colors"
                >
                  <span>OPEN X (TWITTER) ↗</span>
                </a>
              </div>

              {/* Instagram Relay Card */}
              <div className="bg-[#0F1317] p-3 border border-white/10 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono-tech text-[#A6A6A0] uppercase">INSTAGRAM ACCOUNT</span>
                  <span className="text-xs text-[#FFB900] font-bold">IG</span>
                </div>
                <div className="font-mono-tech text-xs text-white font-bold">
                  @saiprasanth
                </div>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-1 bg-[#1E252E] hover:bg-[#2A3440] text-[10px] font-mono-tech text-[#FFB900] py-1 border border-white/10 transition-colors"
                >
                  <span>OPEN INSTAGRAM ↗</span>
                </a>
              </div>

              {/* Status */}
              <div className="bg-[#0F1317] p-3 border border-white/10 text-xs font-mono-tech space-y-1">
                <div className="text-[10px] text-[#A6A6A0] uppercase">SIGNAL LATENCY</div>
                <div className="text-[#34D399] font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
                  {profile.serverPing} ({profile.serverRegion})
                </div>
              </div>
            </div>

            {/* Right Interactive Form */}
            <div className="md:col-span-2 bg-[#151A20] p-5 border border-white/10">
              {isSent ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 bg-[#FFB900]/20 border-2 border-[#FFB900] rounded-full flex items-center justify-center mx-auto text-[#FFB900]">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-black text-2xl text-white uppercase">
                    TRANSMISSION DISPATCHED
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A6A6A0] max-w-md mx-auto leading-relaxed">
                    Your transmission has been logged into the tactical communication queue. Response turnaround target is under 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setIsSent(false);
                      setFormData({ sender: '', email: '', directiveType: 'AAA Contract & Full-Time', message: '' });
                    }}
                    className="pubg-start-btn font-display font-black text-xs text-[#080B0D] px-6 py-2.5 uppercase tracking-wider"
                  >
                    SEND ANOTHER TRANSMISSION
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="font-mono-tech text-xs text-[#FFB900] font-bold uppercase tracking-wider flex items-center gap-2">
                    <Terminal className="w-4 h-4" />
                    SEND DIRECT MESSAGE / INQUIRY
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono-tech text-[#A6A6A0] uppercase mb-1">
                        YOUR NAME / CALLSIGN *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Commander Marcus"
                        value={formData.sender}
                        onChange={(e) => setFormData({ ...formData, sender: e.target.value })}
                        className="w-full bg-[#0F1317] border border-white/20 focus:border-[#FFB900] px-3.5 py-2 text-xs font-mono-tech text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono-tech text-[#A6A6A0] uppercase mb-1">
                        RETURN EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="marcus@studio.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#0F1317] border border-white/20 focus:border-[#FFB900] px-3.5 py-2 text-xs font-mono-tech text-white outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-tech text-[#A6A6A0] uppercase mb-1">
                      DIRECTIVE / PROJECT INQUIRY TYPE
                    </label>
                    <select
                      value={formData.directiveType}
                      onChange={(e) => setFormData({ ...formData, directiveType: e.target.value })}
                      className="w-full bg-[#0F1317] border border-white/20 focus:border-[#FFB900] px-3.5 py-2 text-xs font-mono-tech text-white outline-none cursor-pointer"
                    >
                      <option>Production LLM Agent Architectures</option>
                      <option>High-Throughput Python Microservices (FastAPI/AsyncIO)</option>
                      <option>Safety-Critical AI Evaluation & Guardrails</option>
                      <option>Distributed RAG & Vector Retrieval Systems</option>
                      <option>Full-Time Staff / Senior Engineering Roles</option>
                      <option>Other Tactical Inquiries</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-tech text-[#A6A6A0] uppercase mb-1">
                      MESSAGE TRANSMISSION *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Outline project timeline, technical requirements, or schedule a technical interview..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#0F1317] border border-white/20 focus:border-[#FFB900] p-3 text-xs font-mono-tech text-white outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center space-x-2 pubg-start-btn font-display font-black text-sm text-[#080B0D] py-3 uppercase tracking-wider shadow-lg"
                  >
                    <Send className="w-4 h-4" />
                    <span>TRANSMIT MESSAGE VIA SECURE DISPATCH</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#151A20] border-t border-[#3A3F45]">
          <span className="text-xs font-mono-tech text-[#A6A6A0]">
            LOCATION: {profile.coordinates} // STAFFORD, TX & REMOTE
          </span>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="pubg-start-btn font-display font-black text-xs text-[#080B0D] px-5 py-2 uppercase tracking-wider shadow-md"
          >
            RETURN TO LOBBY
          </button>
        </div>
      </motion.div>
    </div>
  );
};
