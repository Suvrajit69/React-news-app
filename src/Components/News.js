import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  let capitalizeLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?&country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(50);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    console.log(parsedData);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `NewsMonky-${capitalizeLetter(props.category)}`;
    updateNews();
  }, []);

  // async componentDidMount() {
  // console.log("cdm");
  // const url = `https://newsapi.org/v2/top-headlines?&country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
  // setState({ loading: true });
  // let data = await fetch(url);
  // let parsedData = await data.json();
  // console.log(parsedData);
  // setState({
  //   articles: parsedData.articles,
  //   totalResults: parsedData.totalResults,
  //   loading: false,
  // });
  // updateNews();
  // }

 const handlePreviousClick = () => {
    console.log("Previous");
    // let url = `https://newsapi.org/v2/top-headlines?&country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${
    //   page - 1
    // }&pageSize=${props.pageSize}`;
    // setState({loading: true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // setState({
    //   page: page - 1,
    //   articles: parsedData.articles,
    //   loading: false
    // });
    setPage (page- 1) 
    updateNews();
  };

  const handleNextClick = () => {
    console.log("Next");
    // if (!(page + 1 > Math.ceil(totalResults / props.pageSize))) {
    //   let url = `https://newsapi.org/v2/top-headlines?&country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${
    //     page + 1
    //   }&pageSize=${props.pageSize}`;
    //   setState({loading: true});
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   setState({
    //     page: page + 1,
    //     articles: parsedData.articles,
    //     loading: false
    //   });
    // }
    setPage (page + 1 );
    updateNews();
  };

 const fetchMoreData = async () => {
   const url = `https://newsapi.org/v2/top-headlines?&country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
   setPage (page + 1 );
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    
  };

  console.log("render");
  return (
    <>
      <h1 className="text-center" style={{margin:'18px 0px',marginTop:'75px'}}>
        NewsMonkey - Top Headlines from {capitalizeLetter(props.category)}{" "}
        Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
      {/* <div className="container d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-dark"
            disabled={page <= 1}
            onClick={handlePreviousClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={handleNextClick}
            disabled={
              page + 1 >
              Math.ceil(totalResults / props.pageSize)
            }
          >
            Next &rarr;
          </button>
        </div> */}
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: "8",
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
