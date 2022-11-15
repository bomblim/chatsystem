import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, orderBy , setDoc, addDoc } from 'firebase/firestore';
//import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcMc2eesTR1TeykOylAiq3YVtebrsTtYU",
  authDomain: "chat-94e26.firebaseapp.com",
  projectId: "chat-94e26",
  storageBucket: "chat-94e26.appspot.com",
  messagingSenderId: "582845885483",
  appId: "1:582845885483:web:2f6eda6d76bf595f58ce6e"
};

var app  = initializeApp(firebaseConfig);
const db = getFirestore(app );

// Get a list of cities from your database
var setData = async (col, data ) => {
  const coll = collection(db, col);
  //console.log(coll)
  //console.log(document)
  // var result = await setDoc(doc(db, document, id), data)
  var result = await addDoc(coll, data);
  //var result = await docs.set(data);
  return result;
}

var getData = async (col ) => {
  const coll = collection(db, col);
  const docs = await getDocs(coll);
  const arr = docs.docs.map(doc => doc.data());
  return arr;
}

var getDatabyid = async (col, id ) => {
  const coll = collection(db, col);
  const snapshot  = await getDocs(coll);
  return snapshot.docs[0].data();
}

var getDatabycondition = async (col, conditions ) => {
  const coll = collection(db, col);
  var docs = await getDocs(coll);
  
  //var docs;
  var qc = [];
  for ( var idx in conditions) {
    var qry = conditions[idx];
    qc.push ( where(qry[0],qry[1],qry[2]) );
  }
  var qs = await getDocs( query(coll, ...qc))
  const arr = qs.docs.map(doc => doc.data());
  return arr;
}

export { db, getData, setData, getDatabyid, getDatabycondition };