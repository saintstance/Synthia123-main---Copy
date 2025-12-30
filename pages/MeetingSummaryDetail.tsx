import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, FileText, CheckSquare, Mic, 
  MessageSquare, Users, LayoutGrid, Upload, 
  Download, Play, MoreVertical, File, Clock, Search,
  FilePlus, FileOutput, GripVertical, Type, Gavel, 
  AlertTriangle, Check, ChevronRight, FileBarChart, Mail,
  Loader2, AlertCircle, CheckCircle2
} from 'lucide-react';

// You can keep this import if you still use the modal elsewhere
import ReportTemplateModal from '../components/ReportTemplateModal'; 

const MeetingSummaryDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('minutes');
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  
  // State for Report Builder
  const [selectedTemplate, setSelectedTemplate] = useState('minutes');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert("Report generated successfully!");
    }, 2000);
  };

  const handleGenerateReportModal = (templateId: string) => {
    // For the modal version if needed
    console.log(templateId);
    setIsTemplateModalOpen(false);
  };

  // Mock data for the view
  const meetingData = {
    title: "Capstone Project Proposal Defense",
    date: "November 18, 2025",
    time: "10:00 AM - 11:30 AM",
    duration: "1h 30m",
    organizer: "Klariz Habla",
    attendees: 12,
  };

  // Data for Report Builder
  const reportSections = [
    { id: 1, title: "Executive Summary", desc: "High-level overview of the meeting outcomes.", icon: Type, color: "bg-purple-100 text-purple-600" },
    { id: 2, title: "Key Decisions", desc: "Approved items: Budget increase, timeline extension.", icon: Gavel, color: "bg-blue-100 text-blue-600" },
    { id: 3, title: "Next Steps & Action Items", desc: "3 items assigned to team members.", icon: CheckSquare, color: "bg-green-100 text-green-600" },
  ];

  const reportTemplates = [
    { id: 'minutes', name: 'Minutes of Meeting', desc: 'Standard formal record of discussion.', icon: FileText },
    { id: 'activity', name: 'Activity Report', desc: 'Focus on outcomes and metrics.', icon: FileBarChart },
    { id: 'memo', name: 'Memorandum', desc: 'Internal communication format.', icon: Mail },
  ];

  const tabs = [
    { id: 'minutes', label: 'Minutes of Meeting', icon: FileText },
    { id: 'generate', label: 'Generate Report', icon: FileOutput },
    { id: 'actions', label: 'Action Items', icon: CheckSquare },
    { id: 'transcript', label: 'Recording & Transcript', icon: Mic },
    { id: 'files', label: 'Shared Files', icon: File },
    { id: 'attendance', label: 'Attendance', icon: Users },
    { id: 'chat', label: 'Chat History', icon: MessageSquare },
    { id: 'breakout', label: 'Breakout Rooms', icon: LayoutGrid },
  ];

  return (
    <div className="p-6 md:p-8 bg-gray-50 dark:bg-slate-900 min-h-full relative">
      {/* Header (Restored to your original design) */}
      <div className="mb-6">
        <button 
          onClick={() => navigate('/meeting-history')}
          className="flex items-center text-gray-500 hover:text-gray-800 dark:text-slate-400 dark:hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to History
        </button>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{meetingData.title}</h1>
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-slate-400 mt-2">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {meetingData.date} • {meetingData.time}</span>
              <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-slate-600"></span>
              <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {meetingData.attendees} Attendees</span>
            </div>
          </div>
          <div className="flex gap-3">
            {/* Quick button to switch to generate tab */}
            <button 
              onClick={() => setActiveTab('generate')}
              className="px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-200 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors shadow-sm flex items-center gap-2"
            >
              <FilePlus className="w-4 h-4" /> Generate Report
            </button>
            <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-200 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors shadow-sm flex items-center gap-2">
              <Download className="w-4 h-4" /> Export
            </button>
            <button className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors shadow-sm flex items-center gap-2">
              <Upload className="w-4 h-4" /> Upload Formal Report
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-slate-700 mb-6 overflow-x-auto">
        <nav className="flex space-x-6 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-3 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors
                ${activeTab === tab.id 
                  ? 'border-violet-600 text-violet-600 dark:text-violet-400' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200'}
              `}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Contents */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 min-h-[400px]">
        
        {/* === TAB 1: MINUTES OF MEETING (The Formal View) === */}
        {activeTab === 'minutes' && (
          <div className="space-y-8">
            <section>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-violet-500 rounded-full"></span> Executive Summary
              </h3>
              <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-slate-300 text-sm leading-relaxed">
                <p>
                  The capstone proposal defense focused on the feasibility of the "Synthia" collaboration platform. 
                  Key discussions revolved around the tech stack selection, specifically the integration of real-time 
                  communication features using WebRTC. The panel provided feedback on the scope of the project, 
                  suggesting a phased rollout for the mobile application version.
                </p>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100 dark:border-slate-700">
               <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" /> Key Decisions
                  </h4>
                  <div className="space-y-3">
                     <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-100 dark:border-green-900/30">
                        <span className="text-sm text-gray-700 dark:text-slate-200">Proceed with React Native for mobile MVP.</span>
                     </div>
                     <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-100 dark:border-green-900/30">
                        <span className="text-sm text-gray-700 dark:text-slate-200">Adopt Supabase for backend infrastructure.</span>
                     </div>
                  </div>
               </div>
               <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500" /> Open Issues
                  </h4>
                  <div className="space-y-3">
                     <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100 dark:border-red-900/30">
                        <span className="text-sm text-gray-700 dark:text-slate-200">Budget approval for cloud hosting pending finance review.</span>
                     </div>
                  </div>
               </div>
            </section>
          </div>
        )}

        {/* === TAB 2: GENERATE REPORT (New Report Builder) === */}
        {activeTab === 'generate' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Report Builder */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-1">
                
                <div className="flex items-center justify-between mb-6 p-4">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-violet-500 rounded-full"></span>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Report Builder</h3>
                  </div>
                  <button className="text-sm text-violet-600 dark:text-violet-400 font-medium hover:underline">Clear All</button>
                </div>

                <div className="px-4">
                  <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 mb-3 uppercase tracking-wider">Quick Add Content</p>
                  <div className="flex flex-wrap gap-3 mb-8">
                    <button className="flex items-center gap-2 px-3 py-2 bg-purple-50 text-purple-700 border border-purple-200 rounded-lg text-xs font-semibold hover:bg-purple-100 transition-colors">
                      <Gavel className="w-3.5 h-3.5" /> + Key Decisions
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-colors">
                      <CheckSquare className="w-3.5 h-3.5" /> + Action Items
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg text-xs font-semibold hover:bg-green-100 transition-colors">
                      <Users className="w-3.5 h-3.5" /> + Attendee List
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 bg-orange-50 text-orange-700 border border-orange-200 rounded-lg text-xs font-semibold hover:bg-orange-100 transition-colors">
                      <AlertTriangle className="w-3.5 h-3.5" /> + Risks & Blockers
                    </button>
                  </div>

                  <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 mb-3 uppercase tracking-wider">Report Structure</p>
                  <div className="space-y-3 mb-6">
                    {reportSections.map((section) => (
                      <div key={section.id} className="flex items-center gap-3 p-3 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 hover:shadow-sm transition-shadow group cursor-move">
                        <GripVertical className="w-5 h-5 text-gray-300 dark:text-slate-600" />
                        <div className={`p-2 rounded-lg ${section.color}`}>
                          <section.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-bold text-gray-900 dark:text-white">{section.title}</h4>
                          <p className="text-xs text-gray-500 dark:text-slate-400">{section.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="w-full py-3 mb-4 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg text-sm font-medium text-gray-500 dark:text-slate-400 hover:border-violet-400 hover:text-violet-600 dark:hover:border-violet-500 transition-colors flex items-center justify-center gap-2">
                    <FilePlus className="w-4 h-4" /> Add Custom Section
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Template Selection */}
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <FilePlus className="w-5 h-5 text-blue-500" /> Select Template
                </h3>
                
                <div className="space-y-3 mb-6">
                  <p className="text-xs text-gray-500 dark:text-slate-400 mb-2">Choose a format for your final report:</p>
                  {reportTemplates.map((template) => {
                    const isSelected = selectedTemplate === template.id;
                    return (
                      <div 
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        className={`
                          relative p-4 border rounded-xl cursor-pointer transition-all
                          ${isSelected 
                            ? 'border-violet-600 bg-violet-50/50 dark:bg-violet-900/10 ring-1 ring-violet-600' 
                            : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-violet-300'}
                        `}
                      >
                        {isSelected && (
                          <div className="absolute top-3 right-3 text-violet-600">
                            <Check className="w-4 h-4" />
                          </div>
                        )}
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${isSelected ? 'bg-violet-100 text-violet-600' : 'bg-gray-100 text-gray-500 dark:bg-slate-700'}`}>
                            <template.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className={`text-sm font-bold ${isSelected ? 'text-violet-900 dark:text-violet-100' : 'text-gray-900 dark:text-white'}`}>
                              {template.name}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-slate-400 mt-1 leading-relaxed pr-2">
                              {template.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between mb-6 px-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Format</span>
                  <select className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-200 text-sm rounded-lg p-2 focus:ring-violet-500 focus:border-violet-500">
                    <option>PDF Document (.pdf)</option>
                    <option>Word Document (.docx)</option>
                  </select>
                </div>

                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-bold shadow-md shadow-violet-200 dark:shadow-none transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Generating...
                    </>
                  ) : (
                    <>
                      Generate & Download <Download className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* === ACTION ITEMS TAB === */}
        {activeTab === 'actions' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pending Tasks</h3>
              <button className="text-sm text-violet-600 font-medium hover:underline">+ Add Item</button>
            </div>
            {[
              { id: 1, text: "Revise Entity Relationship Diagram (ERD)", owner: "Klariz Habla", due: "Nov 25", status: "In Progress" },
              { id: 2, text: "Setup CI/CD Pipeline for staging", owner: "Dev Team", due: "Nov 22", status: "Pending" },
              { id: 3, text: "Draft user acceptance testing script", owner: "QA Lead", due: "Nov 28", status: "Pending" },
            ].map(item => (
              <div key={item.id} className="flex items-center p-4 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                <input aria-label="Mark as done" type="checkbox" className="w-5 h-5 text-violet-600 rounded border-gray-300 focus:ring-violet-500" />
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{item.text}</p>
                  <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">Assigned to: {item.owner} • Due: {item.due}</p>
                </div>
                <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* === OTHER TABS PLACEHOLDER === */}
        {(!['minutes', 'generate', 'actions'].includes(activeTab)) && (
          <div className="flex items-center justify-center h-64 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700">
              <div className="text-center text-gray-500">
                  <FileText className="w-10 h-10 mx-auto mb-3 opacity-20" />
                  <p>Content for {activeTab} goes here...</p>
              </div>
          </div>
        )}

      </div>

      <ReportTemplateModal 
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        onSelect={handleGenerateReportModal}
      />
    </div>
  );
};

export default MeetingSummaryDetail;