import * as _ from "lodash"

export function buildArticleQuery(input: any, extraParams: any) {
    // let baseUrl = process.env.API_BASE_URL;
    let baseUrl = 'https://api.crossref.org/works?'

    let paginationQuery =
      "rows=" +
      extraParams.itemsPerPage +
      "&offset=" +
      extraParams.currentOffset;

    let facetsQuery = "";
    if (extraParams.facets) {
      facetsQuery = "&facet=";
      _.each(extraParams.facets, (facetVal: any, facetName: any) => {
        facetsQuery = facetsQuery + facetName + ":" + facetVal + ",";
      });

      facetsQuery = facetsQuery.slice(0, -1);
    }

    let escapedSearchQuery =
      "&query.bibliographic=" +
      encodeURIComponent(input.replace(/\s+$/, "").replace(/^\s+/, ""));

    return baseUrl + paginationQuery + facetsQuery + escapedSearchQuery;
}

export function buildGetCitationsQuery(doi: any) {
    let baseUrl = process.env.OPENCIATIONS_BASE_URL;
    return baseUrl + 'citations/' + doi;
}

export function buildGetMetadataQuery(doi: any) {
    let baseUrl = process.env.OPENCIATIONS_BASE_URL;
    return baseUrl + 'metadata/' + doi;
}

export function parseArticle(result: any) {
    // get fields from crossref json to helper variables
    var year = "",
      journal = "",
      citations = "",
      locator = [],
      authors = "";
  
    try {
      year = result["published-online"]["date-parts"][0][0];
    } catch (e) {
      try {
        year = result["published-print"]["date-parts"][0][0];
      } catch (e) {}
    }
    try {
      citations = result["citation"]
      .map(function (citations: any) {
        return citations["referenced-by"] + " " + citations["is-referenced-by"];
      })
      .join(", ");
  } catch (e) {}
  
    try {
      authors = result["author"]
      .map(function (author: any) {
        return author["given"] + " " + author["family"];
      })
      .join(", ");
  } catch (e) {}
    try {
      journal = result["short-container-title"];
    } catch (e) {}
    try {
      locator.push(result["volume"]);
    } catch (e) {}
    try {
      locator.push(result["journal-issue"]["issue"]);
    } catch (e) {}
    try {
      locator.push(result["page"]);
    } catch (e) {}
  
    // format the helper variables
    locator = locator.filter(function (x) {
      return !!x;
    });
    if (locator.length) {
      locator.unshift(""); // put dummy first element to product a prefix comma (,)
    }
    if (year && journal) {
      year += ", ";
    }
  
    var title;
    try {
      title = result["title"][0];
    } catch (e) {
      title = "[Title unknown]";
    }
  
    var doi = result["DOI"];
    if (!doi) {
      doi = "[Unknown]";
    }
  
    var url = result["URL"];
    if (!url) {
      url = "#";
    }
  
    return {
      title,
      citations,
      year,
      journal,
      locator,
      authors,
      url,
      doi,
    };
  }