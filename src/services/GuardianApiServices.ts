const GuardianAPiService = {
  getNewsFromApi: () => {
    return fetch("https://content.guardianapis.com/search?q=debate%20AND%20NOT%20immigration&tag=politics/politics&from-date=2014-01-01&api-key=test")
      .then(response => response.json())
      .then(json => {
        return json;
      })
      .catch(error => {
        console.error(error);
      });
  },
};

export default GuardianAPiService;
