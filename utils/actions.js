import { auth, database, firebaseApp, storage } from "./firebase";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  setDoc,
  getDocs,
  getDoc,
  query,
  limit,
  orderBy,
  startAfter,
  where,
} from "firebase/firestore";
import "firebase/firestore";
import { fileTobBlob } from "./helpers";
import {
  EmailAuthProvider,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const isUserLogged = () => {
  let isLogged = false;

  onAuthStateChanged(auth, (user) => {
    user !== null && (isLogged = true);
  });

  return isLogged;
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

export const registerUser = async (email, password) => {
  const result = { statusResponse: true, error: null, uid: null };
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    result.uid = user.user.uid;
  } catch (error) {
    result.statusResponse = false;
    result.error = "Este correo ya ha sido registrado";
  }
  return result;
};

export const closeSession = () => {
  return auth.signOut();
};

export const updateUserProfile = async (data) => {
  const result = { statusResponse: true, error: null };

  try {
    await updateProfile(auth.currentUser, data);
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};

export const loginWithEmailAndPassword = async (email, password) => {
  const result = {
    statusResponse: true,
    error: null,
  };
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    result.error = "Usuario o contraseña no valida!";
    result.statusResponse = false;
  }

  return result;
};

export const reauthenticate = async (password) => {
  const result = {
    statusResponse: true,
    error: null,
  };

  const user = getCurrentUser();
  const credentials = EmailAuthProvider.credential(user.email, password);
  try {
    const reauthentication = await reauthenticateWithCredential(
      user,
      credentials
    );
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};

export const updateUserEmail = async (email) => {
  const result = {
    statusResponse: true,
    error: null,
  };

  try {
    await updateEmail(auth.currentUser, email);
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};

export const updateUserPassword = async (password) => {
  const result = {
    statusResponse: true,
    error: null,
  };

  try {
    await updatePassword(auth.currentUser, password);
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};

export const addDocumentWithoutId = async (collectiondb, data) => {
  const result = { statusResponse: true, error: null };
  try {
    await addDoc(collection(database, collectiondb), data);
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};
export const getEvents = async (limitEvents,statusEvent) => {
  const result = {
    statusResponse: true,
    error: null,
    events: [],
    startEvent: null,
  };
  try {
    const q = query(
      collection(database, "events"),      
      limit(limitEvents),
      where( "status" ,"==",statusEvent),
      orderBy("deliveryDate", "desc")
    );
    const response = await getDocs(q);
    if (response.docs.length > 0) {
      result.startEvent = response.docs[response.docs.length - 1];
      response.forEach((doc) => {
        const event = doc.data();
        event.id = doc.id;
        result.events.push(event);
      });
    }
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};

export const getMoreEvents = async (limitEvents, startEvent,statusEvent) => {
  const result = {
    statusResponse: true,
    error: null,
    events: [],
    startEvent: null,
  };
  try {
    const q = query(
      collection(database, "events"),      
      startAfter(startEvent.data().deliveryDate),
      limit(limitEvents),
      where( "status" ,"==",statusEvent),
      orderBy("deliveryDate", "desc")
    );

    const response = await getDocs(q);

    if (response.docs.length > 0) {
      result.startEvent = response.docs[response.docs.length - 1];
      response.forEach((doc) => {
        const event = doc.data();
        event.id = doc.id;
        result.events.push(event);
      });
    }
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};

export const getDocumentById = async (collectiondb, id) => {
  const result = {
    statusResponse: true,
    error: null,
    document: null,
  };
  try {
    const docRef = doc(database, collectiondb, id);

    const response = await getDoc(docRef);

    result.document = response.data();
    result.document.id = response.id;
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};

export const AddDocumentWithId = async (collectiondb, id, data) => {
  const result = { statusResponse: true, error: null };
  try {
    await setDoc(doc(database, collectiondb, id), data);
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};

export const UpdateDocumentWithId = async (collectiondb, id, data) => {
  const result = { statusResponse: true, error: null };
  try {
    console.log("data", id);

    const obj = doc(database, collectiondb, id);

    console.log("obj", obj);

    await updateDoc(obj, data);
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};

export const uploadImage = async (image, path, name) => {
  const result = { statusResponse: false, error: null, url: null };

  // Upload file and metadata to the object 'images/mountains.jpg'
  const storaageRef = ref(storage, `${path}/${name}`);
  const blob = await fileTobBlob(image);
  const uploadTask = uploadBytesResumable(storaageRef, blob);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;
        case "storage/canceled":
          // User canceled the upload
          break;

        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }
  );
  const uri = await getDownloadURL(uploadTask.snapshot.ref);
  result.statusResponse = true;
  result.url = uri;
  return result;
};
