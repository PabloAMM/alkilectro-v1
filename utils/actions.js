import { auth, database, firebaseApp,storage } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import "firebase/firestore";
import {
  EmailAuthProvider,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
  updateProfile
} from "firebase/auth";


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
  const result = { statusResponse: true, error: null };
  try {
    await createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      }
    );
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
    
    await updateProfile(auth.currentUser,data );
    
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
  const credentials = EmailAuthProvider.credential(email, password);

  try {
    await reauthenticateWithCredential(user, credentials);
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
    await updateEmail(auth.currentUser,email);
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
    await updatePassword(auth.currentUser,password);
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

export const uploadImage = async(image, path, name) => {
    const result = { statusResponse: false, error: null, url: null }
  //  const ref = storage.storage().ref(path).child(name)
 
    const blob = await fileToBlob(image)

    try {
        await ref.put(blob)
        const url = await storage.storage().ref(`${path}/${name}`).getDownloadURL()
        result.statusResponse = true
        result.url = url
    } catch (error) {
        result.error = error
    }
    return result
}