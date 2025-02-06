import styles from "./page.module.css";
import TaskList from "./organisms/taskList/taskList";

export default function Home() {
return (
    <div className={styles.page}>
      <main className={styles.main}>
        <TaskList />
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
