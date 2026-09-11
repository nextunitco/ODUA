import React from 'react';

interface LivePageTextEditorProps {
  currentPage?: string;
  onOpenFullAdmin?: () => void;
}

export default function LivePageTextEditor({ currentPage, onOpenFullAdmin }: LivePageTextEditorProps) {
  // Removed per user request: "remove this editted hardcoaded element button"
  return null;
}
