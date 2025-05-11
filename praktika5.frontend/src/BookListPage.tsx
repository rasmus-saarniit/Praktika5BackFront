import React, { useEffect, useState } from 'react';

interface Book {
  book_id: number;
  title: string;
  publication_year: number;
  Authors: { name: string }[];
  Category?: { name: string };
  Comments?: { id: number }[];
}

interface BookListPageProps {
  token: string;
  onSelectBook: (bookId: number) => void;
}

const BookListPage: React.FC<BookListPageProps> = ({ token, onSelectBook }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState<Book[]>([]);
  const [sort, setSort] = useState<'title-asc' | 'title-desc' | 'year-asc' | 'year-desc' | 'added-asc' | 'added-desc'>('title-asc');
  const sortOptions: { value: typeof sort; label: string }[] = [
    { value: 'title-asc', label: 'Pealkiri A-Z' },
    { value: 'title-desc', label: 'Pealkiri Z-A' },
    { value: 'year-asc', label: 'Ilmumise aasta (vanim ees)' },
    { value: 'year-desc', label: 'Ilmumise aasta (uusim ees)' },
    { value: 'added-asc', label: 'Lisamise järjekord (vanim ees)' },
    { value: 'added-desc', label: 'Lisamise järjekord (uusim ees)' },
  ];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/books', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to fetch books');
        const data = await res.json();
        setBooks(data);
        setFiltered(data);
      } catch (err) {
        setError('Viga raamatute laadimisel');
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [token]);

  useEffect(() => {
    const q = search.toLowerCase();
    let filteredBooks = books.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.Authors.some((a) => a.name.toLowerCase().includes(q)) ||
        (b.Category?.name?.toLowerCase().includes(q) ?? false)
    );

    // Sorting logic
    filteredBooks = [...filteredBooks].sort((a, b) => {
      switch (sort) {
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'year-asc':
          return a.publication_year - b.publication_year;
        case 'year-desc':
          return b.publication_year - a.publication_year;
        case 'added-asc':
          return a.book_id - b.book_id;
        case 'added-desc':
          return b.book_id - a.book_id;
        default:
          return 0;
      }
    });
    setFiltered(filteredBooks);
  }, [search, books, sort]);

  return (
    <div className="responsive-container" style={{ maxWidth: 800, margin: 'auto', padding: 32 }}>
      {/* Sticky header is handled in App.tsx */}
      <h2 style={{ marginTop: 0, textAlign: 'center' }}>Raamatute loend</h2>
      <div className="booklist-filters-bar" style={{ marginBottom: 0 }}>
        <input
          className="booklist-search"
          type="text"
          placeholder="Otsi pealkirja, autori või žanri järgi"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="booklist-sort-buttons">
        {sortOptions.map(opt => (
          <button
            key={opt.value}
            className={sort === opt.value ? 'sort-btn active' : 'sort-btn'}
            onClick={() => setSort(opt.value)}
            type="button"
            aria-pressed={sort === opt.value}
          >
            {opt.label}
          </button>
        ))}
      </div>
      {loading ? (
        <div>Laadimine...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : filtered.length === 0 ? (
        <div>Raamatuid ei leitud</div>
      ) : (
        <ul>
          {filtered.map((book) => (
            <li
              key={book.book_id}
              className="book-list-item"
              style={{ marginBottom: 16, cursor: 'pointer', textAlign: 'center' }}
              onClick={() => onSelectBook(book.book_id)}
            >
              <strong style={{ display: 'inline-block', width: '100%' }}>{book.title}</strong>{' '}
              <span style={{ color: 'gray', fontStyle: 'italic', fontSize: 14 }}>
                {(() => {
                  const n = Array.isArray(book.Comments) ? book.Comments.length : 0;
                  if (n === 1) return '( 1 kommentaar )';
                  return `( ${n} kommentaari )`;
                })()}
              </span>{' '}
              ({book.publication_year})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookListPage;
