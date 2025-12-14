import { useEffect, useState } from "react";
import "./App.css";

export interface Article {
  id: string;
  title: string;
  content: Array<{
    type: string;
    children: Array<{ type: string; text: string }>;
  }>;
  coverImage: any;
  publishedAt: Date;
}

const STRAPI_URL = "https://tech-nova-a2u7.onrender.com";

function Example() {
  const [articles, setArticles] = useState<Article[]>([]);

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const getTextFromContent = (content: Article["content"]) => {
    if (!content || !Array.isArray(content)) return "";

    return (
      content
        .map((block) => block.children?.map((child) => child.text).join(" "))
        .join(" ")
        .substring(0, 150) + "..."
    );
  };

  const getArticles = async () => {
    const response = await fetch(`${STRAPI_URL}/api/blogs?populate=*`);
    const data = await response.json();
    console.log("respose from strapi: ", data);
    setArticles(data.data);
  };

  useEffect(() => {
    getArticles();
  }, []);
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8">
        React.js and Strapi Integration
      </h1>
      <div>
        <h2 className="text-2xl font-semibold mb-6">Blog Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <article
              key={article?.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                className="w-full h-48 object-cover"
                src={STRAPI_URL + article?.coverImage?.url}
                alt={article?.title}
                width={180}
                height={38}
              />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{article?.title}</h3>
                <p className="text-gray-600 mb-4">
                  {getTextFromContent(article.content)}
                </p>
                <p className="text-sm text-gray-500">
                  Published: {formatDate(article?.publishedAt)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Example;
