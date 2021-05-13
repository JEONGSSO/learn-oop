import Controller from "./Controller.js";
import Store from "./store.js";

import SearchFormView from "./views/SearchFormView.js";
import ResultView from "./views/ResultView.js";
import TabView from "./views/TabView.js";
import KeywordView from "./views/KeywordView.js";
import HistoryView from "./views/HistoryView.js";

import storage from "./storage.js";

function main() {
  const store = new Store(storage);
  const views = {
    searchFormView: new SearchFormView(),
    resultView: new ResultView(),
    tabView: new TabView(),
    keywordView: new KeywordView(),
    historyView: new HistoryView(),
  };

  new Controller(store, views);
}

document.addEventListener("DOMContentLoaded", main);
