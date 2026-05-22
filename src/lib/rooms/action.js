// 'use server';

// import { headers } from 'next/headers';
// import { auth } from '../auth';

// export const addCourse = async (formData) => {
//   const { token } = await auth.api.getToken({
//     headers: await headers(),
//   });

//   // const modifiedData = Object.fromEntries(formData.entries());
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });

//   // const formValues = Object.fromEntries(formData.entries());

//   // const modifiedData = {
//   //   ...formValues,

//   //   userId: session?.user?.id,
//   //   userName: session?.user?.name,
//   //   userEmail: session?.user?.email,
//   // };

//   const modifiedData = {
//     name: formData.get("name"),
//     description: formData.get("description"),
//     image: formData.get("image"),
//     floor: formData.get("floor"),
//     price: formData.get("price"),
//     Capacity: formData.get("Capacity"),

//     category: formData.getAll("category"),

//     userId: session?.user?.id,
//     userName: session?.user?.name,
//     userEmail: session?.user?.email,
//   };
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all_rooms`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(modifiedData),
//   });
//   if (!res.ok) return null;
//   const data = await res.json();

//   return data;
// };
// export const deleteEnrollment = async (id) => {
//   const { token } = await auth.api.getToken({
//     headers: await headers(),
//   });

//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-room/${id}`, {
//     method: 'DELETE',
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   if (!res.ok) return null;
//   const data = await res.json();
//   //   console.log(data);

//   return data;
// };

// const express = require("express");
// const dotenv = require("dotenv");
// const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// const cors = require("cors");
// const { createRemoteJWKSet, jwtVerify } = require("jose-cjs");
// dotenv.config();
// const app = express();
// app.use(cors());
// app.use(express.json());
// const port = process.env.PORT || 8080;

// const uri = process.env.MONGODB_URI;

// const JWKS = createRemoteJWKSet(
//   new URL(`${process.env.CLIENT_URL}/api/auth/jwks`),
// );

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// const logger = (req, res, next) => {
//   console.log(`${req.method} | ${req.url}`);
//   next();
// };

// const verifyToken = async (req, res, next) => {
//   const { authorization } = req.headers;
//   //   console.log(req.headers, 'from verify token');
//   const token = authorization?.split(" ")[1];
//   //   console.log(token);

//   if (!token) {
//     return res.status(401).json({ message: "Unauthorize" });
//   }

//   try {
//     const JWKS = createRemoteJWKSet(
//       new URL("http://localhost:3000/api/auth/jwks"),
//     );
//     const { payload } = await jwtVerify(token, JWKS);
//     req.user = payload;

//     next();
//   } catch (error) {
//     console.error("Token validation failed:", error);
//     return res.status(401).json({ message: "Unauthorize" });
//   }
// };

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     // await client.connect();
//     // Send a ping to confirm a successful connection
//     // await client.db('admin').command({ ping: 1 });
//     const db = client.db("mentoradb");
//     const coursesCollection = db.collection("courses");
//     const enrollmentCollection = db.collection("enrollments");

//     app.get("/courses", async (req, res) => {
//       //   console.log(req.query);

//       const { search } = req.query;

//       let cursor;
//       //   console.log(search.search);

//       //   console.log('from serch 1', search);
//       if (search) {
//         //   console.log('from serch 1');

//         // React core concept => Core
//         // cursor = await coursesCollection.find({
//         //   title: {
//         //     $regex: search,
//         //     $options: 'i',
//         //   },
//         // });
//         cursor = await coursesCollection.find({
//           $or: [
//             {
//               title: {
//                 $regex: search,
//                 $options: "i",
//               },
//             },
//             {
//               instructor: {
//                 $regex: search,
//                 $options: "i",
//               },
//             },
//           ],
//         });

//         // console.log(cursor, 'from search');
//       } else {
//         cursor = coursesCollection.find();
//       }

//       const result = await cursor.toArray();
//       //   console.log(result);

//       // console.log(result);
//       res.send(result);
//     });

//     app.get("/featured", async (req, res) => {
//       const cursor = coursesCollection.find().limit(4);
//       const result = await cursor.toArray();
//       res.send(result);
//     });

//     app.get("/courses/:courseId", logger, verifyToken, async (req, res) => {
//       // const courseId = req.params.courseId;
//       //   console.log(req.user, 'req');

//       const { courseId } = req.params;
//       //   console.log(courseId);
//       const query = { _id: new ObjectId(courseId) };
//       const result = await coursesCollection.findOne(query);
//       res.send(result);
//     });

//     app.get("/enrollments/:userId", verifyToken, async (req, res) => {
//       const { userId } = req.params;
//       const result = await enrollmentCollection
//         .find({ userId: userId })
//         .toArray();
//       res.send(result);
//     });

//     app.patch("/enrollments/:courseId", verifyToken, async (req, res) => {
//       //   console.log('from enrollment');

//       const { courseId } = req.params;
//       const enrollmentData = req.body;

//       const course = await coursesCollection.findOne({
//         _id: new ObjectId(courseId),
//       });

//       if (!course) {
//         return res.status(404).json({ message: "Course not found" });
//       }
//       await coursesCollection.updateOne(
//         { _id: new ObjectId(courseId) },
//         {
//           $inc: { enrollCount: 1 },
//           $set: {
//             lastEnrolledAt: new Date(),
//           },
//         },
//       );
//       //   console.log(enrollmentData);

//       const result = await enrollmentCollection.insertOne({
//         ...enrollmentData,
//         enrolledAt: new Date(),
//       });

//       res.send(result);
//     });

//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!",
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

// "use server";

// // import { headers } from "next/headers";
// // import { auth } from "../auth";

// // // =======================
// // // ADD ROOM (CREATE)
// // // =======================
// // export const addCourse = async (formData) => {
// //   try {
// //     const { token } = await auth.api.getToken({
// //       headers: await headers(),
// //     });

// //     const session = await auth.api.getSession({
// //       headers: await headers(),
// //     });

// //     if (!session?.user || !token) {
// //       throw new Error("Unauthorized");
// //     }

// //     const modifiedData = {
// //       name: formData.get("name"),
// //       description: formData.get("description"),
// //       image: formData.get("image"),
// //       floor: formData.get("floor"),
// //       price: formData.get("price"),
// //       Capacity: formData.get("Capacity"),

// //       // IMPORTANT: checkbox → array
// //       category: formData.getAll("category"),

// //       // JWT user info
// //       userId: session.user.id,
// //       userName: session.user.name,
// //       userEmail: session.user.email,
// //     };

// //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listing`, {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //         Authorization: `Bearer ${token}`,
// //       },
// //       body: JSON.stringify(modifiedData),
// //     });

// //     if (!res.ok) {
// //       const err = await res.text();
// //       throw new Error(err || "Failed to create room");
// //     }

// //     return await res.json();
// //   } catch (error) {
// //     console.error("addCourse error:", error);
// //     return { error: true };
// //   }
// // };

// // // =======================
// // // DELETE ENROLLMENT
// // // =======================
// // export const deleteEnrollment = async (id) => {
// //   try {
// //     const { token } = await auth.api.getToken({
// //       headers: await headers(),
// //     });

// //     const session = await auth.api.getSession({
// //       headers: await headers(),
// //     });

// //     if (!session?.user || !token) {
// //       throw new Error("Unauthorized");
// //     }

// //     const res = await fetch(
// //       `${process.env.NEXT_PUBLIC_API_URL}/add-room/${id}`,
// //       {
// //         method: "DELETE",
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       },
// //     );

// //     if (!res.ok) {
// //       const err = await res.text();
// //       throw new Error(err || "Failed to delete");
// //     }

// //     return await res.json();
// //   } catch (error) {
// //     console.error("deleteEnrollment error:", error);
// //     return { error: true };
// //   }
// // };

// "use server";

// import { headers } from "next/headers";
// import { auth } from "../auth";

// export const addCourse = async (formData) => {
//   try {
//     const { token } = await auth.api.getToken({
//       headers: await headers(),
//     });

//     const session = await auth.api.getSession({
//       headers: await headers(),
//     });

//     if (!session?.user || !token) {
//       throw new Error("Unauthorized");
//     }

//     // const payload = {
//     //   name: formData.get("name"),
//     //   description: formData.get("description"),
//     //   image: formData.get("image"),
//     //   floor: formData.get("floor"),
//     //   price: formData.get("price"),
//     //   Capacity: formData.get("Capacity"),
//     //   category: formData.getAll("category"),
//     //   userId: session.user.id,
//     //   userName: session.user.name,
//     //   userEmail: session.user.email,
//     // };

//     const payload = {
//       ...formData,
//       userId: session.user.id,
//       userName: session.user.name,
//       userEmail: session.user.email,
//     };
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/all_rooms`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       }
//     );

//     const data = await res.json();

//     if (!res.ok) {
//       throw new Error(data?.message || "Failed");
//     }

//     return data;
//   } catch (err) {
//     console.log(err);
//     return null;
//   }
// };
// export const deleteEnrollment = async (id) => {
//   const { token } = await auth.api.getToken({
//     headers: await headers(),
//   });

//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-room/${id}`, {
//     method: 'DELETE',
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   if (!res.ok) return null;
//   const data = await res.json();
//   //   console.log(data);

//   return data;
// };

// "use server";

// import { headers } from "next/headers";
// import { auth } from "../auth";

// export const addCourse = async (data) => {
//   try {
//     const session = await auth.api.getSession({
//       headers: await headers(),
//     });

//     if (!session?.user) {
//       throw new Error("Unauthorized");
//     }

//     const payload = {
//       ...data,
//       userId: String(session.user.id),
//       userName: session.user.name,
//       userEmail: session.user.email,
//     };

//     console.log("PAYLOAD:", payload);

//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all_rooms`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//       body: JSON.stringify(payload),
//       cache: "no-store",
//     });

//     const result = await res.json();

//     console.log("SERVER RESPONSE:", result);

//     if (!res.ok) {
//       throw new Error(result?.message || "Failed to add room");
//     }

//     return result;
//   } catch (err) {
//     console.log("ADD COURSE ERROR:", err);

//     return null;
//   }
// };

// export const deleteEnrollment = async (id) => {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/add-room/${id}`,
//       {
//         method: "DELETE",
//         credentials: "include",
//       },
//     );

//     if (!res.ok) {
//       return null;
//     }

//     return await res.json();
//   } catch (err) {
//     console.log("DELETE ERROR:", err);
//     return null;
//   }
// };

// "use server";

// import { headers } from "next/headers";
// import { auth } from "../auth";

// export const addCourse = async (formData) => {
//   const { token } = await auth.api.getToken({
//     headers: await headers(),
//   });

//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });

//   // ✅ FIX: category getAll দিয়ে array হিসেবে নেওয়া হয়েছে
//   const modifiedData = {
//     name: formData.get("name"),
//     description: formData.get("description"),
//     image: formData.get("image"),
//     floor: formData.get("floor"),
//     price: formData.get("price"),
//     Capacity: formData.get("Capacity"),
//     category: formData.getAll("category"),
//     userId: session?.user?.id,
//     userName: session?.user?.name,
//     userEmail: session?.user?.email,
//   };

//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all_rooms`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(modifiedData),
//   });

//   if (!res.ok) return null;
//   const data = await res.json();
//   return data;
// };

// export const deleteEnrollment = async (id) => {
//   const { token } = await auth.api.getToken({
//     headers: await headers(),
//   });

//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-room/${id}`, {
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   if (!res.ok) return null;
//   const data = await res.json();
//   return data;
// };

"use server";

import { headers } from "next/headers";
import { auth } from "../auth";

export const addCourse = async (formData) => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const modifiedData = {
    name: formData.get("name"),
    description: formData.get("description"),
    image: formData.get("image"),
    floor: formData.get("floor"),
    price: formData.get("price"),
    Capacity: formData.get("Capacity"),
    category: formData.getAll("category"),
    userId: session?.user?.id,
    userName: session?.user?.name,
    userEmail: session?.user?.email,
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all_rooms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(modifiedData),
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data;
};

// ✅ NEW: updateCourse action
export const updateCourse = async (roomId, formData) => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const updatedData = {
    name: formData.get("name"),
    description: formData.get("description"),
    image: formData.get("image"),
    floor: formData.get("floor"),
    price: formData.get("price"),
    Capacity: formData.get("Capacity"),
    category: formData.getAll("category"),
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/all_rooms/${roomId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    },
  );

  if (!res.ok) return null;
  const data = await res.json();
  return data;
};

export const deleteEnrollment = async (id) => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-room/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data;
};