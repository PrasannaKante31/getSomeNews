export default function Trial() {
  const fetchNews = async () => {
    var url =
      "https://newsapi.org/v2/everything?" +
      "q=Apple&" +
      "from=2023-12-23&" +
      "sortBy=popularity&" +
      "apiKey=1881fe38d63e4bf0be6062fe535d398b";

    var req = new Request(url);

    fetch(req).then(function (response) {
      console.log(response.json());
    });
  };

  return <div>{() => fetchNews()}</div>;
}
