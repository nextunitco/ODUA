import React, { useState } from 'react';
import { 
  GripVertical, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  EyeOff, 
  Sparkles, 
  Sliders, 
  Activity, 
  FileText, 
  Globe, 
  TrendingUp, 
  ShieldCheck, 
  BarChart3,
  Clock,
  Layers
} from 'lucide-react';

export interface DashboardWidget {
  id: string;
  title: string;
  category: string;
  icon: any;
  visible: boolean;
  colSpan: 'full' | 'half';
}

interface DragDropDashboardWidgetsProps {
  widgets: DashboardWidget[];
  setWidgets: React.Dispatch<React.SetStateAction<DashboardWidget[]>>;
  showNotification: (msg: string) => void;
}

export const DEFAULT_DASHBOARD_WIDGETS: DashboardWidget[] = [
  { id: 'w_health', title: 'System Health & Engine Telemetry', category: 'Security & DevOps', icon: ShieldCheck, visible: true, colSpan: 'half' },
  { id: 'w_draft', title: 'Quick Draft Article Dispatcher', category: 'Publishing', icon: FileText, visible: true, colSpan: 'half' },
  { id: 'w_states', title: 'Sovereign SW States Alliance Hub', category: 'Governance', icon: Globe, visible: true, colSpan: 'half' },
  { id: 'w_stats', title: 'Financial Asset Base & Sector Stats', category: 'Fiduciary', icon: TrendingUp, visible: true, colSpan: 'half' },
  { id: 'w_news', title: 'Recent Corporate Press & Publications', category: 'Media', icon: Activity, visible: true, colSpan: 'full' }
];

export function DragDropDashboardWidgets({
  widgets,
  setWidgets,
  showNotification
}: DragDropDashboardWidgetsProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const updated = [...widgets];
    const [moved] = updated.splice(draggedIndex, 1);
    updated.splice(targetIndex, 0, moved);

    setWidgets(updated);
    setDraggedIndex(null);
    setDragOverIndex(null);
    showNotification(`Reordered widget "${moved.title}"!`);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const moveWidget = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= widgets.length) return;

    const updated = [...widgets];
    const [moved] = updated.splice(index, 1);
    updated.splice(target, 0, moved);
    setWidgets(updated);
    showNotification(`Moved "${moved.title}" ${direction}!`);
  };

  const toggleVisibility = (id: string) => {
    setWidgets(widgets.map(w => w.id === id ? { ...w, visible: !w.visible } : w));
    const target = widgets.find(w => w.id === id);
    if (target) {
      showNotification(`Widget "${target.title}" is now ${target.visible ? 'Hidden' : 'Visible'}.`);
    }
  };

  return (
    <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-neutral-700 font-mono flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-emerald-600" /> Customize Dashboard Layout (Drag & Drop)
        </span>
        <span className="text-[11px] text-neutral-400">
          Drag handles to prioritize widgets
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
        {widgets.map((widget, index) => {
          const isDragging = draggedIndex === index;
          const isDropTarget = dragOverIndex === index;
          const IconComp = widget.icon;

          return (
            <div
              key={widget.id}
              draggable={true}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className={`p-2.5 rounded-xl border transition-all duration-200 select-none flex items-center justify-between gap-2 ${
                isDragging
                  ? 'opacity-30 border-dashed border-emerald-500 bg-emerald-50'
                  : isDropTarget
                    ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/50'
                    : 'border-neutral-200 bg-white hover:border-neutral-300 shadow-sm'
              } ${!widget.visible ? 'opacity-60 bg-neutral-100' : ''}`}
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <div 
                  className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-neutral-100 text-neutral-400 hover:text-neutral-900 transition-colors"
                  title="Drag to reorder"
                >
                  <GripVertical className="w-3.5 h-3.5" />
                </div>
                <div className="w-5 h-5 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <IconComp className="w-3 h-3" />
                </div>
                <div className="truncate">
                  <p className="font-bold text-[11px] text-neutral-800 truncate">{widget.title}</p>
                  <span className="text-[9px] font-mono text-neutral-400">{widget.category}</span>
                </div>
              </div>

              <div className="flex items-center gap-0.5 shrink-0">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => moveWidget(index, 'up')}
                  className="p-1 text-neutral-400 hover:text-neutral-800 disabled:opacity-20 transition-colors cursor-pointer"
                  title="Move Left/Up"
                >
                  <ArrowUp className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  disabled={index === widgets.length - 1}
                  onClick={() => moveWidget(index, 'down')}
                  className="p-1 text-neutral-400 hover:text-neutral-800 disabled:opacity-20 transition-colors cursor-pointer"
                  title="Move Right/Down"
                >
                  <ArrowDown className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => toggleVisibility(widget.id)}
                  className={`p-1 rounded transition-colors cursor-pointer ${
                    widget.visible ? 'text-neutral-600 hover:text-neutral-900' : 'bg-amber-100 text-amber-800'
                  }`}
                  title={widget.visible ? 'Hide Widget' : 'Show Widget'}
                >
                  {widget.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
