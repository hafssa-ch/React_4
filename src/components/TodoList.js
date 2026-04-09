
import TodoItem from './TodoItem';

function TodoList({ taches, changerEtat, supprimerTache, modifierTache }) {
  return (
    <ul>
      {taches.map((tache) => (
        <TodoItem
          key={tache.id}
          tache={tache}
          changerEtat={changerEtat}
          supprimerTache={supprimerTache}
          modifierTache={modifierTache}
        />
      ))}
    </ul>
  );
}

export default TodoList;