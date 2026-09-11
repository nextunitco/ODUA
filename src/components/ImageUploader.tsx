import React, { useState, useRef } from 'react';
import { Upload, Link as LinkIcon, Image as ImageIcon, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUploader({ value, onChange, label = "Image Accent / Logo / Photo" }: ImageUploaderProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (PNG, JPG, JPEG, WEBP, SVG, etc.)');
      return;
    }

    // Limit to 5MB
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be under 5MB.');
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
            throw new Error(result.message || 'Failed to upload image');
          }
        } catch (err: any) {
          console.error(err);
          setError(err.message || 'Failed to upload image to server');
        } finally {
          setUploading(false);
        }
      };
      
      reader.onerror = () => {
        setError('Failed to read file contents.');
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

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="block text-[10px] font-black uppercase text-neutral-500 font-mono">
          {label}
        </label>
        {value && value.startsWith('/uploads/') && (
          <span className="text-[9px] font-mono font-bold bg-green-50 text-green-700 px-2 py-0.5 rounded border border-green-200 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> Uploaded File
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* URL Link Input (Left/Top) */}
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
              placeholder="Paste direct image link (e.g., https://...)"
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
              accept="image/*"
              className="hidden"
            />
            
            {uploading ? (
              <div className="space-y-1.5 flex flex-col items-center py-2">
                <Loader2 className="w-5 h-5 text-[#00a757] animate-spin" />
                <span className="text-[10px] font-mono text-neutral-500">Uploading file...</span>
              </div>
            ) : (
              <div className="space-y-1">
                <Upload className="w-5 h-5 text-neutral-400 mx-auto" />
                <p className="text-[11px] font-semibold text-neutral-700">Drag & Drop file, or <span className="text-[#00a757] underline">Browse</span></p>
                <p className="text-[9px] font-light text-neutral-400">PNG, JPG, WEBP, SVG up to 5MB</p>
              </div>
            )}
          </div>
        </div>

        {/* Live Thumbnail Preview (Right/Bottom) */}
        <div className="md:col-span-5 flex flex-col justify-center items-center p-2.5 bg-neutral-50 rounded-2xl border border-neutral-100 min-h-[148px] relative overflow-hidden group">
          {value ? (
            <>
              <img
                src={value}
                alt="Upload preview"
                className="w-full h-full max-h-[130px] object-cover rounded-lg border border-neutral-200"
                onError={(e) => {
                  // If image URL fails to load, show beautiful placeholder
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800';
                }}
              />
              <button
                type="button"
                onClick={() => onChange('')}
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center text-white text-[10px] font-bold rounded-lg gap-1.5"
              >
                Clear / Remove
              </button>
            </>
          ) : (
            <div className="text-center text-neutral-400 space-y-1">
              <ImageIcon className="w-6 h-6 mx-auto stroke-1 text-neutral-300" />
              <p className="text-[10px] font-mono">No Image</p>
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
    </div>
  );
}
