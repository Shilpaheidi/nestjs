import { Injectable } from '@nestjs/common';
import { FirebaseApp, initializeApp } from 'firebase/app';

import { Database, getDatabase, ref, set, onValue, push, get, update } from 'firebase/database';
import { config } from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { Ticket } from './interfce/ticket.model';
import isEqual from 'lodash/isEqual';
@Injectable()
export class AppService {
  app!: FirebaseApp;
  db!: Database;
  ticket: { id: any; title: any; status: any; description: any };


  constructor() {
    // Load environment variables for Firebase
    const firebaseConfig = {
      // apiKey: process.env.FIREBASE_API_KEY,
      // authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      // databaseURL: process.env.FIREBASE_DATABASE_URL,
      // projectId: process.env.FIREBASE_PROJECT_ID,
      // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      // messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      // appId: process.env.FIREBASE_APP_ID,

      apiKey: 'AIzaSyDY3-KbCdqIZ9HGfLEBC_KVldbGQyOTz1k',
      authDomain: 'cards-editor.firebaseapp.com',
      databaseURL: 'https://cards-editor-default-rtdb.firebaseio.com',
      projectId: 'cards-editor',
      storageBucket: 'cards-editor.appspot.com',
      messagingSenderId: '350046645694',
      appId: '1:350046645694:web:3d6641d4ca856e60f85def',
      measurementId: 'G-B6VEK80G39',
    };
  
    
    // Initialize Firebase
    this.app = initializeApp(firebaseConfig);
  
    // Initialize Firebase database
    this.db = getDatabase(this.app);
    
  }

  getHello(): string {
    this.db = getDatabase(this.app);
    return 'Hello World!';
  }

   ticketCards:any[]=[]
  async getAllRecords() {
  try {
    const cardsRef = ref(this.db, 'cardsData');
    
    // Use the once function to retrieve data once
    const snapshot = await get(cardsRef);
    const data = snapshot.val();
    
    // Your data processing logic here
    if (data) {
      const records = Object.values(data);
      this.ticketCards = records;
      return records;
    } else {
      // Handle the case where no data is available
      return [];
    }
  } catch (error) {
    console.error("Firebase database operation error:", error);
    // Handle the error as needed
    throw error;
  }
}

  

  async insertCard(ticket: Ticket) {
    try {
      const cardsRef = ref(this.db, 'cardsData');
      const newCardRef = push(cardsRef); // Generates a unique key
      const newCardId = newCardRef.key;

      // Set the data for the new card
      await set(newCardRef, ticket);

      console.log(`Card inserted with ID: ${newCardId}`);
    } catch (error) {
      console.error("Firebase database operation error:", error);
    }
  }



  async updateCard(cardId, updatedCardData) {
    try {
      console.log("Updating card with ID:", cardId);
      console.log("Updated card data:", updatedCardData);
  
      if (cardId === updatedCardData.id) {
        
        const cardRef = ref(this.db, `cardsData/${cardId}`);
    
  
      // Use the `update` method to update specific fields
      await update(cardRef, updatedCardData);
  
      console.log(`Card with ID ${cardId} updated`);
    }
    } catch (error) {
      console.error("Firebase database operation error:", error);
    }
  }
  
  
  
  
  
}
