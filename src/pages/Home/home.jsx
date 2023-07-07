import { useEffect, useState } from 'react'
import styles from './home.module.css'
import { DataEntry } from './data-entry'
import { ImageEntry } from './image-entry'

const entrys = [
  {
    num: 1,
    title: 'Prueba tu visión con nuestro test de sensibilidad al contraste.',
    image: '/home/face.jpg',
    aspectRatio: '1000/800',
    template: '1fr .65fr',
    desc: 'Descubre tu capacidad para detectar patrones y resalta tu agudeza visual. Nuestra prueba de sensibilidad al contraste revela información diagnóstica clave para condiciones clínicas como glaucoma, ambliopía y degeneración macular. No dejes que la pérdida de contraste afecte tu visión, ¡descubre cómo mejorarla hoy mismo!',
  },
  {
    num: 2,
    title: 'Potencia tu visión con la prueba de agudeza visual.',
    image: '/home/eye.webp',
    aspectRatio: '800/1067',
    desc: 'Descubre una forma innovadora de evaluar tu visión. Esta prueba utiliza tu habilidad para mirar y distinguir patrones específicos, siendo especialmente útil para aquellos que tienen dificultades para comunicarse verbalmente, como los niños pequeños o personas con discapacidades cognitivas o del lenguaje.',
  },
]

export const Home = () => {
  const [currentData, setCurrentData] = useState(2)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentData((prev) => (prev === 1 ? 2 : 1))
    }, 7000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <main className={styles.header}>
      {entrys.map((el) => (
        <div
          className={`${styles.viewContainer} ${
            el.num !== currentData ? styles.hidden : ''
          }`}
          style={{ gridTemplateColumns: el.template }}
          key={el.num}>
          <section className={styles.dataSection}>
            <DataEntry {...el} />
          </section>
          <section className={styles.imageSection}>
            <ImageEntry {...el} />
          </section>
        </div>
      ))}
    </main>
  )
}
