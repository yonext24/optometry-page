import styles from './user-image.module.css'

export function UserImage({ src, ...props }) {
  return (
    <img
      {...props}
      className={styles.userImage}
      src={src}
      alt='Foto de usuario'
    />
  )
}
