export type GetMealSearchResultQueryParams = {
  s?: string;
  f?: string;
};

export type GetMealSearchResultResponseData = {
  meals?: Array<{
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strTags: string;
    strYoutube: string;
  }>;
};
