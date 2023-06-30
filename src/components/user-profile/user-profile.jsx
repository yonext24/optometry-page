import styles from './user-profile.module.css'
import { useGetUserPage } from '../../hooks/useGetUserPage'
import { Spinner } from '../spinner/spinner'
import { UserEntry } from './user-entry'

export function UserProfile ({ id }) {
  const {
    pageUser: user,
    loading,
    entrys,
    editedFields,
    success,
    setEditedFields,
    handleSubmit
  } = useGetUserPage({ id })

  return <section className={styles.userContainer}>
  {
    loading
      ? <div className={styles.loading}>
        <Spinner style={{ color: 'var(--azul-profundo)', borderWidth: 2, height: 20, width: 20 }} />
      </div>
      : <>
        <div className={styles.nameContainer}>
          <h1>{user.role === 'doctor' ? 'Dr.' : ''} {user.nombre} {user.apellido}</h1>
          <p>{user.role === 'patient' ? 'Paciente' : 'Doctor'}</p>
        </div>

        <div className={styles.imageSide}>
          {
            user?.image?.url
              ? <img src={user.image.url} alt='Foto de perfil del usuario' height={200} width={200} />
              : <div className={styles.imagePlaceholder} />
          }
          <button className={styles.changeImage}>Cambiar Imagen</button>
        </div>
        <div className={styles.dataSide}>
          {
            entrys.map(el => {
              return (
                <UserEntry
                  key={el.slug}
                  success={success}
                  setEditedFields={setEditedFields}
                  slug={el.slug}
                  notEditable={el.notEditable || false}
                  name={el.name}
                  type={el.type}
                  options={el.options}
                  inputType={el.inputType}
                  value={el.value}
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
    Object.entries(editedFields).length >= 1 &&
    <button className={styles.saveButton} disabled={loading} onClick={handleSubmit}>
      {
        loading
          ? <Spinner style={{ color: 'black', borderWidth: 2, width: 10, height: 10 }} />
          : 'Guardar'
      }
    </button>

  }
</section>
}
