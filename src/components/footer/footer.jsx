import styles from './footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <h4>La salle</h4>
      </div>

      <div className={styles.info}>
        <h6>Más información sobre la empresa</h6>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur,
          nostrum laudantium! Velit dolorum rerum similique modi necessitatibus
          dignissimos perferendis consequatur ea voluptates odit sed fugiat
          officia esse
        </p>
        <span>© 2022 La Salle - Todos los Derechos Reservados</span>
      </div>

      <div className={styles.redes}>Siguenos en</div>
    </footer>
  )
}
