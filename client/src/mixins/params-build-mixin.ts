import { Component, Vue } from 'vue-property-decorator'
@Component
class ParamsBuilderMixin extends Vue {
  private toCamelCase(str: string): string{
    return str
        .replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
        .replace(/\s/g, '')
        .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
  }
  public buildMetaParameters(basicInfo: any): any {
    const { name, auth, color, baseURL } = basicInfo;
    return {
      serviceName: name,
      auth,
      nodeColor: color,
      apiURL: baseURL
    };
  }
  public buildDocsParameters(basicInfo: any, docsInfo: any) {
    const { name } = basicInfo;
    const { serviceURL, introDescription, exampleUsage, workflowNumber } = docsInfo;

    return {
        serviceName: name,
        serviceURL,
        introDescription,
        exampleUsage,
        workflowNumber
    };
  }
  public buildMainParameters(resources: any, operations: any, fields: any) {
    let mainParameters = {};

    const mapFieldTypes = {
      'String': 'string',
      'Options': 'options',
      'Multioptions': 'multiOptions',
      'Boolean': 'boolean',
      'Number': 'number',
      'Collection': 'collection',
      'Fixed Collection': 'fixedCollection'
    };

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
        let defaultValue = field.default;
        if(field.type === "Number") {
          defaultValue = Number(defaultValue);
        } else if(field.type === "Boolean") {
          defaultValue = Boolean(defaultValue);
        } else if(["Options", "Multioptions", "Collection", "Fixed Collection"].includes(field.type)) {
          defaultValue = JSON.parse(defaultValue);
        }

        const fieldObj = {
          name: field.name,
          description: field.description,
          type: mapFieldTypes[field.type],
          default: defaultValue,
          options: []
        };

        if(field.name === "Additional Fields") {
          delete fieldObj.description;
        }
        if(field.options === undefined || field.options.length === 0 || field.options[0].name === "") {
          delete fieldObj.options;
        } else if(field.type === "Collection" || field.type === "Fixed Collection"){
          field.options.forEach(option => {
            // fix the default for internal options
            let defaultValue = option.default;
            if(option.type === "Number") {
              defaultValue = Number(defaultValue);
            } else if(option.type === "Boolean") {
              defaultValue = Boolean(defaultValue);
            } else if(["Options", "Multioptions", "Collection", "Fixed Collection"].includes(option.type)) {
              defaultValue = JSON.parse(defaultValue);
            }

            //handle internal options, which will never be a collection
            let innerOptions = [];
            if(option.options !== undefined && option.options !== null) {
              option.options.forEach(innerOption => {
                innerOptions.push({
                  name: innerOption.name,
                  description: innerOption.description
                })
              });
            }

            fieldObj.options.push({
              name: option.name,
              description: option.description,
              type: mapFieldTypes[option.type],
              default: defaultValue,
              options: innerOptions
            });

            if(fieldObj.options[fieldObj.options.length - 1].options.length === 0) {
              delete fieldObj.options[fieldObj.options.length - 1].options;
            }
          });
        } else {
          field.options.forEach(option => {
            fieldObj.options.push({
              name: option.name,
              description: option.description
            });
          });
        }

        field.resourceOperation.forEach(resourceOp => {
          const [ operation, resource ] = resourceOp.value.split(" : ");
          const operationToUpdate = mainParameters[resource].findIndex(op => op.name === operation);   
          mainParameters[resource][operationToUpdate].fields.push(fieldObj);
        });
      });
    }

    return mainParameters;
  }
  public buildMainTriggerParameters(webhookEndpoint: string, properties: any, fields: any) {
    let mainParameters = {
      webhookEndpoint: webhookEndpoint,
      webhookProperties: []
    };

    const mapFieldTypes = {
      'String': 'string',
      'Options': 'options',
      'Multioptions': 'multiOptions',
      'Boolean': 'boolean',
      'Number': 'number',
      'Collection': 'collection',
      'Fixed Collection': 'fixedCollection'
    };

    properties.forEach(property => {
      const { displayName, required, description, type } = property;

      let defaultValue = property.default;
      if(type === "Number") {
        defaultValue = Number(defaultValue);
      } else if(type === "Boolean") {
        defaultValue = Boolean(defaultValue);
      }

      const propertyObj = {
        displayName,
        name: this.toCamelCase(displayName),
        required,
        description,
        type: mapFieldTypes[type],
        default: defaultValue,
        options: []
      };

      if(["Options", "Multioptions"].includes(type)) {
          property.options.forEach(option => {
            propertyObj.options.push({
              name: option.name,
              value: this.toCamelCase(option.name),
              description: option.description,
              fields: []
            });
          });
      } else {
        delete propertyObj.options;
      }

      mainParameters.webhookProperties.push(propertyObj);
    });

    if(fields[0].name !== "") {
      fields.forEach(field => {
        // fix the default for first-layer options
        let defaultValue = field.default;
        if(field.type === "Number") {
          defaultValue = Number(defaultValue);
        } else if(field.type === "Boolean") {
          defaultValue = Boolean(defaultValue);
        } else if(["Options", "Multioptions", "Collection", "Fixed Collection"].includes(field.type)) {
          defaultValue = JSON.parse(defaultValue);
        }

        const fieldObj = {
          displayName: field.name,
          name: this.toCamelCase(field.name),
          description: field.description,
          type: mapFieldTypes[field.type],
          default: defaultValue,
          required: true,
          options: []
        };

        if(field.name === "Additional Fields") {
          delete fieldObj.description;
        }
        if(field.options === undefined || field.options.length === 0 || field.options[0].name === "") {
          delete fieldObj.options;
        } else if(field.type === "Collection" || field.type === "Fixed Collection") {
          field.options.forEach(option => {
            // fix the default for internal options
            let defaultValue = option.default;
            if(option.type === "Number") {
              defaultValue = Number(defaultValue);
            } else if(option.type === "Boolean") {
              defaultValue = Boolean(defaultValue);
            } else if(["Options", "Multioptions", "Collection", "Fixed Collection"].includes(option.type)) {
              defaultValue = JSON.parse(defaultValue);
            }

            //handle internal options, which will never be a collection
            let innerOptions = [];
            if(option.options !== undefined && option.options !== null) {
              option.options.forEach(innerOption => {
                innerOptions.push({
                  name: innerOption.name,
                  description: innerOption.description
                })
              });
            }

            fieldObj.options.push({
              name: option.name,
              description: option.description,
              type: mapFieldTypes[option.type],
              default: defaultValue,
              options: innerOptions
            });

            if(fieldObj.options[fieldObj.options.length - 1].options.length === 0) {
              delete fieldObj.options[fieldObj.options.length - 1].options;
            }
          });
        } else {
          field.options.forEach(option => {
            fieldObj.options.push({
              name: option.name,
              description: option.description
            });
          });
        }

        field.resourceOperation.forEach(resourceOp => {
          const [ property, option ] = resourceOp.value.split(" : ");
          const propertyIndex = mainParameters.webhookProperties.findIndex(prop => prop.displayName === property);
          const optionIndex = mainParameters.webhookProperties[propertyIndex].options.findIndex(op => op.name === option);
          mainParameters.webhookProperties[propertyIndex].options[optionIndex].fields.push(fieldObj);
        });
      });
    }

    return mainParameters;
  }
}
export default ParamsBuilderMixin;
