import { Client, Databases, ID, Query } from "appwrite"

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID
const COLLECTION_ID = import.meta.env.VITE_COLLECTION_ID
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID

const client = new Client().setEndpoint("https://nyc.cloud.appwrite.io/v1").setProject(PROJECT_ID)
const database = new Databases(client)
export const updateSearchCount = async (searchQuery, movie) => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.equal('searchTerm', searchQuery)])
        if (result.documents.length > 0) {
            const doc = result.documents[0]
            await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, { count: doc.count + 1 })
        }
        else {
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm: searchQuery,
                count: 1,
                movieId: movie.id,
                posterUrl: movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'https://i.ibb.co/XfRGK5Yg/no-movie.png'
            })
        }
    }
    catch (err) {
        console.log(err)
    }
}

export const getTrendingMovies = async () => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID,
            [Query.limit(5),
            Query.orderDesc("count")
            ])
            return result.documents

    } catch (err) {
        console.log(err)
    }
}