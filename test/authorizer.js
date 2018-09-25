const envs = {
  JWKS_URI: 'https://jkganzan13.au.auth0.com/.well-known/jwks.json',
  AUTH0_AUDIENCE: 'https://api.tekkenhub.com',
  AUTH0_ISSUER: 'https://jkganzan13.au.auth0.com/',
};

describe('authorizer', () => {
  it.skip('should generate policy when token is valid', async () => {
    const event = {
      "type" : "TOKEN",
      "authorizationToken" : "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJURkZSREV3T1RrME1FRkVOVVpHUVRZeE16TkVOa1kxUWpZNU1UTXhORGMwUmpFNFF6aEVPUSJ9.eyJpc3MiOiJodHRwczovL2prZ2FuemFuMTMuYXUuYXV0aDAuY29tLyIsInN1YiI6ImZhY2Vib29rfDIwMDM5NjI1MDk2NTM5MDAiLCJhdWQiOlsiaHR0cHM6Ly9hcGkudGVra2VuaHViLmNvbSIsImh0dHBzOi8vamtnYW56YW4xMy5hdS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNTM3Nzc5NzY4LCJleHAiOjE1Mzc3ODY5NjgsImF6cCI6Im0wVXB2UXY2ZDZRZDNjbEFQbmNPNTd1OXNuUTdNeDFCIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.Jq5LmfWj-iHr2L0R6DzSBwMWB_8N8TU_fthrPChqXQBFOJeMwVjtq2iCe5rmP160vr6U8U-XxjOuWEjBvtz_DVW8Jhc-_CGuq7Im9mezH0xwnoyUZCYlIF6InpAtKzaGiqOVr5GeXHI6d84m-VvQ8f0-ULwNJdz-J6GTWuiaf2PSgQcsoTwUzvZiOboumXypEBLSQFpqR8RNa6PcApk8ZAg1NoG43_q-vDR1QgzDgL-pDSAuk8w1Sdsn0lY2e4djwYzcxEmemLt9qUm1VUpiGEov5Ef8x9xjzT0sLWfJx5cAWbTBVobAQ8jJ9dY48eM_TH2kLTY1KAenVVWmAHV3iw",
      "methodArn":"arn:aws:execute-api:us-east-1:1234567890:apiId/stage/method/resourcePath"
    };
    const response = await executeLambda(event, envs, 'authorizer')
    const isPolicy = typeof response === 'object';
    expect(isPolicy).to.be.true;
  });

  it('should throw error when token is invalid', async () => {
    const event = {
      "type" : "TOKEN",
      "authorizationToken" : "Bearer TOKEN",
      "methodArn":"arn:aws:execute-api:us-east-1:1234567890:apiId/stage/method/resourcePath"
    };
    try {
      await executeLambda(event, envs, 'authorizer');
    } catch (err) {
      const isError = err.includes('Unauthorized');
      expect(isError).to.be.true;
    }
  });
});