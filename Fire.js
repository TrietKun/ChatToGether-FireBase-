// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, push, serverTimestamp, onChildAdded, off } from 'firebase/database';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzDOiiVinLEbHTfi__XSXnj2G2LU8mnD4",
  authDomain: "chatapp-efe5a.firebaseapp.com",
  projectId: "chatapp-efe5a",
  storageBucket: "chatapp-efe5a.appspot.com",
  messagingSenderId: "865494246343",
  appId: "1:865494246343:web:42feeb73bb1460d05fefe2",
  measurementId: "G-S5FEKZP2HQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

class Fire {
  constructor() {
    this.init();
    this.checkAuth();
  }

  init = () => {
    // Không cần kiểm tra apps.length nữa trong Firebase v9+
    // Khởi tạo Firebase app chỉ một lần đầu tiên
    // Nếu đã khởi tạo rồi, sẽ không làm gì cả
  };

  checkAuth = () => {
    onAuthStateChanged(auth, user => {
      if (!user) {
        // Firebase v9+ cũng thay đổi cú pháp đăng nhập ẩn danh
        // signInAnonymously(auth) được thay thế bằng signInAnonymously()
        signInAnonymously(auth);
      }
    });
  };

  send = messages => {
    messages.forEach(item => {
      const message = {
        text: item.text,
        timestamp: serverTimestamp(),
        user: {
            _id: item.user._id || "defaultUserId",
            name: item.user.name
        }
        // item.user
      };

      // Thay đổi cú pháp để push dữ liệu
      const messagesRef = ref(database, "messages");
      push(messagesRef, message);
    });
  };

  parse = snapshot => {
    const { user, text, timestamp } = snapshot.val();
    const { key: _id } = snapshot;
    const createdAt = new Date(timestamp);

    return {
      _id,
      createdAt,
      text,
      user
    };
  };

  get = callback => {
    const messagesRef = ref(database, "messages");
    // Thay đổi cú pháp cho sự kiện child_added
    onChildAdded(messagesRef, snapshot => {
      callback(this.parse(snapshot));
    });
  };

  off() {
    // Thay đổi cú pháp cho sự kiện child_added
    const messagesRef = ref(database, "messages");
    off(messagesRef, 'child_added');
  }

  get db() {
    return ref(database, "messages");
  }
}

export default new Fire();
