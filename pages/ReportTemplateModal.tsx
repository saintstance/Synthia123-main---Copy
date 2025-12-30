import React, { useState } from 'react';
import { X, FileText, Check, LayoutTemplate, ArrowRight } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const templates: Template[] = [
  {
    id: 'activity-report',
    name: 'Activity Report',
    description: 'Standard format for documenting completed events, focusing on outcomes and metrics.',
    icon: LayoutTemplate,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: 'minutes',
    name: 'Minutes of Meeting',
    description: 'Formal record of attendees, agenda items, discussions, and votes taken.',
    icon: FileText,
    color: 'bg-violet-100 text-violet-600',
  },
  {
    id: 'memo',
    name: 'Memorandum',
    description: 'Brief internal communication for announcements or policy updates.',
    icon: FileText,
    color: 'bg-emerald-100 text-emerald-600',
  }
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (templateId: string) => void;
}

const ReportTemplateModal: React.FC<Props> = ({ isOpen, onClose, onSelect }) => {
  const [selectedId, setSelectedId] = useState<string>(templates[0].id);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl transform overflow-hidden rounded-xl bg-white dark:bg-slate-800 shadow-2xl transition-all">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-700 px-6 py-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Generate Formal Report</h3>
              <p className="text-sm text-gray-500 dark:text-slate-400">Choose a template format for your document.</p>
            </div>
            <button aria-label="Close modal" onClick={onClose} className="rounded-full p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-500">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((template) => {
              const Icon = template.icon;
              const isSelected = selectedId === template.id;
              return (
                <div 
                  key={template.id}
                  onClick={() => setSelectedId(template.id)}
                  className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 ${isSelected ? 'border-violet-600 bg-violet-50/50 dark:bg-violet-900/10' : 'border-gray-100 dark:border-slate-700 hover:border-violet-200 dark:hover:border-slate-600 bg-white dark:bg-slate-800'}`}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-white">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                  <div className={`mb-3 inline-flex rounded-lg p-3 ${template.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className={`font-bold ${isSelected ? 'text-violet-700 dark:text-violet-300' : 'text-gray-900 dark:text-white'}`}>{template.name}</h4>
                  <p className="mt-1 text-xs text-gray-500 dark:text-slate-400 leading-relaxed">{template.description}</p>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-end gap-3 border-t border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50 px-6 py-4">
            <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-slate-300 hover:text-gray-900">Cancel</button>
            <button onClick={() => onSelect(selectedId)} className="flex items-center gap-2 rounded-lg bg-violet-600 px-6 py-2 text-sm font-semibold text-white shadow-md shadow-violet-200 dark:shadow-none hover:bg-violet-700 transition-all">
              Generate Document <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportTemplateModal;