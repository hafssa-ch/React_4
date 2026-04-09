import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  // Charger les tâches depuis localStorage
  const [taches, setTaches] = useState(() => {
    const saved = localStorage.getItem('taches');
    return saved ? JSON.parse(saved) : [];
  });

  // Sauvegarder dans localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem('taches', JSON.stringify(taches));
  }, [taches]);

  const ajouterTache = (texte) => {
    const nouvelleTache = {
      id: Date.now(),
      texte,
      terminee: false
    };
    setTaches([...taches, nouvelleTache]);
  };

  const changerEtat = (id) => {
    setTaches(
      taches.map((t) =>
        t.id === id ? { ...t, terminee: !t.terminee } : t
      )
    );
  };

  const supprimerTache = (id) => {
    if (window.confirm('Supprimer cette tâche ?')) {
      setTaches(taches.filter((t) => t.id !== id));
    }
  };

  const modifierTache = (id, nouveauTexte) => {
    setTaches(
      taches.map((t) =>
        t.id === id ? { ...t, texte: nouveauTexte } : t
      )
    );
  };

  const tachesRestantes = taches.filter(t => !t.terminee).length;

  return (
    <div className="app-container">
      <div className="todo-app">
        <h1>
          📝 To-Do List
          <span className="badge">{tachesRestantes} restante(s)</span>
        </h1>
        
        <TodoForm ajouterTache={ajouterTache} />
        
        {taches.length === 0 ? (
          <div className="empty-state">
            🎉 Aucune tâche pour le moment !
          </div>
        ) : (
          <TodoList
            taches={taches}
            changerEtat={changerEtat}
            supprimerTache={supprimerTache}
            modifierTache={modifierTache}
          />
        )}
        
        {taches.length > 0 && (
          <button 
            className="clear-all"
            onClick={() => {
              if (window.confirm('Supprimer TOUTES les tâches ?')) {
                setTaches([]);
              }
            }}
          >
            🗑️ Tout supprimer
          </button>
        )}
      </div>
    </div>
  );
}

export default App;