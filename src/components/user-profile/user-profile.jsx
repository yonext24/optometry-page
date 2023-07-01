import styles from './user-profile.module.css'
import { useGetUserPage } from '../../hooks/useGetUserPage'
import { Spinner } from '../spinner/spinner'
import { UserEntry } from './user-entry'

export function UserProfile ({ id, type }) {
  const {
    pageUser: user,
    loading,
    error,
    inputRef,
    entrys,
    editedFields,
    success,
    updateLoading,
    image,
    handleImage,
    handleImageClear,
    setEditedFields,
    handleSubmit
  } = useGetUserPage({ id, type })

  return <section className={styles.userContainer}>
  {
    loading
      ? <div className={styles.loading}>
        <Spinner style={{ color: 'var(--azul-profundo)', borderWidth: 2, height: 20, width: 20 }} />
      </div>
      : error
        ? <div className={styles.loading} style={{ textAlign: 'center', color: 'red' }}>
          <span>Ocurrió un error inesperado:</span>
          <p>{error}</p>
          <p>Puede que el usuario al que estas tratando de acceder <br/> no exista en la base de datos.</p>
        </div>
        : <>
        <div className={styles.nameContainer}>
          <h1>{user.role === 'doctor' ? 'Dr.' : ''} {user.nombre} {user.apellido}</h1>
          <p>{user.role === 'patient' ? 'Paciente' : 'Doctor'}</p>
        </div>

        <div className={styles.imageSide}>
          {
            image?.src
              ? <img src={image.src} alt='Nueva foto de perfil' height={200} width={200} />
              : user?.image?.src
                ? <img src={user.image.src} alt='Foto de perfil del usuario' height={200} width={200} />
                : <div className={styles.imagePlaceholder} />
          }
          <div className={styles.buttonsContainer}>
          <input type='file' ref={inputRef} hidden id='image' accept='image/jpg image/png image/webp image/jpeg image/jfif' onChange={handleImage} />
          <label htmlFor='image'>Subir Imagen</label>
          {
            image && <button onClick={handleImageClear}>Quitar</button>
          }
        </div>
        </div>
        <div className={styles.dataSide}>
          {
            entrys.map(el => {
              return (
                <UserEntry
                  key={el.slug}
                  id={id}
                  success={success}
                  setEditedFields={setEditedFields}
                  {...el}
                >
                  {el.element}
                </UserEntry>
              )
            })
          }
        </div>
      </>
  }
  {
    (Object.entries(editedFields).length >= 1 || image !== null) &&
    <button className={styles.saveButton} disabled={updateLoading} onClick={handleSubmit}>
      {
        updateLoading
          ? <Spinner style={{ color: 'black', borderWidth: 2, width: 10, height: 10 }} />
          : 'Guardar'
      }
    </button>

  }
</section>
}
