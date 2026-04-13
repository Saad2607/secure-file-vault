# 🔐 SecureVault - Cloud File Storage Web App

SecureVault is a **full-stack cloud-based file storage platform** that allows users to securely upload, manage, and share files.
Built using the **MERN Stack**, it provides a modern UI and real-world features similar to Google Drive.

---

## 🚀 Features

* 🔐 User Authentication (JWT आधारित)
* 📂 Upload & Manage Files
* ⭐ Mark Files as Favorites
* 🗑 Trash & Restore Files
* 💀 Permanent File Deletion
* 🔗 Share Files via Link
* 📊 Storage Usage Tracker
* 🖼 File Preview (Images, PDFs)
* 👤 Profile Management (Name, Email, Avatar)
* ☁️ Cloud Storage Integration (Cloudinary)
* ⚡ Real-time UI Updates (React Context)

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* React Router
* Axios
* React Hot Toast

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* Multer (File Upload)
* Cloudinary (Cloud Storage)

---

## 📁 Project Structure

```
SecureVault/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── context/
│   └── services/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   └── config/
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```
git clone https://github.com/your-username/securevault.git
cd securevault
```

---

### 2️⃣ Setup Backend

```
cd backend
npm install
```

Create `.env` file:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

Run backend:

```
npm start
```

---

### 3️⃣ Setup Frontend

```
cd frontend
npm install
npm run dev
```

---

## 📸 Screenshots

* Dashboard UI
<img width="1920" height="928" alt="image" src="https://github.com/user-attachments/assets/d134b145-c7fb-4ac8-a45e-5915b95e394e" />

* Profile Page
<img width="1920" height="923" alt="image" src="https://github.com/user-attachments/assets/e9cb02b4-9213-401c-9416-67ae20021d1c" />


---

## 🔗 API Endpoints

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`
* `GET /api/auth/me`
* `PUT /api/auth/update`
* `PUT /api/auth/avatar`

### Files

* `GET /api/files`
* `POST /api/files/upload`
* `DELETE /api/files/:id`
* `PUT /api/files/favorite/:id`
* `PUT /api/files/restore/:id`
* `DELETE /api/files/permanent/:id`

---

## 🎯 Future Improvements

* 🔍 Advanced Search & Filters
* 📁 Folder System
* 👥 File Sharing Permissions
* 🔔 Notifications
* 📱 Mobile Responsive UI Enhancements

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork the repo and submit a PR.

---

## 📄 License

This project is for educational and portfolio purposes only.  
You are not allowed to copy, modify, or distribute this project without permission.

---

## 👨‍💻 Author

**Mohammed Saad Shaikh**

* GitHub: https://github.com/Saad2607

---

## ⭐ Show Your Support

If you like this project, please ⭐ the repository!
