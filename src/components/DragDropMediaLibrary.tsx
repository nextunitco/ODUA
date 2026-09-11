import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Image as ImageIcon, 
  Trash2, 
  Copy, 
  Check, 
  Loader2, 
  AlertCircle, 
  GripVertical,
  Plus,
  ExternalLink,
  Search,
  FolderPlus,
  Sparkles,
  Maximize2
} from 'lucide-react';

export interface MediaItem {
  id: string;
  url: string;
  title: string;
  date: string;
  size: string;
}

interface DragDropMediaLibraryProps {
  mediaItems: MediaItem[];
  setMediaItems: React.Dispatch<React.SetStateAction<MediaItem[]>>;
  showNotification: (msg: string) => void;
  onSelectImage?: (url: string) => void;
}

export function DragDropMediaLibrary({
  mediaItems,
  setMediaItems,
  showNotification,
  onSelectImage
}: DragDropMediaLibraryProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Drag and drop reordering of media items
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleUploadFiles = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;

    setError(null);
    setUploading(true);

    const newItems: MediaItem[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > 50 * 1024 * 1024) continue;

      try {
        const base64Data = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        const sizeKb = Math.round(file.size / 1024);
        const sizeStr = sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`;

        try {
          const res = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: file.name,
              data: base64Data
            })
          });

          const data = await res.json();
          if (res.ok && data.success) {
            newItems.push({
              id: Date.now().toString() + '_' + i,
              url: data.url,
              title: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
              date: new Date().toISOString().split('T')[0],
              size: data.size || sizeStr
            });
          } else {
            newItems.push({
              id: Date.now().toString() + '_' + i,
              url: base64Data,
              title: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
              date: new Date().toISOString().split('T')[0],
              size: sizeStr
            });
          }
        } catch (uploadErr) {
          newItems.push({
            id: Date.now().toString() + '_' + i,
            url: base64Data,
            title: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
            date: new Date().toISOString().split('T')[0],
            size: sizeStr
          });
        }
      } catch (err: any) {
        console.error('File read error:', err);
      }
    }

    if (newItems.length > 0) {
      setMediaItems(prev => {
        const updated = [...newItems, ...prev];
        try {
          localStorage.setItem('odua_media_library', JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
      showNotification(`Successfully uploaded ${newItems.length} media asset(s)!`);
    } else {
      setError('Could not process dropped files. Please ensure your files are under 50MB.');
    }

    setUploading(false);
  };

  const handleDragOverZone = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeaveZone = () => {
    setIsDragOver(false);
  };

  const handleDropZone = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleUploadFiles(e.dataTransfer.files);
    }
  };

  // Reordering media grid via drag & drop
  const handleItemDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleItemDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleItemDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const updated = [...mediaItems];
    const [moved] = updated.splice(draggedIndex, 1);
    updated.splice(targetIndex, 0, moved);

    setMediaItems(updated);
    setDraggedIndex(null);
    setDragOverIndex(null);
    showNotification(`Reordered media gallery.`);
  };

  const copyUrl = (item: MediaItem) => {
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    showNotification('Image URL copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const deleteItem = async (id: string) => {
    const itemToDelete = mediaItems.find(m => m.id === id);
    if (itemToDelete && itemToDelete.url.startsWith('/uploads/')) {
      const fileName = itemToDelete.url.split('/').pop();
      if (fileName) {
        try {
          await fetch(`/api/uploads/${fileName}`, { method: 'DELETE' });
        } catch (e) {}
      }
    }
    const updated = mediaItems.filter(m => m.id !== id);
    setMediaItems(updated);
    try {
      localStorage.setItem('odua_media_library', JSON.stringify(updated));
    } catch (e) {}
    showNotification('Media asset removed.');
  };

  const filteredMedia = mediaItems.filter(m => 
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200 pb-4">
        <div>
          <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-emerald-600" /> Media & Image Library (Upload & Manage Images)
          </h2>
          <p className="text-xs text-neutral-500">
            Drag files directly from your computer into the drop zone below, or reorder assets via drag-and-drop.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Filter media assets..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-lg border border-neutral-300 text-xs focus:ring-2 focus:ring-[#2271b1] focus:outline-none"
            />
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3.5 py-1.5 bg-[#2271b1] hover:bg-[#135e96] text-white rounded-lg text-xs font-bold transition-all shadow flex items-center gap-1.5 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" /> Browse Files
          </button>
        </div>
      </div>

      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={(e) => e.target.files && handleUploadFiles(e.target.files)} 
        multiple 
        accept="image/*" 
        className="hidden" 
      />

      {/* Prominent Drag & Drop File Dropper Zone */}
      <div
        onDragOver={handleDragOverZone}
        onDragLeave={handleDragLeaveZone}
        onDrop={handleDropZone}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-2 relative overflow-hidden ${
          isDragOver 
            ? 'border-[#00a757] bg-[#00a757]/10 scale-[1.01] shadow-lg ring-4 ring-[#00a757]/20' 
            : 'border-neutral-300 bg-neutral-50/70 hover:bg-neutral-50 hover:border-[#2271b1]'
        }`}
      >
        {uploading ? (
          <div className="py-4 space-y-2 flex flex-col items-center">
            <Loader2 className="w-8 h-8 text-[#00a757] animate-spin" />
            <p className="text-xs font-bold text-neutral-800">Uploading and processing files...</p>
            <p className="text-[10px] text-neutral-400 font-mono">Writing to server and database</p>
          </div>
        ) : (
          <>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform ${
              isDragOver ? 'scale-125 bg-[#00a757] text-white' : 'bg-white text-[#2271b1] shadow-sm'
            }`}>
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-neutral-800">
                {isDragOver ? 'Drop files here to upload instantly!' : 'Drag & drop image files anywhere here'}
              </p>
              <p className="text-xs text-neutral-500 mt-0.5">
                or <span className="text-[#2271b1] font-bold underline">click to browse</span> from your device
              </p>
            </div>
            <span className="text-[10px] text-neutral-400 font-mono">Supports PNG, JPG, WEBP, SVG, GIF (Multi-upload supported)</span>
          </>
        )}
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Media Grid with Drag Reorder */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-neutral-500 font-mono">
          <span>{filteredMedia.length} Media Asset(s)</span>
          <span>Tip: Drag images by their corner handle to reorder the library</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredMedia.map((item, index) => {
            const isDragging = draggedIndex === index;
            const isDropTarget = dragOverIndex === index;

            return (
              <div 
                key={item.id}
                draggable={true}
                onDragStart={(e) => handleItemDragStart(e, index)}
                onDragOver={(e) => handleItemDragOver(e, index)}
                onDrop={(e) => handleItemDrop(e, index)}
                className={`bg-white rounded-xl border overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between ${
                  isDragging 
                    ? 'opacity-30 border-dashed border-emerald-500' 
                    : isDropTarget
                      ? 'border-[#00a757] ring-2 ring-[#00a757] scale-105'
                      : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                {/* Thumbnail Preview */}
                <div className="h-32 bg-neutral-100 relative overflow-hidden flex items-center justify-center">
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600';
                    }}
                  />

                  {/* Drag Handle Top Left */}
                  <div 
                    className="absolute top-2 left-2 p-1 rounded-md bg-black/60 text-white cursor-grab active:cursor-grabbing hover:bg-black transition-colors"
                    title="Drag to reorder"
                  >
                    <GripVertical className="w-3.5 h-3.5" />
                  </div>

                  {/* Hover Overlay Buttons */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                    {onSelectImage && (
                      <button
                        type="button"
                        onClick={() => onSelectImage(item.url)}
                        className="p-1.5 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                        title="Use as Image"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button 
                      type="button"
                      onClick={() => setPreviewImage(item.url)}
                      className="p-1.5 rounded-full bg-white text-neutral-900 hover:bg-neutral-100 transition-colors"
                      title="Preview Full Size"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      type="button"
                      onClick={() => copyUrl(item)}
                      className="p-1.5 rounded-full bg-white text-neutral-900 hover:bg-neutral-100 transition-colors"
                      title="Copy URL"
                    >
                      {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button 
                      type="button"
                      onClick={() => deleteItem(item.id)}
                      className="p-1.5 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
                      title="Delete Asset"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Footer Details */}
                <div className="p-2.5 text-xs bg-white border-t border-neutral-100">
                  <p className="font-bold text-neutral-800 truncate" title={item.title}>{item.title}</p>
                  <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono mt-0.5">
                    <span>{item.size}</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Image Preview Modal */}
      {previewImage && (
        <div 
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6 backdrop-blur-sm cursor-pointer"
        >
          <div className="max-w-4xl max-h-[85vh] bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl p-2 relative" onClick={(e) => e.stopPropagation()}>
            <img src={previewImage} alt="Full Preview" className="max-h-[75vh] w-auto mx-auto object-contain rounded-xl" />
            <div className="p-3 text-center flex items-center justify-between text-xs text-white">
              <span className="font-mono text-[11px] truncate max-w-lg">{previewImage}</span>
              <button 
                onClick={() => setPreviewImage(null)}
                className="px-3 py-1 bg-white/20 hover:bg-white/30 text-white rounded-lg font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
