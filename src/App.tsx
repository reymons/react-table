import { connect } from "react-redux";
import Table from "./components/Table";
import { getErrorMessage, getLoadingNews, getNews } from "./selectors/newsSelectors";
import styles from "./styles/App.module.css";
import { fetchNews } from "./redux/reducers/newsReducer";
import React from "react";
import { INews, IReducers } from "./interfaces";

interface IApp {
  news: Array<INews>;
  loadingNews: boolean;
  loadingNewsErrorMsg: string;
  fetchNews: (page: number) => void;
}

const App = ({ news, loadingNews, loadingNewsErrorMsg, fetchNews }: IApp) => {
  const [newsPageCount, setNewsPageCount] = React.useState(1);
  const observableNodeRef = React.useRef<HTMLDivElement>(null);
  const observerRef = React.useRef<IntersectionObserver>();
  const tableWrapperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observableNode = observableNodeRef.current;
    const observer = new IntersectionObserver(([target]) => {
      if (target.isIntersecting) {
        setNewsPageCount(prev => prev + 1);
      }
    }, { threshold: 1 });

    observerRef.current = observer;

    if (observableNode) {
      observer.observe(observableNode);
    }
  }, []);

  React.useEffect(() => {
    if (newsPageCount > 10) {
      if (observerRef.current && observableNodeRef.current) {
        observerRef.current.unobserve(observableNodeRef.current);
      }

      return;
    }

    fetchNews(newsPageCount);
  }, [fetchNews, newsPageCount]);

  const rowsData = React.useMemo(() => {
    return news.map(n => [n.time_ago, n.title, n.domain]);
  }, [news])

  const cellUrls = React.useMemo(() => {
    return news.map(n => n.url);
  }, [news]);

  const sortDateColumn = React.useCallback((a: string, b: string) => {
    let timeA = Number(a.substring(0, a.indexOf(" ")));
    let timeB = Number(b.substring(0, b.indexOf(" ")));

    const includesSingle = (data: string) => {
      return data.includes("a day")
        || data.includes("an hour")
        || data.includes("a minute")
        || data.includes("a second")
    }

    if (includesSingle(a)) timeA = 1;
    if (includesSingle(b)) timeB = 1;

    const getPriority = (data: string) => {
      return data.includes("year") ? 6
        : data.includes("week") ? 5
        : data.includes("day") ? 4
        : data.includes("hour") ? 3
        : data.includes("minute") ? 2
        : data.includes("second") && 1 
    }

    const priorityA = getPriority(a);
    const priorityB = getPriority(b);

    if (priorityA > priorityB) return 1;
    if (priorityB > priorityA) return -1;

    return timeA - timeB;
  }, []);

  return (
    <div className={styles.page}>
      {
        news &&
        <div className={styles.tableWrapper} ref={tableWrapperRef}>
          <Table
            rowsData={rowsData}
            headNames={["Time added", "Title", "Domain"]}
            headsWithSort={["Time added", "Title", "Domain"]}
            sortFunctions={[sortDateColumn]}
            columnWidths={["15%", "auto", "auto"]}
            columnsWithMobileHide={[0, 2]}
            cellUrls={[[], cellUrls, []]}
            mobileSortBtnData={{
              name: "Sort by date",
              sortedColumn: 0,
            }}
          />
        </div>
      }
      {
        loadingNews
        ? <h3 className={styles.loader}>Loading news...</h3>
        : loadingNewsErrorMsg.length > 0
        && <h3 className={styles.errorMsg}>{loadingNewsErrorMsg}</h3>
      }    
      <div id={styles.observableElement} ref={observableNodeRef}></div>
    </div>
  )
}

const mapStateToProps = (state: IReducers) => {
  return {
    news: getNews(state.news),
    loadingNews: getLoadingNews(state.news),
    loadingNewsErrorMsg: getErrorMessage(state.news),
  }
}

export default connect(mapStateToProps, { fetchNews })(App);
