import styles from './home.module.css'

export function HowItWorksSection({ setModalOpen }) {
  return (
    <section className={styles.how}>
      <h2>¿Cómo funciona?</h2>
      <p>Tenemos dos tipos de tests</p>
      <div className={styles.tests}>
        <div
          className={styles.test}
          onClick={() => setModalOpen('preferencial')}>
          <img src='/preferencial.png' />
          <div className={styles.testData}>
            <h5>Mirada Preferencial</h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
        <div className={styles.test} onClick={() => setModalOpen('contraste')}>
          <img src='/contraste.png' />
          <div className={styles.testData}>
            <h5>Sensibilidad al Contraste</h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
