import { Component, Vue } from 'vue-property-decorator';
import Requester from '../../Requester';


const requester = new Requester();

@Component
class RoutesMixin extends Vue {
    public async simpleNode(paramsBundle: NodegenParamsBundle): Promise<BackendOperationResult> {
        const result = await requester.request<NodegenParamsBundle>(
          "nodegen-channel",
          paramsBundle
        );

        console.log("Simple Node Generation _______________________________");
        console.log(paramsBundle);

        if( result.completed ) {
            console.log("Success");
        } else {
            console.log("Error: " + result.error)
        }

        return result;
    }
    public async emptyOutput(): Promise<BackendOperationResult> {
        const result = await requester.request<EmptyChannelArgument>(
          "empty-channel"
        );
        console.log("Empty Output Folder _______________________________");

        if( result.completed ) {
            console.log("Success");
        } else {
            console.log("Error: " + result.error)
        }
        return result;
    }
    public async packageGenerator(metaParameters: MetaParameters): Promise<BackendOperationResult> {
        const result = await requester.request<PackgenChannelArgument>(
          "packgen-channel",
          metaParameters
        );
        console.log("Package Generation _______________________________");
        console.log(metaParameters);

        if( result.completed ) {
            console.log("Success");
        } else {
            console.log("Error: " + result.error)
        }
        return result;
    }
    public async docsGen(paramsBundle: DocsgenParamsBundle): Promise<BackendOperationResult> {
        const result = await requester.request<DocsgenParamsBundle>(
          "docsgen-channel",
          paramsBundle
        );
        console.log("Documentation Generation _______________________________");
        console.log(paramsBundle);

        if( result.completed ) {
            console.log("Success");
        } else {
            console.log("Error: " + result.error)
        }
        return result;
    }
    public async placeFunctional(): Promise<BackendOperationResult> {
        const result = await requester.request<PlacementChannelArgument>(
            "placement-channel",
            { filesToPlace: "functionality" }
        );
        console.log("Place Functional Files _______________________________");

        if( result.completed ) {
            console.log("Success");
        } else {
            console.log("Error: " + result.error)
        }
        return result;
    }
    public async placeDocumentation(): Promise<BackendOperationResult> {
        const result = await requester.request<PlacementChannelArgument>(
            "placement-channel",
            { filesToPlace: "documentation" }
        );
        console.log("Place Documentation Files _______________________________");

        if( result.completed ) {
            console.log("Success");
        } else {
            console.log("Error: " + result.error)
        }
        return result;
    }
}
export default RoutesMixin
