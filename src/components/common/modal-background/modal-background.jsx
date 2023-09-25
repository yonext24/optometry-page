import styles from './modal-background.module.css'

// Hice este componente demasiado tarde (porque soy imbécil) pero tendría que haberlo implementado en todas las modales

export function ModalBackground({
  children,
  closeModal = () => {},
  onClick = () => {},
  props,
}) {
  const handleClick = () => {
    closeModal()
    onClick()
  }

  return (
    <div
      onClick={handleClick}
      id='modal-background'
      className={styles.modalBackground}
      {...props}>
      {children}
    </div>
  )
}
