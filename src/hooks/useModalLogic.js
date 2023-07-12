import { useEffect } from 'react'

export function useModalLogic ({ closeModal }) {
  useEffect(() => {
    const html = document.querySelector('html')
    if (html == null) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeModal()
    }

    html.addEventListener('keydown', onKeyDown)

    return () => {
      html.removeEventListener('keydown', onKeyDown)
    }
  }, [])
}