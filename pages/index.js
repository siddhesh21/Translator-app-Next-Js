import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import firebase from "firebase";
import { useRef, useState } from "react";

export async function getServerSideProps(context) {
  const messages = await db
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

  const data = {
    docs: messages.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })),
  };

  console.log(data);

  return {
    props: {
      messages: JSON.stringify(data),
    },
  };
}

export default function Home({ messages }) {
  const [isAsc, setIsAsc] = useState(true);
  const [locale, setLocale] = useState("en");
  const [messagesSnapshot] = useCollection(
    db.collection("messages").orderBy("timestamp", isAsc ? "asc" : "desc")
  );
  const inputRef = useRef(null);

  console.log(JSON.parse(messages));

  const onSubmit = (e) => {
    e.preventDefault();
    db.collection("messages").add({
      message: inputRef.current.value,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    inputRef.current.value = "";
  };

  const handleChange = (e) => {
    setLocale(e.target.value);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Translation App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Lets Build Translation APP</h1>
      {messagesSnapshot
        ? messagesSnapshot?.docs.map((doc) => (
            <div key={doc.id}>
              <p>{doc.data().translated?.[locale]}</p>
            </div>
          ))
        : JSON.parse(messages).docs.map((doc) => (
            <div key={doc.id}>
              <p>{doc.translated?.[locale]}</p>
            </div>
          ))}
      <button onClick={() => setIsAsc(!isAsc)}>Flip Order</button>

      <select value={locale} onChange={handleChange}>
        <option value="en">English</option>
        <option value="mr">Marathi</option>
        <option value="es">Spanish</option>
        <option value="de">Germany</option>
        <option value="fr">French</option>
        <option value="ru">Russian</option>
        <option value="zh">Chinese</option>
      </select>

      <form>
        <input ref={inputRef} type="text" />
        <button onClick={onSubmit} type="submit">
          Send Message
        </button>
      </form>
    </div>
  );
}
