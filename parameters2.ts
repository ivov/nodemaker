export const metaParameters: MetaParameters = {
    serviceName: "Hacker News",
    authType: "OAuth2",
    nodeColor: "#ff6600",
    apiUrl: "http://hn.algolia.com/api/v1/",
  };
  
  export const mainParameters: MainParameters = {
    Article: [
      {
        name: "Get",
        description: "Get a Hacker News article",
        endpoint: "items/$$articleId$$",
        requestMethod: "GET",
        fields: [
          {
            name: "Article ID",
            description: "The ID of the Hacker News article to be returned",
            type: "string",
            default: "",
          },
          {
            name: "Additional Fields",
            type: "collection",
            default: {},
            options: [
              {
                name: "Include comments",
                type: "boolean",
                default: false,
                description: "Whether to include all the comments in the article",
              },
              {
                name: "More Properties",
                type: "collection",
                default: {},
                description: "Whether to include all the comments in the article",
                options: [
                    {
                        name: "More strings",
                        description: ""
                    }
                ]
              },
            ],
          },
        ],
      },
    ],
  };

  