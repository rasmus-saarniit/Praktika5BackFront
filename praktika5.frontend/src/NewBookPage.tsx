import React, { useState } from 'react';

interface NewBookPageProps {
  token: string;
  onBookAdded: () => void;
}

const NewBookPage: React.FC<NewBookPageProps> = ({ token, onBookAdded }) => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [authors, setAuthors] = useState(''); // comma-separated
  const [genre, setGenre] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!title.trim() || !year.trim() || !authors.trim() || !genre.trim()) {
      setError('Kõik väljad on kohustuslikud.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          publicationYear: parseInt(year, 10),
          categoryName: genre,
          authorNames: authors.split(',').map(a => a.trim()).filter(Boolean),
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Viga raamatu lisamisel.');
        setLoading(false);
        return;
      }
      setSuccess('Raamat lisatud!');
      setTitle('');
      setYear('');
      setAuthors('');
      setGenre('');
      setLoading(false);
      onBookAdded();
    } catch (err) {
      setError('Viga raamatu lisamisel.');
      setLoading(false);
    }
  };

  return (
    <div className="responsive-container" style={{ maxWidth: 500, margin: 'auto', padding: 32 }}>
      <h2>Lisa uus raamat</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>Pealkiri:<br />
            <input value={title} onChange={e => setTitle(e.target.value)} style={{ width: '100%' }} />
          </label>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Ilmumisaasta:<br />
            <input value={year} onChange={e => setYear(e.target.value.replace(/[^0-9]/g, ''))} style={{ width: '100%' }} />
          </label>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Autor(id) (komadega eraldatud):<br />
            <input value={authors} onChange={e => setAuthors(e.target.value)} style={{ width: '100%' }} />
          </label>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Žanr:<br />
            <input value={genre} onChange={e => setGenre(e.target.value)} style={{ width: '100%' }} />
          </label>
        </div>
        <button type="submit" disabled={loading}>Lisa raamat</button>
        {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
        {success && <div style={{ color: 'green', marginTop: 12 }}>{success}</div>}
      </form>
    </div>
  );
};

export default NewBookPage;
