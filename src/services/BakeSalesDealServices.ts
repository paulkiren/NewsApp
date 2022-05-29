const apiHost = 'https://bakesaleforgood.com';
const BakeSalesDealsApi = {
  getInitialDealsFromApi: () => {
    return fetch(apiHost + '/api/deals')
      .then(response => response.json())
      .then(json => {
        return json;
      })
      .catch(error => {
        console.error(error);
      });
  },
  getDealDetailFromApi: (dealId: string) => {
    return fetch(apiHost + '/api/deals/' + dealId)
      .then(response => response.json())
      .then(json => {
        return json;
      })
      .catch(error => {
        console.error(error);
      });
  },
  fetchDealSearchResults: (searchTerm: string) => {
    return fetch(apiHost + '/api/deals?searchTerm=' + searchTerm)
      .then(response => response.json())
      .then(json => {
        return json;
      })
      .catch(error => {
        console.error(error);
      });
  },
};

export default BakeSalesDealsApi;
