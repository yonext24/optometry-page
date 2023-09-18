import styles from './results-table.module.css'
import { EyeIcon } from '../../icons/eye'
import { EditIcon } from '../../icons/edit'
import { useCallback, useContext, useMemo } from 'react'
import { ResultsContext } from '../../../contexts/ResultsContext'
import { useUser } from '../../../hooks/useUser'
import { UserImage } from '../../common/entry-placeholder/user-image/user-image'

export function ResultsRow({ data }) {
  const { dispatch, state } = useContext(ResultsContext)
  const user = useUser()

  const handleSee = useCallback(() => {
    dispatch({ type: 'openGraphic', payload: data })
  }, [data])

  const handleSeeNotes = useCallback(() => {
    dispatch({ type: 'openNotes', payload: data })
  }, [data])

  const handleWriteNote = useCallback(() => {
    dispatch({ type: 'openWrite', payload: data })
  }, [data])

  const note = useMemo(() => {
    if (data.notes?.length > 0) {
      const parsedNote =
        data.notes[0]?.note.length > 70
          ? data.notes[0].note.slice(0, 70) + '...'
          : data.notes[0].note

      return {
        exists: true,
        text: parsedNote,
        user: data.notes[0].user,
        amount: data.notes.length,
      }
    } else return { exists: false }
  }, [data.notes])

  const parsedDate = useMemo(() => {
    if (!data[1]?.Fecha) return 'Unknown'
    const [year, month, day] = data[1].Fecha.split('-')
    return `${day}/${month}/${year.substring(2, 4)}`
  }, [data])

  return (
    <tr>
      <td className={styles.date}>{parsedDate}</td>
      <td>
        {state.selected_test.name === 'contraste'
          ? 'Sensibilidad al Contraste'
          : 'Mirada Preferencial'}
      </td>
      <td className={styles.ver}>
        <button onClick={handleSee}>
          <EyeIcon
            fill='transparent'
            height={25}
            style={{ color: 'var(--azul-oscuro)' }}
          />
        </button>
      </td>
      <td>
        <div className={styles.nota}>
          <div className={styles.user}>
            {note.exists && note?.user?.image?.src && (
              <UserImage src={note.user.image.src} />
            )}
            <span className={`${!note.exists ? styles.notfound : ''}`}>
              {note.exists ? (
                <>
                  <span>{note.text}</span>
                  {note.amount - 1 > 0 ? (
                    <span className={styles.amount}>{note.amount} más...</span>
                  ) : null}
                </>
              ) : (
                'Aquí verás la nota que te deje tu profesional asignado...'
              )}
            </span>
          </div>
          <div className={styles.buttons}>
            {note.exists && (
              <button className={styles.see} onClick={handleSeeNotes}>
                <EyeIcon height={25} />
              </button>
            )}
            {user.role === 'doctor' || user.role === 'admin' ? (
              <button className={styles.edit} onClick={handleWriteNote}>
                <EditIcon height={25} />
              </button>
            ) : null}
          </div>
        </div>
      </td>
    </tr>
  )
}
