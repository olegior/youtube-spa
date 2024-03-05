import { addDoc, deleteDoc, setDoc, doc, getDocs, collection, query, where } from "firebase/firestore";
import { firebaseDB } from ".";
import { AddChangeFavorite, FavoritesType } from "../types"

export const deleteDocumentDB = async (id: string): Promise<void> => {
    deleteDoc(doc(firebaseDB, 'favorites', id));
}

export const getDocumentsDB = async (user: string): Promise<FavoritesType[]> => {
    const snapshot = await getDocs(query(
        collection(firebaseDB, 'favorites'),
        where('user', '==', user)
    ))
    return snapshot.docs.map(doc => ({ ...doc.data().favorite, id: doc.id }))
}

export const setDocumentDB = async (user: string, favorite: FavoritesType): Promise<void> => {
    setDoc(doc(firebaseDB, 'favorites', favorite.id),
        { user, favorite },
        { merge: true })
}

export const addDocumentDB = async (data: AddChangeFavorite): Promise<void> => {
    addDoc(collection(firebaseDB, 'favorites'), data);
}