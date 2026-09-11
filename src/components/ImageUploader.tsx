import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  FileText, 
  ExternalLink, 
  X, 
  FolderOpen,
  Check
} from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  acceptType?: 'image' | 'document' | 'all';
  helperText?: string;
}

export function ImageUploader({ 
  value, 
  onChange, 
  label = "Media / Photo / Document Upload", 
  acceptType = 'all',
  helperText 
}: ImageUploaderProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [serverUploads, setServerUploads] = useState<Array<{ filename: string; url: string; size: string }>>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isDocument = value && (
    value.toLowerCase().endsWith('.pdf') || 
    value.toLowerCase().endsWith('.doc') || 
    value.toLowerCase().endsWith('.docx') || 
    value.toLowerCase().endsWith('.zip') ||
    value.startsWith('data:application/')
  );

  const acceptMime = acceptType === 'image' 
    ? 'image/*' 
    : acceptType === 'document' 
      ? '.pdf,.doc,.docx,.xlsx,.ppt,.pptx,application/pdf' 
      : 'image/*,.pdf,.doc,.docx,.xlsx,.ppt,.pptx,application/pdf';

  const defaultHelper = acceptType === 'image'
    ? 'PNG, JPG, WEBP, SVG up to 50MB'
    : acceptType === 'document'
      ? 'PDF, DOC, DOCX up to 50MB'
      : 'Images (PNG, JPG, SVG) or Documents (PDF, DOC) up to 50MB';

  const handleFile = async (file: File) => {
    if (!file) return;

    // Limit to 50MB
    if (file.size > 50 * 1024 * 1024) {
      setError('File size exceeds the 50MB maximum limit.');
      return;
    }

    setError(null);
    setUploading(true);

    try {
      // Read file as base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = reader.result as string;
        try {
          const response = await fetch('/api/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: file.name,
              data: base64Data,
            }),
          });

          const result = await response.json();
          if (response.ok && result.success) {
            onChange(result.url);
          } else {
            // Fallback gracefully to base64 data URL so upload is never lost
            console.warn('Server upload fallback to base64 data URI:', result?.message);
            onChange(base64Data);
          }
        } catch (err: any) {
          console.warn('Network upload fallback to base64:', err);
          // Graceful fallback to client-side base64
          onChange(base64Data);
        } finally {
          setUploading(false);
        }
      };
      
      reader.onerror = () => {
        setError('Failed to read local file contents.');
        setUploading(false);
      };

      reader.readAsDataURL(file);
    } catch (err: any) {
      setError(err.message || 'An error occurred during file upload.');
      setUploading(false);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  // Open media library selector
  const openMediaPicker = async () => {
    setIsMediaModalOpen(true);
    setLoadingMedia(true);
    try {
      const res = await fetch('/api/uploads');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.files)) {
          setServerUploads(data.files);
        }
      }
    } catch (e) {
      console.error('Error fetching uploads list:', e);
    } finally {
      setLoadingMedia(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="block text-[10px] font-black uppercase text-neutral-500 font-mono">
          {label}
        </label>
        <div className="flex items-center gap-2">
          {value && (
            <span className="text-[9px] font-mono font-bold bg-green-50 text-green-700 px-2 py-0.5 rounded border border-green-200 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> {value.startsWith('/uploads/') ? 'Server File' : value.startsWith('data:') ? 'Base64 File' : 'Linked Asset'}
            </span>
          )}
          <button
            type="button"
            onClick={openMediaPicker}
            className="text-[9px] font-bold text-neutral-600 hover:text-[#00a757] bg-neutral-100 hover:bg-neutral-200 px-2 py-0.5 rounded flex items-center gap-1 transition-colors cursor-pointer"
          >
            <FolderOpen className="w-3 h-3" /> Media Library
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Direct Link Input and Dropzone (Left/Top) */}
        <div className="md:col-span-7 flex flex-col justify-between gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
              <LinkIcon className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              value={value}
              onChange={(e) => {
                setError(null);
                onChange(e.target.value);
              }}
              placeholder="Paste direct URL link (e.g. https://...)"
              className="w-full pl-9 pr-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-mono text-neutral-800"
            />
          </div>
          
          {/* Visual Drop Area */}
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 min-h-[100px] ${
              isDragActive 
                ? 'border-[#00a757] bg-[#00a757]/5' 
                : 'border-neutral-200 hover:border-[#00a757] hover:bg-neutral-50/50'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept={acceptMime}
              className="hidden"
            />
            
            {uploading ? (
              <div className="space-y-1.5 flex flex-col items-center py-2">
                <Loader2 className="w-5 h-5 text-[#00a757] animate-spin" />
                <span className="text-[10px] font-mono text-neutral-500">Uploading file to server...</span>
              </div>
            ) : (
              <div className="space-y-1">
                <Upload className="w-5 h-5 text-neutral-400 mx-auto" />
                <p className="text-[11px] font-semibold text-neutral-700">Drag & Drop file, or <span className="text-[#00a757] underline">Browse Computer</span></p>
                <p className="text-[9px] font-light text-neutral-400">{helperText || defaultHelper}</p>
              </div>
            )}
          </div>
        </div>

        {/* Live Preview / File Card (Right/Bottom) */}
        <div className="md:col-span-5 flex flex-col justify-center items-center p-2.5 bg-neutral-50 rounded-2xl border border-neutral-100 min-h-[148px] relative overflow-hidden group">
          {value ? (
            isDocument ? (
              <div className="w-full h-full p-3 bg-white rounded-xl border border-neutral-200 flex flex-col justify-between items-center text-center">
                <FileText className="w-8 h-8 text-[#00a757] mb-1" />
                <p className="text-[10px] font-bold text-neutral-800 break-all line-clamp-2 max-w-[180px]">
                  {value.split('/').pop() || 'Document Asset'}
                </p>
                <div className="flex gap-2 mt-2">
                  <a
                    href={value}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[9px] font-bold text-[#00a757] hover:underline flex items-center gap-1"
                  >
                    <span>View</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => onChange('')}
                    className="text-[9px] font-bold text-red-600 hover:underline"
                  >
                    Clear
                  </button>
                </div>
              </div>
            ) : (
              <>
                <img
                  src={value}
                  alt="Upload preview"
                  className="w-full h-full max-h-[130px] object-cover rounded-lg border border-neutral-200"
                  onError={(e) => {
                    // Fallback for image load failure
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800';
                  }}
                  referrerPolicy="no-referrer"
                />
                <button
                  type="button"
                  onClick={() => onChange('')}
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center text-white text-[10px] font-bold rounded-lg gap-1.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" /> Clear / Remove
                </button>
              </>
            )
          ) : (
            <div className="text-center text-neutral-400 space-y-1">
              <ImageIcon className="w-6 h-6 mx-auto stroke-1 text-neutral-300" />
              <p className="text-[10px] font-mono">No Media Selected</p>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="text-[10px] font-semibold text-red-600 flex items-center gap-1.5 bg-red-50 p-2 rounded-xl border border-red-100">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Media Library Picker Modal */}
      {isMediaModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-neutral-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-neutral-900">Select From Media Library</h3>
                <p className="text-xs text-neutral-500 font-light">Choose any previously uploaded asset or click to select</p>
              </div>
              <button
                type="button"
                onClick={() => setIsMediaModalOpen(false)}
                className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto flex-1 max-h-[60vh]">
              {loadingMedia ? (
                <div className="flex flex-col items-center justify-center py-12 text-neutral-400">
                  <Loader2 className="w-6 h-6 animate-spin mb-2 text-[#00a757]" />
                  <span className="text-xs font-mono">Loading media assets...</span>
                </div>
              ) : serverUploads.length === 0 ? (
                <div className="text-center py-12 text-neutral-400 space-y-2">
                  <ImageIcon className="w-10 h-10 mx-auto text-neutral-300" />
                  <p className="text-xs font-medium">No files uploaded to the server yet.</p>
                  <p className="text-[10px] text-neutral-400">Use the upload dropzone to add your first file!</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {serverUploads.map((item) => {
                    const isSelected = value === item.url;
                    const isDoc = item.filename.toLowerCase().endsWith('.pdf') || item.filename.toLowerCase().endsWith('.doc');
                    return (
                      <div
                        key={item.url}
                        onClick={() => {
                          onChange(item.url);
                          setIsMediaModalOpen(false);
                        }}
                        className={`group relative rounded-xl border-2 p-2 cursor-pointer transition-all hover:shadow-md flex flex-col justify-between ${
                          isSelected ? 'border-[#00a757] bg-emerald-50/40 ring-2 ring-[#00a757]/30' : 'border-neutral-200 hover:border-[#00a757]'
                        }`}
                      >
                        <div className="h-24 w-full bg-neutral-100 rounded-lg overflow-hidden flex items-center justify-center">
                          {isDoc ? (
                            <FileText className="w-8 h-8 text-neutral-500" />
                          ) : (
                            <img
                              src={item.url}
                              alt={item.filename}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                              referrerPolicy="no-referrer"
                            />
                          )}
                        </div>
                        <div className="mt-2 flex justify-between items-center text-[10px]">
                          <span className="font-mono text-neutral-700 truncate max-w-[120px]" title={item.filename}>
                            {item.filename}
                          </span>
                          <span className="text-neutral-400 text-[9px] shrink-0">{item.size}</span>
                        </div>
                        {isSelected && (
                          <div className="absolute top-3 right-3 bg-[#00a757] text-white p-1 rounded-full shadow">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="p-4 border-t border-neutral-100 bg-neutral-50 flex justify-between items-center text-xs">
              <span className="text-neutral-500 font-mono text-[10px]">
                {serverUploads.length} uploaded file(s) available
              </span>
              <button
                type="button"
                onClick={() => setIsMediaModalOpen(false)}
                className="px-4 py-2 bg-neutral-900 text-white rounded-xl text-xs font-bold hover:bg-neutral-800 transition-colors"
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
