"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentPage, setCurrentPage] = useState("home");
  const [pages, setPages] = useState(["Home", "Über uns", "Kontakt"]);
  const [editorContent, setEditorContent] = useState("");
  const [activeTab, setActiveTab] = useState("pages");
  const [savedPages, setSavedPages] = useState({});
  const [currentLanguage, setCurrentLanguage] = useState('de');
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    // Lade den Inhalt der aktuellen Seite, wenn sie sich ändert
    setEditorContent(savedPages[currentPage as keyof typeof savedPages] || "");
  }, [currentPage, savedPages]);

  useEffect(() => {
    const loadSavedPages = () => {
      const savedPagesObj: { [key: string]: string } = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('page_')) {
          const pageName = key.replace('page_', '');
          savedPagesObj[pageName] = localStorage.getItem(key) || '';
        }
      }
      setSavedPages(savedPagesObj);
      setPages(['Home', 'Über uns', 'Kontakt', ...Object.keys(savedPagesObj)]);
    };

    loadSavedPages();
  }, []);

  const handleLogin = () => {
    if (username === "admin" && password === "0") {
      setIsAuthenticated(true);
    } else {
      alert("Falscher Benutzername oder Passwort");
    }
  };

  const handleAddPage = () => {
    const newPage = prompt("Geben Sie den Namen der neuen Seite ein:");
    if (newPage) {
      setPages([...pages, newPage]);
    }
  };

  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage(lang);
    setEditorContent(translations[lang as keyof typeof translations] || '');
  };

  const handleSave = () => {
    setSavedPages({
      ...savedPages,
      [currentPage.toLowerCase()]: editorContent,
    });
    setTranslations({
      ...translations,
      [currentLanguage]: editorContent,
    });
    // Speichern Sie den Inhalt im localStorage
    localStorage.setItem(`page_${currentPage.toLowerCase()}`, editorContent);
    alert("Seite gespeichert!");
  };

  const handleDeleteElement = () => {
    if (currentPage.toLowerCase() === 'home' || currentPage.toLowerCase() === 'über uns' || currentPage.toLowerCase() === 'kontakt') {
      alert("Diese Seite kann nicht gelöscht werden.");
      return;
    }

    const confirmDelete = window.confirm(`Sind Sie sicher, dass Sie die Seite "${currentPage}" löschen möchten?`);
    if (confirmDelete) {
      const updatedPages = pages.filter(
        (page) => page.toLowerCase() !== currentPage.toLowerCase()
      );
      setPages(updatedPages);
      const updatedSavedPages: Record<string, string> = { ...savedPages };
      delete updatedSavedPages[currentPage.toLowerCase()];
      setSavedPages(updatedSavedPages);
      localStorage.removeItem(`page_${currentPage.toLowerCase()}`);
      setCurrentPage(updatedPages[0]?.toLowerCase() || "home");
      alert("Seite wurde gelöscht!");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <Input
                type="text"
                placeholder="Benutzername"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button onClick={handleLogin} className="w-full">
                Anmelden
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="mb-4">
        <Button
          onClick={() => setActiveTab("pages")}
          variant={activeTab === "pages" ? "default" : "outline"}
          className="mr-2"
        >
          Seiten
        </Button>
        <Button
          onClick={() => setActiveTab("design")}
          variant={activeTab === "design" ? "default" : "outline"}
        >
          Design
        </Button>
      </div>
      {activeTab === "pages" && (
        <div>
          <div className="flex space-x-4 mb-4">
            <select
              value={currentPage}
              onChange={(e) => setCurrentPage(e.target.value)}
              className="border p-2 rounded"
            >
              {pages.map((page) => (
                <option key={page} value={page.toLowerCase()}>
                  {page}
                </option>
              ))}
            </select>
            <Button onClick={handleAddPage}>Neue Seite hinzufügen</Button>
          </div>
          <div className="mb-4">
            <select
              value={currentLanguage}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="de">Deutsch</option>
              <option value="en">Englisch</option>
              <option value="fr">Französisch</option>
            </select>
          </div>
          <textarea
            className="w-full h-64 p-2 border rounded"
            value={editorContent}
            onChange={(e) => setEditorContent(e.target.value)}
            placeholder="Hier können Sie den Inhalt bearbeiten."
          />
          <div className="mt-4 space-x-2">
            <Button onClick={handleSave}>Speichern</Button>
            <Button 
              variant="outline" 
              onClick={handleDeleteElement}
              disabled={currentPage.toLowerCase() === 'home' || currentPage.toLowerCase() === 'über uns' || currentPage.toLowerCase() === 'kontakt'}
            >
              Seite löschen
            </Button>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Vorschau:</h2>
            <div
              className="border p-4 rounded"
              dangerouslySetInnerHTML={{ __html: editorContent }}
            />
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Gespeicherte Seiten:</h2>
            <ul>
              {Object.keys(savedPages).map((page) => (
                <li key={page}>
                  <Link href={`/${page}`}>{page}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {activeTab === "design" && (
        <Card>
          <CardHeader>
            <CardTitle>Design-Einstellungen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Primärfarbe</label>
                <Input type="color" defaultValue="#1a5f1a" />
              </div>
              <div>
                <label className="block mb-2">Schriftart</label>
                <select className="w-full p-2 border rounded">
                  <option>Arial</option>
                  <option>Helvetica</option>
                  <option>Times New Roman</option>
                  <option>Courier New</option>
                </select>
              </div>
              <div>
                <label className="block mb-2">Schriftgröße (px)</label>
                <Input type="number" defaultValue={16} min={8} max={24} />
              </div>
              <Button>Design speichern</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminPage;
