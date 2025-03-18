{/*import { Client, Account, Avatars, ID, Databases, Query } from "react-native-appwrite"; 
export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.ajiboyedev.aora",
  projectId: "66e168a900130ea9ac05",
  databaseId: "66e16c380011e90b87d8",
  userCollectionId: "66e16cbd00119938ab11",
  videoCollectionId: "66e16d16001f8cb68304",
  storageId: "66e171cd000fa61e0aba",
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username);

    if (!newAccount) throw new Error("Account creation failed");

    const avatarUrl = avatars.getInitials(username);
    await signIn(email, password); 

    const newUser = await databases.createDocument(
      config.databaseId, 
      config.userCollectionId,
      ID.unique(),
      {
        accoundId: newAccount.$id, 
        email,
        username,
        avatar: avatarUrl
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};


export const getCurrentUser =async ()=>{
    try{
         const currentAccount = await account.get();

        if(!currentAccount) throw Error

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accoundId', currentAccount.$id)]
        )

        if(!currentUser) throw Error
        
        return currentUser.documents[0]
    }catch(error){
        console.log(error)
    }
}*/}



{/*import { Client, Account, Avatars, ID, Databases, Query } from "react-native-appwrite";
import AsyncStorage from '@react-native-async-storage/async-storage'; 



export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.ajiboyedev.aora",
  projectId: "66e168a900130ea9ac05",
  databaseId: "66e16c380011e90b87d8",
  userCollectionId: "66e16cbd00119938ab11",
  videoCollectionId: "66e16d16001f8cb68304",
  storageId: "66e171cd000fa61e0aba",
};

const{
  endpoint,
  platform,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
  projectId
} = config


// Init React Native SDK
const client = new Client();

client
  .setEndpoint(endpoint)
  .setProject(projectId)
  .setPlatform(platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Function to create a user
export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username);

    if (!newAccount) throw new Error("Account creation failed");

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password); // Log the user in after creating the account

    const newUser = await databases.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      {
        accoundId: newAccount.$id, // Corrected typo
        email,
        username,
        avatar: avatarUrl
      }
    );

    return newUser;
  } catch (error) {
    console.log("Error creating user:", error);
    throw new Error(error.message);
  }
};

// Function to sign in a user
export const signIn = async (email, password) => {
  try {
    // Check if there are any active sessions
    const sessions = await account.listSessions();

    if (sessions.total > 0) {
      console.log('Session already active');
      return sessions.sessions[0]; // Use the existing session
    }

    // If no active session, create a new one
    const session = await account.createEmailPasswordSession(email, password);
    
    // Save the session in AsyncStorage
    await AsyncStorage.setItem('@appwrite_session', JSON.stringify(session));

    return session;
  } catch (error) {
    console.log('Sign in error:', error.message);
    throw new Error(error.message);
  }
};

// Function to log out (remove session)
export const logOut = async () => {
  try {
    const sessions = await account.listSessions();

    if (sessions.total > 0) {
      // Remove the existing session
      await account.deleteSession(sessions.sessions[0].$id);
    }

    // Clear session from AsyncStorage
    await AsyncStorage.removeItem('@appwrite_session');
    console.log('Logged out successfully');
  } catch (error) {
    console.log('Logout error:', error.message);
  }
};

// Function to retrieve the stored session
export const getStoredSession = async () => {
  try {
    const storedSession = await AsyncStorage.getItem('@appwrite_session');
    if (storedSession !== null) {
      const session = JSON.parse(storedSession);
      return session;
    }
  } catch (error) {
    console.log('Error retrieving session:', error);
  }
  return null;
};

// Function to get the current user based on stored session
export const getCurrentUser = async () => {
  try {
    const session = await getStoredSession();
    if (!session) {
      console.log('No session found, user might not be logged in.');
      throw new Error('No session found');
    }

    const currentAccount = await account.get();
    console.log("Current account:", currentAccount);

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal('accoundId', currentAccount.$id)] 
    );

    if (!currentUser || currentUser.documents.length === 0) {
      console.log('User document not found, prompt sign-up');
      throw new Error('User not found, please sign up again.');
    }
    
    return currentUser.documents[0];
  } catch (error) {
    console.log('Error getting current user:', error.message);
    throw error;
  }
};

export const getAllPosts = async()=>{
  try{
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId
    )

    return posts.documents;
  }catch(error){
    throw new Error(error)
  }
}

export const getLatestPosts = async()=>{
  try{
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.orderDesc('$createdAt', Query.limit(7))]
    )

    return posts.documents;
  }catch(error){
    throw new Error(error)
  }
}

export const SearchPosts = async(query)=>{
  try{
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.search('title', query)]
    )

    return posts.documents;
  }catch(error){
    throw new Error(error)
  }
}

export const getUserPosts = async(userId)=>{
  try{
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.equal('creator', userId)]
    )

    return posts.documents;
  }catch(error){
    throw new Error(error)
  }
}
*/}






import { Client, Account, Avatars, ID, Databases, Query, Storage } from "react-native-appwrite";
import AsyncStorage from '@react-native-async-storage/async-storage'; 


export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.ajiboyedev.aora",
  projectId: "66e168a900130ea9ac05",
  databaseId: "66e16c380011e90b87d8",
  userCollectionId: "66e16cbd00119938ab11",
  videoCollectionId: "66e16d16001f8cb68304",
  storageId: "66e171cd000fa61e0aba",
};

const{
  endpoint,
  platform,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
  projectId
}= config


// Init React Native SDK
const client = new Client();

client
  .setEndpoint(endpoint)
  .setProject(projectId)
  .setPlatform(platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client)

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username);

    if (!newAccount) throw new Error("Account creation failed");

    const avatarUrl = avatars.getInitials(username);
    await signIn(email, password); 

    const newUser = await databases.createDocument(
      databaseId, 
      userCollectionId,
      ID.unique(),
      {
        accoundId: newAccount.$id, 
        email,
        username,
        avatar: avatarUrl
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const signIn = async (email, password) => {
  try {
    // Check if there are any active sessions
    const sessions = await account.listSessions();

    if (sessions.total > 0) {
      console.log('Session already active');
      return sessions.sessions[0]; // Use the existing session
    }

    // If no active session, create a new one
    const session = await account.createEmailPasswordSession(email, password);
    
    // Save the session in AsyncStorage
    await AsyncStorage.setItem('@appwrite_session', JSON.stringify(session));

    return session;
  } catch (error) {
    console.log('Sign in error:', error.message);
    throw new Error(error.message);
  }
};


// Function to log out (remove session)
export const logOut = async () => {
  try {
    const sessions = await account.listSessions();

    if (sessions.total > 0) {
      // Remove the existing session
      await account.deleteSession(sessions.sessions[0].$id);
    }

    // Clear session from AsyncStorage
    await AsyncStorage.removeItem('@appwrite_session');
    console.log('Logged out successfully');
  } catch (error) {
    console.log('Logout error:', error.message);
  }
};


export const getCurrentUser =async ()=>{
    try{
         const currentAccount = await account.get();

        if(!currentAccount) throw Error

        const currentUser = await databases.listDocuments(
            databaseId,
            userCollectionId,
            [Query.equal('accoundId', currentAccount.$id)]
        )

        if(!currentUser) throw Error
        
        return currentUser.documents[0]
    }catch(error){
        console.log(error)
    }
}


export const getAllPosts = async()=>{
  try{
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.orderDesc('$createdAt')]
    )

    return posts.documents;
  }catch(error){
    throw new Error(error)
  }
}

export const getLatestPosts = async()=>{
  try{
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.orderDesc('$createdAt', Query.limit(7))]
    )

    return posts.documents;
  }catch(error){
    throw new Error(error)
  }
}

export const SearchPosts = async(query)=>{
  try{
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.search('title', query)]
    )

    return posts.documents;
  }catch(error){
    throw new Error(error)
  }
}

export const getUserPosts = async(userId)=>{
  try{
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.equal('creator', userId)]
    )

    return posts.documents;
  }catch(error){
    throw new Error(error)
  }
}



export const getFilePreview = async (fileId, type) =>{
  let fileUrl;

  try{

    if(type === 'video'){
      fileUrl = storage.getFileView(storageId, fileId)
    }else if(type === 'image'){
      fileUrl = storage.getFilePreview(storageId, fileId, 2000, 2000, 'top', 100)
    }else{
      throw new Error ('Invalid file type')
    }
  
    if(!fileUrl) throw Error

    return fileUrl;
  }catch(error){
    throw new Error(error)
  }
  
  
}


export const uploadFIle = async (file, type) =>{

  const asset = { 
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  }
  
  try{
    const uploadFIle = await storage.createFile(
      storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadFIle.$id, type);

    return fileUrl;
  }catch(error){
    throw new Error(error)
  }
}


export const createVideo = async (form) =>{
  try{
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFIle(form.thumbnail, 'image'),
      uploadFIle(form.video, 'video'),
    ])

    const newPost = await databases.createDocument(
      databaseId, videoCollectionId, ID.unique(),{
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId
      }
    )

    return newPost
  }catch(error){
    throw new Error(error);
  }
}







