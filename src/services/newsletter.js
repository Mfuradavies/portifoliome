import { collection, getDoc, setDoc, getDocs, deleteDoc, doc, query, where, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'

const NEWSLETTER_COLLECTION = 'newsletters'

export const newsletterService = {
  /**
   * Subscribe email using email as the ID for instant verification
   */
  async subscribe(name, email) {
    const cleanEmail = email.toLowerCase().trim();
    try {
      // 1. Instant check by ID (Fast & uses 'get' permission instead of 'list')
      const docRef = doc(db, NEWSLETTER_COLLECTION, cleanEmail);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        throw new Error('This email is already subscribed!');
      }

      // 2. Add new subscriber with email as the ID
      await setDoc(docRef, {
        name: name.trim(),
        email: cleanEmail,
        signupTime: serverTimestamp(),
        status: 'active' // Added for consistency with your getAllSubscribers query
      });

      return cleanEmail;
    } catch (error) {
      if (error.code === 'failed-precondition' || error.message?.includes('ERR_INTERNET_DISCONNECTED')) {
        const offlineError = new Error('Unable to connect to the server.');
        offlineError.code = 'OFFLINE';
        throw offlineError;
      }
      console.error('Newsletter subscription error:', error);
      throw error;
    }
  },

  /**
   * Get all newsletter subscribers (Note: Requires 'list' permission)
   */
  async getAllSubscribers() {
    try {
      const q = query(
        collection(db, NEWSLETTER_COLLECTION),
        where('status', '==', 'active')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      return [];
    }
  },

  async unsubscribe(docId) {
    try {
      await deleteDoc(doc(db, NEWSLETTER_COLLECTION, docId));
    } catch (error) {
      console.error('Unsubscribe error:', error);
      throw error;
    }
  }
}

export default newsletterService;