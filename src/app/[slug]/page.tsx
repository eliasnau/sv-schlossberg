"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function DynamicPage() {
  const params = useParams();
  const [pageContent, setPageContent] = useState<string | null>(null);

  useEffect(() => {
    const content = localStorage.getItem(`page_${params.slug}`);
    setPageContent(content);
  }, [params.slug]);

  if (pageContent === null) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">404 - Seite nicht gefunden</h1>
        <p>Die angeforderte Seite existiert nicht.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div dangerouslySetInnerHTML={{ __html: pageContent }} />
    </div>
  );
}
