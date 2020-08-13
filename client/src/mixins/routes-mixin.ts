import { Component, Vue } from 'vue-property-decorator';
import Requester from '../../Requester';

const requester = new Requester();

@Component
class RoutesMixin extends Vue {
    public async simpleNode(paramsBundle: any) {
        const result = await requester.request(
          "nodegen-channel",
          paramsBundle
        );
        return result;
    }
    public async emptyOutput() {
        const result = await requester.request(
          "empty-channel"
        );
        return result;
    }
    public async packageGenerator(metaParameters: any) {
        const result = await requester.request(
          "packgen-channel",
          metaParameters
        );
        return result;
    }
    public async docsGen(paramsBundle: any) {
        const result = await requester.request(
          "docsgen-channel",
          paramsBundle
        );
        return result;
    }
    public async placeFunctional() {
        const result = await requester.request(
            "placement-channel",
            { filesToPlace: "functionality" }
        );
        return result;
    }
    public async placeDocumentation() {
        const result = await requester.request(
            "placement-channel",
            { filesToPlace: "documentation" }
        );
        return result;
    }
}
export default RoutesMixin