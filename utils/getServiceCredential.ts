const getServiceCredential = (metaParameters: MetaParameters) => {
  const serviceName = metaParameters.serviceName.replace(/\s/g, "");
  return (
    serviceName + (metaParameters.auth === "OAuth2" ? "OAuth2" : "") + "Api"
  );
};

export default getServiceCredential;
