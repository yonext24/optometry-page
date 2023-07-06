import styles from './home.module.css'

export function HomeHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.titleSection}>
        <h1>Optometría La Salle</h1>
        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit,
            quasi iusto hic{' '}
          </p>
          <button>Sobre nosotros</button>
        </div>
      </div>
      <div className={styles.imageSection}>
        <div className={styles.imageContainer}>
          <img src='/home/eye.webp' height={350} width={262} />
        </div>
      </div>
    </header>
  )
}
