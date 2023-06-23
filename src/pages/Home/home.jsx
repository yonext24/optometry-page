import { HomeArticle } from './home-article'
import { HomeHeader } from './home-header'
import styles from './home.module.css'

const articles = [
  { text: 'Prescribe las tareas', image: '/home/carpeta.png' },
  { text: 'Control de progreso', image: '/home/lupa.png' },
  { text: 'El paciente trabaja desde casa', image: '/home/persona.png' },
  { text: 'Supervisa el cumplimiento', image: '/home/carpeta.png' }
]

export const Home = () => {
  return (
    <>
      <HomeHeader />
      <section className={styles.section}>
        <h3>Cómo funciona?</h3>
        <div className={styles.articlesContainer}>
          {
            articles.map(el => <HomeArticle key={el.text} {...el} />)
          }
        </div>
      </section>
    </>
  )
}
