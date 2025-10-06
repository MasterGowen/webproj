"use client";


import { useEffect, useState } from "react";
import Image from "next/image";

export interface Article {
  id: number;
  Title: string;
  Body: string;
  published_at: Date;
}

const STRAPI_URL = "http://localhost:1337";

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);

  const getArticles = async () => {
    const response = await fetch(`${STRAPI_URL}/articles`);
    const data = await response.json();
    setArticles(data.data)
  }

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return new Date(date).toLocaleDateString("ru", options);
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div className="p-6">
      {articles.map((article) => (
        <article
          key={article.id}
          className="bg-white shadow-md rounded-lg overflow-hidden"
        >
          <h2 className="text-2xl font-bold p-4">{article.Title}</h2>
          <p className="mb-4 p-4">{article.Body}</p>
          <p className="text-sm text-gray-500 p-4">{formatDate(article.published_at)}</p>

        </article>
      ))}
    </div>
  );
}
