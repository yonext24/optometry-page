import styles from './home.module.css'

export function HomeArticle ({ text, image }) {
  return <article>
    <img src={image} height={120} width={120} className={styles.articleImage} />
    <h4>{text}</h4>
  </article>
}
