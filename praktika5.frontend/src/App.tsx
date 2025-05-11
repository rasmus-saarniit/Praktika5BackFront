import React, { useState } from 'react';
import LoginPage from './LoginPage';
import BookListPage from './BookListPage';
import BookDetailPage from './BookDetailPage';
import NewBookPage from './NewBookPage';

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [showNewBook, setShowNewBook] = useState(false);
  const [bookListRefresh, setBookListRefresh] = useState(0);

  const handleLogin = (jwt: string, userRole: string) => {
    setToken(jwt);
    setRole(userRole);
    localStorage.setItem('token', jwt);
    localStorage.setItem('role', userRole || 'User');
  };

  const handleLogout = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  const handleBookAdded = () => {
    setShowNewBook(false);
    setBookListRefresh(r => r + 1);
  };

  if (!token) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="responsive-container" style={{ padding: 0, position: 'relative', minHeight: '100vh' }}>
      {/* Sticky Header */}
      <header className="sticky-header">
        <div className="header-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
          {/* Left: Add Book button (admin only) */}
          <div style={{ minWidth: 120 }}>
            {role === 'Admin' && !showNewBook && !selectedBookId && (
              <button
                className="header-add-book"
                aria-label="Lisa uus raamat"
                onClick={() => setShowNewBook(true)}
              >
                + Lisa raamat
              </button>
            )}
          </div>
          {/* Center: Title */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, pointerEvents: 'none', alignItems: 'center', zIndex: 1 }}>
            <h2 style={{ margin: 0, textAlign: 'center', width: 'max-content', pointerEvents: 'none' }}>
              Tere, {role}
            </h2>
          </div>
          {/* Right: Logout button */}
          <div style={{ minWidth: 120, display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={handleLogout}
              className="header-logout"
            >
              Logi välja
            </button>
          </div>
        </div>
      </header>
      <div style={{ marginTop: 80, padding: 32 }}>
        {selectedBookId ? (
          <>
            <button onClick={() => setSelectedBookId(null)} style={{ marginBottom: 16 }}>← Tagasi nimekirja juurde</button>
            <BookDetailPage token={token!} bookId={selectedBookId} role={role!} />
          </>
        ) : showNewBook ? (
          <>
            <button onClick={() => setShowNewBook(false)} style={{ marginBottom: 16 }}>← Tagasi nimekirja juurde</button>
            <NewBookPage token={token!} onBookAdded={handleBookAdded} />
          </>
        ) : (
          <BookListPage key={bookListRefresh} token={token!} onSelectBook={setSelectedBookId} />
        )}
      </div>
    </div>
  );
}

export default App;
