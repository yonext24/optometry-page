import { dbAdmin } from "./config"

export async function getUserByEmail (collection, email) {
  return dbAdmin.collection(collection).where('email', '==', email).limit(1).get()
    .then(docs => {
      if (docs.empty) return false
      const parsedDocs = docs.docs

      return parsedDocs[0].data()
    })
    .catch((err) => {
      console.log(err)
      return false
    })
}