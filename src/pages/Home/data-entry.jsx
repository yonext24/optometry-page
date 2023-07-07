import styles from './home.module.css'

export function DataEntry({ title, desc }) {
  return (
    <div className={styles.dataContainer}>
      <div className={styles.titleContainer}>
        <h2>{title}</h2>
      </div>
      <div className={styles.descContainer}>
        <p>{desc}</p>
      </div>
    </div>
  )
}
