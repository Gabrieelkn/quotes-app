"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const category = "happiness";
  console.log(quote);

  const getQuotes = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/getQuotes?category=${category}`);
      const data = res.json();

      data
        .then((value) => {
          setQuote(Object.values(value).find(Array.isArray));
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          throw new Error(err);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className={styles.box}>
      {quote ? (
        quote.map((q) => {
          return (
            <div key={q.quote} className={styles.quoteWrapper}>
              <i className={styles.quote}>{q.quote}</i>
              <p className={styles.author}>-{q.author}</p>
            </div>
          );
        })
      ) : (
        <div className={styles.quoteWrapper}>
          {" "}
          <p>Select an category and get a quote :)</p>
        </div>
      )}
      <button disabled={loading} onClick={getQuotes} className={styles.button}>
        {loading ? "Getting a quote..." : "Get a quote"}
      </button>
    </div>
  );
}
