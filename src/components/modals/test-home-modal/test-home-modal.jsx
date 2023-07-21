import styles from './test-home-modal.module.css'
import { useModalLogic } from '../../../hooks/useModalLogic'
import { CloseIcon } from '../../icons/close'

const PreferencialRender = () => (
  <>
    <img src='/preferencial.png' height={200} width={200} />
    <h4>Test de Mirada Preferencial</h4>
    <p>
      Descubre una forma innovadora de evaluar tu visión. Esta prueba utiliza tu
      habilidad para mirar y distinguir patrones específicos, siendo
      especialmente útil para aquellos que tienen dificultades para comunicarse
      verbalmente, como los niños pequeños o personas con discapacidades
      cognitivas o del lenguaje.
    </p>
    <p>
      Ya sea con un ojo o con ambos, obtén resultados precisos para evaluar la
      agudeza visual de cada ojo por separado o de ambos en conjunto. ¡No te
      pierdas esta oportunidad de optimizar tu visión!
    </p>
  </>
)
const ContrasteRender = () => (
  <>
    <img src='/contraste.png' height={200} width={200} />
    <h4>Test de Sensibilidad al Contraste</h4>
    <p>
      Descubre tu capacidad para detectar patrones y resalta tu agudeza visual.
      Nuestra prueba de sensibilidad al contraste revela información diagnóstica
      clave para condiciones clínicas como glaucoma, ambliopía y degeneración
      macular. No dejes que la pérdida de contraste afecte tu visión, ¡descubre
      cómo mejorarla hoy mismo!
    </p>
  </>
)

export function TestHomeModal({ closeModal, animating, modalOpen }) {
  useModalLogic({ closeModal, scroll: true })

  return (
    <div className={`${styles.modalBackground}`} onClick={closeModal}>
      <div
        className={`${styles.modal} ${animating ? styles.closing : ''}`}
        onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <button onClick={closeModal} className={styles.close}>
            <CloseIcon height={35} width={35} />
          </button>
          <img src='/logo.webp' height={45} />
        </header>
        <div className={styles.body}>
          {modalOpen === 'preferencial' ? (
            <PreferencialRender />
          ) : (
            <ContrasteRender />
          )}
        </div>
      </div>
    </div>
  )
}
