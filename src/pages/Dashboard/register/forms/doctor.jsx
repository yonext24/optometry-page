import styles from '../register.module.css'

export function DoctorRegisterForm() {
  return (
    <>
      <div className={styles.inputContainer}>
        <label htmlFor='nombre'>Nombre*</label>
        <input
          type='text'
          required
          id='nombre'
          name='nombre'
          placeholder='Pepito'
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor='apellido'>Apellido*</label>
        <input
          type='text'
          required
          id='apellido'
          name='apellido'
          placeholder='Perez'
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor='documento'>Documento</label>
        <input
          type='number'
          required
          id='documento'
          name='documento'
          placeholder='12345678'
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor='telefono'>Teléfono*</label>
        <input
          type='text'
          required
          id='telefono'
          name='telefono'
          placeholder='12345678'
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor='email'>Email*</label>
        <input
          type='email'
          required
          id='email'
          name='email'
          placeholder='pepito@gmail.com'
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor='password'>Contraseña*</label>
        <input
          type='password'
          min={6}
          required
          id='password'
          name='password'
          placeholder=''
        />
      </div>
    </>
  )
}
