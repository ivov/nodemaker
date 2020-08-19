import { Component, Vue } from 'vue-property-decorator';

const mapFieldTypes = {
  'String': 'string',
  'Options': 'options',
  'Multioptions': 'multiOptions',
  'Boolean': 'boolean',
  'Number': 'number',
  'Collection': 'collection',
  'Fixed Collection': 'fixedCollection'
};

@Component
class ParamsBuilderMixin extends Vue {
  private toCamelCase(str: string): string {
    return str
        .replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
        .replace(/\s/g, '')
        .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
  }
  private fixDefaultType(defaultValue: any, type: string): any {
    if(type === "Number") {
      return Number(defaultValue);
    } else if(type === "Boolean") {
      return new Boolean(defaultValue);
    } else if(["Collection", "Fixed Collection"].includes(type)) {
      try{
        return JSON.parse(defaultValue);
      } catch(error) {
        return {};
      }
    }
    return defaultValue;
  }
  public buildMetaParameters(basicInfo: BasicInfo): MetaParameters {
    const { serviceName, authType, nodeColor, apiUrl } = basicInfo;
    return {
      serviceName,
      authType,
      nodeColor,
      apiUrl,
    };
  }
  public buildDocsParameters(basicInfo: BasicInfo, docsInfo: DocsParameters): DocsParameters {
    const { serviceName } = basicInfo;
    const { serviceUrl, introDescription, exampleUsage, workflowUrl } = docsInfo;

    return {
        serviceName,
        serviceUrl,
        introDescription,
        exampleUsage,
        workflowUrl
    };
  }
  public buildMainParameters(resources: FrontendResource[], operations: FrontendOperation[], fields: FrontendRegularField[]) {
    let mainParameters: MainParametersBuilder = {};

    resources.forEach(resource => {
      mainParameters[resource.text] = [];
    });

    operations.forEach(operation => {
      mainParameters[operation.resource].push({
        name: operation.name,
        description: operation.description,
        endpoint: operation.endpoint,
        requestMethod: operation.requestMethod,
        fields: []
      })
    });

    if(fields[0].name !== "") {
      fields.forEach(field => {
        // fix the default for first-layer options
        const defaultValue: any = this.fixDefaultType(field.default, field.type);

        //@ts-ignore because this is fixing the type problem
        const type: FieldType = mapFieldTypes[field.type];

        let fieldObj: OperationField = {
          name: field.name,
          description: field.description,
          type: type,
          default: defaultValue,
          extraDisplayRestriction: {},
          numericalLimits: { minLimit: 0, maxLimit: 0 },
          options: []
        };

        if(type === 'number' && (field.min !== "0" && field.max !== "0")) {
          //@ts-ignore
          fieldObj.numericalLimits = {
            minLimit: Number(field.min),
            maxLimit: Number(field.max),
          };
        } else {
          //@ts-ignore
          delete fieldObj.numericalLimits;
        }

        if(field.displayRestrictions !== "" && field.displayRestrictions !== undefined) {
          const strToParse = field.displayRestrictions.replace(/\n/g, "\\n")
                .replace(/\r/g, "\\r")
                .replace(/\t/g, "\\t")
                .replace(/\f/g, "\\f");
          fieldObj.extraDisplayRestriction = JSON.parse(strToParse);
        } else {
          delete fieldObj.extraDisplayRestriction;
        }
        
        if(type === 'string' || type === 'boolean' || type === 'number') {
          //@ts-ignore because I am converting to SingleValues Operation Field by deleting options
          delete fieldObj.options;
        } else if(type === "collection" || type === "fixedCollection"){
          //@ts-ignore because of condition option will always by CollectionOption
          field.options.forEach((option: CollectionOption) => {
            // fix the default for internal options
            const defaultValue: any = this.fixDefaultType(option.default, option.type);

            //handle internal options, which will never be a collection
            let innerOptions: MaxNestedFieldOption[] = [];
            if(option.options !== undefined && option.options !== null) {
              option.options.forEach(innerOption => {
                innerOptions.push({
                  name: innerOption.name,
                  description: innerOption.description
                })
              });
            }

            //@ts-ignore because this is fixing the type problem
            const typeOption: FieldType =  mapFieldTypes[option.type];

            //@ts-ignore covered by conditional
            fieldObj.options.push({
              name: option.name,
              description: option.description,
              type: typeOption,
              default: defaultValue,
              options: innerOptions
            });

            //@ts-ignore covered by conditional
            if(fieldObj.options[fieldObj.options.length - 1].options.length === 0) {
              //@ts-ignore covered by conditional
              delete fieldObj.options[fieldObj.options.length - 1].options;
            }
          });
        } else {
          field.options.forEach(option => {
            //@ts-ignore covered by conditional
            fieldObj.options.push({
              name: option.name,
              description: option.description
            });
          });
        }

        field.resourceOperation.forEach(resourceOp => {
          const [ operation, resource ] = resourceOp.value.split(" : ");
          const operationToUpdate = mainParameters[resource].findIndex((op: OperationField) => op.name === operation);   
          mainParameters[resource][operationToUpdate].fields.push(fieldObj);
        });
      });
    }

    return mainParameters;
  }
  public buildMainTriggerParameters(webhookEndpoint: string, properties: FrontendProperty[], fields: FrontendTriggerField[]) {
    let mainParameters = {
      webhookEndpoint: webhookEndpoint,
      webhookProperties: []
    };

    properties.forEach(property => {
      const { displayName, required, description } = property;

      const defaultValue: any = this.fixDefaultType(property.default, property.type);
      //@ts-ignore fixing this issue with the function
      const type: FieldType = mapFieldTypes[property.type];

      const propertyObj = {
        displayName,
        name: this.toCamelCase(displayName),
        required,
        description,
        type: type,
        default: defaultValue,
        options: []
      };

      if(type === 'options' || type === 'multiOptions') {
          //@ts-ignore already check for this
          property.options.forEach(option => {
            const newOption: WebhookPropertyOption = {
              name: option.name,
              value: this.toCamelCase(option.name),
              description: option.description,
              fields: []
            };
            //@ts-ignore
            propertyObj.options.push(newOption);
          });
      } else {
        delete propertyObj.options;
      }

      //@ts-ignore
      mainParameters.webhookProperties.push(propertyObj);
    });

    if(fields[0].name !== "") {
      fields.forEach(field => {
        // fix the default for first-layer options
        const defaultValue: any = this.fixDefaultType(field.default, field.type);
        //@ts-ignore fixing issue with this function
        const fieldType: FieldType = mapFieldTypes[field.type];

        const fieldObj = {
          displayName: field.name,
          name: this.toCamelCase(field.name),
          description: field.description,
          type: fieldType,
          default: defaultValue,
          required: field.required,
          options: []
        };

        if(field.name === "Additional Fields") {
          delete fieldObj.description;
        }
        if(field.options === undefined || field.options.length === 0 || field.options[0].name === "") {
          delete fieldObj.options;
        } else if(fieldType === "collection" || fieldType === "fixedCollection") {
          field.options.forEach(option => {
            // fix the default for internal options
            //@ts-ignore because conditional checks for this
            const defaultValue: any = this.fixDefaultType(option.default, option.type);

            //handle internal options, which will never be a collection
            let innerOptions: MaxNestedFieldOption[] = [];
            //@ts-ignore checking for issue with this statement
            if(option.options !== undefined && option.options !== null) {
               //@ts-ignore already checked for
              option.options.forEach((innerOption: OptionsOption) => {
                innerOptions.push({
                  name: innerOption.name,
                  description: innerOption.description
                })
              });
            }

            //@ts-ignore checked for issue already
            const innerOptionType: SingleValueFieldType | OptionsType = mapFieldTypes[option.type];

            const newOption: ManyValuesGroupFieldOption = {
              name: option.name,
              description: option.description,
              type: innerOptionType,
              default: defaultValue,
              options: innerOptions
            }
            //@ts-ignore
            fieldObj.options.push(newOption);

            //@ts-ignore
            if(fieldObj.options[fieldObj.options.length - 1].options.length === 0) {
              //@ts-ignore
              delete fieldObj.options[fieldObj.options.length - 1].options;
            }
          });
        } else {
          field.options.forEach(option => {
            const newInnerOption: MaxNestedFieldOption = {
              name: option.name,
              description: option.description
            };

            //@ts-ignore
            fieldObj.options.push(newInnerOption);
          });
        }

        field.resourceOperation.forEach(resourceOp => {
          const [ property, option ] = resourceOp.value.split(" : ");
          const propertyIndex = mainParameters.webhookProperties.findIndex((prop: FrontendProperty) => prop.displayName === property);
          //@ts-ignore
          const optionIndex = mainParameters.webhookProperties[propertyIndex].options.findIndex((op: OptionsOption) => op.name === option);
          //@ts-ignore
          mainParameters.webhookProperties[propertyIndex].options[optionIndex].fields.push(fieldObj);
        });
      });
    }

    return mainParameters;
  }
}
export default ParamsBuilderMixin;
