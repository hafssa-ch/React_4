import { useState } from 'react';

function TodoForm({ ajouterTache }) {
  const [texte, setTexte] = useState('');
  const [erreur, setErreur] = useState('');

  const soumettreFormulaire = (e) => {
    e.preventDefault();
    
    // Message de validation pour champ vide
    if (texte.trim() === '') {
      setErreur('❌ Le champ ne peut pas être vide !');
      setTimeout(() => setErreur(''), 2000);
      return;
    }
    
    if (texte.length < 3) {
      setErreur('❌ La tâche doit contenir au moins 3 caractères !');
      setTimeout(() => setErreur(''), 2000);
      return;
    }
    
    ajouterTache(texte);
    setTexte('');
    setErreur('');
  };

  return (
    <>
      {erreur && <div className="error-message">{erreur}</div>}
      <form onSubmit={soumettreFormulaire}>
        <input
          value={texte}
          onChange={(e) => setTexte(e.target.value)}
          placeholder="📌 Exemple: Faire les courses..."
          type="text"
        />
        <button type="submit">➕ Ajouter</button>
      </form>
    </>
  );
}

export default TodoForm;
