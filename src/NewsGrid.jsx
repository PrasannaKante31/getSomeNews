import NewsBox from "./NewsBox";
import "./AppBar.css";
import { useState, useEffect } from "react";
const Grid = [];
export default function NewsGrid({ text }) {
  const [grid, setGrid] = useState(Grid);
  console.log(text); //text check
  useEffect(() => {
    fetchNews();
  }, [text]);

  const fetchNews = async () => {
    var url = `https://newsapi.org/v2/everything?q=${text}&from=2023-11-25&sortBy=publishedAt&apiKey=1881fe38d63e4bf0be6062fe535d398b`;

    var req = new Request(url);
    let awaited = await fetch(req);
    let newslet = await awaited.json(); //object is given
    const size = newslet.totalResults;
    const articles = newslet.articles;
    // object received done
    for (let i = 0; i < 30; i++) {
      let NewsRow = [];
      for (let cnt = 0; cnt < 3; cnt++) {
        NewsRow.push(<NewsBox news={articles[i]} />);
        i++;
      }
      grid.push(NewsRow);
    }

    setGrid((oldGrid) => grid);
  };
  console.log(grid);

  return (
    <div>
      <h1>{text}</h1>
      <div>{grid}</div>
    </div>
  );
}
