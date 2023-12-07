"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(null);
  const [error, setError] = useState(false);
  console.log(category);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const getQuotes = async () => {
    if (category) {
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
    } else {
      setError(true);
    }
  };
  return (
    <div className={styles.box}>
      <SelectBox setCategory={setCategory} />
      {error && <p className={styles.error}>You must choose a category</p>}
      <button disabled={loading} onClick={getQuotes} className={styles.button}>
        {loading ? "Getting a quote..." : "Get a quote"}
      </button>
      {quote ? (
        quote.map((q) => {
          return (
            <div key={q.quote} className={styles.quoteWrapper}>
              <i className={styles.quote}>{q.quote}</i>
              <p className={styles.author}>- {q.author} -</p>
            </div>
          );
        })
      ) : (
        <div className={styles.quoteWrapper}>
          <p>Select an category and get a quote :)</p>
        </div>
      )}
    </div>
  );
}

function SelectBox({ setCategory }) {
  return (
    <select
      onChange={(e) => {
        setCategory(e.target.value);
      }}
      className={styles.select}
    >
      <option disabled selected>
        Choose a category
      </option>
      <option value="alone">alone</option>
      <option value="amazing">amazing</option>
      <option value="art">art</option>
      <option value="beauty">beauty</option>
      <option value="business">business</option>
      <option value="communication">communication</option>
      <option value="failure">failure</option>
      <option value="faith">faith</option>
      <option value="happiness">happiness</option>
      <option value="humor">humor</option>
      <option value="life">life</option>
      <option value="love">love</option>
    </select>
  );
}
