class Controller {
  constructor(
    store,
    { searchFormView, resultView, tabView, keywordView, historyView }
  ) {
    this.store = store;
    this.searchFormView = searchFormView;
    this.resultView = resultView;
    this.tabView = tabView;
    this.keywordView = keywordView;
    this.historyView = historyView;

    this.subscribeViewEvents();

    this.render();
  }

  subscribeViewEvents() {
    this.searchFormView
      .on("@submit", (event) => this.search(event.detail.value))
      .on("@reset", (_) => this.reset());

    this.tabView.on("@change", (event) => this.changeTab(event.detail.value));

    this.keywordView.on("@click", (event) => this.search(event.detail.value));

    this.historyView
      .on("@click", (event) => this.search(event.detail.value))
      .on("@remove", (event) => this.removeHistory(event.detail.value));
  }

  search(keyword) {
    if (!keyword || this.store.searchKeyword === keyword) {
      return;
    }
    this.addHistory(keyword);
    this.store.search(keyword);
    this.render();
  }

  reset() {
    this.store.searchKeyword = "";
    this.store.searchResult = [];

    this.render();
  }

  render() {
    if (this.store.searchKeyword) {
      return this.renderSearchList();
    }

    const selectedTab = this.store.selectedTab;
    if (selectedTab === "KEYWORD") {
      this.historyView.hide();
      this.keywordView.show(this.store.getKeywordList());
    } else if (selectedTab === "HISTORY") {
      this.keywordView.hide();
      this.historyView.show(this.store.getHistoryList());
    } else {
      throw "굿";
    }

    this.tabView.show(selectedTab);
    this.resultView.hide();
  }

  renderSearchList() {
    this.searchFormView.show(this.store.searchKeyword);
    this.resultView.show(this.store.searchResult);

    this.tabView.hide();
    this.keywordView.hide();
    this.historyView.hide();
  }

  changeTab(tab) {
    this.store.selectedTab = tab;
    this.render();
  }

  addHistory(keyword) {
    this.store.addHistory(keyword);
    this.render();
  }

  removeHistory(keyword) {
    this.store.removeHistory(keyword);
    this.render();
  }
}

export default Controller;
