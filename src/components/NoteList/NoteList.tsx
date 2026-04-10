import css from "./NoteList.module.css";
import type { Note } from "../../types/note";

interface NoteListProps {
  items: Note[];
}

export default function NoteList({ items }: NoteListProps) {
  return (
    <ul className={css.list}>
      {items.map((item) => (
        <li className={css.listItem} key={item.id}>
          <h2 className={css.title}>{item.title}</h2>
          <p className={css.content}>{item.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{item.tag}</span>
            <button className={css.button}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
