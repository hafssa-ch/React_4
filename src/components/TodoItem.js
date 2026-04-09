
import { useState } from 'react';

function TodoItem({ tache, changerEtat, supprimerTache, modifierTache }) {
  const [estEnEdition, setEstEnEdition] = useState(false);
  const [texteEdit, setTexteEdit] = useState(tache.texte);

  const sauvegarderEdition = () => {
    if (texteEdit.trim() === '') {
      alert('Le texte ne peut pas être vide !');
      return;
    }
    modifierTache(tache.id, texteEdit);
    setEstEnEdition(false);
  };

  const annulerEdition = () => {
    setTexteEdit(tache.texte);
    setEstEnEdition(false);
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={tache.terminee}
        onChange={() => changerEtat(tache.id)}
      />
      
      {estEnEdition ? (
        <input
          type="text"
          value={texteEdit}
          onChange={(e) => setTexteEdit(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sauvegarderEdition()}
          autoFocus
        />
      ) : (
        <span 
          className={tache.terminee ? 'completed' : ''}
          onDoubleClick={() => !tache.terminee && setEstEnEdition(true)}
        >
          {tache.texte}
        </span>
      )}
      
      <div className="button-group">
        {estEnEdition ? (
          <>
            <button className="save-btn" onClick={sauvegarderEdition}>
              💾
            </button>
            <button className="edit-btn" onClick={annulerEdition}>
              ❌
            </button>
          </>
        ) : (
          <>
            <button 
              className="edit-btn" 
              onClick={() => setEstEnEdition(true)}
              disabled={tache.terminee}
              style={{ opacity: tache.terminee ? 0.5 : 1 }}
            >
              ✏️
            </button>
            <button onClick={() => supprimerTache(tache.id)}>
              🗑️
            </button>
          </>
        )}
      </div>
    </li>
  );
}

export default TodoItem;