import React, { useState } from 'react';
import { 
  GripVertical, 
  ArrowUp, 
  ArrowDown, 
  Plus, 
  Trash2, 
  Eye, 
  EyeOff, 
  Save, 
  Check, 
  ExternalLink,
  Menu,
  Sparkles,
  RefreshCw,
  FolderPlus
} from 'lucide-react';

export interface MenuItem {
  id: string;
  label: string;
  targetPage: string;
  url?: string;
  visible: boolean;
  isExternal?: boolean;
}

interface DragDropMenuBuilderProps {
  initialMenuItems?: MenuItem[];
  onSaveMenu: (items: MenuItem[]) => Promise<void>;
  showNotification: (msg: string) => void;
  availablePages: Array<{ id: string; title: string }>;
}

export const DEFAULT_MENU_ITEMS: MenuItem[] = [
  { id: 'm_home', label: 'Home', targetPage: 'Home', visible: true },
  { id: 'm_about', label: 'About Us', targetPage: 'About Us', visible: true },
  { id: 'm_who_we_are', label: 'Who We Are', targetPage: 'Who We Are', visible: true },
  { id: 'm_history', label: 'Our History', targetPage: 'Our History', visible: true },
  { id: 'm_board', label: 'Board of Directors', targetPage: 'Board of Directors', visible: true },
  { id: 'm_leadership', label: 'Leadership Team', targetPage: 'Leadership Team', visible: true },
  { id: 'm_portfolio', label: 'Portfolio', targetPage: 'Portfolio', visible: true },
  { id: 'm_subsidiaries', label: 'Subsidiaries', targetPage: 'Our Subsidiaries', visible: true },
  { id: 'm_projects', label: 'Ongoing Projects', targetPage: 'Ongoing Projects', visible: true },
  { id: 'm_governance', label: 'Governance', targetPage: 'Governance', visible: true },
  { id: 'm_foundation', label: 'Foundation', targetPage: 'Odu\'a Foundation', visible: true },
  { id: 'm_jubilee', label: 'Golden Jubilee', targetPage: 'Golden Jubilee', visible: true },
  { id: 'm_media', label: 'Media & News', targetPage: 'Media', visible: true },
  { id: 'm_careers', label: 'Careers', targetPage: 'Careers', visible: true },
  { id: 'm_contact', label: 'Contact', targetPage: 'Contact', visible: true }
];

export function DragDropMenuBuilder({
  initialMenuItems,
  onSaveMenu,
  showNotification,
  availablePages
}: DragDropMenuBuilderProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(
    initialMenuItems && initialMenuItems.length > 0 ? initialMenuItems : DEFAULT_MENU_ITEMS
  );

  // New Item State
  const [newLabel, setNewLabel] = useState('');
  const [newTargetPage, setNewTargetPage] = useState(availablePages[0]?.id || 'Home');
  const [newCustomUrl, setNewCustomUrl] = useState('');
  const [isCustomUrl, setIsCustomUrl] = useState(false);
  const [saving, setSaving] = useState(false);

  // Drag and Drop State
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
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

    const updated = [...menuItems];
    const [moved] = updated.splice(draggedIndex, 1);
    updated.splice(targetIndex, 0, moved);

    setMenuItems(updated);
    setDraggedIndex(null);
    setDragOverIndex(null);
    showNotification(`Reordered menu item "${moved.label}" to position ${targetIndex + 1}!`);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= menuItems.length) return;

    const updated = [...menuItems];
    const [moved] = updated.splice(index, 1);
    updated.splice(target, 0, moved);
    setMenuItems(updated);
    showNotification(`Moved "${moved.label}" ${direction}!`);
  };

  const toggleVisibility = (id: string) => {
    setMenuItems(menuItems.map(m => m.id === id ? { ...m, visible: !m.visible } : m));
    const item = menuItems.find(m => m.id === id);
    if (item) {
      showNotification(`Menu item "${item.label}" ${item.visible ? 'Hidden from Navbar' : 'Shown on Navbar'}.`);
    }
  };

  const deleteItem = (id: string) => {
    const item = menuItems.find(m => m.id === id);
    setMenuItems(menuItems.filter(m => m.id !== id));
    showNotification(`Removed "${item?.label || 'Item'}" from navigation menu.`);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel.trim()) return;

    const newItem: MenuItem = {
      id: `m_${Date.now()}`,
      label: newLabel.trim(),
      targetPage: isCustomUrl ? '' : newTargetPage,
      url: isCustomUrl ? newCustomUrl.trim() : undefined,
      visible: true,
      isExternal: isCustomUrl
    };

    setMenuItems([...menuItems, newItem]);
    setNewLabel('');
    setNewCustomUrl('');
    showNotification(`Added "${newItem.label}" to navigation menu!`);
  };

  const handleResetToDefault = () => {
    setMenuItems(DEFAULT_MENU_ITEMS);
    showNotification('Reset menu to standard corporate layout.');
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await onSaveMenu(menuItems);
      showNotification('Navigation menu layout saved and published live across website!');
    } catch (err: any) {
      showNotification(`Failed to save menu: ${err.message || 'Error'}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200 pb-4">
        <div>
          <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
            <Menu className="w-4 h-4 text-emerald-600" /> Navigation Menu Builder (Header & Main Navigation)
          </h3>
          <p className="text-xs text-neutral-500">
            Drag items using the handle (<strong>⋮⋮</strong>) to reorder the main website navbar. Hide, edit, or add custom links.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            type="button" 
            onClick={handleResetToDefault}
            className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
          >
            Reset Default Menu
          </button>
          <button 
            type="button" 
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-1.5 bg-[#00a757] hover:bg-[#008f49] text-white rounded-lg text-xs font-bold transition-all shadow flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>{saving ? 'Saving...' : 'Save & Publish Menu'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left (7 Cols): Draggable Menu Items List */}
        <div className="lg:col-span-7 space-y-2.5">
          <div className="flex items-center justify-between px-1 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 font-mono">
              Active Header Menu Items ({menuItems.length})
            </span>
            <span className="text-[10px] text-neutral-400">Drag to reorder hierarchy</span>
          </div>

          <div className="space-y-2">
            {menuItems.map((item, index) => {
              const isDragging = draggedIndex === index;
              const isDropTarget = dragOverIndex === index;

              return (
                <div
                  key={item.id}
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`group flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-200 select-none ${
                    isDragging 
                      ? 'opacity-30 border-2 border-dashed border-emerald-500 bg-emerald-50/20 scale-[0.98]' 
                      : isDropTarget
                        ? 'border-2 border-dashed border-[#00a757] bg-emerald-50/60 shadow-md scale-[1.01]'
                        : 'border-neutral-200/90 bg-white hover:border-neutral-300 hover:shadow-md shadow-xs'
                  } ${!item.visible ? 'opacity-65 bg-neutral-50/80 border-dashed' : ''}`}
                >
                  {/* Left: Drag Handle & Title */}
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div 
                      className="w-8 h-8 rounded-xl bg-neutral-100/90 group-hover:bg-neutral-200/80 text-neutral-400 group-hover:text-neutral-700 flex items-center justify-center cursor-grab active:cursor-grabbing shrink-0 transition-colors border border-neutral-200/60 shadow-2xs"
                      title="Drag to reorder"
                    >
                      <GripVertical className="w-4 h-4" />
                    </div>

                    <div className="w-7 h-7 rounded-xl bg-neutral-900 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 shadow-2xs">
                      {index + 1}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-serif font-bold text-sm text-neutral-900 tracking-tight leading-snug group-hover:text-emerald-800 transition-colors truncate">
                          {item.label}
                        </span>
                        {item.isExternal ? (
                          <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md font-mono border border-blue-200/80 font-bold uppercase tracking-wider">
                            External Link
                          </span>
                        ) : (
                          <span className="text-[10px] bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-md font-mono border border-neutral-200/60 font-semibold">
                            Target: {item.targetPage}
                          </span>
                        )}
                        {!item.visible && (
                          <span className="text-[10px] bg-amber-100/80 text-amber-800 px-2 py-0.5 rounded-md font-bold font-mono border border-amber-200/80">
                            Hidden from Nav
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-0.5 bg-neutral-50/90 border border-neutral-200/80 p-1 rounded-xl shadow-2xs shrink-0">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => moveItem(index, 'up')}
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-white hover:shadow-2xs disabled:opacity-20 disabled:hover:bg-transparent transition-all cursor-pointer"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      disabled={index === menuItems.length - 1}
                      onClick={() => moveItem(index, 'down')}
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-white hover:shadow-2xs disabled:opacity-20 disabled:hover:bg-transparent transition-all cursor-pointer"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>

                    <div className="w-px h-3.5 bg-neutral-200 mx-0.5"></div>

                    <button
                      type="button"
                      onClick={() => toggleVisibility(item.id)}
                      className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                        item.visible 
                          ? 'text-neutral-500 hover:text-neutral-900 hover:bg-white hover:shadow-2xs' 
                          : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                      }`}
                      title={item.visible ? 'Hide from Nav' : 'Show on Nav'}
                    >
                      {item.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteItem(item.id)}
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 hover:shadow-2xs transition-all cursor-pointer"
                      title="Delete Item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right (5 Cols): Add New Menu Item Card */}
        <div className="lg:col-span-5 space-y-4">
          <form onSubmit={handleAddItem} className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-800 font-mono flex items-center gap-2">
              <FolderPlus className="w-4 h-4 text-emerald-600" /> Add Navigation Link
            </h4>

            <div>
              <label className="block text-[10px] font-bold uppercase text-neutral-600 mb-1">
                Navigation Button Label
              </label>
              <input 
                type="text" 
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder="E.g., Investor Desk, Sustainability"
                className="w-full p-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-[#00a757] focus:outline-none font-bold"
                required
              />
            </div>

            <div className="flex items-center gap-3 text-xs">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input 
                  type="radio" 
                  name="linkType" 
                  checked={!isCustomUrl} 
                  onChange={() => setIsCustomUrl(false)} 
                  className="text-[#00a757]"
                />
                <span className="font-semibold text-neutral-800">Internal Page</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input 
                  type="radio" 
                  name="linkType" 
                  checked={isCustomUrl} 
                  onChange={() => setIsCustomUrl(true)} 
                  className="text-[#00a757]"
                />
                <span className="font-semibold text-neutral-800">Custom External URL</span>
              </label>
            </div>

            {!isCustomUrl ? (
              <div>
                <label className="block text-[10px] font-bold uppercase text-neutral-600 mb-1">
                  Target Destination Page
                </label>
                <select 
                  value={newTargetPage}
                  onChange={(e) => setNewTargetPage(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-[#00a757] focus:outline-none bg-neutral-50 font-semibold"
                >
                  {availablePages.map(p => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <label className="block text-[10px] font-bold uppercase text-neutral-600 mb-1">
                  External URL Destination
                </label>
                <input 
                  type="url" 
                  value={newCustomUrl}
                  onChange={(e) => setNewCustomUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full p-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-[#00a757] focus:outline-none font-mono"
                  required
                />
              </div>
            )}

            <button 
              type="submit" 
              className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition-all shadow flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-emerald-400" /> Add to Navigation Menu
            </button>
          </form>

          {/* Quick Info Box */}
          <div className="bg-[#1d2327] text-white p-4 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" /> Real-time Navbar Sync
            </div>
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              When you click "Save & Publish Menu", the header navigation bar, mobile menu drawer, and quick links will immediately re-render in your customized sequence.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
