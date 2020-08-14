import { Component, Vue } from 'vue-property-decorator';
import Requester from '../../Requester';


const requester = new Requester();

@Component
class RoutesMixin extends Vue {
    public async simpleNode(paramsBundle: NodegenParamsBundle): Promise<BackendOperationResult> {
        console.log(paramsBundle);
        const result = await requester.request<NodegenParamsBundle>(
          "nodegen-channel",
          paramsBundle
        );
        console.log(result);
        return result;
    }
    public async emptyOutput(): Promise<BackendOperationResult> {
        const result = await requester.request<EmptyChannelArgument>(
          "empty-channel"
        );
        console.log(result);
        return result;
    }
    public async packageGenerator(metaParameters: MetaParameters): Promise<BackendOperationResult> {
        console.log(metaParameters);
        const result = await requester.request<PackgenChannelArgument>(
          "packgen-channel",
          metaParameters
        );
        console.log(result);
        return result;
    }
    public async docsGen(paramsBundle: DocsgenParamsBundle): Promise<BackendOperationResult> {
        console.log(paramsBundle);
        const result = await requester.request<DocsgenParamsBundle>(
          "docsgen-channel",
          paramsBundle
        );
        console.log(result);
        return result;
    }
    public async placeFunctional(): Promise<BackendOperationResult> {
        const result = await requester.request<PlacementChannelArgument>(
            "placement-channel",
            { filesToPlace: "functionality" }
        );
        console.log(result);
        return result;
    }
    public async placeDocumentation(): Promise<BackendOperationResult> {
        const result = await requester.request<PlacementChannelArgument>(
            "placement-channel",
            { filesToPlace: "documentation" }
        );
        console.log(result);
        return result;
    }
}
export default RoutesMixin
