import styles from "./page.module.css";
import TaskList from "./organisms/taskList/taskList";
import NavigationBar from "./molecules/navigation/navigation";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <NavigationBar navigationHeader="Welcome back to task manager!" />
        <TaskList />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
