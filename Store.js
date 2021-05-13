import { Tab } from "./views/TabView.js";

class Store {
  constructor(storage) {
    this.storage = storage;

    this.searchKeyword = "";
    this.searchResult = [];

    this.selectedTab = Object.keys(Tab)[0];
  }

  search(keyword) {
    this.searchKeyword = keyword;
    this.searchResult = this.storage.productData.filter((product) =>
      product.name.includes(keyword)
    );
  }

  getKeywordList() {
    return this.storage.keywordData;
  }

  getHistoryList() {
    console.log(this.storage.historyData);
    return this.storage.historyData.sort((a, b) => b.date - a.date);
  }

  addHistory(keyword) {
    this.storage.historyData.push({
      id: this.storage.historyData.length,
      keyword,
      date: Date.now(),
    });
  }

  removeHistory(keyword) {
    this.storage.historyData = this.storage.historyData.filter(
      (data) => data.keyword !== keyword
    );
  }
}

export default Store;
