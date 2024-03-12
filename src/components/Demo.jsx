import { useState, useEffect } from "react";
import { useLazyGetSummaryQuery } from "../services/article";
import { copy, tick, linkIcon } from "../assets";
import { Vortex } from "react-loader-spinner";
import { Zoom, toast } from "react-toastify";
const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);
  const handleUrlCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 2000);
    toast.info("Url Copied Successfully", {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Zoom,
    });
  };
  const handleArticleCopy = (copyText) => {
    navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.info("Article Summary Copied Successfully", {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Zoom,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };

  return (
    <section className="mt-16 w-full max-w-4xl ">
      <div className="flex flex-col w-full gap-2">
        <form
          onSubmit={handleSubmit}
          className="relative flex justify-center items-center"
        >
          <img
            src={linkIcon}
            alt="link"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            name="link"
            value={article.url}
            placeholder="Enter a link"
            className="url_input peer focus:shadow-2xl transition duration-300"
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
          />
          <button
            type="submit"
            className="submit_btn border-none peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            🔍
          </button>
        </form>
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto ">
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              className={`link_card`}
              onClick={() => setArticle(item)}
            >
              <div className="copy-btn" onClick={() => handleUrlCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt={copied === item.url ? "tick_icon" : "copy_icon"}
                  className="object-contain"
                  width={14}
                  height={14}
                  onClick={() => setCopied(item.url)}
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-400 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="my-10 max-h-full flex justify-center items-center">
        {isFetching ? (
          <Vortex
            visible={true}
            height="150"
            width="150"
            ariaLabel="vortex-loading"
            wrapperStyle={{}}
            wrapperClass="vortex-wrapper"
            colors={["red", "green", "blue", "yellow", "voilet", "purple"]}
          />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Well, That Was not Supposed to happen, Please try again <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3 justify-between">
              <div className="flex justify-between items-center">
                <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                  Article <span className="blue_gradient">Summary</span>
                </h2>
                <img
                  src={copied ? tick : copy}
                  alt={copied ? "tick" : "copy"}
                  className="object-contain cursor-pointer mr-1"
                  width={16}
                  height={16}
                  onClick={() => handleArticleCopy(article.summary)}
                />
              </div>

              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
