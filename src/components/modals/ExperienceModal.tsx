import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ExperienceItem, ProfileInfo } from '../../types';
import { X, Award, Briefcase, Calendar, MapPin, CheckCircle2, ChevronRight, Sparkles, Download, Upload, FileText, Trash2, ExternalLink, Check } from 'lucide-react';
import { sound } from '../../utils/audio';

interface ExperienceModalProps {
  experiences: ExperienceItem[];
  profile: ProfileInfo;
  onClose: () => void;
}

interface UploadedResume {
  name: string;
  size: string;
  uploadDate: string;
  dataUrl?: string;
}

export const ExperienceModal: React.FC<ExperienceModalProps> = ({ experiences, profile, onClose }) => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'resume'>('timeline');
  const [uploadedResume, setUploadedResume] = useState<UploadedResume | null>(() => {
    try {
      const saved = localStorage.getItem('pubg_uploaded_resume');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    sound.playClick();
    const reader = new FileReader();
    reader.onload = (event) => {
      const resumeInfo: UploadedResume = {
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        uploadDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        dataUrl: event.target?.result as string,
      };
      setUploadedResume(resumeInfo);
      setUploadSuccess(true);
      try {
        localStorage.setItem('pubg_uploaded_resume', JSON.stringify({
          name: resumeInfo.name,
          size: resumeInfo.size,
          uploadDate: resumeInfo.uploadDate,
        }));
      } catch (err) {
        console.error('LocalStorage write error', err);
      }
      setTimeout(() => setUploadSuccess(false), 4000);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveResume = () => {
    sound.playClick();
    setUploadedResume(null);
    localStorage.removeItem('pubg_uploaded_resume');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDownloadOfficialResume = () => {
    sound.playClick();
    if (uploadedResume?.dataUrl) {
      const a = document.createElement('a');
      a.href = uploadedResume.dataUrl;
      a.download = uploadedResume.name;
      a.click();
    } else {
      window.open(profile.resumeUrl, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#0F1317] border-2 border-[#FFB900] shadow-[0_0_50px_rgba(0,0,0,0.95)] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 bg-[#151A20] border-b border-[#3A3F45]">
          <div className="flex items-center space-x-3">
            <div className="p-1.5 bg-[#FFB900] text-[#080B0D]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="font-mono-tech text-[10px] text-[#FFB900] tracking-widest uppercase font-bold">
                CAREER PASS // AAA RECORD & RESUME HUB
              </div>
              <h2 className="font-display font-black text-lg sm:text-2xl text-[#F5F5F0] tracking-wide uppercase">
                EXPERIENCE & RESUME ARCHIVE
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

        {/* Section Tabs & Resume Actions Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 bg-[#11161B] border-b border-white/10">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('timeline');
              }}
              className={`px-3.5 py-1.5 text-xs font-mono-tech uppercase font-bold transition-all ${
                activeTab === 'timeline'
                  ? 'bg-[#FFB900] text-[#080B0D] shadow-md'
                  : 'bg-[#1C2229] text-[#A6A6A0] hover:text-white'
              }`}
            >
              EXPERIENCE TIMELINE ({experiences.length})
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('resume');
              }}
              className={`px-3.5 py-1.5 text-xs font-mono-tech uppercase font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'resume'
                  ? 'bg-[#FFB900] text-[#080B0D] shadow-md'
                  : 'bg-[#1C2229] text-[#A6A6A0] hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              RESUME HUB {uploadedResume ? '• (CUSTOM LOADED)' : ''}
            </button>
          </div>

          {/* Quick Action Button for Direct Download */}
          <button
            onClick={handleDownloadOfficialResume}
            className="flex items-center space-x-2 px-3.5 py-1.5 bg-[#FFB900] hover:bg-[#FFC933] text-[#080B0D] font-mono-tech font-bold text-xs uppercase tracking-wider transition-colors shadow"
          >
            <Download className="w-3.5 h-3.5" />
            <span>DOWNLOAD RESUME</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar">
          {activeTab === 'resume' ? (
            /* Resume Hub Tab */
            <div className="space-y-6">
              {/* Official Resume Card */}
              <div className="bg-[#181E24] border-2 border-[#FFB900]/40 p-5 space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-[#FFB900]/20 border border-[#FFB900] text-[#FFB900]">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="font-mono-tech text-[10px] text-[#FFB900] uppercase font-bold tracking-wider">
                        VERIFIED DOSSIER DOCUMENT
                      </span>
                      <h3 className="font-display font-black text-lg text-white uppercase">
                        {profile.name} — Full Engineering Resume
                      </h3>
                      <p className="text-xs text-[#A6A6A0] font-mono-tech">
                        Backend & AI Engineer • 5+ Years Production Experience • Stafford, TX
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleDownloadOfficialResume}
                      className="px-4 py-2 bg-[#FFB900] hover:bg-[#FFC933] text-[#080B0D] font-mono-tech font-bold text-xs uppercase flex items-center gap-1.5 transition-colors shadow"
                    >
                      <Download className="w-4 h-4" />
                      <span>DOWNLOAD PDF</span>
                    </button>
                    <a
                      href={profile.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-[#222933] hover:bg-[#2C3542] text-white border border-white/10 transition-colors"
                      title="Open in new tab"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Upload Custom Resume Box */}
              <div className="bg-[#141A20] border border-white/10 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Upload className="w-4 h-4 text-[#FFB900]" />
                    <h4 className="font-mono-tech font-bold text-xs text-[#FFB900] uppercase tracking-wider">
                      UPLOAD CUSTOM RESUME FILE (.PDF / .DOCX)
                    </h4>
                  </div>
                  {uploadSuccess && (
                    <span className="text-xs font-mono-tech text-[#34D399] flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> RESUME UPLOADED SUCCESSFULLY!
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#A6A6A0] leading-relaxed">
                  Upload an updated CV/resume file to preview, store locally in your session, and allow direct one-click downloading from this terminal.
                </p>

                {uploadedResume ? (
                  <div className="bg-[#0E1216] border border-[#34D399]/40 p-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-[#34D399]/20 text-[#34D399]">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-mono-tech text-white font-bold block">
                          {uploadedResume.name}
                        </span>
                        <span className="text-[10px] font-mono-tech text-[#A6A6A0]">
                          Size: {uploadedResume.size} • Uploaded: {uploadedResume.uploadDate}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleDownloadOfficialResume}
                        className="px-3 py-1.5 bg-[#FFB900] text-[#080B0D] font-mono-tech text-xs font-bold uppercase flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" /> Download
                      </button>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 bg-[#222933] text-white hover:bg-[#2C3542] font-mono-tech text-xs font-bold uppercase"
                      >
                        Replace
                      </button>
                      <button
                        onClick={handleRemoveResume}
                        className="p-1.5 text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors"
                        title="Remove uploaded resume"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-[#FFB900]/40 hover:border-[#FFB900] bg-[#0C1014] p-8 text-center cursor-pointer transition-colors space-y-2 group"
                  >
                    <div className="mx-auto w-10 h-10 rounded-full bg-[#FFB900]/10 flex items-center justify-center text-[#FFB900] group-hover:scale-110 transition-transform">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-mono-tech font-bold text-white uppercase">
                      CLICK OR DRAG RESUME FILE HERE TO UPLOAD
                    </div>
                    <div className="text-[11px] font-mono-tech text-[#A6A6A0]">
                      Supported formats: PDF, DOCX, DOC (Up to 15MB)
                    </div>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.doc,application/pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>
          ) : (
            /* Experience Timeline Tab */
            <div className="space-y-6">
              {/* Quick Resume Download Callout at top of Timeline */}
              <div className="bg-[#181E24] border border-[#FFB900]/40 p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center space-x-2.5">
                  <FileText className="w-4 h-4 text-[#FFB900]" />
                  <span className="font-mono-tech text-xs text-white">
                    Looking for a complete printable document?
                  </span>
                </div>
                <button
                  onClick={handleDownloadOfficialResume}
                  className="px-3 py-1.5 bg-[#FFB900] hover:bg-[#FFC933] text-[#080B0D] font-mono-tech font-bold text-xs uppercase flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>GET RESUME (PDF)</span>
                </button>
              </div>

              {experiences.map((item, index) => (
                <div
                  key={item.id}
                  className="relative pl-5 sm:pl-8 border-l-2 border-[#FFB900]/60 space-y-3.5 bg-[#141A20]/80 p-4 sm:p-5 border-y border-r border-white/10"
                >
                  {/* Timeline Bullet */}
                  <div className="absolute -left-[9px] top-6 w-4 h-4 bg-[#0F1317] border-2 border-[#FFB900] rounded-sm flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-[#FFB900]" />
                  </div>

                  {/* Title & Metadata */}
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <span className="font-mono-tech text-[10px] text-[#FFB900] uppercase font-bold tracking-wider">
                        ROLE 0{index + 1} • {item.type}
                      </span>
                      <h3 className="font-display font-black text-lg sm:text-xl text-white uppercase">
                        {item.role}
                      </h3>
                      <div className="flex items-center space-x-2 text-xs sm:text-sm text-[#FFB900] font-bold font-mono-tech">
                        <span>{item.company}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end text-right">
                      <span className="bg-[#FFB900] text-[#080B0D] font-mono-tech font-bold text-xs px-2.5 py-0.5">
                        {item.dates}
                      </span>
                      <span className="text-[11px] font-mono-tech text-[#A6A6A0] mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#FFB900]" />
                        {item.location}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#F5F5F0] leading-relaxed">
                    {item.description}
                  </p>

                  {/* Responsibilities */}
                  <div className="space-y-1.5 bg-[#0D1115] p-3 border border-white/5">
                    <span className="text-[10px] font-mono-tech text-[#A6A6A0] uppercase font-bold block mb-1">
                      KEY CONTRIBUTIONS & ACHIEVEMENTS:
                    </span>
                    {item.responsibilities.map((resp, rIdx) => (
                      <div key={rIdx} className="flex items-start space-x-2 text-xs text-white/90">
                        <ChevronRight className="w-3.5 h-3.5 text-[#FFB900] flex-shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-[#1F2730] border border-white/10 text-[10px] font-mono-tech text-[#A6A6A0] px-2 py-0.5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 bg-[#151A20] border-t border-[#3A3F45]">
          <span className="font-mono-tech text-xs text-[#A6A6A0]">
            CAREER STATUS: <span className="text-[#34D399] font-bold">5+ YEARS VERIFIED</span>
          </span>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleDownloadOfficialResume}
              className="px-4 py-2 bg-[#FFB900] hover:bg-[#FFC933] text-[#080B0D] font-display font-black text-xs uppercase tracking-wider transition-colors shadow"
            >
              DOWNLOAD RESUME
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="px-4 py-2 bg-[#222933] hover:bg-[#2C3542] text-white font-mono-tech font-bold text-xs uppercase transition-colors"
            >
              RETURN TO LOBBY
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
