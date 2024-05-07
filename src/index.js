import { initializeApp } from 'firebase/app'
import { getFirestore, collection, onSnapshot,
     addDoc, deleteDoc, doc,
      query, where, orderBy, serverTimestamp, getDoc, updateDoc} from 'firebase/firestore'
// import { title } from 'process';

const firebaseConfig = {
    apiKey: "AIzaSyAZjOuLGeA_EIVL2tXK2wIOesORgJ7CzHQ",
    authDomain: "fir-d940f.firebaseapp.com",
    projectId: "fir-d940f",
    storageBucket: "fir-d940f.appspot.com",
    messagingSenderId: "684765515464",
    appId: "1:684765515464:web:1ae0aa6bc63d08f032dffd"
  };

  // init firebase app
  initializeApp(firebaseConfig)

  // init services
  const db = getFirestore()

  // collection ref
  const colRef = collection(db, 'blackspot')

  // queries
  const q=query(colRef, orderBy('createdAt'))

//real time collection data
onSnapshot(colRef, (snapshot) => {
    let blackspot = []
        snapshot.docs.forEach((doc) => {
            blackspot.push({ ...doc.data(), id: doc.id })
        })
        console.log(blackspot)
})

// adding documents
const addBlackspotForm = document.querySelector('.add')
addBlackspotForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
        place: addBlackspotForm.place.value,
        FATALITIES: addBlackspotForm.FATALITIES.value,
        GRIEVOUSLY: addBlackspotForm.GRIEVOUSLY.value,
        MINOR: addBlackspotForm.MINOR.value,
        createdAt: serverTimestamp()
    })
    .then(() => {
        addBlackspotForm.reset()
    })
})

// deleting documents
const deleteBlackspotForm = document.querySelector('.delete')
deleteBlackspotForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'blackspot', deleteBlackspotForm.id.value)

    deleteDoc(docRef)
     .then(() => {
        deleteBlackspotForm.reset()
     })

})

// get a single document
const docRef = doc(db, 'blackspot', 'zz3pFc8RxYjQlTdMUHgB')

onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id)
})

// //updating a document
// const updateForm = document.querySelector('.update')
// updateForm.addEventListener('submit', (e) => {
//     e.preventDefault()

//     const docRef = doc(db, 'blackspot', updateForm.id.value)

//     updateDoc(docRef, {
//         place: 'updated place'
//     })
//     .then(() => {
//         updateForm.reset()
//     })
// })
