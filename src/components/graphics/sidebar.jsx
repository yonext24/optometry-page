import styles from './graphics.module.css'

export function Sidebar({ documents, setSelectedItemData, selectedItemData }) {
  return (
    <aside className={styles.aside}>
      <div className={styles.navTitle}>
        <p>Índice de Tests Realizados</p>
      </div>
      <div className={styles.buttonsContainer}>
        {documents.map((el, index) => {
          const i = index + 1
          return (
            <button
              data-selected={selectedItemData?.id === el.id}
              key={i}
              onClick={() => setSelectedItemData(el)}>
              {i}
            </button>
          )
        })}
      </div>
    </aside>
  )
}
