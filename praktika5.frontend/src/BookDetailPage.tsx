import React, { useEffect, useState } from 'react';

interface Book {
  book_id: number;
  title: string;
  publication_year: number;
  Authors: { name: string }[];
  Category?: { name: string };
  Comments: { id: number; content: string; createdAt: string; User: { email: string } }[];
}

interface Props {
  token: string;
  bookId: number;
  role: string;
}

const BookDetailPage: React.FC<Props> = ({ token, bookId, role }) => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`/books/${bookId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Viga raamatu laadimisel');
        const data = await res.json();
        // Defensive: ensure Authors and Comments are always arrays
        setBook({
          ...data,
          Authors: Array.isArray(data.Authors) ? data.Authors : [],
          Comments: Array.isArray(data.Comments) ? data.Comments : [],
        });
      } catch (err) {
        setError('Viga raamatu laadimisel');
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [bookId, token]);

  const handleAddComment = async () => {
    setCommentError('');
    setSuccess('');
    if (!comment.trim()) {
      setCommentError('Kommentaar ei tohi olla tühi.');
      return;
    }
    try {
      const res = await fetch(`/books/${bookId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: comment }),
      });
      if (!res.ok) {
        const data = await res.json();
        setCommentError(data.message || 'Kommentaari lisamine ebaõnnestus.');
        return;
      }
      setComment('');
      setSuccess('Kommentaar lisatud!');
      // Reload book details
      const updated = await fetch(`/books/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      {
        const updatedData = await updated.json();
        setBook({
          ...updatedData,
          Authors: Array.isArray(updatedData.Authors) ? updatedData.Authors : [],
          Comments: Array.isArray(updatedData.Comments) ? updatedData.Comments : [],
        });
      }
    } catch (err) {
      setCommentError('Viga kommentaari lisamisel.');
    }
  };

  const [editMode, setEditMode] = useState(false);
  // Always show top 3 comments by default, allow toggling to show all
  const [showAllComments, setShowAllComments] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editYear, setEditYear] = useState('');
  const [editGenre, setEditGenre] = useState('');
  const [editAuthors, setEditAuthors] = useState('');
  const [editError, setEditError] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState('');

  // Fill edit fields when entering edit mode
  useEffect(() => {
    if (editMode && book) {
      setEditTitle(book.title);
      setEditYear(book.publication_year.toString());
      setEditGenre(book.Category?.name || '');
      setEditAuthors((book.Authors || []).map(a => a.name).join(', '));
    }
  }, [editMode, book]);

  const handleEdit = async () => {
    setEditError('');
    if (!editTitle.trim() || !editYear.trim()) {
      setEditError('Pealkiri ja aasta on kohustuslikud.');
      return;
    }
    try {
      const res = await fetch(`/books/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: editTitle,
          publicationYear: parseInt(editYear, 10),
          categoryName: editGenre,
          authorNames: editAuthors.split(',').map(a => a.trim()).filter(Boolean),
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setEditError(data.message || 'Viga muutmisel.');
        return;
      }
      setEditMode(false);
      // Reload book details
      const updated = await fetch(`/books/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedData = await updated.json();
      setBook({
        ...updatedData,
        Authors: Array.isArray(updatedData.Authors) ? updatedData.Authors : [],
        Comments: Array.isArray(updatedData.Comments) ? updatedData.Comments : [],
        Category: updatedData.Category || undefined,
      });
    } catch (err) {
      setEditError('Viga muutmisel.');
    }
  };

  const handleDelete = async () => {
    setDeleteError('');
    setDeleteSuccess('');
    if (!window.confirm('Kas oled kindel, et soovid selle raamatu kustutada?')) return;
    try {
      const res = await fetch(`/books/${bookId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok && res.status !== 204) {
        const data = await res.json();
        setDeleteError(data.message || 'Viga kustutamisel.');
        return;
      }
      setDeleteSuccess('Raamat kustutatud!');
      setBook(null);
    } catch (err) {
      setDeleteError('Viga kustutamisel.');
    }
  };

  if (loading) return <div>Laadimine...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!book) return deleteSuccess ? <div style={{ color: 'green' }}>{deleteSuccess}</div> : null;

  return (
    <div className="responsive-container" style={{ maxWidth: 600, margin: 'auto', padding: 32 }}>
      <h2>{editMode ? (
        <input value={editTitle} onChange={e => setEditTitle(e.target.value)} style={{ fontSize: 24, width: '100%' }} />
      ) : book.title}</h2>
      <div><strong>Autor(id):</strong> {editMode ? (
        <input
          value={editAuthors}
          onChange={e => setEditAuthors(e.target.value)}
          style={{ width: '100%' }}
          placeholder="Autorid, komadega eraldatud"
        />
      ) : (book.Authors || []).map(a => a.name).join(', ')}</div>
      <div><strong>Ilmumisaasta:</strong> {editMode ? (
        <input value={editYear} onChange={e => setEditYear(e.target.value.replace(/[^0-9]/g, ''))} style={{ width: 100 }} />
      ) : book.publication_year}</div>
      <div><strong>Žanr:</strong> {editMode ? (
        <input value={editGenre} onChange={e => setEditGenre(e.target.value)} style={{ width: 200 }} />
      ) : (book.Category?.name || 'Pole määratud')}</div>
      {role === 'Admin' && !editMode && (
        <div style={{ margin: '16px 0' }}>
          <button onClick={() => setEditMode(true)} style={{ marginRight: 8 }}>Muuda</button>
          <button onClick={handleDelete} style={{ background: 'red', color: 'white' }}>Kustuta</button>
          {deleteError && <div style={{ color: 'red' }}>{deleteError}</div>}
        </div>
      )}
      {role === 'Admin' && editMode && (
        <div style={{ margin: '16px 0' }}>
          <button onClick={handleEdit} style={{ marginRight: 8 }}>Salvesta</button>
          <button onClick={() => setEditMode(false)}>Tühista</button>
          {editError && <div style={{ color: 'red' }}>{editError}</div>}
        </div>
      )}
      <h3>Kommentaarid</h3>
      <ul>
        {(book.Comments || [])
          .slice(0, showAllComments ? book.Comments.length : 3)
          .map((c) => {
            // Extract username from email (before @)
            const username = c.User.email.split('@')[0];
            // Format date
            const date = new Date(c.createdAt).toLocaleString('et-EE', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
            return (
              <li key={c.id}>
                <strong>{username}</strong>: {c.content}
                <span style={{ color: '#888', fontSize: 13, marginLeft: 8 }}>({date})</span>
              </li>
            );
          })}
      </ul>
      {book.Comments && book.Comments.length > 3 && (
        <button
          onClick={() => setShowAllComments(v => !v)}
          style={{ marginBottom: 12 }}
        >
          {showAllComments ? 'Näita vähem' : 'Näita rohkem'}
        </button>
      )}
      {role === 'User' || role === 'Admin' ? (
        <div style={{ marginTop: 16 }}>
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Lisa kommentaar"
            rows={3}
            style={{ width: '100%' }}
          />
          <button onClick={handleAddComment}>Lisa kommentaar</button>
          {commentError && <div style={{ color: 'red' }}>{commentError}</div>}
          {success && <div style={{ color: 'green' }}>{success}</div>}
        </div>
      ) : null}
    </div>
  );
};

export default BookDetailPage;
